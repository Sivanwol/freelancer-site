export type NormalizedPhone = {
  original_phone_number: string;
  country_code: string;
};

/**
 * Normalize contact phones for Attio.
 * Local Israeli numbers like 054-556-6786 become +972545566786 with country_code IL.
 */
export function normalizePhoneForAttio(
  rawPhone: string,
  preferredCountry: 'IL' | 'US' | 'GB' = 'IL',
): NormalizedPhone {
  const trimmed = rawPhone.trim();
  const digits = trimmed.replace(/[^\d+]/g, '');

  // Already E.164-ish
  if (digits.startsWith('+')) {
    const withPlus = `+${digits.slice(1).replace(/\D/g, '')}`;
    return {
      original_phone_number: withPlus,
      country_code: inferCountryCode(withPlus, preferredCountry),
    };
  }

  const onlyDigits = digits.replace(/\D/g, '');

  // 9725xxxxxxxx or 972xxxxxxxxx
  if (onlyDigits.startsWith('972') && onlyDigits.length >= 11) {
    return {
      original_phone_number: `+${onlyDigits}`,
      country_code: 'IL',
    };
  }

  // Israeli local mobile/landline: 05x..., 07x..., 02..., 03..., 04..., 08..., 09...
  if (/^0[2-9]\d{7,8}$/.test(onlyDigits)) {
    return {
      original_phone_number: `+972${onlyDigits.slice(1)}`,
      country_code: 'IL',
    };
  }

  // US/CA 10-digit fallback when preferred
  if (preferredCountry === 'US' && onlyDigits.length === 10) {
    return {
      original_phone_number: `+1${onlyDigits}`,
      country_code: 'US',
    };
  }

  // Last resort: prefix preferred country calling code for bare national numbers
  if (preferredCountry === 'IL' && onlyDigits.length >= 8 && onlyDigits.length <= 10) {
    const national = onlyDigits.startsWith('0') ? onlyDigits.slice(1) : onlyDigits;
    return {
      original_phone_number: `+972${national}`,
      country_code: 'IL',
    };
  }

  return {
    original_phone_number: onlyDigits.startsWith('+') ? onlyDigits : `+${onlyDigits}`,
    country_code: preferredCountry,
  };
}

function inferCountryCode(e164: string, fallback: 'IL' | 'US' | 'GB'): string {
  if (e164.startsWith('+972')) return 'IL';
  if (e164.startsWith('+1')) return 'US';
  if (e164.startsWith('+44')) return 'GB';
  return fallback;
}
