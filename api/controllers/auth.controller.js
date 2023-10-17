import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(password);

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new userModel({ name, email, password: hashedPassword });

  try {
    await newUser.save();

    res.status(201).json("User create successfully");
  } catch (error) {
    next(error);
  }
};
