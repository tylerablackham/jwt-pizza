import { test, expect } from 'playwright-test-coverage';
import {mockAddStore, mockDeleteStore, mockGetFranchise, mockLogin, validUsers} from "./util.js";

test('franchise dashboard', async ({page}) => {
  const user = validUsers["f@jwt.com"]
  await mockLogin(page)
  await mockGetFranchise(page)
  await mockAddStore(page)
  await mockDeleteStore(page)
  await page.goto('/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('list')).toContainText('franchise-dashboard');
  await expect(page.getByRole('heading')).toContainText('LotaPizza');
  await expect(page.getByRole('table')).toContainText('Lehi');
  await expect(page.getByRole('table')).toContainText('Springville');
  await expect(page.getByRole('table')).toContainText('American Fork');

  await page.getByRole('button', { name: 'Create store' }).click();
  await expect(page.getByRole('list')).toContainText('create-store');
  await expect(page.getByRole('heading')).toContainText('Create store');
  await page.getByRole('textbox', { name: 'store name' }).fill('anotherone');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByRole('list')).toContainText('franchise-dashboard');

  await page.getByRole('row', { name: 'American Fork ₿ Close' }).getByRole('button').click();
  await expect(page.getByRole('list')).toContainText('close-store');
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('list')).toContainText('franchise-dashboard');

})