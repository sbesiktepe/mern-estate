import express from "express";
import { updatedUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const userRouter = express.Router();
userRouter.post("/update/:id", verifyToken, updatedUser);

export { userRouter };
