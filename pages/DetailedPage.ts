

import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

/**
 * Class representing the main page of the application.
 * Extends the BasePage class and encapsulates the selectors and methods
 * for interacting with the UI elements on the main page.
 */
export class DetailedPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.sizeOption = this.page.locator("css=div[attribute-code='size'] div.swatch-option.text")
    this.addToCartButton = this.page.getByTestId("product-addtocart-button");
    this.colorSection = this.page.locator("css=.swatch-attribute.color");
    this.colors = this.page.locator("css=.swatch-option.color");
    this.nameOfTheArticle = this.page.locator("css=span[data-ui-id='page-title-wrapper']");
  }

  readonly sizeOption: Locator;
  readonly addToCartButton: Locator;
  readonly colorSection: Locator;
  readonly colors: Locator;
  readonly nameOfTheArticle: Locator;
}
