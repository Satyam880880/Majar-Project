const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));


// app.use(session({secret: "mysupersecretestring"}));
const sessionOptions = {
    secret: "mysupersecretestring",
    resave : false,
    saveUninitialized : true,
};
app.use(session(sessionOptions));
app.use(flash());
   
//Middleware
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res) =>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
   // console.log(req.session.name);
    //res.send(name);
   // req.flash("success","user register successful");

    if(name === "anonymous"){
        req.flash("error","user not register ");
    }else {
        req.flash("success","user register successful");
    }
    res.redirect("/hello");
});
 
app.get("/hello",(req,res)=>{

  // res.locals.successMsg = req.flash("success");
 //  res.locals.errorMsg = req.flash("error");

  //  res.send(`hello,${req.session.name}`);

  res.render("page.ejs",{name : req.session.name });
});

/*
app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }else{
        req.session.count = 1;
    }
   
    res.send(`you send a request ${req.session.count} times`);
});
  */
//      app.get("/test",(req,res)=>{
//      res.send("test successful");
 //      });

// cookies  
/*
const cookieParser = require('cookie-parser');

  // app.use(cookieParser());
app.use(cookieParser("secretcode"));


app.get("/getsignedcookied",(req,res) => {
    res.cookie("made-in","India" , {signed: true});
    res.send("signed cookiews send");
});

app.get("/verify",(req,res) =>{
    console.log(req.signedCookies);
    res.send("verify");
});

app.get("/getcookies", (req,res) =>{
    res.cookie("greet", "namste");
    res.cookie("hello", "india");
    res.send("send you some cookies");
});

app.get("/greet",(req,res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`hi,${name}`);
});

app.get("/", (req,res) =>{
    console.dir(req.cookies);
    res.send("I am root");
});
     */

app.listen(3000 , () =>{
    console.log("server is listening on port 3000");
});