const {
  fetchReview,
  patchReview,
  fetchAllReviews,
} = require("../models/reviews.models");

function getReview(req, res, next) {
  const reviewId = req.params.review_id;
  fetchReview(reviewId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => next(err));
}

function patchReviewById(req, res, next) {
  const reviewId = req.params.review_id;
  const incVotes = req.body.inc_votes;
  patchReview(reviewId, incVotes)
    .then((rows) => {
      res.status(200).send({ updatedReview: rows[0] });
    })
    .catch((err) => next(err));
}

function getAllReviews(req, res, next) {
  const { order } = req.query;
  fetchAllReviews(order)
    .then((data) => {
      res.status(200).send({ reviews: data });
    })
    .catch((err) => next(err));
}

module.exports = { getReview, patchReviewById, getAllReviews };
