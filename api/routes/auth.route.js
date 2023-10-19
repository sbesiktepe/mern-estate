import express from "express";
import {
  google,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();
console.log("test");

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/google", google);
authRouter.post("/signout", signOut);

export { authRouter };
