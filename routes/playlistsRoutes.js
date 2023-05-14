const express = require("express");
const { showPlaylistsId, showPlaylistSongs, showAllSongs, addPlaylist, addEmptyPlaylist, addSongsToPlaylist, changePlaylistName } = require("../controllers/playlistsControllers");
const routes = express.Router();

routes.get('/playlists/:id', showPlaylistsId) //Ver playlist por id de usuario (sólo nombre y duración de la playlist)

routes.get('/playlists/songs/:id', showPlaylistSongs) //Ver contenido de la playlist por id de playlist

routes.get('/songs', showAllSongs) //ver todas las canciones de la db

routes.post('/playlists', addPlaylist) //agregar una playlist por nombre
routes.post('/playlists/addSongs', addSongsToPlaylist) //agregar canciones a una playlist existente
routes.post('/playlists/changeName', changePlaylistName) //cambiar nombre a una playlist
routes.post('/playlistsEmpty', addEmptyPlaylist) //agregar una playlist por nombre vacía

module.exports = routes;
