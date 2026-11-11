export const SONY_SIGN_IN_URL = "https://signin.playstation.net/signin/";

export const SONY_URLS = [SONY_SIGN_IN_URL] as const;

/** Stay in the same browser / PWA — no forced Safari handoff. */
export function openSonySignIn(): void {
  window.location.assign("/psnaaaaa/sony");
}

export async function probeSonyReachability(): Promise<
  { url: string; ok: boolean; detail: string }[]
> {
  try {
    await fetch(SONY_SIGN_IN_URL, {
      method: "GET",
      mode: "no-cors",
      cache: "no-store",
    });
    return [
      {
        url: SONY_SIGN_IN_URL,
        ok: true,
        detail: "PlayStation sign-in reachable",
      },
    ];
  } catch {
    return [
      {
        url: SONY_SIGN_IN_URL,
        ok: false,
        detail: "Cannot reach signin.playstation.net",
      },
    ];
  }
}
