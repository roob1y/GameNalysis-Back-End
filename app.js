const { getCategories } = require("./controllers/games.controllers");

const express = require("express");
const app = express();
app.use(express.json());
app.get("/api/categories", getCategories);

module.exports = app;
