import { chromium } from "playwright";

const APP = "https://miko8271a.github.io/psnaaaaa/";
const SONY = "https://signin.playstation.net/signin/";

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
const page = await context.newPage();

const out = [];

async function snap(label, p = page) {
  await p.screenshot({ path: `/agent/scripts/out-${label}.png`, fullPage: true });
  out.push(`screenshot: out-${label}.png`);
}

try {
  const r1 = await page.goto(APP, { waitUntil: "networkidle", timeout: 60000 });
  out.push(`app: ${r1?.status()} ${page.url()}`);

  await page.getByRole("link", { name: /Sign in/i }).first().click();
  await page.waitForTimeout(500);
  await page.getByRole("link", { name: /Open Sony login in app/i }).click();
  await page.waitForTimeout(4000);
  out.push(`sony route: ${page.url()}`);

  const iframe = page.frameLocator('iframe[title="PlayStation sign-in"]');
  const hasIframe = (await page.locator("iframe").count()) > 0;
  out.push(`iframe present: ${hasIframe}`);

  let iframeText = "";
  try {
    iframeText = await iframe.locator("body").innerText({ timeout: 8000 });
  } catch (e) {
    iframeText = `iframe blocked or empty: ${e.message}`;
  }
  out.push(`iframe body (first 200 chars): ${iframeText.slice(0, 200)}`);
  await snap("app-embed");

  const p2 = await context.newPage();
  const r2 = await p2.goto(SONY, { waitUntil: "networkidle", timeout: 60000 });
  out.push(`direct sony: ${r2?.status()} ${p2.url()}`);
  const title = await p2.title();
  const body = await p2.locator("body").innerText({ timeout: 15000 });
  out.push(`sony title: ${title}`);
  out.push(`sony body has email: ${/email|sign in|playstation/i.test(body)}`);
  out.push(`sony body (first 300): ${body.slice(0, 300)}`);
  await snap("sony-direct", p2);
} catch (e) {
  out.push(`error: ${e.message}`);
} finally {
  await browser.close();
}

console.log(out.join("\n"));
