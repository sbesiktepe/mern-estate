import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Test");

  try {
    const validUser = await userModel.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found !"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials !"));
    const token = jwt.sign({ id: validUser._id }, process.env.SECRET_TOKEN);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ rest });
  } catch (error) {
    next(error);
  }
};
