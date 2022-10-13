const { getCategories } = require("./controllers/categories.controllers");
const { getAllReviews, getReview, patchReviewById } = require("./controllers/reviews.controllers");
const { getUsers } = require("./controllers/users.controllers");
const { getCommentsByReviewId, postCommentByReviewId } = require("./controllers/comments.controllers");


const express = require("express");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews/:review_id", getReview);
app.get("/api/user", getUsers);
app.get("/api/reviews/", getAllReviews);
app.get("/api/reviews/:review_id/comments", getCommentsByReviewId);


app.patch("/api/reviews/:review_id", patchReviewById);

app.post("/api/reviews/:review_id/comments", postCommentByReviewId)


app.all("/api/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid data type" });
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
