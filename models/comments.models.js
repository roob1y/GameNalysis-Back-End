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

function addCommentsByReviewId(reviewId, postComment) {
  console.log(postComment)
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
    .then(({ rows }) => {
      if (rows.length === 0) {
        Promise.reject({ status: 404, msg: "review id not found" });
      } else {
        return rows[0];
      }
    });
}

module.exports = { fetchCommentsByReviewId, addCommentsByReviewId };
