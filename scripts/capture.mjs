import { chromium } from '@playwright/test';
import fs from 'node:fs';

fs.mkdirSync('screenshots', { recursive: true });
const browser = await chromium.launch();
for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:3000');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.hero-image img').evaluate((image) => image.decode());
  await page.screenshot({ path: `screenshots/hero-${width}.png` });
  await page.locator('#catalog').scrollIntoViewIfNeeded();
  await page.locator('.product-photo img').first().evaluate((image) => image.decode());
  await page.screenshot({ path: `screenshots/catalog-${width}.png` });
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }
    await Promise.all([...document.images].map((image) => image.decode().catch(() => {})));
    window.scrollTo(0, 0);
  });
  if ([390, 1440].includes(width)) await page.screenshot({ path: `screenshots/home-${width}.png`, fullPage: true });
  await page.close();
}
await browser.close();
