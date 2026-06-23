import type { Language } from '@/i18n/types';
import type { Show } from './show.types';
import { showsMock } from './mocks/shows.mock';
import { mapShow } from './show.mapper';

export async function fetchShow(language: Language, slug?: string): Promise<Show | null> {
  if (!slug) return null;

  const show = showsMock.find(show => show.slug === slug);

  if (!show) {
    console.warn(`Show with slug "${slug}" not found`);
    return null;
  }

  return mapShow(show, language);
}
