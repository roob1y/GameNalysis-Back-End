const db = require("../db/connection");

function fetchCategories() {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    return rows;
  });
}

function addCategories(slug, description) {
  return db.query(
    `
    INSERT INTO categories(slug, description)
    VALUES ($1, $2)
    RETURNING *
  `,[slug, description]
  ).then(({ rows }) => {
    return rows[0];
  });
}

module.exports = { fetchCategories, addCategories };
