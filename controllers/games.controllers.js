const { fetchCategories } = require("../models/games.models");

function getCategories() {
    fetchCategories()
}

module.exports = { getCategories };
