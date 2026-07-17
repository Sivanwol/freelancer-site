import { NextResponse } from 'next/server';
import { AttioApiError } from '@/lib/attio/client';
import { submitLeadToAttio } from '@/lib/attio/leads';
import { getClientIp } from '@/lib/access-log';
import { isLanguageValue, isServiceTypeValue } from '@/lib/contact-form-options';
import { isContactSubmissionDebounced } from '@/lib/contact-rate-limit';
import { logger } from '@/lib/logger';

type ContactBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  website?: unknown;
  company?: unknown;
  serviceType?: unknown;
  language?: unknown;
  source?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function requestMeta(request: Request) {
  const ips = getClientIp(request.headers);
  return {
    ip: ips.ip,
    forwardedFor: ips.forwardedFor,
    realIp: ips.realIp,
    cfConnectingIp: ips.cfConnectingIp,
    userAgent: request.headers.get('user-agent'),
    referer: request.headers.get('referer') || request.headers.get('referrer'),
    origin: request.headers.get('origin'),
  };
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const meta = requestMeta(request);
  let body: ContactBody;

  logger.info('contact', 'submission_received', meta);

  try {
    body = (await request.json()) as ContactBody;
  } catch (error) {
    logger.warn('contact', 'invalid_json', {
      ...meta,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = asTrimmedString(body.name);
  const phone = asTrimmedString(body.phone);
  const email = asTrimmedString(body.email).toLowerCase();
  const website = asTrimmedString(body.website);
  const company = asTrimmedString(body.company);
  const serviceType = asTrimmedString(body.serviceType);
  const language = asTrimmedString(body.language);
  const source = asTrimmedString(body.source) || 'contact';

  logger.info('contact', 'submission_parsed', {
    ...meta,
    email,
    phone,
    serviceType,
    language,
    source,
    hasName: Boolean(name),
    hasWebsite: Boolean(website),
    hasCompany: Boolean(company),
  });

  if (!name || !phone || !email || !serviceType || !language) {
    logger.warn('contact', 'missing_required_fields', {
      ...meta,
      email,
      hasName: Boolean(name),
      hasPhone: Boolean(phone),
      hasEmail: Boolean(email),
      hasServiceType: Boolean(serviceType),
      hasLanguage: Boolean(language),
    });
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    logger.warn('contact', 'invalid_email', { ...meta, email });
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (!isServiceTypeValue(serviceType) || !isLanguageValue(language)) {
    logger.warn('contact', 'invalid_select_values', {
      ...meta,
      email,
      serviceType,
      language,
    });
    return NextResponse.json({ error: 'Invalid select field values' }, { status: 400 });
  }

  if (isContactSubmissionDebounced(email)) {
    logger.warn('contact', 'rate_limited', { ...meta, email });
    return NextResponse.json(
      { error: 'Please wait a moment before submitting again' },
      { status: 429 },
    );
  }

  try {
    const result = await submitLeadToAttio({
      name,
      phone,
      email,
      website: website || undefined,
      company: company || undefined,
      serviceType,
      language,
      source,
    });

    logger.info('contact', 'submission_ok', {
      ...meta,
      email,
      durationMs: Date.now() - startedAt,
      ...result,
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof Error && error.message === 'ATTIO_API_KEY is not configured') {
      logger.error('contact', 'attio_not_configured', {
        ...meta,
        email,
        durationMs: Date.now() - startedAt,
      });
      return NextResponse.json(
        {
          error: 'Contact service is not configured',
          reason: 'ATTIO_API_KEY is missing on the server',
        },
        { status: 503 },
      );
    }

    if (error instanceof AttioApiError) {
      const isAuthError = error.status === 401 || error.status === 403;
      const status = isAuthError ? 503 : 502;

      logger.error('contact', 'attio_api_error', {
        ...meta,
        email,
        durationMs: Date.now() - startedAt,
        httpStatusReturned: status,
        attio: error.toJSON(),
      });

      return NextResponse.json(
        {
          error: isAuthError
            ? 'Attio API key is missing required scopes or permissions'
            : error.message || 'Failed to create CRM records',
          attioStatus: error.status,
          attioCode: error.code,
          attioType: error.type,
          attioMessage: error.message,
          attioPath: error.path,
          attioMethod: error.method,
          attioBody: error.body,
          hint: isAuthError
            ? 'In Attio: Workspace settings → Developers → your integration → Scopes. Grant Object Configuration (read) plus record read/write for People, Companies, and Deals. Also enable Deals if deactivated.'
            : 'Inspect attioBody for the exact Attio validation or permission failure.',
        },
        { status },
      );
    }

    logger.error('contact', 'unexpected_failure', {
      ...meta,
      email,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : String(error),
    });

    return NextResponse.json(
      {
        error: 'Unexpected contact submission failure',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
