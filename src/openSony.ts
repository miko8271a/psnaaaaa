/** Sony entry points — network login uses playstation.net (Okta). */
export const SONY_URLS = [
  "https://signin.playstation.net/signin/",
  "https://my.account.sony.com/sonyacct/signin/",
] as const;

export function isStandalonePwa(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // legacy iOS
    ("standalone" in window.navigator &&
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

/** Opens Sony in Safari on iOS when launched from home-screen web app. */
export function openSonySignIn(url: string = SONY_URLS[0]): void {
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
  const results: { url: string; ok: boolean; detail: string }[] = [];
  for (const url of SONY_URLS) {
    try {
      await fetch(url, { method: "GET", mode: "no-cors", cache: "no-store" });
      results.push({ url, ok: true, detail: "Network reach OK (no-cors)" });
    } catch {
      results.push({ url, ok: false, detail: "Blocked or offline" });
    }
  }
  return results;
}
