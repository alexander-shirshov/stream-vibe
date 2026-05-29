import type { UserCatalogDto } from '@/api/user/user.types';

export const userCatalogMock: UserCatalogDto[] = [
  {
    userId: '69',
    likedItemIds: ['riddick', 'interstellar'],
    playlistItemIds: ['edge-of-tomorrow'],
  },
];
