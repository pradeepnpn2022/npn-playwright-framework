import { chromium } from "@playwright/test";
import * as fs from 'fs-extra';
import testData from '../data/test-data.json';
import logger from "./logger";

async function globalSetup() {
  logger.info('🚀 Global Setup started (UI-based authentication)...');

  // 1. Launch a single browser instance (headless for CI)
  const browser = await chromium.launch({ 
    // headless: true,  // Set to false locally for debugging
  });
  
  // 2. Create a new context (isolated session)
  const context = await browser.newContext({
    ignoreHTTPSErrors: true, // Handles self-signed certs in test envs
    viewport: { width: 1280, height: 720 },
  });
  
  const page = await context.newPage();

  try {
    // 3. Navigate to the login page
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'networkidle' });

    // 4. Perform UI Login (Saucedemo selectors)
    logger.info('Filling login credentials...');
    await page.fill('[data-test="username"]', testData.testCredential1.username);
    await page.fill('[data-test="password"]', testData.testCredential1.password);
    
    logger.info('Submitting login form...');
    await page.click('[data-test="login-button"]');

    // 5. CRITICAL: Wait for successful navigation.
    //    This ensures the cookies are fully set in the browser context.
    await page.waitForURL('**/inventory.html', { timeout: 15000 });
    
    // Optional: Wait for a specific element to ensure the page is fully hydrated.
    await page.waitForSelector('[data-test="shopping-cart-link"]', { timeout: 10000 });

    // 6. Save the storage state (Cookies + LocalStorage) to a file
    await context.storageState({ path: 'storageState.json' });
    
    logger.info('✅ UI Login successful. Storage state saved to storageState.json');

  } catch (error) {
    // PRODUCTION TIP: Take a screenshot on failure so you can debug why login failed.
    await page.screenshot({ path: 'global-setup-failure.png', fullPage: true });
    logger.error(`❌ Global Setup UI login failed: ${error}`);
    
    // If login fails, throw an error to stop the entire test suite from running.
    throw new Error('Global setup authentication failed. Check credentials or application availability.');
    
  } finally {
    // 7. Always close the browser to free up memory
    await browser.close();
  }
}

export default globalSetup;