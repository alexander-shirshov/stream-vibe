import { getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import type { Locale } from '@/i18n/types';

export type PhoneCountry = {
  countryCode: CountryCode;
  name: string;
  callingCode: string;
};

const DEFAULT_LOCALE: Locale = 'en-US';

function getCountryName(countryCode: CountryCode, locale: Locale): string {
  const displayNames = new Intl.DisplayNames([locale], {
    type: 'region',
  });

  return displayNames.of(countryCode) ?? countryCode;
}

export function getPhoneCountries(locale: Locale = DEFAULT_LOCALE): PhoneCountry[] {
  return getCountries()
    .map(countryCode => ({
      countryCode,
      name: getCountryName(countryCode, locale),
      callingCode: getCountryCallingCode(countryCode),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, locale));
}
