const seed = require("../db/seeds/seed")
const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data/index");

beforeEach(() => seed({ categoryData, commentData, reviewData, userData }));

afterAll(() => db.end());

describe("GET /api/categories", () => {
  test.only("200: should return a list of categories ", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(string),
            description: expect.any(string),
          });
        });
      });
  });
  test("404: responds with a not found message ", () => {
    return request(app)
      .get("/api/nothinghere")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("not found");
      });
  });
});
