import { test, expect } from 'playwright-test-coverage';
import {getInitials, mockRegister, validUsers} from "./util.js";

async function basicInit(page) {
  await mockRegister(page)

  await page.goto('/');
}

test('register', async({page}) => {
  const user = validUsers["d@jwt.com"]
  await basicInit(page)
  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page.locator('form')).toContainText('Already have an account? Login instead.');
  await page.getByRole('textbox', { name: 'Full name' }).fill(user.name);
  await page.getByRole('textbox', { name: 'Email address' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('link', { name: getInitials(user.name) })).toBeVisible();
})