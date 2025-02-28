import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class ListingPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.productOptions = this.page.locator("css=div .products.wrapper.grid.products-grid span.product-image-wrapper")
  }

  readonly productOptions: Locator;
}
