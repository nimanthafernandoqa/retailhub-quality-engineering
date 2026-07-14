import { test, expect } from '@playwright/test';

test('User can log in with valid credentials', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('nimantha@retailhub.com');
  await page.getByLabel('Password').fill('Password123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/dashboard');
  await expect(
    page.getByRole('heading', { name: 'Welcome to RetailHub' })
  ).toBeVisible();
});


test('User sees an error with invalid credentials', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('wrong@retailhub.com');
  await page.getByLabel('Password').fill('WrongPassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('/login');
  await expect(
    page.getByText('Invalid email or password')
  ).toBeVisible();
});