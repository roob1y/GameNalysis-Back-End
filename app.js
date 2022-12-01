const cors = require('cors');

const apiData = require("./endpoints.json");

const { getCategories } = require("./controllers/categories.controllers");
const {
  getAllReviews,
  getReview,
  patchReviewById,
} = require("./controllers/reviews.controllers");
const { getUsers } = require("./controllers/users.controllers");
const {
  getCommentsByReviewId,
  postCommentByReviewId,
  deleteByCommentId,
} = require("./controllers/comments.controllers");

const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send( apiData );
});

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReview);
app.get("/api/user", getUsers);
app.get("/api/reviews/", getAllReviews);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);

app.patch("/api/reviews/:review_id", patchReviewById);

app.post("/api/reviews/:review_id/comments", postCommentByReviewId);

app.delete("/api/comments/:comment_id", deleteByCommentId);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid data type" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: err.detail });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;