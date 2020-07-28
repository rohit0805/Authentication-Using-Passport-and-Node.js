if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}

const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const mongoose=require("mongoose");
const expressLayout=require("express-ejs-layouts");

//middleware
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(expressLayout);


//middleware configuration
mongoose.connect(process.env.DATABASEURL,{
    useNewUrlParser:true,useUnifiedTopology:true
})
.then(()=>{
    console.log('MongoDB started');
})
.catch((err)=>{
    console.log(err);
});
const User=require("./models/User");


//Routes
//1.Index route
app.get("/",function(req,res){
    res.render("index");
});
//2.Register route
app.get("/register",function(req,res){
    res.render("register");
});
app.post("/register",function(req,res){
    res.send("dasf");
});
//3.Login route
app.get("/login",function(req,res){
    res.render("login");
});
app.post("/login",function(req,res){
    res.send("daf");
});

//listen
app.listen(PORT,console.log(`The server started at PORT ${PORT}`));
