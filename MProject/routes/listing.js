const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const {listingSchema }  = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedin} = require("../middleware.js");

const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    
    if(error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(404, errMsg);
    }else{
      next();
    }
  };
  
  // Index Route

  router.get("/",wrapAsync(async(req , res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
     })
    );

     //New Route
  
     router.get("/new",isLoggedin,(req, res)=>{
      /*
      console.log(req.user);
      if(!req.isAuthenticated()){
        req.flash("error","you mush be logged in create a listing");
      // return res.redirect("/listings");
      return res.redirect("/login");
      }
      */
      res.render("listings/new.ejs");
     });
   
     // show Route
  
     router.get("/:id", wrapAsync(async (req , res) =>{
      let {id} = req.params;
        const listing = await Listing.findById(id)
        .populate("reviews")
        .populate("owner");
        if(!listing){
          req.flash("error", "Listing you requested for does not exit: ");
          res.redirect("/listings");
        }
        console.log(listing);
         res.render("listings/show.ejs", {listing});
     })
    );
  
  // Create Route
  
  router.post("/",
  isLoggedin,
  validateListing,
  wrapAsync(async(req,res,next)=>{
    
    const newListing = new Listing(req.body.listing);
  
    await newListing.save();

    req.flash("success","New Listing Created");
    res.redirect("/listings");
  })
  );
   
  
  //Edit Route
  
  router.get("/:id/edit",
  isLoggedin, 
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if(!listing){
      req.flash("error", "Listing you requested for does not exit: ");
      res.redirect("/listings");
    }
    
   // res.render("listings/edit.ejs", { listing });
   res.render("listings/edit.ejs", { listing });
  })
  );
  
  // Update Route
  
  router.put("/:id",
  isLoggedin,
  validateListing,
   wrapAsync(async (req, res) => {
    
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success"," Listing Updated");
    res.redirect(`/${id}`);
  })
  );
  
  //Delete Route
  
  router.delete("/:id", 
  isLoggedin,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted");
    res.redirect("/listings");
  })
  );

  module.exports = router;