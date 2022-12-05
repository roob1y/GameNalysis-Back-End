const { fetchUsers, fetchUserByUsername } = require("../models/users.models");

function getUsers(req, res) {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
}

function getUserByUsername(req, res, next) {
  const { username } = req.params;
  fetchUserByUsername(username).then((user) => {
    res.status(200).send({ user });
  })
  .catch((err) => next(err));
}

module.exports = { getUsers, getUserByUsername };
