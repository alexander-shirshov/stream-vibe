import type { Language } from '@/i18n/types';
import type { CatalogSection, CatalogSectionKey } from '@/api/catalog/catalog.types';
import { mapCatalogSectionDto, warnCatalogDuplicates } from '@/api/catalog/catalog.mapper';
import { catalogSectionsMock } from '@/api/catalog/catalog.mock';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
