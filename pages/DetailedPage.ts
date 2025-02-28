import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Represents the detailed page for a product
 * Manages locators and interactions for product details
 */
export class DetailedPage extends BasePage {
  /**
   * Locator for size options of the product
   * @readonly
   */
  readonly sizeOption: Locator;

  /**
   * Locator for the "Add to Cart" button
   * @readonly
   */
  readonly addToCartButton: Locator;

  /**
   * Locator for the color selection section
   * @readonly
   */
  readonly colorSection: Locator;

  /**
   * Locator for individual color options
   * @readonly
   */
  readonly colors: Locator;

  /**
   * Locator for the name/title of the article
   * @readonly
   */
  readonly nameOfTheArticle: Locator;

  /**
   * Creates an instance of DetailedPage
   * Initializes locators for various product detail elements
   * 
   * @param {Page} page - The Playwright page object
   */
  constructor(page: Page) {
    super(page);
    this.sizeOption = this.page.locator("css=div[attribute-code='size'] div.swatch-option.text")
    this.addToCartButton = this.page.getByTestId("product-addtocart-button");
    this.colorSection = this.page.locator("css=.swatch-attribute.color");
    this.colors = this.page.locator("css=.swatch-option.color");
    this.nameOfTheArticle = this.page.locator("css=span[data-ui-id='page-title-wrapper']");
  }
}