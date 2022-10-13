const { getReviews } = require("../models/reviews.models");

const { fetchCommentByReviewId } = require("../models/comments.models");


function postCommentByReviewId(req, res, next) {
  const { review_id } = req.params;

    const promises = []


  const postComment = req.body;
  fetchCommentByReviewId(review_id, postComment).then((postedComment) => {
    res.status(201).send({postedComment});
  });
}

module.exports = { postCommentByReviewId };
