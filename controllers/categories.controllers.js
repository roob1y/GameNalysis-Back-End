const { fetchCategories, addCategories } = require("../models/categories.models");

function getCategories(req, res) {
  fetchCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
}

function postCategories(req, res) {
  const {slug, description} = req.body;
  addCategories(slug, description).then((categoryObj) => {
    res.status(201).send({postedCategory:  categoryObj})
  })
}

module.exports = { getCategories, postCategories };