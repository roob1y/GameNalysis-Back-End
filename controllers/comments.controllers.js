const { fetchCommentsByReviewId } = require("../models/comments.models");

function getCommentsByReviewId(req, res, next) {
  const reviewId = req.params.review_id;
  fetchCommentsByReviewId(reviewId).then((comments) => {
    res.status(200).send({ comments });
  }).catch((err) => next(err))
}

module.exports = { getCommentsByReviewId };
