import { allure } from 'allure-playwright';
import { expect, test } from '../../fixtures/custom-fixtures';

test.describe('SauceDemo shopping specs', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('completes a backpack purchase', { tag: ['@shopping', '@smoke'] }, async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    allure.epic('E-Commerce');
    allure.feature('Purchase');
    allure.story('Complete backpack purchase');
    allure.severity('critical');

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    await inventoryPage.goToCart();
    expect(await cartPage.isCartPageLoaded()).toBeTruthy();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCheckoutInformation('John', 'Doe', '12345');
    await checkoutStepOnePage.continueToStepTwo();

    const subtotal = await checkoutStepTwoPage.getSubtotal();
    const tax = await checkoutStepTwoPage.getTax();
    expect(await checkoutStepTwoPage.getTotal()).toBeCloseTo(subtotal + tax, 2);

    await checkoutStepTwoPage.finishCheckout();
    await expect(checkoutCompletePage.thankYouHeader).toContainText('Thank you for your order');
  });

  test('sorts products from low to high', { tag: ['@shopping', '@regression'] }, async ({ loginPage, inventoryPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Product Inventory');
    allure.story('Sort products by price');
    allure.severity('normal');

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.getInventoryItemPrices();
    expect(prices).toEqual([...prices].sort((firstPrice, secondPrice) => firstPrice - secondPrice));
  });

  test('removes an item from the cart', { tag: ['@shopping', '@cart'] }, async ({ loginPage, inventoryPage, cartPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Cart');
    allure.story('Remove an item from the cart');
    allure.severity('normal');

    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    expect(await inventoryPage.getCartItemCount()).toBe(2);

    await inventoryPage.removeItemFromCart(0);
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);
  });
});
