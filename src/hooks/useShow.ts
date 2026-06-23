import { useEffect, useState } from 'react';
import type { Show } from '@/api/show/show.types';
import type { Language } from '@/i18n/types';
import { fetchShow } from '@/api/show/show.api';

export function useShow(language: Language, slug?: string) {
  const [show, setShow] = useState<Show | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadShow() {
      try {
        setIsInitialLoading(true);
        setError(null);

        const data = await fetchShow(language, slug);

        if (!ignore) {
          setShow(data);
        }
      } catch {
        if (!ignore) {
          setError(`Failed to load show with slug "${slug}"`);
        }
      } finally {
        if (!ignore) {
          setIsInitialLoading(false);
        }
      }
    }

    loadShow();

    return () => {
      ignore = true;
    };
  }, [language, slug]);

  return {
    show,
    isInitialLoading,
    error,
  };
}
