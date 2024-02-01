const express = require("express");
const {login, register, getUserByAuthor} = require("../controllers/Users");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/author", getUserByAuthor);
module.exports = usersRouter;
