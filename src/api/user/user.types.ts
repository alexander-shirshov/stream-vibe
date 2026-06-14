export type UserCatalogDto = {
  userId: string;
  likedItemIds: string[];
  playlistItemIds: string[];
};

export type UserCatalog = {
  userId: string;
  likedItemIds: string[];
  playlistItemIds: string[];
};

type ArrayKeys<T> = {
  [K in keyof T]: T[K] extends unknown[] ? K : never;
}[keyof T];

export type UserCatalogArrayKeys = ArrayKeys<UserCatalog>;

export type UserPreferencesDto = {
  userId: string;
  isMuted: boolean;
};

export type UserPreferences = {
  userId: string;
  isMuted: boolean;
};

export type UserReview = {
  id: string;
  entityId: string;
  entityType: 'movie' | 'show';
  authorName: string;
  country: string | null;
  rating: number;
  text: string;
  createdAt: string;
};

export type UserReviews = {
  userId: string;
  items: UserReview[];
};
export type PersistedUserState = {
  catalog: UserCatalog;
  preferences: UserPreferences;
  reviews: UserReviews;
};
