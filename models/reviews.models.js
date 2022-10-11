const db = require("../db/connection");

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

function patchReview(reviewId, incVotes) {
  return db
    .query(
      `
    UPDATE reviews
    SET votes = votes + $1
    WHERE review_id = $2
    RETURNING *`,
      [incVotes, reviewId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "review id not found" });
      } else {
        return rows;
      }
    });
}

module.exports = { fetchReview, patchReview };
