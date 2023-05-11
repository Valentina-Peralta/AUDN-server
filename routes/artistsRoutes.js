const express = require("express");
const { seeAllArtists, allSongsArtistId } = require("../controllers/artistsControllers");
const routes = express.Router();

routes.get('/artists', seeAllArtists) //ver todos los artistas
routes.get('/artists/:id', allSongsArtistId) //ver todas las canciones del artista por su id
module.exports = routes;
