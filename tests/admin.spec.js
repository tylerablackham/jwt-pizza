import { test, expect } from 'playwright-test-coverage';
import {mockAddFranchise, mockDeleteFranchise, mockFranchises, mockLogin, validUsers} from "./util.js";

test('admin dashboard', async({page}) => {
  const user = validUsers["a@jwt.com"]
  await mockLogin(page)
  await mockFranchises(page)
  await mockDeleteFranchise(page)
  await mockAddFranchise(page)
  await page.goto('/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('list')).toContainText('admin-dashboard');

  await page.getByRole('button', { name: '»' }).click(); 
  await expect(page.getByRole('table')).toContainText('LotaPizza');
  await expect(page.getByRole('table')).toContainText('PizzaCorp');
  await expect(page.getByRole('table')).toContainText('topSpot'); 
  await page.getByRole('textbox', { name: 'Filter franchises' }).fill('LotaPizza');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('table')).toContainText('LotaPizza');
  await expect(page.getByRole('button', { name: 'Add Franchise' })).toBeVisible();

  await page.getByRole('row', { name: 'LotaPizza Close' }).getByRole('button').click();
  await expect(page.getByRole('heading')).toContainText('Sorry to see you go');
  await expect(page.getByRole('main')).toContainText('LotaPizza');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('list')).toContainText('admin-dashboard');

  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await expect(page.getByRole('list')).toContainText('create-franchise');
  await expect(page.getByRole('heading')).toContainText('Create franchise');
  await page.getByRole('textbox', { name: 'franchise name' }).fill('New Franchise');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('a@jwt.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByRole('list')).toContainText('admin-dashboard');
})