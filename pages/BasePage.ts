import { Page } from "@playwright/test";

/**
* Base class for all page objects in the test framework
* Provides a common structure for page interactions
*/
export class BasePage {
 /**
  * The Playwright Page object representing the current page
  * @protected
  */
 protected page: Page;

 /**
  * Creates an instance of BasePage
  * 
  * @param {Page} page - The Playwright page object to be used for interactions
  */
 constructor(page: Page) {
   this.page = page;
 }
}