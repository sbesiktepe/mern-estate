import express from "express";
import {
  deleteUser,
  getUser,
  getUserListing,
  updatedUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();
userRouter.post("/update/:id", verifyToken, updatedUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listing/:id", verifyToken, getUserListing);
userRouter.get("/:id", verifyToken, getUser);

export { userRouter };
