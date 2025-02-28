import { test,expect } from "@playwright/test";
import { Actions } from "../../Actions/Actions";
import { CommonPage } from "../../pages/CommonPage";
import { DetailedPage } from "../../pages/DetailedPage";
import { Utils } from "../../Utils/Utils";
import { ListingPage } from "../../pages/ListingPage";

let actions: Actions;
let common: CommonPage;
let detailedPage: DetailedPage;
let utils: Utils;
let listingPage: ListingPage;

test.beforeEach(async ({ page }) => {
  actions = new Actions(page);
  common = new CommonPage(page);
  detailedPage = new DetailedPage(page);
  utils = new Utils(page);
  listingPage = new ListingPage(page);
  await actions.navigate("/");
});

test.describe("Detailed Page", () => {
  test("verify an article is added to the shopping cart correctly", async () => {
    const randomUrl = await utils.getRandomUrl(
      "././fixtures/articles-women-men.json"
    );

    await actions.navigate(randomUrl);
    await actions.clickRandom(listingPage.productOptions);
    await actions.clickRandom(detailedPage.sizeOption);

    (await detailedPage.colorSection.isVisible())
      ? (await actions.clickRandom(detailedPage.colors),
        await actions.click(detailedPage.addToCartButton))
      : await actions.click(detailedPage.addToCartButton);

    const nameOfTheArticle = await actions.getText(detailedPage.nameOfTheArticle);

    await actions.click(common.shoppingCart)
    
    const nameOfTheArticleInTheShoppingCart = await actions.getText(common.nameOfTheArticleInTheShoppingCart)

    expect(nameOfTheArticle).toBe(nameOfTheArticleInTheShoppingCart)

  });
});
