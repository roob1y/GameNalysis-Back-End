const commentsRouter = require("express").Router();

const {
  postVoteByCommentId,
  deleteByCommentId,
} = require("../controllers/comments.controllers");

commentsRouter
  .route("/:comment_id")
  .patch(postVoteByCommentId)
  .delete(deleteByCommentId);

module.exports = commentsRouter;
