import { logger } from '@/lib/logger';

export const WAVE1_SLUGS = [
  'operational-ai-agents',
  'skirat-platformot-lepituach-chatbot-irgoni',
  'eich-matmiim-chatbot-sherut-chacham',
  'langchain-lama-ze-tov-ve-eifo-ze-shimushi',
  'יתרונות-חסרונות-langchain',
  'what-are-best-ai-agent-frameworks-business',
  'how-to-check-production-readiness',
] as const;

const REVALIDATE_SECONDS = 3600;
const TIMEOUT_MS = 8000;
const ARTICLES_MARKER = 'var SORO_ARTICLES = ';
/**
 * Public Soro embed id from `.env.example`. Image builds often run without
 * `SORO_EMBED_TOKEN`, and `generateStaticParams` still has to finish.
 * A non-empty env value overrides this id.
 */
const PUBLIC_EMBED_TOKEN = 'cba1e92c-70c0-4f06-9f93-6fc454e7a2d0';

export type SoroArticleMeta = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  isoDate: string;
  image: string | null;
};

type SoroArticle = SoroArticleMeta & {
  html: string;
};

function getSoroToken(): string {
  const configured = process.env.SORO_EMBED_TOKEN?.trim();
  return configured || PUBLIC_EMBED_TOKEN;
}

function isProductionBuild(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

function soroBase(): string {
  return `https://app.trysoro.com/api/embed/${getSoroToken()}`;
}

async function soroFetch(url: string): Promise<string> {
  let response: Response;
  try {
    response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Soro request failed for ${url}: ${message}`);
  }

  if (!response.ok) {
    throw new Error(`Soro request failed (${response.status}) for ${url}`);
  }

  return response.text();
}

function asArticleMeta(value: unknown): SoroArticleMeta | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const article = value as Record<string, unknown>;
  if (
    typeof article.id !== 'string' ||
    typeof article.title !== 'string' ||
    typeof article.slug !== 'string' ||
    typeof article.isoDate !== 'string'
  ) {
    return null;
  }

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: typeof article.excerpt === 'string' ? article.excerpt : '',
    date: typeof article.date === 'string' ? article.date : '',
    isoDate: article.isoDate,
    image: typeof article.image === 'string' && article.image.length > 0 ? article.image : null,
  };
}

function extractJsonArray(script: string): string {
  const start = script.indexOf(ARTICLES_MARKER);
  if (start === -1) {
    throw new Error('Soro list response did not include SORO_ARTICLES');
  }

  const jsonStart = start + ARTICLES_MARKER.length;
  if (script[jsonStart] !== '[') {
    throw new Error('Soro list response had an unterminated SORO_ARTICLES array');
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = jsonStart; index < script.length; index += 1) {
    const char = script[index];
    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '[') {
      depth += 1;
    }
    if (char === ']') {
      depth -= 1;
      if (depth === 0) {
        return script.slice(jsonStart, index + 1);
      }
    }
  }

  throw new Error('Soro list response had an unterminated SORO_ARTICLES array');
}

function parseArticleList(script: string): SoroArticleMeta[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(extractJsonArray(script));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Soro list JSON could not be parsed: ${message}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error('SORO_ARTICLES was not an array');
  }

  return parsed.flatMap((item) => {
    const article = asArticleMeta(item);
    return article ? [article] : [];
  });
}

/** Keep the newest isoDate when Soro publishes the same slug more than once. */
export function dedupeArticlesBySlug(articles: readonly SoroArticleMeta[]): SoroArticleMeta[] {
  const bySlug = new Map<string, SoroArticleMeta>();

  for (const article of articles) {
    const current = bySlug.get(article.slug);
    if (!current || article.isoDate > current.isoDate) {
      bySlug.set(article.slug, article);
    }
  }

  return [...bySlug.values()].sort((left, right) => (left.isoDate < right.isoDate ? 1 : -1));
}

export function isWave1Slug(slug: string): boolean {
  return (WAVE1_SLUGS as readonly string[]).includes(slug);
}

export function stripArticleScripts(html: string): string {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

export async function getSoroArticles(): Promise<SoroArticleMeta[]> {
  try {
    const script = await soroFetch(soroBase());
    return dedupeArticlesBySlug(parseArticleList(script));
  } catch (error) {
    // A Soro outage must not fail the image build. Runtime requests still throw
    // so ISR keeps the last successful page instead of caching an empty list.
    if (!isProductionBuild()) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    logger.warn('soro', 'Soro article list skipped during build', { error: message });
    return [];
  }
}

export async function getSoroArticleBySlug(slug: string): Promise<SoroArticle | null> {
  const articles = await getSoroArticles();
  const meta = articles.find((article) => article.slug === slug);
  if (!meta) {
    return null;
  }

  try {
    const bodyText = await soroFetch(`${soroBase()}/article/${encodeURIComponent(meta.id)}`);
    let parsed: unknown;
    try {
      parsed = JSON.parse(bodyText);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Soro article ${meta.id} was not JSON: ${message}`);
    }

    if (!parsed || typeof parsed !== 'object' || typeof (parsed as { content?: unknown }).content !== 'string') {
      throw new Error(`Soro article ${meta.id} did not include an HTML content string`);
    }

    return {
      ...meta,
      html: stripArticleScripts((parsed as { content: string }).content),
    };
  } catch (error) {
    if (!isProductionBuild()) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    logger.warn('soro', 'Soro article skipped during build', { id: meta.id, error: message });
    return null;
  }
}
