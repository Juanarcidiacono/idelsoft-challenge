## Idelsoft E-commerce Testing

This project contains automated tests for an e-commerce website using Playwright. The tests cover various pages and functionalities of the website to ensure it works as expected.

## Key Directories and Files

*   **Actions/**: Contains the `Actions.ts` file which defines common actions that can be performed on the web pages.
*   **fixtures/**: Contains JSON files with test data such as URLs and articles.
*   **pages/**: Contains page object models for different pages of the website.
*   **tests/**: Contains the test specifications for different pages.
*   **utils/**: Contains utility functions used across tests.

## Setup

1.  Clone the repository:  
    `git clone <repository-url>`
    ` cd <repository-directory>`
2.  Install dependencies:  
    `npm install`
3.  Run the tests  
    `npx playwright test`