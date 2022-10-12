const db = require("../db/connection");

function fetchCommentsByReviewId(reviewId) {
  return db
    .query(
      `
    SELECT * FROM comments
    WHERE review_id = $1
    ORDER BY created_at DESC;
    `,
      [reviewId]
    )
    .then(({ rows }) => {
      return rows;
    });
}

module.exports = { fetchCommentsByReviewId };
