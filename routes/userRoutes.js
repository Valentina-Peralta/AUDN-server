const express = require("express");
const { signup, login, emailCheck } = require("../controllers/userControllers");
const routes = express.Router();

routes.post("/users/register", signup)
routes.post("/users/login", login)
routes.post("/users/checkEmail", emailCheck)

module.exports = routes;
