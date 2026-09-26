import { expect, test } from "../../fixtures/custom-fixtures";
import { allure } from 'allure-playwright';
import testData from '../../data/test-data.json';
test.describe('Saucedemo Purchase Flow', () => {

  test('Login -> Add Backpack -> Checkout', { tag: '@purchase' }, async ({ loginPage, inventoryPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Purchase');
    allure.story('Add backpack to cart');
    allure.severity('critical');

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(testData.testCredential1.username, testData.testCredential1.password);
    // expect(inventoryPage.getUrl()).toContain('/inventory.html');
    await inventoryPage.waitForUrl('**/inventory.html');

    // Step 2: Add item
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    expect(await inventoryPage.getCartItemCount()).toBe(1);

    // Step 3: Checkout
    // await inventoryPage.goToCart();
    // await cartPage.clickCheckout();
    // await checkoutPage.fillInformation('John', 'Doe', '12345');
    // await checkoutPage.clickFinish();

    // Step 4: Validate
    // const confirmation = await checkoutPage.getConfirmationMessage();
    // expect(confirmation).toContain('THANK YOU FOR YOUR ORDER');
  });

//   test('Data-Driven Login with CSV', async ({ loginPage, csv }) => {
//     const users = await csv.read('src/data/login-data.csv');
    
//     for (const user of users) {
//       await test.step(`Testing login for ${user.username}`, async () => {
//         await loginPage.goto();
//         await loginPage.login(user.username, user.password);
        
//         if (user.expectedResult === 'valid') {
//           expect(loginPage.getURL()).toContain('/inventory.html');
//           // Reset state for next iteration via cookie clear
//         //   await loginPage.page.context().clearCookies();
//         } else {
//           const error = await loginPage.getError();
//           expect(error).toContain('Username and password do not match');
//         }
//       });
//     }
//   });
});
