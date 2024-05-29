module.exports.isLoggedin = (req,res,next) =>{
 // console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error","you mush be logged in create a listing");
      return res.redirect("/login");
}
next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};