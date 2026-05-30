import type { PersistedUserState } from './user.types';

const USER_STATE_STORAGE_KEY = 'streamvibe-user-state';

export function getPersistedUserState(): unknown | null {
  const rawState = localStorage.getItem(USER_STATE_STORAGE_KEY);
  if (!rawState) return null;
  try {
    return JSON.parse(rawState);
  } catch {
    return null;
  }
}

export function setPersistedUserState(state: PersistedUserState): void {
  localStorage.setItem(USER_STATE_STORAGE_KEY, JSON.stringify(state));
}
