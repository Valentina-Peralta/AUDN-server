const express = require("express");
const { signup, login, emailCheck, seeCupid, seeContextual, updateCupid, updateContextual, seeFriends, seeUsers, addFriend } = require("../controllers/userControllers");
const routes = express.Router();

routes.post("/users/register", signup)
routes.post("/users/login", login)
routes.post("/users/checkEmail", emailCheck)
routes.post("/users/seeCupid", seeCupid)
routes.post("/users/seeContextual", seeContextual)
routes.post("/users/updateCupid", updateCupid)
routes.post("/users/updateContextual", updateContextual)
routes.post("/users/seeFriends", seeFriends)
routes.post("/users/addFriend", addFriend)
routes.post("/users/seeUsers", seeUsers)

module.exports = routes;
