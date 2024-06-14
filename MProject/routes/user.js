const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsyc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router.get("/signup",userController.renderSignup);

router.post("/signup",
 wrapAsync(userController.signup));

// login

router.get("/login", userController.renderlogin);

router.post("/login",
saveRedirectUrl,
passport.authenticate("local",{
    failureRedirect:'/login', 
    failureFlash: true})
     , userController.login);

// logout

router.get("/logout",userController.logout);

module.exports = router;
