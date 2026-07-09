export type PhoneCountry = {
  countryCode: string;
  name: string;
  callingCode: string;
  flag: string;
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  {
    countryCode: 'IN',
    name: 'India',
    callingCode: '91',
    flag: '🇮🇳',
  },
  {
    countryCode: 'AM',
    name: 'Armenia',
    callingCode: '374',
    flag: '🇦🇲',
  },
  {
    countryCode: 'NL',
    name: 'Netherlands',
    callingCode: '31',
    flag: '🇳🇱',
  },
  {
    countryCode: 'US',
    name: 'United States',
    callingCode: '1',
    flag: '🇺🇸',
  },
  {
    countryCode: 'GB',
    name: 'United Kingdom',
    callingCode: '44',
    flag: '🇬🇧',
  },
  {
    countryCode: 'GE',
    name: 'Georgia',
    callingCode: '995',
    flag: '🇬🇪',
  },
  {
    countryCode: 'RU',
    name: 'Russia',
    callingCode: '7',
    flag: '🇷🇺',
  },
];
