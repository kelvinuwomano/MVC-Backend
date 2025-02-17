const express = require("express");
const { getAllUser, getOneUser, createUser, updateUser, deleteOne, login } = require("../controller/userController");


const userRouter = express.Router();

userRouter.get("/users", getAllUser);
userRouter.get("/user/:id", getOneUser);
userRouter.post("/create-user", createUser);
userRouter.patch("/update-user/:id", updateUser);
userRouter.delete("/delete-user/:id", deleteOne);
userRouter.get("/login", login);

module.exports = userRouter