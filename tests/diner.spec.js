import { test, expect } from 'playwright-test-coverage';
import {getInitials, mockLogin, validUsers} from "./util.js";

test('diner dashboard', async ({page}) => {
  const user = validUsers["d@jwt.com"]
  await mockLogin(page)
  await page.goto('/');

  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: getInitials(user.name), exact: true }).click();
  await expect(page.getByRole('list')).toContainText('diner-dashboard');
  await expect(page.getByRole('heading')).toContainText('Your pizza kitchen');
  await expect(page.getByRole('main')).toContainText(user.name);
  await expect(page.getByRole('main')).toContainText(user.email);
  await expect(page.getByRole('main')).toContainText(user.roles[0].role);
})