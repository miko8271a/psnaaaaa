/**
 * Use PlayStation.net Okta login — NOT my.account.sony.com (DSB + bot protection;
 * often shows "Something went wrong" when bundles/APIs are blocked on mobile).
 */
export const SONY_SIGN_IN_URL = "https://signin.playstation.net/signin/";

export const SONY_URLS = [SONY_SIGN_IN_URL] as const;

export function isStandalonePwa(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator &&
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

export function openSonySignIn(url: string = SONY_SIGN_IN_URL): void {
  const trimmed = url.trim();
  if (isStandalonePwa()) {
    const noProto = trimmed.replace(/^https?:\/\//i, "");
    window.location.href = `x-safari-https://${noProto}`;
    return;
  }
  window.location.assign(trimmed);
}

export async function probeSonyReachability(): Promise<
  { url: string; ok: boolean; detail: string }[]
> {
  const url = SONY_SIGN_IN_URL;
  try {
    await fetch(url, { method: "GET", mode: "no-cors", cache: "no-store" });
    return [{ url, ok: true, detail: "PlayStation sign-in reachable" }];
  } catch {
    return [{ url, ok: false, detail: "Cannot reach signin.playstation.net" }];
  }
}
