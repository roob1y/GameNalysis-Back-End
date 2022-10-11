const { fetchReview, patchReview } = require("../models/reviews.models");

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
  patchReview(reviewId, incVotes).then((rows) => {
    res.status(200).send({updatedReview: rows[0]});
  })
}

module.exports = { getReview, patchReviewById };
