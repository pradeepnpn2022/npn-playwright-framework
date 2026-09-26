import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { CartPage } from "./cart-page";

export class InventoryPage extends BasePage {
  // Locators
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly productSortDropdown: Locator;
  readonly inventoryItemNames: Locator;
  readonly inventoryItemPrices: Locator;

  constructor(page: Page) {
    super(page);
    
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
    this.removeButtons = page.locator('[data-test^="remove"]');
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.productSortDropdown = page.locator('[data-test="product_sort_container"]');
    this.inventoryItemNames = page.locator('.inventory_item_name');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
  }

  async addItemToCart(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  async addItemToCartByName(itemName: string) {
    const item = this.page.locator(`.inventory_item:has-text("${itemName}")`);
    await item.locator('[data-test^="add-to-cart"]').click();
  }

  async removeItemFromCart(index: number) {
    await this.removeButtons.nth(index).click();
  }

  async getCartItemCount() {
    const badge = this.shoppingCartBadge;
    if (await badge.isVisible()) {
      return parseInt(await badge.textContent() || '0');
    }
    return 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
    return new CartPage(this.page);
  }

  async getInventoryItemNames() {
    return await this.inventoryItemNames.allTextContents();
  }

  async getInventoryItemPrices() {
    const prices = await this.inventoryItemPrices.allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async sortProductsBy(sortOption: string) {
    await this.productSortDropdown.selectOption(sortOption);
  }

  async sortByNameAsc() {
    await this.sortProductsBy('az');
  }

  async sortByNameDesc() {
    await this.sortProductsBy('za');
  }

  async sortByPriceLowToHigh() {
    await this.sortProductsBy('lohi');
  }

  async sortByPriceHighToLow() {
    await this.sortProductsBy('hilo');
  }

  async getItemDetails(index: number) {
    const item = this.inventoryItems.nth(index);
    return {
      name: await item.locator('.inventory_item_name').textContent(),
      description: await item.locator('.inventory_item_desc').textContent(),
      price: await item.locator('.inventory_item_price').textContent(),
    };
  }

  async isInventoryPageLoaded() {
    return await this.inventoryContainer.isVisible();
  }
}