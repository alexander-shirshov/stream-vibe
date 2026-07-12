import type {
  UserCatalog,
  UserCatalogDto,
  UserPreferences,
  UserPreferencesDto,
  UserReview,
} from './user.types';

import type { ReviewItem } from '@/api/media/media.types';

export function mapUserCatalogDto(dto: UserCatalogDto): UserCatalog {
  return {
    userId: dto.userId,
    likedItemIds: dto.likedItemIds,
    playlistItemIds: dto.playlistItemIds,
  };
}

export function mapUserPrefsDto(dto: UserPreferencesDto): UserPreferences {
  return {
    userId: dto.userId,
    isMuted: dto.isMuted,
  };
}

export function mapUserReviewToReviewItem(review: UserReview): ReviewItem {
  return {
    id: review.id,
    authorName: review.authorName,
    country: review.country,
    rating: review.rating,
    text: review.text,
  };
}
