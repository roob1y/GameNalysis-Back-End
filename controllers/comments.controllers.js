const { fetchCommentByReviewId } = require("../models/comments.models");

function postCommentByReviewId(req, res) {
  const { review_id } = req.params;
  const postComment = req.body;
  fetchCommentByReviewId(review_id, postComment);
}

module.exports = { postCommentByReviewId };
