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
      if (rows.length === 0) {
        return Promise.reject({status: 404, msg: 'review id not found'})
      } else {
        return rows;
      }
    })
}

module.exports = { fetchCommentsByReviewId };
