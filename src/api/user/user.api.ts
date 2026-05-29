import type { UserCatalogArrayKeys, UserCatalog } from '@/api/user/user.types';
import { userCatalogMock } from '@/api/user/mocks/userCatalog.mock';
import { mapUserCatalogDto } from '@/api/user/user.mapper';

function toggleCatalogArrayItem(catalog: UserCatalog, key: UserCatalogArrayKeys, itemId: string) {
  const items = catalog[key];
  const isInCatalogItems = items.includes(itemId);

  catalog[key] = isInCatalogItems ? items.filter(id => id !== itemId) : [...items, itemId];
}

export async function fetchUserCatalog(userId: string): Promise<UserCatalog | null> {
  const catalog = userCatalogMock.find(catalog => catalog.userId === userId);

  if (!catalog) {
    console.warn(`Catalog for user "${userId}" not found`);
    return null;
  }

  return mapUserCatalogDto(catalog);
}

export async function toggleLike(userId: string, itemId: string): Promise<UserCatalog | null> {
  const index = userCatalogMock.findIndex(catalog => catalog.userId === userId);

  if (index === -1) return null;

  toggleCatalogArrayItem(userCatalogMock[index], 'likedItemIds', itemId);

  return fetchUserCatalog(userId);
}

export async function togglePlaylist(userId: string, itemId: string): Promise<UserCatalog | null> {
  const index = userCatalogMock.findIndex(catalog => catalog.userId === userId);

  if (index === -1) return null;

  toggleCatalogArrayItem(userCatalogMock[index], 'playlistItemIds', itemId);

  return fetchUserCatalog(userId);
}
