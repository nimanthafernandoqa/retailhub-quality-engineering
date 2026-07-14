import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

/**
 * RetailHub Authentication Test Suite
 *
 * Verifies user authentication scenarios.
 */
test.describe('RetailHub Login', () => {

    let loginPage: LoginPage;

    /**
     * Runs before every test.
     *
     * Opens the RetailHub Login page.
     */
    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);

        await loginPage.open();

    });

    /**
     * Verify successful authentication
     * using valid user credentials.
     */
    test('User can log in with valid credentials', async ({ page }) => {

        await loginPage.login(
            'nimantha@retailhub.com',
            'Password123'
        );

        await expect(page).toHaveURL('/dashboard');

        await expect(page.getByRole('heading', { name: 'Welcome to RetailHub' })).toBeVisible();

    });

    /**
     * Verify error message is displayed
     * when invalid credentials are used.
     */
    test('User sees an error with invalid credentials', async ({ page }) => {

        await loginPage.login(
            'wrong@retailhub.com',
            'WrongPassword'
        );

        await expect(page).toHaveURL('/login');

        await expect(loginPage.errorMessage).toBeVisible();

    });

});