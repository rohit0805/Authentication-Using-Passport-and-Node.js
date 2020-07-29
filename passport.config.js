const mongoose=require('mongoose');
const User=require('./models/User');
const bcrypt=require('bcryptjs');
const LocalStrategy=require('passport-local').Strategy;

function initialize(passport){
    const authenticateUser=function(email,password,done){
        User.findOne({email:email},async function(err,user){
            try{
                if(user){
                    if(await bcrypt.compare(password,user.password)){
                        return done(null,user);
                    }
                    else{
                        return done(null,false,{message:'Password incorrect'});
                    }
                }
                else{
                    return done(null,false,{message:"User not registered"});
                }
            }
            catch(err){
                console.log(err);
            }
        });
    };
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },authenticateUser));
    passport.serializeUser((user,done)=>{
        return done(null,user._id);
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id,function(err,user){
            if(err){
                console.log(err);
            }
            else{
                return done(null,user);
            }
        });
    });
};


module.exports=initialize;