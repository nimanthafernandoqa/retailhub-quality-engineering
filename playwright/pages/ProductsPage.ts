import { type Locator, type Page, expect } from "@playwright/test";

/**
 * Page Object representing the RetailHub Products page.
 */
export class ProductsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly productCards: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;

    this.heading = page.getByRole("heading", {
      name: "RetailHub Products",
    });

    this.productCards = page.getByTestId("product-card");
    this.cartCount = page.getByTestId("cart-count");
  }

  /**
   * Navigate to the Products page.
   */
  async open(): Promise<void> {
    await this.page.goto("/products");
  }

  /**
   * Verify the Products page has loaded.
   */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.page).toHaveURL("/products");
    await expect(this.heading).toBeVisible();
  }
  /**
   * Verify the number of items in the shopping cart.
   */
  async verifyCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartCount).toHaveText(expectedCount.toString());
  }

  /**
   * Return the current number of items in the cart.
   */
  async getCartCount(): Promise<number> {
    const countText = await this.cartCount.textContent();

    return Number(countText);
  }

  /**
   * Verify the number of displayed products.
   */
  async verifyProductCount(expectedCount: number): Promise<void> {
    await expect(this.productCards).toHaveCount(expectedCount);
  }

  /**
   * Verify the displayed product names.
   */
  async verifyProductNames(expectedProducts: string[]): Promise<void> {
    await expect(this.productCards).toContainText(expectedProducts);
  }

  /**
   * Add a product to the shopping cart by product name.
   *
   * @param productName Name of the product to add
   */
  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.productCards.filter({
      hasText: productName,
    });

    await productCard.getByRole("button", { name: "Add To Cart" }).click();
  }

 /**
 * Verify the displayed price for a specific product.
 *
 * @param productName Name of the product.
 * @param expectedPrice Expected displayed price.
 */
async verifyProductPrice(
  productName: string,
  expectedPrice: string
): Promise<void> {
  const productCard = this.productCards.filter({
    hasText: productName,
  });

  const productPrice = productCard.getByTestId('product-price');

  const actualPrice = (await productPrice.textContent())?.trim();

  expect(
    actualPrice,
    `Incorrect price displayed for "${productName}".`
  ).toBe(expectedPrice);
}
}
