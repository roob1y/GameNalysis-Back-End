const cors = require('cors');

const express = require("express");
const app = express();

app.use(cors());

app.use(express.json());

const apiRouter = require('./routes/api-router');

app.use('/api', apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid data type" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: err.detail });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;