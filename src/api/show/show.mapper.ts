import type { ShowDto, Show, EpisodeDto, Episode, SeasonDto, Season } from './show.types';
import { getLocalizedText, type Language } from '@/i18n/types';
import { mapPersonDto, mapRatingItem, mapReviewItem } from '@/api/movie/movie.mapper';

const FALLBACK_EPISODE_PREVIEW = '/images/shows/default-episode-preview.jpg';

function mapEpisodeDto(dto: EpisodeDto, language: Language): Episode {
  return {
    id: dto.id,
    title: getLocalizedText(dto.title, language),
    description: getLocalizedText(dto.description, language),
    durationMinutes: dto.durationMinutes,
    preview: dto.preview ?? FALLBACK_EPISODE_PREVIEW,
  };
}

function mapSeasonDto(dto: SeasonDto, language: Language): Season {
  return {
    id: dto.id,
    seasonNumber: dto.seasonNumber,
    title: getLocalizedText(dto.title, language),
    episodes: dto.episodes.map(episode => mapEpisodeDto(episode, language)),
  };
}

export function mapShow(dto: ShowDto, language: Language): Show {
  return {
    id: dto.id,
    slug: dto.slug,

    title: getLocalizedText(dto.title, language),
    description: getLocalizedText(dto.description, language),
    preview: dto.preview,

    releaseDate: dto.releaseDate,

    languages: dto.languages.map(lang => getLocalizedText(lang, language)),
    genres: dto.genres.map(genre => getLocalizedText(genre, language)),

    seasons: dto.seasons.map(season => mapSeasonDto(season, language)),

    cast: dto.cast.map(actor => mapPersonDto(actor, language)),
    director: dto.director ? mapPersonDto(dto.director, language) : null,
    music: dto.music ? mapPersonDto(dto.music, language) : null,

    ratings: dto.ratings.map(mapRatingItem),
    reviews: dto.reviews.map(review => mapReviewItem(review, language)),
  };
}
