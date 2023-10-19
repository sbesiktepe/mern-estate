import express from "express";
import { deleteUser, updatedUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();
userRouter.post("/update/:id", verifyToken, updatedUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);

export { userRouter };
