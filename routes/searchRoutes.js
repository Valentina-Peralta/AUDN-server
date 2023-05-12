const express = require("express");
const { searchSongs } = require("../controllers/searchControllers");
const routes = express.Router();

routes.post('/songs/search', searchSongs)
module.exports = routes;
