const { fetchCategories } = require("../models/categories.models");

function getCategories(req, res) {
  fetchCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
}

module.exports = { getCategories };