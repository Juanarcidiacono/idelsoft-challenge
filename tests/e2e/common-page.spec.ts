import { test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { Actions } from "../../Actions/Actions";
import { CommonPage } from "../../pages/CommonPage";
import { urls } from "../../fixtures/urls.json";

let homePage: HomePage;
let actions: Actions;
let common: CommonPage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  actions = new Actions(page);
  common = new CommonPage(page);
  await actions.navigate("/");
});

test.describe("Common Pages", () => {
  test.describe("After clicking in a button from the main menu then the user", () => {
    test("should navigate to What's New page", async () => {
      await actions.click(common.whatsNewButton);
      await actions.expectCurrentUrl(urls.whatsnew);
    });

    test("should navigate to Women's page", async () => {
      await actions.click(common.womenButton);
      await actions.expectCurrentUrl(urls.women);
    });

    test("should navigate to Men's page", async () => {
      await actions.click(common.menButton);
      await actions.expectCurrentUrl(urls.men);
    });

    test("should navigate to Gear's page", async () => {
      await actions.click(common.gearButton);
      await actions.expectCurrentUrl(urls.gear);
    });

    test("should navigate to Training's page", async () => {
      await actions.click(common.trainingButton);
      await actions.expectCurrentUrl(urls.training);
    });

    test("should navigate to Sale's page", async () => {
      await actions.click(common.saleButton);
      await actions.expectCurrentUrl(urls.sale);
    });
  });

  test.describe("Search functionality verification", () => {
    test("should navigate to women's shoes page when searching for 'shoes for women'", async () => {
      await actions.type(common.searchInput, "shoes for women");
      await actions.pressKey("Enter");
      await actions.expectCurrentUrl(urls.shoesForWomen);
    });
  });
})