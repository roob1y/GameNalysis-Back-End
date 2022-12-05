const categoryRouter = require('express').Router();
const { getCategories, postCategories } = require("../controllers/categories.controllers");

categoryRouter.route('/')
.get(getCategories)
.post(postCategories)

module.exports = categoryRouter;
