const db = require("../db/connection");
const { checkExists } = require("../db/seeds/utils");

function fetchReview(reviewId) {
  return db
    .query(
      `
      SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id
      WHERE reviews.review_id = $1
      GROUP BY reviews.review_id;
      `,
      [reviewId]
    )
    .then(({ rows: review }) => {
      if (review.length === 0) {
        return Promise.reject({ status: 404, msg: "review id not found" });
      } else {
        return review[0];
      }
    });
}

function patchReview(reviewId, incVotes) {
  return db
    .query(
      `
        UPDATE reviews
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING *
      `,
      [incVotes, reviewId]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "review id not found" });
      } else {
        return rows;
      }
    });
}

function fetchAllReviews(
  sortBy = "created_at",
  order = "desc",
  limit = 10,
  p = 1,
  category
) {
  const validSortByValues = [
    "created_at",
    "title",
    "designer",
    "owner",
    "review_img_url",
    "review_body",
    "votes",
    "comment_count",
  ];
  const validOrderValues = ["asc", "desc"];

  const offsetVal = (limit * p) - limit;


  if (!validSortByValues.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: "invalid sort by value" });
  }
  if (!validOrderValues.includes(order)) {
    return Promise.reject({ status: 400, msg: "invalid order value" });
  }
  let baseQuery = `  
  SELECT reviews.*, COUNT(comments.review_id) ::INT AS comment_count,
  COUNT(*) OVER() AS review_count
  FROM reviews
  LEFT JOIN comments ON comments.review_id = reviews.review_id
  `;
  
  const paramsArr = [];
  
  if (category) {
    paramsArr.push(category);
    baseQuery += `WHERE category = $1`;
  }
  
  baseQuery += `GROUP BY reviews.review_id
  ORDER BY ${sortBy} ${order}
  LIMIT ${limit} OFFSET ${offsetVal}`

  return db.query(baseQuery, paramsArr).then(({ rows }) => {
    if (rows.length === 0) {
      Promise.reject({ status: 400, msg: "invalid sort by value" });
    } else {
      return rows;
    }
  });
}

function addReview({ owner, title, review_body, designer, category }) {
  return db
    .query(
      `
    INSERT INTO reviews (owner, title, review_body, designer, category)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [owner, title, review_body, designer, category]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function removeReviewById(reviewId) {
  return checkExists("reviews", "review_id", reviewId).then(() => {
    return db
      .query(`DELETE FROM reviews WHERE review_id = $1`, [reviewId])
      .then(({ rows }) => {
        return rows;
      });
  });
}

module.exports = {
  fetchReview,
  patchReview,
  fetchAllReviews,
  addReview,
  removeReviewById,
};
