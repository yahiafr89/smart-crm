const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');

const envFile = path.resolve(__dirname, '..', '.env.test');
if (fs.existsSync(envFile) && typeof process.loadEnvFile === 'function') process.loadEnvFile(envFile);
const base = (process.env.CRM_TEST_BASE_URL || 'http://127.0.0.1:5500').replace(/\/$/, '');
const credentials = {
  administrator: [process.env.CRM_TEST_ADMIN_EMAIL, process.env.CRM_TEST_ADMIN_PASSWORD],
  manager: [process.env.CRM_TEST_MANAGER_EMAIL, process.env.CRM_TEST_MANAGER_PASSWORD],
  commercial: [process.env.CRM_TEST_COMMERCIAL_EMAIL, process.env.CRM_TEST_COMMERCIAL_PASSWORD],
};
async function signIn(page, role) {
  const [email, password] = credentials[role];
  await page.goto(`${base}/login.html`);
  await expect(page.locator('#login-form')).toBeVisible();
  await page.locator('#email').fill(email);
  await page.locator('#password').fill(password);
  await page.locator('#login-form [type="submit"]').click();
  await expect(page).toHaveURL(/\/dashboard\.html(?:[?#]|$)/, { timeout: 30000 });
}
for (const role of Object.keys(credentials)) {
  test.describe(`${role} permissions`, () => {
    test.skip(!credentials[role][0] || !credentials[role][1], `Credentials for ${role} not configured`);
    test(`${role}: login, prospects and direct page access`, async ({ page }) => {
      await signIn(page, role);
      await page.goto(`${base}/prospects.html`);
      await expect(page.locator('.crm-prospects-live')).toBeVisible({ timeout: 30000 });
      await expect(page.locator('.cpl-tools input[type="search"]')).toBeVisible();
      await page.goto(`${base}/administration.html`);
      if (role === 'administrator') {
        await expect(page.locator('.administration-page')).toBeVisible({ timeout: 30000 });
      } else {
        await expect(page).toHaveURL(/\/dashboard\.html(?:[?#]|$)/, { timeout: 30000 });
      }
      await page.goto(`${base}/commerciaux.html`);
      if (role === 'commercial') {
        await expect(page).toHaveURL(/\/dashboard\.html(?:[?#]|$)/, { timeout: 30000 });
      } else {
        await expect(page.locator('.salespeople-page')).toBeVisible({ timeout: 30000 });
      }
    });
  });
}

test('commercial: direct URL to another prospect is not disclosed (requires fixture)', async ({ page }) => {
  test.skip(!credentials.commercial[0] || !credentials.commercial[1], 'Commercial test credentials missing');
  const id = process.env.CRM_TEST_OTHER_COMMERCIAL_PROSPECT_ID;
  test.skip(!id, 'Provide an existing prospect ID assigned to a DIFFERENT commercial');
  await signIn(page, 'commercial');
  await page.goto(`${base}/prospects.html?id=${encodeURIComponent(id)}`);
  await expect(page.getByText(/prospect introuvable ou non accessible|prospect not found or not accessible/i)).toBeVisible({ timeout: 30000 });
});
