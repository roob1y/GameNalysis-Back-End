const { fetchCommentsByReviewId } = require("../models/comments.models");

function getCommentsByReviewId(req, res) {
  const reviewId = req.params.review_id;
  fetchCommentsByReviewId(reviewId).then((comments) => {
    res.status(200).send({ comments });
  });
}

module.exports = { getCommentsByReviewId };
