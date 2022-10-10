const { fetchCategories, fetchReview } = require("../models/games.models");

function getCategories(req, res) {
  fetchCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
}

function getReview(req, res, next) {
  const reviewId = req.params.review_id;
  fetchReview(reviewId).then((review) => {
    res.status(200).send({ review });
  }).catch((err) => next(err));
}

module.exports = { getCategories, getReview };
