const { fetchCategories } = require("../models/games.models");

function getCategories(req, res) {
  fetchCategories().then((data) => {
    console.log(data)
  });
}

module.exports = { getCategories };
