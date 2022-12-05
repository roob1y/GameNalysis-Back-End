const reviewRouter = require("express").Router();

const {
  getAllReviews,
  getReview,
  patchReviewById,
  postReview,
} = require("../controllers/reviews.controllers");

const {
  getCommentsByReviewId,
  postCommentByReviewId,
} = require("../controllers/comments.controllers");

reviewRouter.route("/").get(getAllReviews).post(postReview);

reviewRouter.route("/:review_id").get(getReview).patch(patchReviewById);

reviewRouter
  .route("/:review_id/comments")
  .get(getCommentsByReviewId)
  .post(postCommentByReviewId);
  

module.exports = reviewRouter;
