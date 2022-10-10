const { fetchCategories, fetchReview } = require("../models/games.models");

function getCategories(req, res) {
  fetchCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
}

function getReview(req, res) {
  const reviewId = req.params.review_id;
  fetchReview(reviewId).then((data) => {
    res.status(200).send({ review: data });
  });
}

module.exports = { getCategories, getReview };
