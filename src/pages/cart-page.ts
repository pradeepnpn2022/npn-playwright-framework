import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutStepOnePage } from "./checkout-step-one-page";

export class CartPage extends BasePage {
  // Locators
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;
  readonly removeButtons: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartQuantity: Locator;

  constructor(page: Page) {
    super(page);
    
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.removeButtons = page.locator('[data-test^="remove"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartQuantity = page.locator('.cart_quantity');
  }

  async removeItemFromCart(index: number) {
    await this.removeButtons.nth(index).click();
  }

  async removeItemFromCartByName(itemName: string) {
    const item = this.page.locator(`.cart_item:has-text("${itemName}")`);
    await item.locator('[data-test^="remove"]').click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    return new CheckoutStepOnePage(this.page);
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async getCartItemPrices() {
    const prices = await this.cartItemPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async getCartQuantity(index: number) {
    return await this.cartQuantity.nth(index).textContent();
  }

  async isCartPageLoaded() {
    return await this.checkoutButton.isVisible();
  }

  async getTotalItemsInCart() {
    const quantityElements = await this.cartQuantity.all();
    let total = 0;
    for (const qty of quantityElements) {
      total += parseInt(await qty.textContent() || '0');
    }
    return total;
  }
}