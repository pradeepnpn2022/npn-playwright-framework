import { Locator, Page } from "@playwright/test";
import logger from "../utils/logger";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    logger.info(`Navigating to ${url}`);
    await this.page.goto(url);
  }

  async click(locator: Locator, name: string = 'element') {
    logger.info(`Clicking ${name}`);
    await locator.click();
  }

  async fill(locator: Locator, text: string, name: string = 'field') {
    logger.info(`Filling ${name} with ${text}`);
    await locator.fill(text);
  }

  async waitForUrl(url: string) {
    logger.info(`Waiting for URL: ${url}`);
    return this.page.waitForURL(url);
  }

  async takeScreenshot(name: string) {
    logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}