const db = require("../db/connection");

function fetchUsers() {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
}

function fetchUserByUsername(username) {
  return db.query(`SELECT * FROM users WHERE username = '${username}'`).then(({rows}) => {
    console.log('rows: ', rows.length);
    
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "invalid username" });
    } else {
      return rows[0];
    }
  })
}

module.exports = { fetchUsers, fetchUserByUsername };
