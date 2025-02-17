const express = require("express");
const { getAllUser, getOneUser, createUser } = require("../controller/userController");


const userRouter = express.Router();

userRouter.get("/users", getAllUser);
userRouter.get("/user/:id", getOneUser)
userRouter.post("/create-user", createUser)

module.exports = userRouter