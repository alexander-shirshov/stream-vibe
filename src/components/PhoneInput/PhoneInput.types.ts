export type PhoneInputValue = {
  countryCode: string;
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
};
