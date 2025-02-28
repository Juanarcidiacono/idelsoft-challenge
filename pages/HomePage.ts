import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.items = this.page.locator("css=.product-item-info")
  }

  readonly items: Locator;
}
