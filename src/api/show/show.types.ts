import type { Language } from '@/i18n/types';
import type { MediaDetailsBaseDto, MediaDetailsBase } from '@/api/media/media.types';

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

export type ShowDto = MediaDetailsBaseDto & {
  seasons: SeasonDto[];
};

export type Show = MediaDetailsBase & {
  seasons: Season[];
};
