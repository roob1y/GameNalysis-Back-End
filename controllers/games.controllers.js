const { fetchCategories, fetchUsers } = require("../models/games.models");

function getCategories(req, res) {
  fetchCategories().then((data) => {
    res.status(200).send({ categories: data });
  });
}

function getUsers(req, res) {
  fetchUsers().then((users) => {
    res.status(200).send({ users })
  })
}

module.exports = { getCategories, getUsers };
