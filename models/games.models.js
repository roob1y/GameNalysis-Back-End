const db = require("../db/connection");

function fetchCategories() {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    return rows;
  });
}
function fetchReview(reviewId) {
  return db
    .query(
      `
        SELECT * FROM reviews
        WHERE review_id = $1;
      `,
      [reviewId]
    )
    .then(({ rows: review }) => {
      if (review.length === 0) {
        return Promise.reject({ status: 404, msg: "review id not found" });
      } else {
        return review[0];
      }
    });
}

function fetchUsers() {
  return db.query(`SELECT * FROM users`).then(({rows}) => {
    return rows;
  });
}

module.exports = { fetchCategories, fetchReview, fetchUsers };
