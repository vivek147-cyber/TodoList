const express = require('express');

const bycrpt = require('bcryptjs');//decrypting password
const User = require('../models/Users');
const passport = require('passport');

const router= express.Router();


router.get('/',(req,res)=>{

    res.render('index');
    
});

router.get('/login',(req,res)=>{

    res.render('login');
    
});

//regsitering user
router.post('/',(req,res)=>{

    //testing of post routes
    //console.log(req.body);
    //res.send('hello');

    const{ username, email , password }=req.body;

    //errors
    let errors=[];

    if(password.length < 6){
        errors.push({ msg:'password should be atleast of 6  characters'});
    }

    if(errors.length > 0){
        res.render('index',{
            errors,
            username,
            email,
            password
        });
    }
    else
    {
      User.findOne({ email:email })
       .then(user=>{
           if(user){//check user already created
               errors.push({ msg:'Email already exists!' });
               res.render('index',{
                errors,
                username,
                email,
                password
            });
           }
           else//create a new user
           {
              const newUser = new User({
                  username,
                  email,
                  password
              });
              //testing inputs
              //console.log(newUser.username);
              //res.send('hello');

              //hashing passwords
              bycrpt.genSalt(10,(err,salt)=> 
                bycrpt.hash(newUser.password, salt, (err, hash)=>{
                  
                    if(err) throw err;
                     
                    //hash password
                    newUser.password=hash;

                    //save new user
                    newUser.save()
                     .then(user=>{
                        req.flash(
                            'success_msg',
                            'You are now registered'
                          );
                         res.redirect('/home');
                     })
                     .catch(err=> console.log(err))
              }))
           }
       })
    }



});

//login the user

router.post('/login',(req,res,next)=>{

    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req,res,next)
})

//logout the user

router.get('/logout',(req,res)=>{
     
    req.logout();
    req.flash('success_msg','You are successfully logged out');
    res.redirect('/login');

});



module.exports=router;
