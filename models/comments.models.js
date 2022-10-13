const db = require("../db/connection");

function fetchCommentByReviewId(reviewId, postComment) {
  const { username, body } = postComment;
  return db
    .query(
      `
        INSERT INTO comments (body, author, review_id)
        VALUES ($1, $2, $3)        
        RETURNING *;
    `,
      [body, username, reviewId]
    )
    .then(({ rows }) => rows[0]);
    
}

module.exports = { fetchCommentByReviewId };
