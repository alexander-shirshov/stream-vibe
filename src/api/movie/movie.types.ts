import type { Language } from '@/i18n/types';

export type PersonDto = {
  id: string;
  firstName: string;
  lastName: string;
  country?: Partial<Record<Language, string>>;
  avatar?: string;
};

export type Person = {
  id: string;
  fullName: string;
  fullNameShort: string | null;
  country: string | null;
  avatar: string;
};

export type RatingItemDto = {
  platform: string;
  rating: number;
  ratingCount?: number;
};

export type RatingItem = {
  platform: string;
  rating: number | null;
  ratingCount: number | null;
};

export type ReviewItemDto = {
  id: string;
  authorName: string;
  country?: Partial<Record<Language, string>>;
  rating: number;
  text: Partial<Record<Language, string>>;
};

export type ReviewItem = {
  id: string;
  authorName: string;
  country: string | null;
  rating: number | null;
  text: string;
};

export type MovieDto = {
  id: string;
  slug: string;

  title: Partial<Record<Language, string>>;
  description: Partial<Record<Language, string>>;
  preview: string;

  releaseDate: string; // ISO: '2023-04-14'

  languages: Partial<Record<Language, string>>[];
  genres: Partial<Record<Language, string>>[];

  cast: PersonDto[];
  director?: PersonDto;
  music?: PersonDto;

  ratings: RatingItemDto[];
  reviews: ReviewItemDto[];
};

export type Movie = {
  id: string;
  slug: string;

  title: string;
  description: string;
  preview: string;

  releaseDate: string;

  languages: string[];
  genres: string[];

  cast: Person[];
  director: Person | null;
  music: Person | null;

  ratings: RatingItem[];
  reviews: ReviewItem[];
};
