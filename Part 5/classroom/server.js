const express = require("express");
const app = express();
 
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

app.listen(3000 , () =>{
    console.log("server is listening on port 3000");
});