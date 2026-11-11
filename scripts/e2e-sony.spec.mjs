import { chromium, devices } from "playwright";
import assert from "node:assert/strict";

const APP_BASE = "https://miko8271a.github.io/psnaaaaa";

async function run() {
  const iPhone = devices["iPhone 13"];
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();

  const appRes = await page.goto(`${APP_BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  assert.equal(appRes?.status(), 200);

  await page.getByRole("link", { name: "Sign in", exact: true }).click();
  await page.waitForURL(/\/login/);
  await page.getByRole("link", { name: /Open Sony login in app/i }).click();
  await page.waitForURL(/\/sony/);

  const [popup] = await Promise.all([
    context.waitForEvent("page", { timeout: 3000 }).catch(() => null),
    page.getByRole("button", { name: /Continue to PlayStation login/i }).click(),
  ]);
  assert.equal(popup, null, "must not open new tab");

  await page.waitForURL(/my\.account\.sony\.com.*sonyacct/, { timeout: 90000 });
  await page.getByText(/Sign in to PlayStation|Sign-In ID/i).first().waitFor({ timeout: 60000 });
  const url = page.url();
  assert.match(url, /service_entity=psn|sonyacct/, `expected PSN oauth, got ${url}`);

  const body = await page.locator("body").innerText();
  assert.match(body, /sign in to playstation|sign-in id/i, "consumer PSN form");
  assert.doesNotMatch(body, /sign in to access your apps/i, "must not be Partners portal");
  assert.doesNotMatch(body, /something went wrong/i);

  await browser.close();
  console.log("ALL_E2E_CHECKS_PASSED");
}

run().catch((e) => {
  console.error("E2E_FAILED:", e.message);
  process.exit(1);
});
