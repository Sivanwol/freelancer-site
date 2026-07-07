import { generateLlmsTxt } from '@/lib/llms-txt';

export function GET() {
  const body = generateLlmsTxt();

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
