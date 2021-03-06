const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const mongoose=require("mongoose");
const expressLayout=require("express-ejs-layouts");
const bcrypt=require('bcryptjs');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const methodOverride=require('method-override');

if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
    app.use(require('morgan')('dev'));
}


//middleware
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(expressLayout);
app.use(flash());
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(methodOverride('_method'));

//global variables
app.use(function(req,res,next){
    res.locals.problem_msg=req.flash('problem'),
    res.locals.success_msg=req.flash('success'),
    res.locals.error_msg=req.flash('error'),
    res.locals.url=req.flash('url')
    next();
});

//passport configuration
require('./passport.config')(passport);
app.use(passport.initialize());
app.use(passport.session());


//mongodb configuration
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
app.get("/register",CheckNotAuthenticate,function(req,res){
    res.render("register");
});
app.post("/register",CheckNotAuthenticate,async function(req,res){
    const hashPassword=await bcrypt.hash(req.body.password,10);
    const user_obj={
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    };
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            req.flash('problem',"No internet Connection.")
            res.redirect("/register");
        }
        else{
            if(user){
                req.flash("error","User already exist.");
                res.redirect("/login");
            }
            else{
                User.create(user_obj,function(err,data){
                    if(err){
                        req.flash('problem','No internet Connection.');
                        res.redirect("/register");
                    }
                    else{
                        req.flash("success","Registered Successfully.")
                        res.redirect("/login");
                    }
                });
            }
        }
    });
});

//3.Login route
app.get("/login",CheckNotAuthenticate,function(req,res){
    res.render('login');
});

app.post("/login",CheckNotAuthenticate,passport.authenticate('local',{
    successRedirect:'/user',
    failureRedirect:'/login',
    failureFlash:true,
    successFlash:'Logged in Successfully'
}));

//4.Logout Route
app.delete("/logout",CheckAuthenticate,function(req,res){
    req.logOut();
    req.flash('success','Logged Out Successfully');
    res.redirect('/');
});

//user route
app.get("/user",CheckAuthenticate,function(req,res){
    res.render('user',{name:req.user.name});
});


function CheckAuthenticate(req,res,next){
    if(req.isAuthenticated())
        return next();
    req.flash('error','You need to be logged in first')
    res.redirect('/login')
};

function CheckNotAuthenticate(req,res,next){
    if(req.isAuthenticated()){
        req.flash('error','You are already logged in');
        return res.redirect('/user');
    }
    return next();
}




//listen
app.listen(PORT,console.log(`The server started at PORT ${PORT}`));
