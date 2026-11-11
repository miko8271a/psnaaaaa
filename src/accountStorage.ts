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

export function sonySignInUrl(email: string): string {
  const base = new URL("https://my.account.sony.com/sonyacct/signin/");
  base.searchParams.set("login_hint", email.trim());
  return base.toString();
}
