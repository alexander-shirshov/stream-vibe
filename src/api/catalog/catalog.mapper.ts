import type {
  CatalogItemDto,
  CatalogSection,
  CatalogSectionDto,
  CatalogItem,
} from '@/api/catalog/catalog.types';
import { getLocalizedText, type Language } from '@/i18n/types';

export function mapCatalogItemDto(dto: CatalogItemDto, language: Language): CatalogItem {
  return {
    id: dto.id,
    entityId: dto.entityId ?? dto.id,

    title: getLocalizedText(dto.title, language),
    description: dto.description ? getLocalizedText(dto.description, language) : null,
    images: dto.images ?? null,

    badge: dto.badge ? getLocalizedText(dto.badge, language) : null,

    href: dto.href ?? null,

    views: dto.views ?? null,
    rating: dto.rating ?? null,
    duration: dto.duration ?? null,
    releaseDate: dto.releaseDate ?? null,
  };
}

export function mapCatalogSectionDto(dto: CatalogSectionDto, language: Language): CatalogSection {
  return {
    id: dto.id,
    title: getLocalizedText(dto.title, language),
    description: dto.description ? getLocalizedText(dto.description, language) : null,
    category: dto.category,
    items: dto.items.map(item => mapCatalogItemDto(item, language)),
  };
}

export function warnCatalogDuplicates(items: CatalogItemDto[], sectionId: string): void {
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.id)) {
      console.warn(`Duplicate catalog item id detected in section "${sectionId}": ${item.id}`);
    }

    seen.add(item.id);
  }
}
