import express from "express";
import { createUser, getUsers, getUserById } from "../controllers/user.js"; // Import the getUserById controller
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/create", createUser);

// Define the route for getting a user by ID
userRouter.get("/:userId", getUserById); // Define a route parameter :userId

export default userRouter;
