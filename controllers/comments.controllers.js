const { fetchCommentByReviewId } = require("../models/comments.models");

function postCommentByReviewId() {
    console.log('in the controller')
  fetchCommentByReviewId();
}

module.exports = { postCommentByReviewId };
