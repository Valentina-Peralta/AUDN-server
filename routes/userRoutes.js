const express = require("express");
const { signup, login } = require("../controllers/userControllers");
const routes = express.Router();

routes.post("/users/register", signup)
routes.post("/users/login", login)

module.exports = routes;
