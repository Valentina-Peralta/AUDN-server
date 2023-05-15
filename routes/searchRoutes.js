const express = require("express");
const { searchSongs, showSongsByGenre } = require("../controllers/searchControllers");
const routes = express.Router();

routes.post('/songs/search', searchSongs)
routes.post('/songs/searchByGenre', showSongsByGenre)
module.exports = routes;
