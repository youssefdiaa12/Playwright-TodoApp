import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('SauceDemo - Sorting', () => {
  test('Sort by name A to Z and Z to A', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto('/');
    await login.login('standard_user', 'secret_sauce');
    await inventory.isVisible();

  const sortSelect = page.locator('select.product_sort_container');
  await expect(sortSelect).toBeVisible();

  // Sort A to Z
  await sortSelect.selectOption({ label: 'Name (A to Z)' });
  const names = await page.locator('.inventory_item_name').allTextContents();
  expect(names.length).toBeGreaterThan(1);
  const sorted = [...names].sort((a, b) => a.localeCompare(b));
  expect(names).toEqual(sorted);

  // Sort Z to A
  await sortSelect.selectOption({ label: 'Name (Z to A)' });
  const names2 = await page.locator('.inventory_item_name').allTextContents();
  const sortedDesc = [...names].sort((a, b) => b.localeCompare(a));
  expect(names2).toEqual(sortedDesc);
  });
});
