import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CheckoutStepTwoPage } from "./checkout-step-two-page";

export class CheckoutStepOnePage extends BasePage {
  // Locators
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.title = page.locator('.title');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToStepTwo() {
    await this.continueButton.click();
    return new CheckoutStepTwoPage(this.page);
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  async isCheckoutStepOnePageLoaded() {
    return await this.title.isVisible();
  }

  async getTitleText() {
    return await this.title.textContent();
  }

  async clearAllFields() {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.postalCodeInput.clear();
  }
}