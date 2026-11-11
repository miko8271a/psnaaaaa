/**
 * Consumer PSN (web) — NOT signin.playstation.net (that is Partners/Okta).
 * Starts OAuth and lands on my.account.sony.com with PSN client + service_entity=psn.
 */
export const SONY_SIGN_IN_URL =
  "https://web.np.playstation.com/api/session/v1/signin?redirect_uri=https%3A%2F%2Fwww.playstation.com%2F&smcid=web%3Apdc";

export const SONY_IN_APP_PATH = "/sony";

/** Legacy partners portal — do not use for game accounts. */
export const SONY_PARTNERS_URL = "https://signin.playstation.net/signin/";

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
        detail: "PSN consumer sign-in reachable",
      },
    ];
  } catch {
    return [
      {
        url: SONY_SIGN_IN_URL,
        ok: false,
        detail: "Cannot reach PSN sign-in",
      },
    ];
  }
}
