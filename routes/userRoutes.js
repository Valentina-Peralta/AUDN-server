const express = require("express");
const { signup, login, emailCheck, seeCupid, seeContextual, updateCupid, updateContextual } = require("../controllers/userControllers");
const routes = express.Router();

routes.post("/users/register", signup)
routes.post("/users/login", login)
routes.post("/users/checkEmail", emailCheck)
routes.post("/users/seeCupid", seeCupid)
routes.post("/users/seeContextual", seeContextual)
routes.post("/users/updateCupid", updateCupid)
routes.post("/users/updateContextual", updateContextual)

module.exports = routes;
