import { sleep } from '@/api/utils/sleep';
import { type Language } from '@/i18n/types';
import type { Movie } from '@/api/movie/movie.types';
import { mapMovie } from '@/api/movie/movie.mapper';
import { moviesMock } from '@/api/movie/mocks/movies.mock';

export async function fetchMovieBySlug(slug: string, language: Language): Promise<Movie | null> {
  await sleep(0);

  const dto = moviesMock.find(movie => movie.slug === slug);

  if (!dto) {
    console.warn(`Movie with slug "${slug}" not found`);
    return null;
  }

  return mapMovie(dto, language);
}
