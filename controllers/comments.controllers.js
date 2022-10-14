const {
  fetchCommentsByReviewId,
  addCommentsByReviewId,
  removeByCommentId,
} = require("../models/comments.models");

function getCommentsByReviewId(req, res, next) {
  const reviewId = req.params.review_id;
  fetchCommentsByReviewId(reviewId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => next(err));
}

function postCommentByReviewId(req, res, next) {
  const { review_id } = req.params;
  const postComment = req.body;
  addCommentsByReviewId(review_id, postComment)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => next(err));
}

function deleteByCommentId(req, res, next) {
  const { comment_id } = req.params;
  removeByCommentId(comment_id).then((rows) => {
    res.status(204).send(rows);
  })
  .catch((err) => next(err));
}

module.exports = {
  postCommentByReviewId,
  getCommentsByReviewId,
  deleteByCommentId,
};
