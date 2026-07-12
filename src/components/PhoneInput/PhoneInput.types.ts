import type { CountryCode } from 'libphonenumber-js';
import type { FocusEventHandler } from 'react';
import type { Locale } from '@/i18n/types';

export type PhoneInputValue = {
  countryCode: CountryCode;
  callingCode: string;
  nationalNumber: string;
  e164: string;
  isValid: boolean;
};

export type PhoneInputProps = {
  id: string;
  value: PhoneInputValue;
  onChange: (value: PhoneInputValue) => void;
  name?: string;
  placeholder?: string;
  countrySearchPlaceholder?: string;
  countryEmptyMessage?: string;
  required?: boolean;
  disabled?: boolean;
  isInvalid?: boolean;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  locale?: Locale;
};
