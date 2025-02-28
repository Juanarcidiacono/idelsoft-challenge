import { expect } from "@playwright/test";
import { CUSTOMERS_ENDPOINT, TOKEN_ENDPOINT } from "../tests/api/magneto.spec";

export const createUserRequestBody = async (
  email: string,
  customerPassword: string
) => {
  return {
    customer: {
      email: email,
      firstname: "Jane",
      lastname: "Doe",
      addresses: [
        {
          defaultShipping: true,
          defaultBilling: true,
          firstname: "Jane",
          lastname: "Doe",
          region: {
            regionCode: "NY",
            region: "New York",
            regionId: 43,
          },
          postcode: "10755",
          street: ["123 Oak Ave"],
          city: "Purchase",
          telephone: "512-555-1111",
          countryId: "US",
        },
      ],
    },
    password: customerPassword,
  };
};

export const createNewUser = async (
  validEmail: string,
  customerPassword: string,
  request: any
) => {
  const requestBody = await createUserRequestBody(validEmail, customerPassword);

  const response = await request.post(CUSTOMERS_ENDPOINT, {
    data: requestBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
    },
  });
  const responseBody = await response.json();

  return [responseBody,requestBody];
};

export const consumerToken = async (
  validEmail: string,
  customerPassword: string,
  request: any
) => {
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

  return customerToken;
};
