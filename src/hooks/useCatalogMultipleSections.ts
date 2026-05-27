import { useEffect, useState } from 'react';

import type {
  CatalogSection,
  CatalogSectionKey,
  CatalogSectionWithKey,
} from '@/api/catalog/catalog.types';
import type { Language } from '@/i18n/types';
import type { UseCatalogSectionBase } from '@/hooks/useCatalogSection';
import { fetchMultipleSections, fetchMultipleSectionsWithKeys } from '@/api/catalog/catalog.api';

export function useCatalogMultipleSections(
  language: Language,
  sectionKeys: CatalogSectionKey[],
  options?: { withKeys?: false }
): UseCatalogSectionBase & {
  sections: CatalogSection[];
};

export function useCatalogMultipleSections(
  language: Language,
  sectionKeys: CatalogSectionKey[],
  options: { withKeys: true }
): UseCatalogSectionBase & {
  sections: CatalogSectionWithKey[];
};

export function useCatalogMultipleSections(
  language: Language,
  sectionKeys: CatalogSectionKey[],
  options: { withKeys?: boolean } = {}
) {
  const [sections, setSections] = useState<(CatalogSection | CatalogSectionWithKey)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const keys = sectionKeys.join('|');

  useEffect(() => {
    let ignore = false;

    async function loadSections() {
      try {
        setIsLoading(true);
        setError(null);
        const data = options.withKeys
          ? await fetchMultipleSectionsWithKeys(sectionKeys, language, {
              warnDuplicates: false,
              warnRejects: true,
            })
          : await fetchMultipleSections(sectionKeys, language, {
              warnDuplicates: false,
              warnRejects: true,
            });

        if (!ignore) {
          setSections(data);
        }
      } catch {
        if (!ignore) {
          setError('Failed to load catalog sections');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadSections();

    return () => {
      ignore = true;
    };
  }, [language, keys, options.withKeys]);

  return {
    sections,
    isLoading,
    error,
  };
}
