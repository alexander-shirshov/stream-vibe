import { useEffect, useState } from 'react';

import type { Movie } from '@/api/movie/movie.types';

import type { Language } from '@/i18n/types';

import { fetchMovieBySlug } from '@/api/movie/movie.api';

export function useMovie(language: Language, slug?: string) {
  const [movie, setMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(Boolean(slug));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setMovie(null);
      setIsLoading(false);
      setError('Movie slug is missing');
      return;
    }

    const movieSlug = slug;

    let ignore = false;

    async function loadMovie() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchMovieBySlug(movieSlug, language);

        if (!ignore) {
          setMovie(data);
        }
      } catch {
        if (!ignore) {
          setError('Failed to load movie');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadMovie();

    return () => {
      ignore = true;
    };
  }, [language, slug]);

  const hasData = movie !== null;

  return {
    movie,
    isLoading,
    isInitialLoading: isLoading && !hasData,
    error,
  };
}
