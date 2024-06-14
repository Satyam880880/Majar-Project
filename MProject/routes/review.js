const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,
   isLoggedin ,
    isreviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

// Reviews , POST Route

router.post(
    "/",
    isLoggedin,
    validateReview, 
    wrapAsync(reviewController.createReview));
  
  // Delete Review Route
  
  router.delete(
    "/:reviewId",
    isLoggedin,
    isreviewAuthor,
     wrapAsync(reviewController.destroyReview));

  module.exports = router;