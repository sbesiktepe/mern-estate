import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const listRouter = express.Router();

listRouter.post("/create", verifyToken, createListing);
listRouter.delete("/delete/:id", verifyToken, deleteListing);
listRouter.post("/update/:id", verifyToken, updateListing);
listRouter.get("/get/:id", getListing);
listRouter.get("/get", getListings);

export { listRouter };
