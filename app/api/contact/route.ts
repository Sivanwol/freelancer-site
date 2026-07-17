import { NextResponse } from 'next/server';
import { AttioApiError } from '@/lib/attio/client';
import { submitLeadToAttio } from '@/lib/attio/leads';
import { isLanguageValue, isServiceTypeValue } from '@/lib/contact-form-options';
import { isContactSubmissionDebounced } from '@/lib/contact-rate-limit';

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

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
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

  if (!name || !phone || !email || !serviceType || !language) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  if (!isServiceTypeValue(serviceType) || !isLanguageValue(language)) {
    return NextResponse.json({ error: 'Invalid select field values' }, { status: 400 });
  }

  if (isContactSubmissionDebounced(email)) {
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

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof Error && error.message === 'ATTIO_API_KEY is not configured') {
      return NextResponse.json({ error: 'Contact service is not configured' }, { status: 503 });
    }

    if (error instanceof AttioApiError) {
      return NextResponse.json(
        { error: 'Failed to create CRM records', details: error.body },
        { status: 502 },
      );
    }

    return NextResponse.json({ error: 'Unexpected contact submission failure' }, { status: 500 });
  }
}
