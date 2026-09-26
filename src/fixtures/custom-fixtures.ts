import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { ExcelReader } from '../utils/excel-reader';
import { CsvReader } from '../utils/csv-reader';
import { JsonReader } from '../utils/json-reader';
import { CartPage } from '../pages/cart-page';
import { CheckoutStepOnePage } from '../pages/checkout-step-one-page';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two-page';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';

// Extend the base test
export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  excel: typeof ExcelReader;
  csv: typeof CsvReader;
  json: typeof JsonReader;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  excel: async ({}, use) => await use(ExcelReader),
  csv: async ({}, use) => await use(CsvReader),
  json: async ({}, use) => await use(JsonReader),
});

export { expect } from '@playwright/test';