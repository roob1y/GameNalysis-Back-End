const { fetchCategories } = require("../models/games.models");

function getCategories(req, res) {
  fetchCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
}

module.exports = { getCategories };
