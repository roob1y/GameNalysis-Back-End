const { fetchReview } = require("../models/reviews.models");

function getReview(req, res, next) {
  const reviewId = req.params.review_id;
  fetchReview(reviewId)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => next(err));
}

module.exports = { getReview };
