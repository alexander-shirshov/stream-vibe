import { useEffect, useState } from 'react';
import type { ExchangeRates } from '@/constants/currencies';
import { fetchExchangeRates } from '@/api/money/exchangeRates';

export function useExchangeRates() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rates, setRates] = useState<ExchangeRates | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadRates() {
      setError(null);

      try {
        const result = await fetchExchangeRates();
        if (!ignore) {
          setRates(result);
        }
      } catch {
        if (!ignore) {
          setError('Failed to load exchange rates');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    setIsLoading(true);
    loadRates();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    rates,
    error,
    isLoading,
  };
}
