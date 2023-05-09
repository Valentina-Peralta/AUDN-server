const express = require("express");
const { addReproduction } = require("../controllers/reproductionsControllers");
const routes = express.Router();

routes.post('/reproductions', addReproduction)//agregar una reproducción pasando song_id y user_id

module.exports = routes;
