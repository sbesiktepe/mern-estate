import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const listRouter = express.Router();

listRouter.post("/create", verifyToken, createListing);

export { listRouter };
