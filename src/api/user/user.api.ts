import type {
  UserCatalogArrayKeys,
  UserCatalog,
  UserPreferences,
  PersistedUserState,
} from '@/api/user/user.types';
import { userCatalogMock, userPreferencesMock } from '@/api/user/mocks/userCatalog.mock';
import { mapUserCatalogDto, mapUserPrefsDto } from '@/api/user/user.mapper';
import { getPersistedUserState, setPersistedUserState } from '@/api/user/user.storage';

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isUserCatalog(value: unknown): value is UserCatalog {
  return (
    isObject(value) &&
    typeof value.userId === 'string' &&
    isStringArray(value.likedItemIds) &&
    isStringArray(value.playlistItemIds)
  );
}

function isUserPreferences(value: unknown): value is UserPreferences {
  return isObject(value) && typeof value.userId === 'string' && typeof value.isMuted === 'boolean';
}

export function isPersistedUserState(value: unknown): value is PersistedUserState {
  return isObject(value) && isUserCatalog(value.catalog) && isUserPreferences(value.preferences);
}

function toggleCatalogArrayItem(catalog: UserCatalog, key: UserCatalogArrayKeys, itemId: string) {
  const items = catalog[key];
  const isInCatalogItems = items.includes(itemId);

  catalog[key] = isInCatalogItems ? items.filter(id => id !== itemId) : [...items, itemId];
}

function getMockUserCatalog(userId: string): UserCatalog | null {
  const catalog = userCatalogMock.find(catalog => catalog.userId === userId);

  if (!catalog) {
    console.warn(`Mock catalog for user "${userId}" not found`);
    return null;
  }

  return mapUserCatalogDto(catalog);
}

function getMockUserPreferences(userId: string): UserPreferences | null {
  const pref = userPreferencesMock.find(pref => pref.userId === userId);

  if (!pref) {
    console.warn(`Preferences for user "${userId}" not found`);
    return null;
  }

  return mapUserPrefsDto(pref);
}

function initTempUser(userId: string): PersistedUserState {
  return {
    catalog: {
      userId: userId,
      likedItemIds: [],
      playlistItemIds: [],
    },
    preferences: {
      userId: userId,
      isMuted: false,
    },
  };
}

export async function fetchUserState(userId: string): Promise<PersistedUserState> {
  const state = getPersistedUserState();

  if (
    isPersistedUserState(state) &&
    state.catalog.userId === userId &&
    state.preferences.userId === userId
  ) {
    return state;
  }

  const catalog = getMockUserCatalog(userId);
  const preferences = getMockUserPreferences(userId);

  if (catalog && preferences) {
    return {
      catalog,
      preferences,
    };
  }

  return initTempUser(userId);
}

export async function fetchUserCatalog(userId: string): Promise<UserCatalog> {
  const state = await fetchUserState(userId);
  return state.catalog;
}

export async function fetchUserPrefs(userId: string): Promise<UserPreferences> {
  const state = await fetchUserState(userId);
  return state.preferences;
}

export async function toggleLike(userId: string, itemId: string): Promise<UserCatalog> {
  const state = await fetchUserState(userId);

  toggleCatalogArrayItem(state.catalog, 'likedItemIds', itemId);

  setPersistedUserState(state);

  return state.catalog;
}

export async function togglePlaylist(userId: string, itemId: string): Promise<UserCatalog> {
  const state = await fetchUserState(userId);

  toggleCatalogArrayItem(state.catalog, 'playlistItemIds', itemId);

  setPersistedUserState(state);

  return state.catalog;
}

export async function toggleMuted(userId: string): Promise<UserPreferences> {
  const state = await fetchUserState(userId);

  state.preferences.isMuted = !state.preferences.isMuted;

  setPersistedUserState(state);

  return state.preferences;
}
