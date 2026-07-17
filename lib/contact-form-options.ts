export const SERVICE_TYPE_VALUES = [
  'Business automation',
  'Custom-developed SaaS',
] as const;

export const LANGUAGE_VALUES = ['English', 'Hebrew'] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPE_VALUES)[number];
export type LanguageValue = (typeof LANGUAGE_VALUES)[number];

export const DEAL_OWNER_EMAIL = 'info@devco-solution.online';
export const DEAL_STAGE = 'Lead';

export function isServiceTypeValue(value: string): value is ServiceTypeValue {
  return (SERVICE_TYPE_VALUES as readonly string[]).includes(value);
}

export function isLanguageValue(value: string): value is LanguageValue {
  return (LANGUAGE_VALUES as readonly string[]).includes(value);
}
