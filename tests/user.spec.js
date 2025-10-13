import { test, expect } from 'playwright-test-coverage';
import {getInitials, mockLogin, mockLogout, mockRegister, mockUpdateUser, updatedUsers, validUsers} from "./util.js";

test('updateUser', async ({ page }) => {
  const user = validUsers["d@jwt.com"]
  const updatedUser = updatedUsers["d@jwt.com"]
  await mockRegister(page)
  await mockUpdateUser(page)
  await page.goto('/');

  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill(user.name);
  await page.getByRole('textbox', { name: 'Email address' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('link', { name: getInitials(user.name) }).click();
  await expect(page.getByRole('main')).toContainText(user.name);

  await page.getByRole('button', { name: 'Edit' }).click();
  await expect(page.locator('h3')).toContainText('Edit user');
  await page.getByRole('textbox').first().fill(updatedUser.name);
  await page.locator('input[type="email"]').fill(updatedUser.email);
  await page.locator('#password').fill(updatedUser.password);
  await page.getByRole('button', { name: 'Update' }).click();
  await page.waitForSelector('[role="dialog"].hidden', { state: 'attached' });
  await expect(page.getByRole('main')).toContainText(updatedUser.name);

  await mockLogout(page)

  await page.getByRole('link', { name: 'Logout' }).click();

  await mockLogin(page)

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(updatedUser.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(updatedUser.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: getInitials(updatedUser.name) }).click();
  await expect(page.getByRole('main')).toContainText(updatedUser.name);
});