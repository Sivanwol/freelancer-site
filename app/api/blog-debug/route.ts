import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const PAYLOAD_URL = (process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001').replace(/\/$/, '');
const FETCH_TIMEOUT_MS = 5000;

type Probe = {
  locale: string;
  url: string;
  status: number | null;
  ok: boolean;
  totalDocs: number | null;
  firstDoc: { id: unknown; slug: unknown; _status: unknown; hasContent: boolean } | null;
  error: string | null;
};

async function probe(locale: string): Promise<Probe> {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    sort: '-publishedAt',
    depth: '1',
    locale,
    limit: '1',
  });
  const url = `${PAYLOAD_URL}/api/posts?${params.toString()}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    let totalDocs: number | null = null;
    let firstDoc: Probe['firstDoc'] = null;

    if (res.ok) {
      const json = await res.json();
      totalDocs = json?.totalDocs ?? null;
      const doc = json?.docs?.[0];
      if (doc) {
        firstDoc = {
          id: doc.id ?? null,
          slug: doc.slug ?? null,
          _status: doc._status ?? null,
          hasContent: Boolean(doc.content),
        };
      }
    }

    return { locale, url, status: res.status, ok: res.ok, totalDocs, firstDoc, error: null };
  } catch (err) {
    return {
      locale,
      url,
      status: null,
      ok: false,
      totalDocs: null,
      firstDoc: null,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    };
  }
}

export async function GET() {
  const [en, he] = await Promise.all([probe('en'), probe('he')]);

  return NextResponse.json(
    {
      base: PAYLOAD_URL,
      envSet: Boolean(process.env.NEXT_PUBLIC_PAYLOAD_URL),
      checkedAt: new Date().toISOString(),
      probes: { en, he },
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
