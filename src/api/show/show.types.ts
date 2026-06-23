import type { Language } from '@/i18n/types';
import type {
  PersonDto,
  Person,
  RatingItemDto,
  RatingItem,
  ReviewItemDto,
  ReviewItem,
} from '@/api/movie/movie.types';

export type EpisodeDto = {
  id: string;
  title: Partial<Record<Language, string>>;
  description: Partial<Record<Language, string>>;
  durationMinutes: number;
  preview?: string;
};

export type Episode = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  preview: string;
};

export type SeasonDto = {
  id: string;
  seasonNumber: number;
  title: Partial<Record<Language, string>>;
  episodes: EpisodeDto[];
};

export type Season = {
  id: string;
  seasonNumber: number;
  title: string;
  episodes: Episode[];
};

export type ShowDto = {
  id: string;
  slug: string;

  title: Partial<Record<Language, string>>;
  description: Partial<Record<Language, string>>;
  preview: string;

  releaseDate: string;

  languages: Partial<Record<Language, string>>[];
  genres: Partial<Record<Language, string>>[];

  seasons: SeasonDto[];

  cast: PersonDto[];
  director?: PersonDto;
  music?: PersonDto;

  ratings: RatingItemDto[];
  reviews: ReviewItemDto[];
};

export type Show = {
  id: string;
  slug: string;

  title: string;
  description: string;
  preview: string;

  releaseDate: string;

  languages: string[];
  genres: string[];

  seasons: Season[];

  cast: Person[];
  director: Person | null;
  music: Person | null;

  ratings: RatingItem[];
  reviews: ReviewItem[];
};
