import type { UserCatalog, UserCatalogDto } from './user.types';

export function mapUserCatalogDto(dto: UserCatalogDto): UserCatalog {
  return {
    userId: dto.userId,
    likedItemIds: dto.likedItemIds,
    playlistItemIds: dto.playlistItemIds,
  };
}
