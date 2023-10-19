import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import { userRouter } from "./routes/user.route.js";
import { authRouter } from "./routes/auth.route.js";
import cors from "cors";

env.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
console.log("test");

db();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on ", process.env.PORT || 5000);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my page" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (statusCode === 500) {
    console.error(err); // Log the error for debugging purposes
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
