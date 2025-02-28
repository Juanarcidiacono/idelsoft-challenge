import { expect, test } from "@playwright/test";
import { RandomEmailGenerator } from "../../utils/RandomEmailGenerator";
import {
  createUserRequestBody,
  createNewUser,
  consumerToken,
} from "../../utils/UserRequestBody";
import { Actions } from "../../Actions/Actions";

const BASE_URL = "https://magento.softwaretestingboard.com";
export const CUSTOMERS_ENDPOINT = `${BASE_URL}/rest/default/V1/customers`;
export const TOKEN_ENDPOINT = `${BASE_URL}/rest/default/V1/integration/customer/token`;
const CUSTOMER_ME_ENDPOINT = `${BASE_URL}/rest/default/V1/customers/me`;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

let customerPassword: string;
let validEmail: string;
let actions: Actions;

test.beforeAll(async () => {
  validEmail = await new RandomEmailGenerator().generateRandomEmail();
  customerPassword = "Password1";
});

test.beforeEach(({ page }) => {
  actions = new Actions(page);
});

test.describe("Magento API Tests", () => {
  test("should create a new user with valid email address", async ({
    request,
  }) => {
    console.log(validEmail);
    const [response, responseBody] = await createNewUser(
      validEmail,
      customerPassword,
      request
    );
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody.email).toBe(validEmail);
  });

  test("should fail to create a user with invalid email address", async ({
    request,
  }) => {
    const invalidEmail = validEmail.replace("@", "");
    const requestBody = await createUserRequestBody(
      invalidEmail,
      customerPassword
    );

    const response = await request.post(CUSTOMERS_ENDPOINT, {
      data: requestBody,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(400);
    expect(responseBody.message).toBe('"Email" is not a valid email address.');
  });

  test("should create a new customer account with admin token", async ({
    request,
  }) => {
    const requestBody = await createUserRequestBody(
      validEmail,
      customerPassword
    );

    const response = await request.post(CUSTOMERS_ENDPOINT, {
      data: requestBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty("id");
    expect(responseBody.email).toBe(validEmail);
    expect(responseBody.firstname).toBe("Jane");
    expect(responseBody.lastname).toBe("Doe");
    expect(responseBody.addresses).toHaveLength(1);
  });

  test("should retrieve customer information using token", async ({
    request,
  }) => {
    await createNewUser(validEmail, customerPassword, request);
    const tokenRequestBody = {
      username: validEmail,
      password: customerPassword,
    };

    const tokenResponse = await request.post(TOKEN_ENDPOINT, {
      data: tokenRequestBody,
      headers: {
        "Content-Type": "application/json",
      },
    });

    expect(tokenResponse.status()).toBe(200);

    const customerToken = (await tokenResponse.text()).replace(/"/g, "");

    const response = await request.get(CUSTOMER_ME_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`,
      },
    });

    expect(response.status()).toBe(200);
  });

  test("should reject request with invalid authentication token", async ({
    request,
  }) => {
    const response = await request.get(CUSTOMER_ME_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer invalidToken123",
      },
    });
    const responseBody = await response.json();

    expect(response.status()).toBe(401);
    expect(responseBody).toHaveProperty("message");
  });

  test("should reject creation of customer with existing email", async ({
    request,
  }) => {
    const [,requestBody] = await createNewUser(validEmail, customerPassword, request);

    const response = await request.post(CUSTOMERS_ENDPOINT, {
      data: requestBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ADMIN_TOKEN}`,
      },
    });

    expect(response.status()).toBe(400);
  });

  test("should retrieve customer information", async ({ request }) => {
    const [createResponse, createResponseBody] = await createNewUser(
      validEmail,
      customerPassword,
      request
    );

    const userId = createResponseBody.id;

    expect(createResponse.status()).toBe(200);

    const customerToken = await consumerToken(
      validEmail,
      customerPassword,
      request
    );

    const response = await request.get(`${CUSTOMER_ME_ENDPOINT}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerToken}`,
      },
    });

    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(userId).toBe(responseBody.id);
  });
});
