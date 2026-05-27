import type { Language } from '@/i18n/types';
import type {
  CatalogSection,
  CatalogSectionKey,
  CatalogSectionWithKey,
} from '@/api/catalog/catalog.types';
import { mapCatalogSectionDto, warnCatalogDuplicates } from '@/api/catalog/catalog.mapper';
import { catalogSectionsMock } from '@/api/catalog/mocks';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function isCatalogSection(section: CatalogSection | null): section is CatalogSection {
  return section !== null;
}

function isCatalogSectionWithKey(
  section: CatalogSectionWithKey | null
): section is CatalogSectionWithKey {
  return section !== null;
}

export async function fetchSection(
  sectionKey: CatalogSectionKey,
  language: Language,
  warnDuplicates: boolean = true
): Promise<CatalogSection | null> {
  const section = catalogSectionsMock[sectionKey];

  await sleep(0); // эмуляция долгой загрузки

  if (!section) {
    console.warn(`Catalog section "${sectionKey}" not found`);
    return null;
  }

  if (warnDuplicates) {
    warnCatalogDuplicates(section.items, section.id);
  }

  return mapCatalogSectionDto(section, language);
}

export async function fetchSectionWithKey(
  sectionKey: CatalogSectionKey,
  language: Language,
  warnDuplicates: boolean = true
): Promise<CatalogSectionWithKey | null> {
  const section = await fetchSection(sectionKey, language, warnDuplicates);

  if (!section) return null;

  return {
    ...section,
    key: sectionKey,
  };
}

export async function fetchMultipleSections(
  sectionKeys: CatalogSectionKey[],
  language: Language,
  options: {
    warnRejects?: boolean;
    warnDuplicates?: boolean;
  } = {}
): Promise<CatalogSection[]> {
  const { warnRejects = true, warnDuplicates = true } = options;

  const results = await Promise.allSettled(
    sectionKeys.map(key => fetchSection(key, language, warnDuplicates))
  );

  if (warnRejects) {
    for (const result of results) {
      if (result.status === 'rejected') {
        console.warn(result.reason);
      }
    }
  }

  return results
    .filter(
      (result): result is PromiseFulfilledResult<CatalogSection | null> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value)
    .filter(isCatalogSection);
}

export async function fetchMultipleSectionsWithKeys(
  sectionKeys: CatalogSectionKey[],
  language: Language,
  options: {
    warnRejects?: boolean;
    warnDuplicates?: boolean;
  } = {}
): Promise<CatalogSectionWithKey[]> {
  const { warnRejects = true, warnDuplicates = true } = options;

  const results = await Promise.allSettled(
    sectionKeys.map(key => fetchSectionWithKey(key, language, warnDuplicates))
  );

  if (warnRejects) {
    for (const result of results) {
      if (result.status === 'rejected') {
        console.warn(result.reason);
      }
    }
  }

  return results
    .filter(
      (result): result is PromiseFulfilledResult<CatalogSectionWithKey | null> =>
        result.status === 'fulfilled'
    )
    .map(result => result.value)
    .filter(isCatalogSectionWithKey);
}
