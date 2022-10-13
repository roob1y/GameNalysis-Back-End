const {
  fetchCommentsByReviewId,
  addCommentsByReviewId,
} = require("../models/comments.models");
const { fetchReview } = require("../models/reviews.models");

function getCommentsByReviewId(req, res, next) {
  const reviewId = req.params.review_id;
  fetchCommentsByReviewId(reviewId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => next(err));
}

function postCommentByReviewId(req, res, next) {
  const { review_id } = req.params;
  const postComment = req.body;
    addCommentsByReviewId(review_id, postComment)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => next(err));
}

module.exports = { postCommentByReviewId, getCommentsByReviewId };
