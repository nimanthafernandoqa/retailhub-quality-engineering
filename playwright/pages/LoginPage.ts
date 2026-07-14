import { type Locator, type Page } from '@playwright/test';

/**
 * Page Object representing the RetailHub Login page.
 *
 * This class contains:
 * - Page locators
 * - User interactions
 * - Business actions related to authentication
 */
export class LoginPage {

    // Browser page instance
    readonly page: Page;

    // Page locators
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        // Initialise page locators
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Invalid email or password');
    }

    /**
     * Navigate to the Login page.
     */
    async open(): Promise<void> {
        await this.page.goto('/login');
    }

    /**
     * Perform user login using supplied credentials.
     *
     * @param email User email address
     * @param password User password
     */
    async login(email: string, password: string): Promise<void> {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}