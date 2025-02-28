import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

/**
* Represents the product listing page
* Manages locators for product display and selection
*/
export class ListingPage extends BasePage {
 /**
  * Locator for product options in the grid view
  * @readonly
  */
 readonly productOptions: Locator;

 /**
  * Creates an instance of ListingPage
  * Initializes locators for listing page elements
  * 
  * @param {Page} page - The Playwright page object
  */
 constructor(page: Page) {
   super(page);
   this.productOptions = this.page.locator("css=div .products.wrapper.grid.products-grid span.product-image-wrapper")
 }
}