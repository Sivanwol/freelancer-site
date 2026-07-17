const ASSET_EXTENSION_RE =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mjs|mp4|png|svg|txt|webm|webp|woff2?|xml)$/i;

const BOT_UA_RE =
  /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|embedly|quora link preview|linkedinbot|twitterbot|whatsapp|telegram|discordbot|preview|headless|uptimerobot|pingdom|statuscake|better stack|curl|wget|python-requests|go-http-client/i;

export type TrafficSource =
  | 'google'
  | 'bing'
  | 'yahoo'
  | 'duckduckgo'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'whatsapp'
  | 'telegram'
  | 'direct'
  | 'referral'
  | 'unknown';

export type AccessLogEntry = {
  type: 'page_access';
  method: string;
  path: string;
  query: string;
  ip: string;
  forwardedFor: string | null;
  realIp: string | null;
  cfConnectingIp: string | null;
  referer: string | null;
  trafficSource: TrafficSource;
  userAgent: string | null;
  isBot: boolean;
  host: string | null;
};

function firstHeaderValue(value: string | null): string | null {
  if (!value) return null;
  const first = value.split(',')[0]?.trim();
  return first || null;
}

export function getClientIp(headers: Headers): {
  ip: string;
  forwardedFor: string | null;
  realIp: string | null;
  cfConnectingIp: string | null;
} {
  const forwardedFor = headers.get('x-forwarded-for');
  const realIp = firstHeaderValue(headers.get('x-real-ip'));
  const cfConnectingIp = firstHeaderValue(headers.get('cf-connecting-ip'));
  const forwardedIp = firstHeaderValue(forwardedFor);

  return {
    ip: cfConnectingIp || realIp || forwardedIp || 'unknown',
    forwardedFor,
    realIp,
    cfConnectingIp,
  };
}

export function classifyTrafficSource(referer: string | null): TrafficSource {
  if (!referer) return 'direct';

  let hostname = '';
  try {
    hostname = new URL(referer).hostname.toLowerCase();
  } catch {
    return 'unknown';
  }

  if (hostname.includes('google.')) return 'google';
  if (hostname.includes('bing.') || hostname.includes('msn.')) return 'bing';
  if (hostname.includes('yahoo.')) return 'yahoo';
  if (hostname.includes('duckduckgo.')) return 'duckduckgo';
  if (hostname.includes('facebook.') || hostname.includes('fb.') || hostname === 'm.facebook.com') {
    return 'facebook';
  }
  if (hostname.includes('instagram.')) return 'instagram';
  if (hostname.includes('linkedin.') || hostname.includes('lnkd.in')) return 'linkedin';
  if (hostname.includes('twitter.') || hostname.includes('t.co') || hostname.includes('x.com')) {
    return 'twitter';
  }
  if (hostname.includes('whatsapp.') || hostname === 'wa.me') return 'whatsapp';
  if (hostname.includes('t.me') || hostname.includes('telegram.')) return 'telegram';

  return 'referral';
}

export function shouldLogPageAccess(pathname: string): boolean {
  if (!pathname || pathname === '/favicon.ico') return false;
  if (pathname.startsWith('/api/')) return false;
  if (pathname.startsWith('/_next/')) return false;
  if (pathname.startsWith('/_vercel/')) return false;
  if (ASSET_EXTENSION_RE.test(pathname)) return false;
  return true;
}

export function buildAccessLogEntry(request: Request): AccessLogEntry | null {
  const url = new URL(request.url);
  if (!shouldLogPageAccess(url.pathname)) {
    return null;
  }

  const ips = getClientIp(request.headers);
  const referer = request.headers.get('referer') || request.headers.get('referrer');
  const userAgent = request.headers.get('user-agent');

  return {
    type: 'page_access',
    method: request.method,
    path: url.pathname,
    query: url.search,
    ip: ips.ip,
    forwardedFor: ips.forwardedFor,
    realIp: ips.realIp,
    cfConnectingIp: ips.cfConnectingIp,
    referer,
    trafficSource: classifyTrafficSource(referer),
    userAgent,
    isBot: userAgent ? BOT_UA_RE.test(userAgent) : false,
    host: request.headers.get('host'),
  };
}

export function logPageAccess(request: Request): void {
  const entry = buildAccessLogEntry(request);
  if (!entry) return;

  // Use console.log so Coolify/Dokploy and similar hosts capture the line
  // (some log pipelines drop console.info).
  console.log(
    `[access] ${entry.method} ${entry.path}${entry.query} ip=${entry.ip} source=${entry.trafficSource} bot=${entry.isBot} referer=${entry.referer ?? '-'} ua=${entry.userAgent ?? '-'}`,
  );
  console.log(`[access:json] ${JSON.stringify(entry)}`);
}
