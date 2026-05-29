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
