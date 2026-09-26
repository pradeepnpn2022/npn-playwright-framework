import { expect, test } from '../../fixtures/custom-fixtures';
import { allure } from 'allure-playwright';

type LoginCase = {
  username: string;
  password: string;
  expectedResult: 'valid' | 'invalid';
  expectedError?: string;
};

const loginCases: LoginCase[] = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expectedResult: 'valid',
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedResult: 'invalid',
    expectedError: 'Epic sadface: Sorry, this user has been locked out',
  },
  {
    username: 'invalid_user',
    password: 'wrong_password',
    expectedResult: 'invalid',
    expectedError: 'Username and password do not match',
  },
];

test.describe('SauceDemo parameterized login', () => {
  for (const loginCase of loginCases) {
    test(`${loginCase.expectedResult} login: ${loginCase.username}`, {
      tag: ['@login', '@parameterized'],
    }, async ({ page, loginPage }) => {
      allure.epic('E-Commerce');
      allure.feature('Authentication');
      allure.story(`${loginCase.expectedResult} login`);
      allure.severity(loginCase.expectedResult === 'valid' ? 'critical' : 'normal');
      allure.parameter('username', loginCase.username);
      allure.parameter('expectedResult', loginCase.expectedResult);

      await loginPage.goto();
      await loginPage.login(loginCase.username, loginCase.password);

      if (loginCase.expectedResult === 'valid') {
        await expect(page).toHaveURL(/inventory\.html/);
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.getError()).resolves.toContain(loginCase.expectedError);
      }
    });
  }
});
