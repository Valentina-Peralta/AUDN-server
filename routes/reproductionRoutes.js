const express = require("express");
const { addReproduction, seeTop20id } = require("../controllers/reproductionsControllers");
const routes = express.Router();

routes.post('/reproductions', addReproduction)//agregar una reproducción pasando song_id y user_id
routes.post('/reproductions/top20/:id', seeTop20id)//ver top 20 por usuario

module.exports = routes;
