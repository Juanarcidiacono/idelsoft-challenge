import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

/**
 * Represents the common page elements shared across the website
 * Manages navigation buttons, search, and shopping cart locators
 */
export class CommonPage extends BasePage {
  /**
   * Locator for the "What's New" navigation button
   * @readonly
   */
  readonly whatsNewButton: Locator;

  /**
   * Locator for the "Women" category navigation button
   * @readonly
   */
  readonly womenButton: Locator;

  /**
   * Locator for the "Men" category navigation button
   * @readonly
   */
  readonly menButton: Locator;

  /**
   * Locator for the "Gear" category navigation button
   * @readonly
   */
  readonly gearButton: Locator;

  /**
   * Locator for the "Training" category navigation button
   * @readonly
   */
  readonly trainingButton: Locator;

  /**
   * Locator for the "Sale" navigation button
   * @readonly
   */
  readonly saleButton: Locator;

  /**
   * Locator for the search input field
   * @readonly
   */
  readonly searchInput: Locator;

  /**
   * Locator for the shopping cart container
   * @readonly
   */
  readonly shoppingCart: Locator;

  /**
   * Locator for the name of the article in the shopping cart
   * @readonly
   */
  readonly nameOfTheArticleInTheShoppingCart: Locator;

  /**
   * Creates an instance of CommonPage
   * Initializes locators for common website elements
   * 
   * @param {Page} page - The Playwright page object
   */
  constructor(page: Page) {
    super(page);
    this.whatsNewButton = this.page.getByTestId("ui-id-3");
    this.womenButton = this.page.getByTestId("ui-id-4");
    this.menButton = this.page.getByTestId("ui-id-5");
    this.gearButton = this.page.getByTestId("ui-id-6");
    this.trainingButton = this.page.getByTestId("ui-id-7");
    this.saleButton = this.page.getByTestId("ui-id-8");
    this.searchInput = this.page.getByTestId("search");
    this.shoppingCart = this.page.locator("css=div[data-block='minicart']")
    this.nameOfTheArticleInTheShoppingCart = this.page.locator("div[class='product-item-details'] strong a")
  }
}