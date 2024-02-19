const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const propertyModel = require("../models/property");
const bookingSchema = require("../models/booking");
const { validationResult } = require("express-validator");

const addPropertyFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(200).json({
        error: true,
        result: result.errors[0],
      });
    }
    const {
      type,
      title,
      // title: name,
      country,
      street,
      room_number,
      city,
      state,
      postal_code,
      lattitude,
      longitude,
      acreage,
      guests,
      bedrooms,
      beds,
      bathrooms,
      kitchen,
      amenities,
      pet,
      party_organizing,
      cooking,
      smoking,
      drinking,
      additional_rules,
      place_descriptions,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      night_min,
      night_max,
      cover_image,
      galleryImgs,
    } = req.body;
    const newProperty = new propertyModel({
      ownerID: req.decodedToken.ownerId,
      type,
      title,
      // title: name,
      country,
      street,
      room_number,
      city,
      state,
      postal_code,
      lattitude,
      longitude,
      acreage,
      guests,
      bedrooms,
      beds,
      bathrooms,
      kitchen,
      amenities,
      pet,
      party_organizing,
      cooking,
      smoking,
      drinking,
      additional_rules,
      place_descriptions,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      night_min,
      night_max,
      cover_image,
      galleryImgs,
    });
    const propertySave = await newProperty.save();

    if (propertySave) {
      res
        .status(200)
        .json({ message: "Property created successfully!", error: false });
    } else {
      res.status(200).json({ message: "no data is submitted!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in addPropertyFunc",
      error: true,
    });
  }
};
const getAllPropertyFunc = async (req, res) => {
  try {
    const {
      type,
      min,
      max,
      beds,
      bedrooms,
      bathrooms,
      amenities,
      houseRulesValues,
    } = req.body;
    const query = {};

    if (type && Array.isArray(type) && type.length > 0) {
      query.type = { $in: type };
    }
    if (max !== 0) {
      query.monday = { $gte: min, $lte: max };
    }
    if (beds && beds > 0) {
      query.beds = beds;
    }
    if (bedrooms && bedrooms > 0) {
      query.bedrooms = bedrooms;
    }
    if (bathrooms && bathrooms > 0) {
      query.bathrooms = bathrooms;
    }
    if (amenities && Array.isArray(amenities) && amenities.length > 0) {
      query.amenities = { $all: amenities };
    }
    if (
      houseRulesValues &&
      Array.isArray(houseRulesValues) &&
      houseRulesValues.length > 0
    ) {
      houseRulesValues.forEach((value) => {
        if (value === "Pets allowed") {
          query["pet"] = true;
        } else if (value === "Smoking allowed") {
          query["smoking"] = true;
        }
      });
    }
    if (Object.keys(query).length === 0) {
      const propertydata = await propertyModel.find();
      return res.status(200).json({
        message: "All property data retrieved successfully.",
        propertydata,
        error: false,
      });
    }
    const propertydata = await propertyModel.find(query);
    res.status(200).json({
      message: "Property data retrieved successfully.",
      propertydata,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Something went wrong in getAllPropertyFunc",
      error: true,
    });
  }
};
const getOwnerPropertyFunc = async (req, res) => {
  try {
    const propertydata = await propertyModel.find({
      ownerID: req.decodedToken.ownerId,
    });
    res.status(200).json({
      message: "property data getProperty:",
      propertydata,
      error: false,
    });
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in getPropertyFunc",
      error: true,
    });
  }
};
const getOnePropertyDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const propertyDetails = await propertyModel.findById(id);
    res.status(200).json({
      message: "property details are:",
      propertyDetails,
      error: false,
    });
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in getOnePropertyDetails",
      error: true,
    });
  }
};
const getOnePropertyCardDetails = async (req, res) => {
  try {
    const { id } = req.query;
    const propertyDetails = await propertyModel.findById(id);
    res.status(200).json({
      message: "property details are:",
      propertyDetails,
      error: false,
    });
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in getOnePropertyDetails",
      error: true,
    });
  }
};
const deletePropertyFunc = async (req, res) => {
  try {
    const { propId } = req.query;
    const deletedProperty = await propertyModel.findByIdAndDelete(propId);
    if (deletedProperty) {
      res.status(200).json({ message: "property deleted!", error: false });
    } else {
      res.status(200).json({ message: "property not found", error: true });
    }
  } catch (err) {
    //  res.error("updatetodo error", err.message);
    res
      .status(500)
      .json({ error: "deleteprop catch error", message: err.message });
  }
};
const updatePropertyFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(200).json({
        error: true,
        result: result.errors[0],
      });
    }

    const {
      id,
      type,
      title,
      // title: name,
      country,
      street,
      room_number,
      city,
      state,
      postal_code,
      lattitude,
      longitude,
      acreage,
      guests,
      bedrooms,
      beds,
      bathrooms,
      kitchen,
      amenities,
      pet,
      party_organizing,
      cooking,
      smoking,
      drinking,
      additional_rules,
      place_descriptions,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      night_min,
      night_max,
      cover_image,
      galleryImgs,
    } = req.body;

    const updateOne = await propertyModel.findByIdAndUpdate(
      id,
      {
        type,
        title,
        // title: name,
        country,
        street,
        room_number,
        city,
        state,
        postal_code,
        lattitude,
        longitude,
        acreage,
        guests,
        bedrooms,
        beds,
        bathrooms,
        kitchen,
        amenities,
        pet,
        party_organizing,
        cooking,
        smoking,
        drinking,
        additional_rules,
        place_descriptions,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        night_min,
        night_max,
        cover_image,
        galleryImgs,
      },
      { new: true }
    );

    if (updateOne) {
      res
        .status(200)
        .json({ message: "Property updated successfully!", error: false });
    } else {
      res.status(200).json({ message: "Property not found!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "Something went wrong in updating property",
      error: true,
    });
  }
};
const bookPropertyFunc = async (req, res) =>{
  try {
    // const result = validationResult(req);

    // if (!result.isEmpty()) {
    //   return res.status(200).json({
    //     error: true,
    //     result: result.errors[0],
    //   });
    // }
const {
  guest_name,
  ph_number,
  no_of_guests,
  start_date,
  end_date,
  amount,
  paid_amount,
  status,
} = req.body;
    const newbooking = new bookingSchema({
      // ownerID: req.decodedToken.ownerId,
      guest_name,
      ph_number,
      no_of_guests,
      start_date,
      end_date,
      amount,
      paid_amount,
      status,
    });
    const bookingsave = await newbooking.save();

    if (bookingsave) {
      res
        .status(200)
        .json({ message: "Property booked successfully!", error: false });
    } else {
      res.status(200).json({ message: "no data is submitted!", error: true });
    }
  } catch (err) {
    res.status(200).json({
      message: err.message || "something went wrong in addPropertyFunc",
      error: true,
    });
  }
}
module.exports = {
  addPropertyFunc,
  getAllPropertyFunc,
  getOwnerPropertyFunc,
  updatePropertyFunc,
  deletePropertyFunc,
  getOnePropertyDetails,
  getOnePropertyCardDetails,
  bookPropertyFunc,
};
