import {
  expect,
  Locator,
} from "@playwright/test";
import { BasePage } from "../pages/BasePage";

/**
 * Wrapper class for the most common Playwright functions
 * Simplifies web test automation operations
 */
export class Actions extends BasePage {

  /**
   * Navigates to the specified URL
   *
   * @param {string} url - URL to navigate to
   * @returns {Promise<void>}
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Waits for an element to be visible on the page
   *
   * @param {string} locator - Locator of the element to click
   * @param {number} [timeout=30000] - Maximum wait time in milliseconds
   * @returns {Promise<Locator>} Element locator
   */
  async waitForElement(
    locator: Locator,
    timeout: number = 30000
  ): Promise<Locator> {
    await locator.waitFor({ state: "visible", timeout });
    return locator;
  }

  /**
   * Clicks on an element
   *
   * @param {Locator} locator - Locator of the element to click
   * @returns {Promise<void>}
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Types text into a form element
   *
   * @param {Locator} locator - Locator of the element to type into
   * @param {string} text - Text to type
   * @returns {Promise<void>}
   */
  async type(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Gets the text of an element
   *
   * @param {Locator} locator - Locator of the element to get text from
   * @returns {Promise<string>} Element text
   */
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || "";
  }

  /**
   * Checks if an element is visible on the page
   *
   * @param {Locator} locator - Locator of the element to check
   * @returns {Promise<boolean>} true if the element is visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Takes a screenshot of the current page
   *
   * @param {string} [path] - Path where to save the screenshot
   * @param {Object} [options={}] - Screenshot options (fullPage, clip, etc)
   * @returns {Promise<Buffer>} Buffer with the captured image
   */
  async takeScreenshot(path?: string, options: any = {}): Promise<Buffer> {
    return await this.page.screenshot({ path, ...options });
  }

  /**
   * Selects an option in a select element
   *
   * @param {Locator} locator - Locator of the select element
   * @param {string|string[]} values - Value or values to select
   * @returns {Promise<string[]>} Selected values
   */
  async select(locator: Locator, values: string | string[]): Promise<string[]> {
    return await locator.selectOption(values);
  }

  /**
   * Waits for a condition to be true on the page
   *
   * @param {Function} predicate - Function that returns a boolean
   * @param {number} [timeout=30000] - Maximum wait time in milliseconds
   * @returns {Promise<void>}
   */
  async waitForCondition(
    predicate: () => Promise<boolean> | boolean,
    timeout: number = 30000
  ): Promise<void> {
    await this.page.waitForFunction(predicate, { timeout });
  }

  /**
   * Waits a specific time (useful for debugging)
   *
   * @param {number} milliseconds - Time to wait in milliseconds
   * @returns {Promise<void>}
   */
  async wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Refreshes the current page
   *
   * @returns {Promise<void>}
   */
  async refresh(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Verifies that an element has certain text
   *
   * @param {Locator} locator - Locator of the element to check
   * @param {string|RegExp} expected - Expected text or regular expression
   * @returns {Promise<void>}d
   */
  async expectToHaveText(
    locator: Locator,
    expected: string | RegExp
  ): Promise<void> {
    await expect(locator).toHaveText(expected);
  }

  /**
   * Waits for an element to disappear from the page
   *
   * @param {Locator} locator - Locator of the element to wait for
   * @param {number} [timeout=30000] - Maximum wait time in milliseconds
   * @returns {Promise<void>}is not initialized
   */
  async waitForElementToBeHidden(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    await locator.waitFor({ state: "hidden", timeout });
  }

  /**
   * Presses a key or key combination
   *
   * @param {string} key - Key or key combination (E.g.: 'Enter', 'Control+A')
   * @returns {Promise<void>}page is not initialized
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Verifies if the current URL matches the expected path relative to baseURL
   *
   * @param {string} path - The path part to verify (e.g., 'what-is-new.html')
   * @returns {Promise<void>} - Throws an error if URLs don't match
   */
  async expectCurrentUrl(path: string): Promise<void> {
    const normalizedPath = path.startsWith("/") ? path.substring(1) : path;
    await expect(this.page).toHaveURL(normalizedPath);
  }

  /**
   * Clicks on a random element from a collection of elements
   *
   * @param {Locator} elements - Locator of elements to choose from
   * @returns {Promise<void>}
   */
  async clickRandom(elements: Locator): Promise<void> {
    const count = await elements.count();
    const randomIndex = Math.floor(Math.random() * count);
    await elements.nth(randomIndex).click();
  }
}