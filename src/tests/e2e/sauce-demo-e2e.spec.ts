import { expect, test } from "../../fixtures/custom-fixtures";
import { allure } from 'allure-playwright';

test.describe('SauceDemo E2E Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Complete purchase flow with standard user', { tag: '@smoke' }, async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    allure.epic('E-Commerce');
    allure.feature('Purchase');
    allure.story('Complete purchase flow');
    allure.severity('critical');

    await loginPage.login('standard_user', 'secret_sauce');
    expect(await inventoryPage.isInventoryPageLoaded()).toBeTruthy();

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    await inventoryPage.goToCart();
    expect(await cartPage.isCartPageLoaded()).toBeTruthy();

    await cartPage.proceedToCheckout();
    expect(await checkoutStepOnePage.isCheckoutStepOnePageLoaded()).toBeTruthy();

    await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.continueToStepTwo();
    expect(await checkoutStepTwoPage.isCheckoutStepTwoPageLoaded()).toBeTruthy();

    const subtotal = await checkoutStepTwoPage.getSubtotal();
    const tax = await checkoutStepTwoPage.getTax();
    const total = await checkoutStepTwoPage.getTotal();
    expect(total).toBeCloseTo(subtotal + tax, 2);

    await checkoutStepTwoPage.finishCheckout();
    expect(await checkoutCompletePage.isCheckoutCompletePageLoaded()).toBeTruthy();

    const thankYouMessage = await checkoutCompletePage.getThankYouHeader();
    expect(thankYouMessage).toContain('Thank you for your order');
  });

  test('Invalid login attempt', { tag: '@negative' }, async ({ loginPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Authentication');
    allure.story('Invalid login');
    allure.severity('normal');

    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorMessage = await loginPage.getError();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('Locked out user attempt', { tag: '@security' }, async ({ loginPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Authentication');
    allure.story('Locked out user login');
    allure.severity('critical');

    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorMessage = await loginPage.getError();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out');
  });

  test('Sort products by price', { tag: '@regression' }, async ({ loginPage, inventoryPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Product Inventory');
    allure.story('Sort products by price');
    allure.severity('normal');

    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.sortByPriceLowToHigh();
    const prices = await inventoryPage.getInventoryItemPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);

    await inventoryPage.sortByPriceHighToLow();
    const pricesDesc = await inventoryPage.getInventoryItemPrices();
    const sortedPricesDesc = [...pricesDesc].sort((a, b) => b - a);
    expect(pricesDesc).toEqual(sortedPricesDesc);
  });

  test('Add and remove items from cart', { tag: '@cart' }, async ({ loginPage, inventoryPage, cartPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Cart');
    allure.story('Add and remove cart items');
    allure.severity('normal');

    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addItemToCart(0);
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    await inventoryPage.addItemToCart(1);
    expect(await inventoryPage.getCartItemCount()).toBe(2);

    await inventoryPage.removeItemFromCart(0);
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    await inventoryPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toHaveLength(1);
  });
});