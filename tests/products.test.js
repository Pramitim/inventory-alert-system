const request = require("supertest");
//imports SuperJest library
const app = require("../app"); 
//loads app

describe("POST /products", () => {
//describe is used to group tests logically 

  it("adds a new product", async () => {
    // "it" is a jest function for a single test

    const response = await request(app)
    // starts sending a fake HTTP request 

      .post("/products")
      //includes HTTP method + route
      .send({
        name: "Apples",
        quantity: 10,
        alert_threshold: 5
      });

    expect(response.statusCode).toBe(200);
    //if returns 400, 500, 404 test fails 

    expect(response.text).toContain("Inventory processed!");
    // these assertions must be true for test to pass 

  });
});

