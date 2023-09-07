import express from "express";
import {
  createUser,
  getAllUsers,
  //getUserByUsername, use if getting user with username instead of ID
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";

const userRouter = express.Router();

// Update the routes to your routes
userRouter.post("/user", createUser);
userRouter.get("/users", getAllUsers);
userRouter.get("/user/:id", getUserById);
// Get user by username:
// userRouter.get("/user/:username", getUserByUsername);
userRouter.put("/user/:id", updateUserById);
userRouter.delete("/user/:id", deleteUserById);

export default userRouter;
