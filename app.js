const { getCategories } = require('./controllers/games.controllers');


const express = require("express");
const app = express();
app.use(express.json);
app.get('/api/categories', getCategories)

console.log('in the app.js file');


module.exports = app;