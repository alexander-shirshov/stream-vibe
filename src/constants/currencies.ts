import { LANGUAGES } from '@/i18n/types';

export const CURRENCIES = ['USD', 'EUR', 'RUB'] as const;
export type Currency = (typeof CURRENCIES)[number];
export type ExchangeRates = Partial<Record<Currency, number>>;

export const API_URL = 'https://api.frankfurter.dev/v2/rates';
export const BASE_CURRENCY = 'USD';
export const QUOTE_CURRENCIES_PARAM = [
  ...new Set(
    LANGUAGES.filter(lang => lang.approxCurrency !== null).map(lang => lang.approxCurrency)
  ),
].join(',');

export function isCurrency(value: string): value is Currency {
  return CURRENCIES.includes(value as Currency);
}
