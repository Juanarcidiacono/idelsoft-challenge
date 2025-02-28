import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { Actions } from "../../Actions/Actions";
import { CommonPage } from "../../pages/CommonPage";

let homePage: HomePage;
let actions: Actions;
let common: CommonPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  actions = new Actions(page);
  common = new CommonPage(page);
  await actions.navigate("/");
});

test.describe("HomePage", () => {
  test("verify the Hot Sellers section is visible", async() => {
    await actions.isVisible(homePage.hotSellersSection)
  })
});