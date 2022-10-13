const db = require("../db/connection");

function fetchCommentByReviewId(reviewId, postComment) {
  const { username, body } = postComment;
  db.query(
    `
        INSERT INTO comments (body, author, review_id)
        VALUES ($1, $2, $3)        
        RETURNING *
    `,
    [username, body, reviewId]
  ).then(({ rows }) => {
    console.log(rows);
  });
}

module.exports = { fetchCommentByReviewId };
