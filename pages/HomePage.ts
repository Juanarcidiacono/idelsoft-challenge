import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

/**
* Represents the home page of the website
* Manages locators for items and hot sellers section
*/
export class HomePage extends BasePage {
 /**
  * Locator for product items on the home page
  * @readonly
  */
 readonly items: Locator;

 /**
  * Locator for the hot sellers section heading
  * @readonly
  */
 readonly hotSellersSection: Locator;

 /**
  * Creates an instance of HomePage
  * Initializes locators for home page elements
  * 
  * @param {Page} page - The Playwright page object
  */
 constructor(page: Page) {
   super(page);
   this.items = this.page.locator("css=.product-item-info")
   this.hotSellersSection = this.page.locator("css=h2")
 }
}