const seed = require("../db/seeds/seed");
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
  test("200: should return a list of categories ", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404: responds with a not found message ", () => {
    return request(app)
      .get("/api/catgorties")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("path not found");
      });
  });
});
describe("GET /api/reviews/:review_id", () => {
  test("200: should return an object of a review ", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toMatchObject({
          review_id: expect.any(Number),
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
        });
      });
  });
  test("404: responds with a not found message ", () => {
    return request(app)
      .get("/api/reviews/99999999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("review id not found");
      });
  });
  test("400: responds with a 'invalid data type'", () => {
    return request(app)
      .get("/api/reviews/blue")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
});
describe("GET /api/users", () => {
  test("200: should return an object of users", () => {
    return request(app)
      .get("/api/user")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
  test("404: responds with a not found message ", () => {
    return request(app)
      .get("/api/uter")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("path not found");
      });
  });
});
describe("PATCH /api/reviews/:review_id", () => {
  test("200: should return an object of an updated review ", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        const { updatedReview } = body;
        expect(updatedReview).toMatchObject({
          votes: 15,
          review_id: expect.any(Number),
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
        });
      });
  });
  test("400: responds with a 'invalid data type'", () => {
    return request(app)
      .patch("/api/reviews/julie")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
  test("404: responds with a not found message ", () => {
    return request(app)
      .patch("/api/reviews/999999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("review id not found");
      });
  });
});
describe("GET /api/reviews/:review_id (comment count)", () => {
  test("200: should return an object of a review with a new property of column_count", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toMatchObject({
          votes: expect.any(Number),
          review_id: expect.any(Number),
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
          comment_count: 3,
        });
      });
  });
  test("404: responds with not found msg", () => {
    return request(app)
      .get("/api/reviews/99999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("review id not found");
      });
  });
  test("400: responds with a 'invalid data type'", () => {
    return request(app)
      .patch("/api/reviews/julie")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
});
describe("GET /api/reviews", () => {
  test("200: should return an object of a review with a new property of column_count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toHaveLength(13);
        reviews.forEach((review) => {
          expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  test("200: should be sorted by date", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("200: should be able to filter reviews by category", () => {
    return request(app)
      .get("/api/reviews?order=category")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("category", {
          descending: true,
        });
      });
  });
  test("400: should return message invalid order value", () => {
    return request(app)
      .get("/api/reviews?order=apples")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid order value");
      });
  });
  test("404: responds with not found msg", () => {
    return request(app)
      .get("/api/reviets/")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
});
describe("GET /api/reviews/:review_id/comments", () => {
  test("200: should return an array of comments for given review id where each comment should have certain properties", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeArray();
        expect(comments).toHaveLength(3);
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            review_id: 3,
          });
        });
      });
  });
  test("200: should have comments ordered by most recent comment", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("404: responds with not found msg", () => {
    return request(app)
      .get("/api/reviews/99999999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("review id not found");
      });
  });
  test("400: responds with bad path msg", () => {
    return request(app)
      .get("/api/reviews/blue/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
});
