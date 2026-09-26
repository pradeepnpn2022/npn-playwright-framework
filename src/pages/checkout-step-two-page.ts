import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutCompletePage } from "./checkout-complete-page";

export class CheckoutStepTwoPage extends BasePage {
  // Locators
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;
  readonly cartItemQuantities: Locator;
  readonly summarySubtotal: Locator;
  readonly summaryTax: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.cartItemQuantities = page.locator('.cart_quantity');
    this.summarySubtotal = page.locator('.summary_subtotal_label');
    this.summaryTax = page.locator('.summary_tax_label');
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.title = page.locator('.title');
  }

  async finishCheckout() {
    await this.finishButton.click();
    return new CheckoutCompletePage(this.page);
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async getCartItemNames() {
    return await this.cartItemNames.allTextContents();
  }

  async getCartItemPrices() {
    const prices = await this.cartItemPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async getItemQuantities() {
    const quantities = await this.cartItemQuantities.allTextContents();
    return quantities.map(q => parseInt(q));
  }

  async getSubtotal() {
    const text = await this.summarySubtotal.textContent();
    return parseFloat(text?.replace('Item total: $', '') || '0');
  }

  async getTax() {
    const text = await this.summaryTax.textContent();
    return parseFloat(text?.replace('Tax: $', '') || '0');
  }

  async getTotal() {
    const text = await this.summaryTotal.textContent();
    return parseFloat(text?.replace('Total: $', '') || '0');
  }

  async isCheckoutStepTwoPageLoaded() {
    return await this.title.isVisible();
  }

  async getTitleText() {
    return await this.title.textContent();
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }
}