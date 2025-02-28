import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class CommonPage extends BasePage {
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

  readonly whatsNewButton: Locator;
  readonly womenButton: Locator;
  readonly menButton: Locator;
  readonly gearButton: Locator;
  readonly trainingButton: Locator;
  readonly saleButton: Locator;
  readonly searchInput: Locator;
  readonly shoppingCart: Locator;
  readonly nameOfTheArticleInTheShoppingCart: Locator;
}
