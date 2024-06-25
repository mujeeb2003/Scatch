const express = require('express');
const usersRouter = express.Router();

const { registerUser, loginUser, logoutUser } = require("../controllers/authController.js")

usersRouter.post("/register", registerUser);

usersRouter.post("/login", loginUser);


module.exports = usersRouter;

