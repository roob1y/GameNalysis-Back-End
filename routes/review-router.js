const reviewRouter = require('express').Router();

const {
  getAllReviews,
  getReview,
  patchReviewById,
} = require("../controllers/reviews.controllers");

const {
  getCommentsByReviewId,
  postCommentByReviewId,
} = require("../controllers/comments.controllers");

reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:review_id", getReview);
reviewRouter.get("/:review_id/comments", getCommentsByReviewId);
reviewRouter.patch("/:review_id", patchReviewById);
reviewRouter.post("/:review_id/comments", postCommentByReviewId);

module.exports = reviewRouter;
