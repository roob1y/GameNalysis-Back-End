const db = require("../db/connection");

function fetchCategories() {
  return db.query(`SELECT * FROM categories`).then(({rows}) => {
    return rows;
  });
}
function fetchUsers() {
  return db.query(`SELECT * FROM users`).then(({rows}) => {
    return rows;
  });
}

module.exports = { fetchCategories, fetchUsers};
