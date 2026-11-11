import { chromium, devices } from "playwright";
import assert from "node:assert/strict";

const APP_BASE = "https://miko8271a.github.io/psnaaaaa";
const SONY_HOST = "signin.playstation.net";

async function run() {
  const iPhone = devices["iPhone 13"];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...iPhone,
  });
  const page = await context.newPage();
  const errors = [];

  // 1) App loads
  const appRes = await page.goto(`${APP_BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  assert.equal(appRes?.status(), 200, "app status");

  // 2) No external _blank on home
  const homeLinks = await page.$$eval("a[target='_blank']", (els) =>
    els.map((e) => e.getAttribute("href")),
  );
  assert.equal(homeLinks.length, 0, `home should have no target=_blank, got ${homeLinks.join(",")}`);

  // 3) Sign in tab -> in-app route
  await page.getByRole("link", { name: "Sign in", exact: true }).click();
  await page.waitForURL(/\/login/, { timeout: 15000 });
  const openInApp = page.getByRole("link", { name: /Open Sony login in app/i });
  await openInApp.click();
  await page.waitForURL(/\/sony/, { timeout: 15000 });

  // 4) No iframe (removed — Sony blocks it)
  const iframeCount = await page.locator("iframe").count();
  assert.equal(iframeCount, 0, "sony page must not use iframe");

  // 5) Same-window navigation to Sony
  const [sonyPage] = await Promise.all([
    context.waitForEvent("page", { timeout: 5000 }).catch(() => null),
    page.getByRole("button", { name: /Continue to PlayStation login/i }).click(),
  ]);
  assert.equal(sonyPage, null, "must not open a new tab/window");

  await page.waitForURL(new RegExp(SONY_HOST), { timeout: 60000 });
  const sonyStatus = await page.evaluate(() => document.readyState);
  assert.ok(sonyStatus === "complete" || sonyStatus === "interactive", "sony document state");

  // 6) Login form visible (not Sony fatal error)
  const body = await page.locator("body").innerText({ timeout: 30000 });
  assert.match(body, /email/i, "email field label");
  assert.match(body, /password/i, "password field");
  assert.doesNotMatch(body, /something went wrong/i, "no fatal error page");

  // 7) Wrong URL must not be default in bundled app (check login path via new session)
  const page2 = await context.newPage();
  await page2.goto(`${APP_BASE}/login`, { waitUntil: "domcontentloaded" });
  const html = await page2.content();
  assert.doesNotMatch(html, /my\.account\.sony\.com/, "must not link my.account in login");
  await page2.close();

  await browser.close();
  console.log("ALL_E2E_CHECKS_PASSED");
  return true;
}

run().catch((e) => {
  console.error("E2E_FAILED:", e.message);
  process.exit(1);
});
