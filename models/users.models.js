const db = require("../db/connection");

function fetchUsers() {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
}

function fetchUserByUsername(username) {
  return db.query(`SELECT * FROM users WHERE username = '${username}'`).then(({rows}) => {
    return rows[0];
  })
}

module.exports = { fetchUsers, fetchUserByUsername };
