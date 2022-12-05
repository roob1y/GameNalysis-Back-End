const commentsRouter = require("express").Router();

const { deleteByCommentId } = require("../controllers/comments.controllers");

commentsRouter.delete("/:comment_id", deleteByCommentId);

module.exports = commentsRouter;
