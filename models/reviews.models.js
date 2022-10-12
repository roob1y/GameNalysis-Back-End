const db = require("../db/connection");

function fetchReview(reviewId) {
  return db
    .query(
      `
      SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;
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
        RETURNING *
      `,
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

// SELECT owner, title, review_id, category, review_img_url, created_at, votes, designer, comment_count FROM reviews

function fetchAllReviews() {
  return db
    .query(
      `
      SELECT reviews.review_id, owner, title, category, review_img_url, reviews.created_at, reviews.votes, designer, COUNT(comments.review_id) ::INT AS comment_count FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      GROUP BY reviews.review_id
      ORDER BY created_at DESC;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { fetchReview, patchReview, fetchAllReviews };
