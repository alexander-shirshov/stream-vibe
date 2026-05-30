import type { UserCatalogDto, UserPreferencesDto } from '@/api/user/user.types';

export const userCatalogMock: UserCatalogDto[] = [
  {
    userId: '69',
    likedItemIds: ['riddick', 'interstellar'],
    playlistItemIds: ['edge-of-tomorrow'],
  },
];

export const userPreferencesMock: UserPreferencesDto[] = [
  {
    userId: '69',
    isMuted: false,
  },
];
