import {
  DEAL_OWNER_EMAIL,
  DEAL_STAGE,
  languageLabel,
  type LanguageValue,
  type ServiceTypeValue,
} from '@/lib/contact-form-options';
import { attioRequest, type AttioRecordResponse } from '@/lib/attio/client';
import { logger } from '@/lib/logger';
import { normalizePhoneForAttio } from '@/lib/phone';

export type LeadSubmission = {
  name: string;
  phone: string;
  email: string;
  website?: string;
  company?: string;
  serviceType: ServiceTypeValue;
  language: LanguageValue;
  source: string;
};

function splitName(fullName: string): {
  first_name: string;
  last_name: string;
  full_name: string;
} {
  const trimmed = fullName.trim().replace(/\s+/g, ' ');
  const parts = trimmed.split(' ');
  const first_name = parts[0] ?? trimmed;
  const last_name = parts.slice(1).join(' ') || first_name;
  return { first_name, last_name, full_name: trimmed };
}

function extractDomain(website: string): string | undefined {
  const trimmed = website.trim();
  if (!trimmed) return undefined;

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const hostname = new URL(withProtocol).hostname.replace(/^www\./i, '');
    return hostname || undefined;
  } catch {
    return (
      trimmed
        .replace(/^https?:\/\//i, '')
        .replace(/^www\./i, '')
        .split('/')[0]
        ?.trim() || undefined
    );
  }
}

/** Short CRM title for the lead / contact. */
export function buildLeadTitle(input: LeadSubmission): string {
  const company = input.company?.trim();
  const who = company ? `${input.name.trim()} @ ${company}` : input.name.trim();
  return `Website lead — ${who} — ${input.serviceType}`;
}

/** Summary written onto the person record (updated on each submission). */
export function buildLeadSummary(input: LeadSubmission): string {
  const phone = normalizePhoneForAttio(input.phone, 'IL').original_phone_number;
  const lines = [
    buildLeadTitle(input),
    '',
    `Contact: ${input.name.trim()}`,
    `Email: ${input.email.trim().toLowerCase()}`,
    `Phone: ${phone}`,
    input.company?.trim() ? `Company: ${input.company.trim()}` : null,
    input.website?.trim() ? `Website: ${input.website.trim()}` : null,
    `Service: ${input.serviceType}`,
    `Language: ${input.language} (${languageLabel(input.language)})`,
    `Source: ${input.source}`,
    `Submitted: ${new Date().toISOString()}`,
  ];

  return lines.filter((line): line is string => line !== null).join('\n');
}

async function upsertCompany(input: LeadSubmission): Promise<string | undefined> {
  const companyName = input.company?.trim();
  if (!companyName) {
    logger.info('attio.leads', 'company_skipped', { reason: 'no_company_name' });
    return undefined;
  }

  const domain = input.website ? extractDomain(input.website) : undefined;
  const values: Record<string, unknown> = {
    name: [{ value: companyName }],
  };

  // Prefer update-by-domain when we have one; otherwise create once by name.
  if (domain) {
    values.domains = [{ domain }];
    const response = await attioRequest<AttioRecordResponse>(
      '/objects/companies/records?matching_attribute=domains',
      {
        method: 'PUT',
        body: { data: { values } },
        step: 'upsert_company_by_domain',
      },
    );
    return response.data.id.record_id;
  }

  const response = await attioRequest<AttioRecordResponse>('/objects/companies/records', {
    method: 'POST',
    body: { data: { values } },
    step: 'create_company',
  });
  return response.data.id.record_id;
}

async function upsertPerson(
  input: LeadSubmission,
  companyRecordId?: string,
): Promise<string> {
  const name = splitName(input.name);
  const phone = normalizePhoneForAttio(input.phone, 'IL');
  const summary = buildLeadSummary(input);

  logger.info('attio.leads', 'phone_normalized', {
    raw: input.phone,
    normalized: phone.original_phone_number,
    countryCode: phone.country_code,
  });

  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: input.email.trim().toLowerCase() }],
    name: [name],
    phone_numbers: [
      {
        original_phone_number: phone.original_phone_number,
        country_code: phone.country_code,
      },
    ],
    description: [{ value: summary }],
    service_type: [{ option: input.serviceType }],
    language: [{ option: input.language }],
  };

  if (companyRecordId) {
    values.company = [
      {
        target_object: 'companies',
        target_record_id: companyRecordId,
      },
    ];
  }

  // PUT + matching email = update existing person when present, create only if new.
  const response = await attioRequest<AttioRecordResponse>(
    '/objects/people/records?matching_attribute=email_addresses',
    {
      method: 'PUT',
      body: { data: { values } },
      step: 'upsert_person_by_email',
    },
  );

  return response.data.id.record_id;
}

async function createDeal(
  input: LeadSubmission,
  personRecordId: string,
  companyRecordId?: string,
): Promise<string> {
  const values: Record<string, unknown> = {
    name: [{ value: buildLeadTitle(input) }],
    stage: [{ status: DEAL_STAGE }],
    owner: [
      {
        workspace_member_email_address: DEAL_OWNER_EMAIL,
      },
    ],
    associated_people: [
      {
        target_object: 'people',
        target_record_id: personRecordId,
      },
    ],
  };

  if (companyRecordId) {
    values.associated_company = [
      {
        target_object: 'companies',
        target_record_id: companyRecordId,
      },
    ];
  }

  const response = await attioRequest<AttioRecordResponse>('/objects/deals/records', {
    method: 'POST',
    body: { data: { values } },
    step: 'create_deal',
  });

  return response.data.id.record_id;
}

export async function submitLeadToAttio(input: LeadSubmission): Promise<{
  companyRecordId?: string;
  personRecordId: string;
  dealRecordId: string;
}> {
  logger.info('attio.leads', 'submit_start', {
    email: input.email,
    serviceType: input.serviceType,
    language: input.language,
    source: input.source,
    leadTitle: buildLeadTitle(input),
    hasCompany: Boolean(input.company?.trim()),
    hasWebsite: Boolean(input.website?.trim()),
  });

  const companyRecordId = await upsertCompany(input);
  const personRecordId = await upsertPerson(input, companyRecordId);
  const dealRecordId = await createDeal(input, personRecordId, companyRecordId);

  logger.info('attio.leads', 'submit_ok', {
    email: input.email,
    companyRecordId,
    personRecordId,
    dealRecordId,
  });

  return { companyRecordId, personRecordId, dealRecordId };
}
