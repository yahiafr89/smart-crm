const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

// Node 26 supports process.loadEnvFile; never commit .env.test.
const envPath = path.resolve(__dirname, '..', '.env.test');
if (fs.existsSync(envPath)) process.loadEnvFile(envPath);

const baseURL = process.env.CRM_TEST_BASE_URL || 'http://127.0.0.1:5500';

test('Administrator: login and read-only prospects access', async ({ page }) => {
  const email = process.env.CRM_TEST_ADMIN_EMAIL;
  const password = process.env.CRM_TEST_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('Missing CRM_TEST_ADMIN_EMAIL / CRM_TEST_ADMIN_PASSWORD. Configure local .env.test (ignored by Git).');
  }
  await page.goto(`${baseURL}/login.html`);
  await expect(page.locator('#login-form')).toBeVisible();
  await page.locator('#email').fill(email);
  await page.locator('#password').fill(password);
  await page.locator('#login-form [type="submit"]').click();
  await expect(page).toHaveURL(/\/dashboard\.html(?:[?#]|$)/, { timeout: 20000 });
  await page.goto(`${baseURL}/prospects.html`);
  await expect(page.locator('#real-prospect-search')).toBeVisible({ timeout: 20000 });
  await expect(page.locator('table tbody tr').first()).toBeVisible();
});
