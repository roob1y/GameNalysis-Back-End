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
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { fetchCategories, fetchReview };
