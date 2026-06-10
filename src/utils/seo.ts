import type { CatalogEntityType } from '@/api/catalog/catalog.types';
import type { Messages } from '@/i18n/types';

export function getTitle(page: string, entityLabel?: string): string {
  return entityLabel ? `Stream Vibe | ${entityLabel} - ${page}` : `Stream Vibe | ${page}`;
}
