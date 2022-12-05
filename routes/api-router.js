const apiRouter = require('express').Router();
const categoryRouter = require('./categories-router');
const reviewRouter = require('./review-router');
const userRouter = require('./user-router');
const commentsRouter = require('./comments-router');


const apiData = require("../endpoints.json");

apiRouter.get("/", (req, res) => {
  res.status(200).send( apiData );
});

apiRouter.use('/categories', categoryRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/comments', commentsRouter);



module.exports = apiRouter;