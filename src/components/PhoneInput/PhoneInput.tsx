import './PhoneInput.scss';

import type { ChangeEvent } from 'react';
import type { PhoneInputProps, PhoneInputValue } from './PhoneInput.types';
import CountryPrefixSelect from '@/components/CountryPrefixSelect';
import { PHONE_COUNTRIES, type PhoneCountry } from '@/constants/countries';

const DEFAULT_COUNTRY = PHONE_COUNTRIES[0];

function getE164(callingCode: string, nationalNumber: string): string {
  const digits = nationalNumber.replace(/\D/g, '');

  return digits ? `+${callingCode}${digits}` : '';
}

function getCountryByCode(countryCode: string): PhoneCountry {
  return PHONE_COUNTRIES.find(country => country.countryCode === countryCode) ?? DEFAULT_COUNTRY;
}

function getNextPhoneValue(country: PhoneCountry, nationalNumber: string): PhoneInputValue {
  return {
    countryCode: country.countryCode,
    callingCode: country.callingCode,
    nationalNumber,
    e164: getE164(country.callingCode, nationalNumber),
    isValid: false,
  };
}

export default function PhoneInput({
  id,
  value,
  onChange,
  name,
  placeholder = '999 999 99-99',
  countrySearchPlaceholder,
  countryEmptyMessage,
  required,
  disabled,
}: PhoneInputProps) {
  const selectedCountry = getCountryByCode(value.countryCode);

  function handleCountryChange(country: PhoneCountry): void {
    onChange(getNextPhoneValue(country, value.nationalNumber));
  }

  function handleNationalNumberChange(event: ChangeEvent<HTMLInputElement>): void {
    const nationalNumber = event.target.value.replace(/[^\d\s()-]/g, '');

    onChange(getNextPhoneValue(selectedCountry, nationalNumber));
  }

  return (
    <div className="phone-input">
      {name && <input type="hidden" name={name} value={value.e164} />}

      <CountryPrefixSelect
        value={selectedCountry}
        options={PHONE_COUNTRIES}
        onChange={handleCountryChange}
        searchPlaceholder={countrySearchPlaceholder}
        emptyMessage={countryEmptyMessage}
        disabled={disabled}
      />

      <input
        id={id}
        className="phone-input__control"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={value.nationalNumber}
        onChange={handleNationalNumberChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        data-country-code={selectedCountry.countryCode}
      />
    </div>
  );
}
