import { useEffect, useState } from 'react';

import type {
  CatalogSection,
  CatalogSectionKey,
  CatalogSectionWithKey,
} from '@/api/catalog/catalog.types';

import type { Language } from '@/i18n/types';

import { fetchSection, fetchSectionWithKey } from '@/api/catalog/catalog.api';

export type UseCatalogSectionBase = {
  isLoading: boolean;
  error: string | null;
};

export function useCatalogSection(
  language: Language,
  sectionKey: CatalogSectionKey,
  options?: { withKey?: false }
): UseCatalogSectionBase & {
  section: CatalogSection | null;
};

export function useCatalogSection(
  language: Language,
  sectionKey: CatalogSectionKey,
  options: { withKey: true }
): UseCatalogSectionBase & {
  section: CatalogSectionWithKey | null;
};

export function useCatalogSection(
  language: Language,
  sectionKey: CatalogSectionKey,
  options: { withKey?: boolean } = {}
) {
  const [section, setSection] = useState<CatalogSection | CatalogSectionWithKey | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadSection() {
      try {
        setIsLoading(true);
        setError(null);

        const data = options.withKey
          ? await fetchSectionWithKey(sectionKey, language)
          : await fetchSection(sectionKey, language, false);

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
  }, [language, sectionKey, options.withKey]);

  return {
    section,
    isLoading,
    error,
  };
}
