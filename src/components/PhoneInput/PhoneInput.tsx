import './PhoneInput.scss';

import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

import type { PhoneInputProps, PhoneInputValue } from './PhoneInput.types';
import CountryPrefixSelect from '@/components/CountryPrefixSelect';
import { PHONE_COUNTRIES, type PhoneCountry } from '@/constants/countries';

const DEFAULT_COUNTRY = PHONE_COUNTRIES[0];

function getDigits(value: string): string {
  return value.replace(/\D/g, '');
}

function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d\s()+-]/g, '');
}

function isInternationalPhoneValue(value: string): boolean {
  return value.trim().startsWith('+');
}

function getE164(callingCode: string, nationalNumber: string): string {
  const digits = getDigits(nationalNumber);

  return digits ? `+${callingCode}${digits}` : '';
}

function getCountryByCode(countryCode: string): PhoneCountry {
  return PHONE_COUNTRIES.find(country => country.countryCode === countryCode) ?? DEFAULT_COUNTRY;
}

function formatNationalNumber(country: PhoneCountry, value: string): string {
  const digits = getDigits(value);

  if (!digits) {
    return '';
  }

  return new AsYouType(country.countryCode).input(digits);
}

function getNextPhoneValue(country: PhoneCountry, rawValue: string): PhoneInputValue {
  const sanitizedValue = sanitizePhoneInput(rawValue);

  if (!sanitizedValue.trim()) {
    return {
      countryCode: country.countryCode,
      callingCode: country.callingCode,
      nationalNumber: '',
      e164: '',
      isValid: false,
    };
  }

  const isInternational = isInternationalPhoneValue(sanitizedValue);

  if (isInternational) {
    const parsedPhoneNumber = parsePhoneNumberFromString(sanitizedValue);

    if (parsedPhoneNumber?.country) {
      const parsedCountry = getCountryByCode(parsedPhoneNumber.country);

      return {
        countryCode: parsedCountry.countryCode,
        callingCode: parsedCountry.callingCode,
        nationalNumber: parsedPhoneNumber.formatNational(),
        e164: parsedPhoneNumber.number,
        isValid: parsedPhoneNumber.isValid(),
      };
    }

    return {
      countryCode: country.countryCode,
      callingCode: country.callingCode,
      nationalNumber: sanitizedValue,
      e164: '',
      isValid: false,
    };
  }

  const formattedNationalNumber = formatNationalNumber(country, sanitizedValue);
  const parsedPhoneNumber = parsePhoneNumberFromString(sanitizedValue, country.countryCode);

  return {
    countryCode: country.countryCode,
    callingCode: country.callingCode,
    nationalNumber: formattedNationalNumber,
    e164: parsedPhoneNumber?.number ?? getE164(country.callingCode, sanitizedValue),
    isValid: parsedPhoneNumber?.isValid() ?? false,
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
  isInvalid,
  onFocus,
}: PhoneInputProps) {
  const selectedCountry = getCountryByCode(value.countryCode);

  function handleCountryChange(country: PhoneCountry): void {
    onChange(getNextPhoneValue(country, value.nationalNumber));
  }

  function handleNationalNumberChange(event: ChangeEvent<HTMLInputElement>): void {
    onChange(getNextPhoneValue(selectedCountry, event.target.value));
  }

  return (
    <div className={clsx('phone-input', isInvalid && 'is-invalid')} onFocus={onFocus}>
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
        aria-invalid={isInvalid || undefined}
        data-country-code={selectedCountry.countryCode}
      />
    </div>
  );
}
