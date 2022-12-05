const commentsRouter = require("express").Router();

const { postVoteByCommentId, deleteByCommentId } = require("../controllers/comments.controllers");

commentsRouter.patch("/:comment_id", postVoteByCommentId);
commentsRouter.delete("/:comment_id", deleteByCommentId);

module.exports = commentsRouter;
