import type {
  UserCatalogArrayKeys,
  UserCatalog,
  UserPreferences,
  PersistedUserState,
  UserReview,
  UserReviews,
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

function isUserReview(value: unknown): value is UserReview {
  return (
    isObject(value) &&
    typeof value.id === 'string' &&
    typeof value.entityId === 'string' &&
    (value.entityType === 'movie' || value.entityType === 'show') &&
    typeof value.authorName === 'string' &&
    (typeof value.country === 'string' || value.country === null) &&
    typeof value.rating === 'number' &&
    typeof value.text === 'string' &&
    typeof value.createdAt === 'string'
  );
}

function isUserReviews(value: unknown): value is UserReviews {
  return (
    isObject(value) &&
    typeof value.userId === 'string' &&
    Array.isArray(value.items) &&
    value.items.every(isUserReview)
  );
}

function isUserPreferences(value: unknown): value is UserPreferences {
  return isObject(value) && typeof value.userId === 'string' && typeof value.isMuted === 'boolean';
}

export function isPersistedUserState(value: unknown): value is PersistedUserState {
  return (
    isObject(value) &&
    isUserCatalog(value.catalog) &&
    isUserPreferences(value.preferences) &&
    isUserReviews(value.reviews)
  );
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
      userId,
      likedItemIds: [],
      playlistItemIds: [],
    },
    preferences: {
      userId,
      isMuted: false,
    },
    reviews: {
      userId,
      items: [],
    },
  };
}

export async function fetchUserState(userId: string): Promise<PersistedUserState> {
  const state = getPersistedUserState();

  if (
    isPersistedUserState(state) &&
    state.catalog.userId === userId &&
    state.preferences.userId === userId &&
    state.reviews.userId === userId
  ) {
    return state;
  }

  const catalog = getMockUserCatalog(userId);
  const preferences = getMockUserPreferences(userId);

  if (catalog && preferences) {
    return {
      catalog,
      preferences,
      reviews: {
        userId,
        items: [],
      },
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

export async function toggleLike(userId: string, itemId: string): Promise<PersistedUserState> {
  const state = await fetchUserState(userId);

  toggleCatalogArrayItem(state.catalog, 'likedItemIds', itemId);

  setPersistedUserState(state);

  return state;
}

export async function togglePlaylist(userId: string, itemId: string): Promise<PersistedUserState> {
  const state = await fetchUserState(userId);

  toggleCatalogArrayItem(state.catalog, 'playlistItemIds', itemId);

  setPersistedUserState(state);

  return state;
}

export async function toggleMuted(userId: string): Promise<PersistedUserState> {
  const state = await fetchUserState(userId);

  state.preferences.isMuted = !state.preferences.isMuted;

  setPersistedUserState(state);

  return state;
}

export function hasReviewForEntity(
  state: PersistedUserState,
  entityId: string,
  entityType: UserReview['entityType']
): boolean {
  return state.reviews.items.some(
    review => review.entityId === entityId && review.entityType === entityType
  );
}

export async function addReview(review: UserReview, userId: string): Promise<PersistedUserState> {
  const state = await fetchUserState(userId);

  if (hasReviewForEntity(state, review.entityId, review.entityType)) {
    throw new Error(`Review for entity id ${review.entityId} already exists!`);
  }

  state.reviews.items = [...state.reviews.items, review];

  setPersistedUserState(state);

  return state;
}

export async function updateReview(
  review: UserReview,
  userId: string
): Promise<PersistedUserState> {
  const state = await fetchUserState(userId);

  if (!hasReviewForEntity(state, review.entityId, review.entityType)) {
    throw new Error(`Review for entity id ${review.entityId} not found!`);
  }

  state.reviews.items = state.reviews.items.map(item => {
    const isSameReview = item.entityId === review.entityId && item.entityType === review.entityType;

    return isSameReview ? { ...item, ...review } : item;
  });

  setPersistedUserState(state);

  return state;
}

export async function deleteReview(id: string, userId: string): Promise<PersistedUserState> {
  const state = await fetchUserState(userId);

  if (!state.reviews.items.some(review => review.id === id)) {
    throw new Error(`review with id ${id} not found!`);
  }

  state.reviews.items = state.reviews.items.filter(item => item.id !== id);

  setPersistedUserState(state);

  return state;
}
