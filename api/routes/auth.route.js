import express from "express";
import { signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();
console.log("Test-route");

authRouter.post("/signup", signUp);

export { authRouter };
