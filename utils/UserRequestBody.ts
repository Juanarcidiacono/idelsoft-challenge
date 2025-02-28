import { CUSTOMERS_ENDPOINT } from '../tests/api/magneto.spec'; 

export const createUserRequestBody = (email: string, customerPassword: string) => {
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

export const createNewUser = async (validEmail: string, customerPassword: string, request: any) => {
  const requestBody = createUserRequestBody(validEmail, customerPassword);

  const response = await request.post(CUSTOMERS_ENDPOINT, {
    data: requestBody,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();

  return [response, responseBody];
};