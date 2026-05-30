import { atom } from 'jotai';
import type { User } from '@/lib/auth';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export const tokenAtom = atom<string | null>(getStoredToken());
export const userAtom = atom<User | null>(getStoredUser());
export const isAuthLoadingAtom = atom<boolean>(true);

export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null && get(tokenAtom) !== null);

export const setAuthAtom = atom(
  null,
  (_get, set, token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    set(tokenAtom, token);
    set(userAtom, user);
  },
);

export const clearAuthAtom = atom(
  null,
  (_get, set) => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set(tokenAtom, null);
    set(userAtom, null);
  },
);