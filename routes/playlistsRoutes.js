const express = require("express");
const { showPlaylistsId, showPlaylistSongs, showAllSongs } = require("../controllers/playlistsControllers");
const routes = express.Router();

routes.get('/playlists/:id', showPlaylistsId) //Ver playlist por id de usuario (sólo nombre y duración de la playlist)

routes.get('/playlists/songs/:id', showPlaylistSongs) //Ver contenido de la playlist por id de playlist

routes.get('/songs', showAllSongs) //ver todas las canciones de la db


module.exports = routes;
