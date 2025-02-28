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

test.describe("HomePage", () => {
    test("should click on a random item", async () => {
        await actions.clickRandom(homePage.items);
    });
});