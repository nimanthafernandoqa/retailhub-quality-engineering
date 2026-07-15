import { test } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("RetailHub Products", () => {
  test.describe.configure({ mode: "serial" });
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.open();
  });

  test("Products page displays the expected products", async () => {
    await productsPage.verifyPageLoaded();
    await productsPage.verifyProductCount(3);
    await productsPage.verifyProductNames([
      "Laptop",
      "Mechanical Keyboard",
      "Wireless Mouse",
    ]);
  });

  test("User can add a laptop to the cart", async () => {
    const initialCount = await productsPage.getCartCount();
    await productsPage.addProductToCart("Laptop");
    await productsPage.verifyCartCount(initialCount + 1);
  });

  test("Product page display the prices for products", async () => {
    const initialCount = await productsPage.getCartCount();
    await productsPage.verifyPageLoaded();
    await productsPage.verifyProductPrice("Laptop", "£1200");
    await productsPage.verifyProductPrice("Mechanical Keyboard", "£150");
    await productsPage.verifyProductPrice("Wireless Mouse", "£45");
  });
});
