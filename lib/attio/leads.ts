import {
  DEAL_OWNER_EMAIL,
  DEAL_STAGE,
  type LanguageValue,
  type ServiceTypeValue,
} from '@/lib/contact-form-options';
import { attioRequest, type AttioRecordResponse } from '@/lib/attio/client';

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
    return trimmed
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .split('/')[0]
      ?.trim() || undefined;
  }
}

function buildPersonDescription(input: LeadSubmission): string {
  return [`Source: ${input.source}`, `Language: ${input.language}`, `Service: ${input.serviceType}`].join(
    '\n',
  );
}

async function upsertCompany(input: LeadSubmission): Promise<string | undefined> {
  const companyName = input.company?.trim();
  if (!companyName) {
    return undefined;
  }

  const domain = input.website ? extractDomain(input.website) : undefined;
  const values: Record<string, unknown> = {
    name: [{ value: companyName }],
  };

  if (domain) {
    values.domains = [{ domain }];
    const response = await attioRequest<AttioRecordResponse>(
      '/objects/companies/records?matching_attribute=domains',
      {
        method: 'PUT',
        body: { data: { values } },
      },
    );
    return response.data.id.record_id;
  }

  const response = await attioRequest<AttioRecordResponse>('/objects/companies/records', {
    method: 'POST',
    body: { data: { values } },
  });
  return response.data.id.record_id;
}

async function upsertPerson(
  input: LeadSubmission,
  companyRecordId?: string,
): Promise<string> {
  const name = splitName(input.name);
  const values: Record<string, unknown> = {
    email_addresses: [{ email_address: input.email.trim().toLowerCase() }],
    name: [name],
    phone_numbers: [{ original_phone_number: input.phone.trim() }],
    description: [{ value: buildPersonDescription(input) }],
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

  const response = await attioRequest<AttioRecordResponse>(
    '/objects/people/records?matching_attribute=email_addresses',
    {
      method: 'PUT',
      body: { data: { values } },
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
    name: [{ value: `${input.name.trim()} — ${input.serviceType}` }],
    stage: [{ status: DEAL_STAGE }],
    owner: [
      {
        referenced_actor_type: 'workspace-member',
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
  });

  return response.data.id.record_id;
}

export async function submitLeadToAttio(input: LeadSubmission): Promise<{
  companyRecordId?: string;
  personRecordId: string;
  dealRecordId: string;
}> {
  const companyRecordId = await upsertCompany(input);
  const personRecordId = await upsertPerson(input, companyRecordId);
  const dealRecordId = await createDeal(input, personRecordId, companyRecordId);

  return { companyRecordId, personRecordId, dealRecordId };
}
