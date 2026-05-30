import type { Language } from '@/i18n/types';

export type CatalogCategory = 'genres' | 'top' | 'trending' | 'new' | 'must-watch' | 'poster';

export const catalogSectionKeys = {
  homeCategories: 'homeCategories',

  catalogMoviesGenres: 'catalogMoviesGenres',
  catalogMoviesTrending: 'catalogMoviesTrending',
  catalogMoviesNewReleases: 'catalogMoviesNewReleases',
  catalogMoviesPopular: 'catalogMoviesPopular',

  catalogShowsGenres: 'catalogShowsGenres',
  catalogShowsTrending: 'catalogShowsTrending',
  catalogShowsNewReleases: 'catalogShowsNewReleases',
  catalogShowsPopular: 'catalogShowsPopular',

  catalogBanner: 'catalogBanner',
} as const;

export type CatalogSectionKey = keyof typeof catalogSectionKeys;

export type CatalogSectionDto = {
  id: string;
  title: Partial<Record<Language, string>>;
  description?: Partial<Record<Language, string>>;
  category: CatalogCategory;
  items: CatalogItemDto[];
};

export type CatalogSection = {
  id: string;
  title: string;
  description?: string | null;
  category: CatalogCategory;
  items: CatalogItem[];
};

export type CatalogSectionWithKey = CatalogSection & {
  key: CatalogSectionKey;
};

export type CatalogItemDto = {
  id: string;
  entityId?: string;
  title: Partial<Record<Language, string>>;
  description?: Partial<Record<Language, string>>;
  images?: string[];

  badge?: Partial<Record<Language, string>>;

  href?: string;

  views?: number;
  rating?: number;
  duration?: string;
  releaseDate?: string;
};

export type CatalogItem = {
  id: string;
  entityId: string;

  title: string;
  description?: string | null;
  images?: string[] | null;

  badge?: string | null;

  href?: string | null;

  views?: number | null;
  rating?: number | null;
  duration?: string | null;
  releaseDate?: string | null;
};
