const { fetchCategories, fetchReview, fetchUsers } = require("../models/games.models");

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

function getUsers(req, res) {
  fetchUsers().then((users) => {
    res.status(200).send({ users })
  })
}

module.exports = { getCategories, getReview, getUsers };
