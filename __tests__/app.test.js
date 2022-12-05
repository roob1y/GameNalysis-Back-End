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

describe("GET /api/", () => {
  test("200: should return a JSON of all endpoints ", () => {
    return request(app).get("/api").expect(200);
  });
});

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
      .get("/api/users")
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
  test("200: should return an object of a review with new properties owner, title, review_id, category, review_img_url, created_at, votes, designer, comment_count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
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
      .get("/api/reviews?sort_by=category")
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
      .get("/api/reviews?sort_by=apples")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid sort by value");
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

describe("POST /api/reviews/:review_id/comments", () => {
  test("201: should return an object of the posted comment", () => {
    const postComment = {
      username: "bainesface",
      body: "OMG I LOVED THIS AS A CHILD",
    };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(postComment)
      .expect(201)
      .then(({ body }) => {
        const { postedComment } = body;
        expect(postedComment.body).toEqual("OMG I LOVED THIS AS A CHILD");
      });
  });
  test("400: invalid review id", () => {
    const postComment = {
      username: "bainesface",
      body: "OMG I LOVED THIS AS A CHILD",
    };
    return request(app)
      .post("/api/reviews/9999999/comments")
      .send(postComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          'Key (review_id)=(9999999) is not present in table "reviews".'
        );
      });
  });
  test("404: invalid path", () => {
    const postComment = {
      username: "bainesface",
      body: "OMG I LOVED THIS AS A CHILD",
    };
    return request(app)
      .post("/api/reviews/3/commates")
      .send(postComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
  test("400: invalid username", () => {
    const postComment = {
      username: "test",
      body: "test",
    };
    return request(app)
      .post("/api/reviews/3/comments")
      .send(postComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          'Key (author)=(test) is not present in table "users".'
        );
      });
  });
  test("400: invalid data type", () => {
    const postComment = {
      username: "bainesface",
      body: "OMG I LOVED THIS AS A CHILD",
    };
    return request(app)
      .post("/api/reviews/angela/comments")
      .expect(400)
      .send(postComment)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
});

describe("GET /api/reviews for queries", () => {
  test("200: should be sorted by sort_by query by title", () => {
    return request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("title", {
          descending: true,
        });
      });
  });
  test("200: should be sorted by sort_by query by designer", () => {
    return request(app)
      .get("/api/reviews?sort_by=designer")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("designer", {
          descending: true,
        });
      });
  });
  test("200: should be sorted by sort_by query by owner", () => {
    return request(app)
      .get("/api/reviews?sort_by=owner")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("owner", {
          descending: true,
        });
      });
  });
  test("200: should be sorted by sort_by query by review_img_url", () => {
    return request(app)
      .get("/api/reviews?sort_by=review_img_url")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("review_img_url", {
          descending: true,
        });
      });
  });
  test("200: should be sorted by sort_by query by review_body", () => {
    return request(app)
      .get("/api/reviews?sort_by=review_body")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("review_body", {
          descending: true,
        });
      });
  });
  test("200: should be sorted by sort_by query by votes", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("votes", {
          descending: true,
        });
      });
  });
  test("200: should be sorted by sort_by query by votes which ascends", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes&order=asc")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeSortedBy("votes");
      });
  });
  test("400: should return error message of 'invalid sort by value", () => {
    return request(app)
      .get("/api/reviews?sort_by=oranges")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid sort by value");
      });
  });
  test("400: should return error message of 'invalid order value", () => {
    return request(app)
      .get("/api/reviews?order=oranges")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid order value");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: should return an empty body", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("204: should delete comment from SQL table", () => {
    return request(app)
      .delete("/api/comments/3")
      .expect(204)
      .then(() => {
        return db
          .query(`SELECT * FROM comments WHERE comment_id = 3`)
          .then(({ rows }) => {
            expect(rows).toEqual([]);
          });
      });
  });
  test("400: invalid data type", () => {
    return request(app)
      .delete("/api/comments/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
  test("404: resource not found", () => {
    return request(app)
      .delete("/api/comments/99999999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Resource not found");
      });
  });
});

describe("GET /api/users/:username", () => {
  test("200: - should return a user object with properties `username`, `avatar_url`, `name`", () => {
    return request(app)
      .get("/api/users/mallionaire")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toMatchObject({
          username: "mallionaire",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          name: "haz",
        });
      });
  });
  test("404: invalid username`", () => {
    return request(app)
      .get("/api/users/usernotfound")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid username");
      });
  });
  test("404: mispelled users`", () => {
    return request(app)
      .get("/api/uses/mallionaire")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("200: should return updated comment with increment votes", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        const { updatedComment } = body;
        expect(updatedComment).toMatchObject({
          comment_id: expect.any(Number),
          body: expect.any(String),
          review_id: expect.any(Number),
          author: expect.any(String),
          votes: 26,
          created_at: expect.any(String),
        });
      });
  });
  test("200: should return updated comment with decrement votes", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({ inc_votes: -10 })
      .expect(200)
      .then(({ body }) => {
        const { updatedComment } = body;
        expect(updatedComment).toMatchObject({
          comment_id: expect.any(Number),
          body: expect.any(String),
          review_id: expect.any(Number),
          author: expect.any(String),
          votes: 6,
          created_at: expect.any(String),
        });
      });
  });
  test("400: responds with 'invalid data type'", () => {
    return request(app)
      .patch("/api/comments/test")
      .send({ inc_votes: 10 })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("invalid data type");
      });
  });
  test("404: responds with 'path not found'", () => {
    return request(app)
      .patch("/api/commates/1")
      .send({ inc_votes: 10 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
});

describe("POST /api/reviews", () => {
  test("201: should return an object of the posted comment", () => {
    const postReview = {
      owner: "mallionaire",
      title: "test title",
      review_body: "test body",
      designer: "test designer",
      category: "dexterity",
    };
    return request(app)
      .post("/api/reviews")
      .send(postReview)
      .expect(201)
      .then(({ body }) => {
        const { postedReview } = body;
        expect(postedReview).toMatchObject({
          owner: "mallionaire",
          title: "test title",
          review_body: "test body",
          designer: "test designer",
          category: "dexterity",
          review_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
        });
      });
  });
  test("404: invalid path", () => {
    const postReview = {
      owner: "mallionaire",
      title: "test title",
      review_body: "test body",
      designer: "test designer",
      category: "dexterity",
    };
    return request(app)
      .post("/api/reviets")
      .send(postReview)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
  test("400: invalid owner", () => {
    const postReview = {
      owner: "testuser",
      title: "test title",
      review_body: "test body",
      designer: "test designer",
      category: "dexterity",
    };
    return request(app)
      .post("/api/reviews/")
      .send(postReview)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          "Key (owner)=(testuser) is not present in table \"users\"."
        );
      });
  });
});

describe("GET /api/reviews (pagination)", () => {
  test("200: should return correct data queried via page and limit numbers", () => {
    return request(app)
      .get("/api/reviews?p=1&limit=2")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toHaveLength(2);
      });
  });
});