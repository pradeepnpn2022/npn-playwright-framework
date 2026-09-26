import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class CheckoutCompletePage extends BasePage {
  // Locators
  readonly thankYouHeader: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly ponyExpressImage: Locator;
  readonly backHomeButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    
    this.thankYouHeader = page.locator('.complete-header');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('.complete-text');
    this.ponyExpressImage = page.locator('.pony_express');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.title = page.locator('.title');
  }

  async goBackToProducts() {
    await this.backHomeButton.click();
  }

  async getThankYouHeader() {
    return await this.thankYouHeader.textContent();
  }

  async getCompleteText() {
    return await this.completeText.textContent();
  }

  async isCheckoutCompletePageLoaded() {
    return await this.completeHeader.isVisible();
  }

  async isPonyExpressImageVisible() {
    return await this.ponyExpressImage.isVisible();
  }

  async getTitleText() {
    return await this.title.textContent();
  }

  async isBackHomeButtonVisible() {
    return await this.backHomeButton.isVisible();
  }
}