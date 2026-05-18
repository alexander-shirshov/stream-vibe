import type { Currency } from '@/constants/currencies';
import { type Locale } from '@/i18n/types';

export function formatMoney(value: number, currency: Currency, locale: Locale): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export function convertPrice(amount: number, rate: number): number {
  return amount * rate;
}
