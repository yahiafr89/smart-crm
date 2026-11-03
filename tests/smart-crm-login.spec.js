const { test, expect } = require('@playwright/test');

test('Smart CRM - la page de connexion est accessible', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/login.html');

  await expect(page.locator('#login-form')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
});
