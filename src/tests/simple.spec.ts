import test from "@playwright/test";

test("Sample test to verify global setup and storage state", async ({ page }) => {
  // Load the storage state from the file created during global setup
  await page.context().addCookies(require('../storageState.json').cookies);
});