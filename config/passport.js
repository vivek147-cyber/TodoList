const LocalStratergy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const passport = require('passport');


//import user model
const User= require('../models/Users');

module.exports = function(passport){
   passport.use(

      new LocalStratergy({ usernameField: 'email'}, (email,password,done)=>{

         User.findOne({ email:email })
          .then(user=>{

            if(!user){
                return done(null ,false, {message:'Email not found First Register to log in'})
            }
            
            //password matching
            bycrypt.compare(password, user.password, (err, isMatch)=>{

                if(err) throw err;

                if(isMatch){
                    return done(null,user);
                }
                else{
                    return done(null,false,{ message:'Password Incorrect' })
                }
            })

          })
          .catch(err => console.log(err))
      })
   );
   // used to serialize the user for the session
passport.serializeUser((user, done)=> {
    done(null, user.id); 
   
});

// used to deserialize the user
passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=> {
        done(err, user);
    });
});
}