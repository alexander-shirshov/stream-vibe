import type {
  UserCatalog,
  UserCatalogDto,
  UserPreferences,
  UserPreferencesDto,
} from './user.types';

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
