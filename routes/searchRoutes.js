const express = require("express");
const { searchSongs, showSongsByGender } = require("../controllers/searchControllers");
const routes = express.Router();

routes.post('/songs/search', searchSongs)
routes.post('/songs/searchByGender', showSongsByGender)
module.exports = routes;
