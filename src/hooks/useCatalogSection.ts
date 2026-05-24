import { useEffect, useState } from 'react';

import type { CatalogSection, CatalogSectionKey } from '@/api/catalog/catalog.types';
import type { Language } from '@/i18n/types';
import { fetchSection } from '@/api/catalog/catalog.api';

export function useCatalogSection(language: Language, sectionKey: CatalogSectionKey) {
  const [section, setSection] = useState<CatalogSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadSection() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchSection(sectionKey, language, false);

        if (!ignore) {
          setSection(data);
        }
      } catch {
        if (!ignore) {
          setError('Failed to load catalog section');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadSection();

    return () => {
      ignore = true;
    };
  }, [language, sectionKey]);

  return {
    section,
    isLoading,
    error,
  };
}
