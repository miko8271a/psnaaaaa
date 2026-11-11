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

const SONY_SIGN_IN = "https://my.account.sony.com/sonyacct/signin/";

/** Plain Sony URL — extra params often trigger Sony's generic error page. */
export function sonySignInUrl(_email?: string): string {
  return SONY_SIGN_IN;
}
