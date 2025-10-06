import { test, expect } from 'playwright-test-coverage';

test('about', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('list')).toContainText('about');
  await expect(page.getByRole('main')).toContainText('The secret sauce');
})

test('history', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('list')).toContainText('history');
  await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
})

test('franchise dashboard', async ({page}) => {
  await page.goto('/');
  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByRole('list')).toContainText('franchise-dashboard');
  await expect(page.getByRole('main')).toContainText('So you want a piece of the pie?');
  await expect(page.getByRole('link', { name: 'login', exact: true })).toBeVisible();
})