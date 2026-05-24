import { API_URL, BASE_CURRENCY, QUOTE_CURRENCIES_PARAM, isCurrency } from '@/constants/currencies';
import type { Currency, ExchangeRates } from '@/constants/currencies';

type ApiRateItem = {
  quote: Currency;
  rate: number;
};

function isApiRateItem(value: unknown): value is ApiRateItem {
  return (
    value !== null &&
    typeof value === 'object' &&
    'rate' in value &&
    'quote' in value &&
    typeof value.rate === 'number' &&
    typeof value.quote === 'string' &&
    isCurrency(value.quote)
  );
}

export async function fetchExchangeRates() {
  if (!QUOTE_CURRENCIES_PARAM) {
    return {};
  }

  const res = await fetch(`${API_URL}?base=${BASE_CURRENCY}&quotes=${QUOTE_CURRENCIES_PARAM}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch rates data! HTTP status: ${res.status}`);
  }
  const data: unknown = await res.json();

  if (!Array.isArray(data)) {
    throw new Error(`API rates is not an array!`);
  }

  const rates: ExchangeRates = data.reduce((acc: ExchangeRates, item) => {
    if (isApiRateItem(item)) {
      acc[item.quote] = item.rate;
    }
    return acc;
  }, {});

  return rates;
}
