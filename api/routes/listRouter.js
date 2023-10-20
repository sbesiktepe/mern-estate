import express from "express";
import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const listRouter = express.Router();

listRouter.post("/create", verifyToken, createListing);
listRouter.delete("/delete/:id", verifyToken, deleteListing);

export { listRouter };
