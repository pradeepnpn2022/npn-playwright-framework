import { allure } from 'allure-playwright';
import { expect, test } from '../../fixtures/custom-fixtures';

test.describe('SauceDemo authentication specs', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('logs in with a standard user', { tag: ['@authentication', '@smoke'] }, async ({ page, loginPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Authentication');
    allure.story('Standard user login');
    allure.severity('critical');

    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('rejects invalid credentials', { tag: ['@authentication', '@negative'] }, async ({ loginPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Authentication');
    allure.story('Invalid credentials');
    allure.severity('normal');

    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.getError()).resolves.toContain('Username and password do not match');
  });

  test('rejects a locked-out user', { tag: ['@authentication', '@security'] }, async ({ loginPage }) => {
    allure.epic('E-Commerce');
    allure.feature('Authentication');
    allure.story('Locked-out user');
    allure.severity('critical');

    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.getError()).resolves.toContain('Epic sadface: Sorry, this user has been locked out');
  });
});
