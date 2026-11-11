export interface SavedAccount {
  id: string;
  email: string;
  label: string;
}

const STORAGE_KEY = "psn-saved-accounts";

export function loadAccounts(): SavedAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as SavedAccount[];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveAccounts(accounts: SavedAccount[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

import { SONY_SIGN_IN_URL } from "./openSony";

export function sonySignInUrl(): string {
  return SONY_SIGN_IN_URL;
}
