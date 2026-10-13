import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test('cart totals, quantity limits, persistence and removal', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Добавить Классик в корзину' }).click();
  await page.getByRole('button', { name: 'Добавить Горный в корзину' }).click();
  await page.goto('/cart');
  await expect(page.locator('.summary-total strong')).toHaveText('19 800 ₽');
  await page.getByRole('button', { name: 'Увеличить: Количество Классик', exact: true }).click();
  await expect(page.locator('.summary-total strong')).toHaveText('27 700 ₽');
  await page.reload();
  await expect(page.getByRole('spinbutton', { name: 'Количество Классик', exact: true })).toHaveValue('2');
  await page.getByRole('spinbutton', { name: 'Количество Классик', exact: true }).fill('0');
  await expect(page.getByRole('spinbutton', { name: 'Количество Классик', exact: true })).toHaveValue('1');
  await page.getByRole('button', { name: 'Удалить Классик из корзины' }).click();
  await expect(page.locator('.summary-total strong')).toHaveText('11 900 ₽');
  await page.getByRole('button', { name: 'Удалить Горный из корзины' }).click();
  await expect(page.getByRole('heading', { name: 'Пока без огня.' })).toBeVisible();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Пока без огня.' })).toBeVisible();
});

test('product purchase quantity, accordion and unknown model', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/catalog/profi');
  await expect(page.getByRole('heading', { name: 'Мангал Профи', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Увеличить: Количество', exact: true }).click();
  await page.getByRole('button', { name: 'В корзину', exact: true }).first().click();
  await page.goto('/cart');
  await expect(page.locator('.summary-total strong')).toHaveText('37 800 ₽');
  await page.getByRole('link', { name: 'Оформить через менеджера' }).click();
  await expect(page).toHaveURL(/\/#contacts$/);
  await expect(page.locator('#contacts')).toBeInViewport();
  await expect(page.locator('#contacts button')).toHaveCount(3);
  for (const button of await page.locator('#contacts button').all()) await expect(button).toBeDisabled();
  await page.goto('/#faq');
  await page.getByText('Как оформить заказ через менеджера?', { exact: true }).click();
  await expect(page.locator('details[open] .faq-answer')).toContainText('согласует оплату');
  const response = await page.goto('/catalog/missing');
  expect(response.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Здесь пока нет мангала.' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('mobile menu works with keyboard and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Открыть меню' });
  await button.click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(button).toBeFocused();
  await button.click();
  await page.locator('#mobile-menu').getByRole('link', { name: 'Каталог', exact: true }).click();
  await expect(page.locator('#mobile-menu')).toHaveCount(0);
  await expect(page).toHaveURL(/#catalog$/);
});

for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
  test(`layout and images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ['/', '/catalog/klassik', '/cart', '/information']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${path}: horizontal overflow at ${width}`).toBe(true);
      await expect(page.locator('h1')).toBeVisible();
      const missing = await page.locator('img').evaluateAll((images) => images.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src));
      expect(missing).toEqual([]);
      if (path === '/' && [390, 1440].includes(width)) {
        await page.locator('#catalog').scrollIntoViewIfNeeded();
        await page.waitForTimeout(700);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(700);
        fs.mkdirSync('screenshots', { recursive: true });
        await page.screenshot({ path: `screenshots/home-${width}.png`, fullPage: true });
      }
    }
  });
}

test('corrupt and invalid local storage remains usable', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('mangal-cart-v1', JSON.stringify([{ id: 'missing', quantity: 5 }, null, { id: 'classic', quantity: -1 }, { id: 'pro', quantity: 999 }])));
  await page.goto('/cart');
  await expect(page.locator('.cart-item')).toHaveCount(1);
  await expect(page.getByRole('spinbutton', { name: 'Количество Профи' })).toHaveValue('99');
  await expect(page.getByRole('button', { name: 'Увеличить: Количество Профи' })).toBeDisabled();
});
