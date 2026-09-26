import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.navigate('/');
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username, 'Username');
    await this.fill(this.passwordInput, password, 'Password');
    await this.click(this.loginButton, 'Login Button');
  }

  async getError() {
    return await this.errorMessage.textContent();
  }
}