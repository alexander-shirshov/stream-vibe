import type {
  MovieDto,
  Person,
  PersonDto,
  RatingItem,
  RatingItemDto,
  ReviewItem,
  ReviewItemDto,
  Movie,
} from './movie.types';
import { getLocalizedText, type Language } from '@/i18n/types';
import { MAX_PERSON_NAME_PART_LENGTH } from '@/constants/names';
import { normalizeRating, normalizeRatingCount } from '@/api/utils/rating';

const FALLBACK_AVATAR = '/images/persons/default-avatar.jpg';

export function mapPersonDto(dto: PersonDto, language: Language): Person {
  const maxNameLength = MAX_PERSON_NAME_PART_LENGTH;

  const firstName = dto.firstName.length <= maxNameLength ? dto.firstName : dto.firstName[0] + '.';
  const lastName = dto.lastName.length <= maxNameLength ? dto.lastName : dto.lastName[0] + '.';
  return {
    id: dto.id,
    fullName: `${dto.firstName} ${dto.lastName}`,
    fullNameShort: `${firstName} ${lastName}`,
    country: dto.country ? getLocalizedText(dto.country, language) : null,
    avatar: dto.avatar ?? FALLBACK_AVATAR,
  };
}

export function mapRatingItem(dto: RatingItemDto): RatingItem {
  return {
    platform: dto.platform,
    rating: normalizeRating(dto.rating),
    ratingCount: normalizeRatingCount(dto.ratingCount),
  };
}

export function mapReviewItem(dto: ReviewItemDto, language: Language): ReviewItem {
  return {
    id: dto.id,
    authorName: dto.authorName,
    country: dto.country ? getLocalizedText(dto.country, language) : null,
    rating: normalizeRating(dto.rating),
    text: getLocalizedText(dto.text, language),
  };
}

export function mapMovie(dto: MovieDto, language: Language): Movie {
  return {
    id: dto.id,
    slug: dto.slug,

    title: getLocalizedText(dto.title, language),
    description: getLocalizedText(dto.description, language),
    preview: dto.preview,

    releaseDate: dto.releaseDate,

    languages: dto.languages.map(lang => getLocalizedText(lang, language)),
    genres: dto.genres.map(genre => getLocalizedText(genre, language)),

    cast: dto.cast.map(actor => mapPersonDto(actor, language)),
    director: dto.director ? mapPersonDto(dto.director, language) : null,
    music: dto.music ? mapPersonDto(dto.music, language) : null,

    ratings: dto.ratings.map(rating => mapRatingItem(rating)),
    reviews: dto.reviews.map(review => mapReviewItem(review, language)),
  };
}
