import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();
console.log("Test-route");

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

export { authRouter };
