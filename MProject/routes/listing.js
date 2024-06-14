const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const Listing = require("../models/listing.js");
const {isLoggedin , isowner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require("multer");
const {storage} = require("../cloudConfig.js");

const upload = multer({storage });

// Routor
router
.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedin,
  
  upload.single("listing[image]"),
  validateListing,
 wrapAsync(listingController.createListing));

  //New Route
  
  router.get("/new",isLoggedin, listingController.renderNewFrom);
   
router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedin,
  isowner,
  upload.single("listing[image]"),
  validateListing,
   wrapAsync(listingController.UpdateListing))
   .delete( 
  isLoggedin,
  isowner,
  wrapAsync(listingController.destroyListing)
);

//Edit Route
  
router.get("/:id/edit",
isLoggedin, 
isowner,

wrapAsync(listingController.renderEditFrom));

  
  module.exports = router;