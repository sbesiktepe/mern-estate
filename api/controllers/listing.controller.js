import { listingModel } from "../models/listing.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await listingModel.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found !"));
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can delete only your own listings !!"));
  }

  try {
    await listingModel.findByIdAndDelete(req.params.id);
    res.status(200).json("");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing Not found"));
  if (req.user.id !== listing.userRef)
    return next(errorHandler(403, "You can update only your own listings"));

  try {
    const updatedListing = await listingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const listing = await listingModel.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found !"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    console.log("test123123");
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, undefined] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, undefined] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, undefined] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listing = await listingModel
      .find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
