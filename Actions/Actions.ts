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
   * @param {Object} options - Navigation options (timeout, waitUntil, etc)
   * @returns {Promise<void>}
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Waits for an element to be visible on the page
   *
   * @param {string} selector - CSS or XPath selector of the element
   * @param {number} timeout - Maximum wait time in milliseconds
   * @returns {Promise<Locator>} Element locator
   */
  async waitForElement(
    selector: string,
    timeout: number = 30000
  ): Promise<Locator> {
    const element = this.page.locator(selector);
    await element.waitFor({ state: "visible", timeout });
    return element;
  }

  /**
   * Clicks on an element
   *
   * @param {string} selector - CSS or XPath selector of the element
   * @param {Object} options - Click options (delay, button, modifiers, etc)
   * @returns {Promise<void>}
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Types text into a form element
   *
   * @param {string} selector - CSS or XPath selector of the element
   * @param {string} text - Text to type
   * @param {Object} options - Typing options (delay, noWaitAfter, etc)
   * @returns {Promise<void>}
   */
  async type(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  /**
   * Gets the text of an element
   *
   * @param {string} selector - CSS or XPath selector of the element
   * @returns {Promise<string>} Element text
   */
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) || "";
  }

  /**
   * Checks if an element is visible on the page
   *
   * @param {string} selector - CSS or XPath selector of the element
   * @returns {Promise<boolean>} true if the element is visible, false otherwise
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  /**
   * Takes a screenshot of the current page
   *
   * @param {string} path - Path where to save the screenshot
   * @param {Object} options - Screenshot options (fullPage, clip, etc)
   * @returns {Promise<Buffer>} Buffer with the captured image
   */
  async takeScreenshot(path?: string, options: any = {}): Promise<Buffer> {
    return await this.page.screenshot({ path, ...options });
  }

  /**
   * Selects an option in a select element
   *
   * @param {string} selector - CSS or XPath selector of the select element
   * @param {string|string[]} values - Value or values to select
   * @returns {Promise<string[]>} Selected values
   */
  async select(locator: Locator, values: string | string[]): Promise<string[]> {
    if (!this.page) {
      throw new Error("Page not initialized. Call newPage() first.");
    }
    return await locator.selectOption(values);
  }

  /**
   * Waits for a condition to be true on the page
   *
   * @param {Function} predicate - Function that returns a boolean
   * @param {number} timeout - Maximum wait time in milliseconds
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
   * @param {string} selector - CSS or XPath selector of the element
   * @param {string|RegExp} expected - Expected text or regular expression
   * @returns {Promise<void>}
   */
  async expectToHaveText(
    locator: Locator,
    expected: string | RegExp
  ): Promise<void> {
    if (!this.page) {
      throw new Error("Page not initialized. Call newPage() first.");
    }
    await expect(locator).toHaveText(expected);
  }

  /**
   * Waits for an element to disappear from the page
   *
   * @param {string} selector - CSS or XPath selector of the element
   * @param {number} timeout - Maximum wait time in milliseconds
   * @returns {Promise<void>}
   */
  async waitForElementToBeHidden(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    if (!this.page) {
      throw new Error("Page not initialized. Call newPage() first.");
    }
    await locator.waitFor({ state: "hidden", timeout });
  }

  /**
   * Presses a key or key combination
   *
   * @param {string} key - Key or key combination (E.g.: 'Enter', 'Control+A')
   * @returns {Promise<void>}
   */
  async pressKey(key: string): Promise<void> {
    if (!this.page) {
      throw new Error("Page not initialized. Call newPage() first.");
    }
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
   * Clicks on a random element from a collection of elements that match the selector
   *
   * @param {string} selector - CSS or XPath selector that matches multiple elements
   * @returns {Promise<number>} - The index of the randomly selected element
   */
  async clickRandom(elements: Locator): Promise<void> {
    const count = await elements.count();
    const randomIndex = Math.floor(Math.random() * count);
    await elements.nth(randomIndex).click();
  }
}
