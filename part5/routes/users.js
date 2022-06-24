var express = require('express');
var router = express.Router();

var userModel = require('../models/users');

//Sign Up
router.post('/sign-up', async function(req, res) {  
  
  var userExist = await userModel.findOne({
    email : req.body.emailFromFront
  })
  
  if(!userExist) {
    var newUser = new userModel({
      username : req.body.usernameFromFront,
      email : req.body.emailFromFront,
      password : req.body.passwordFromFront
    });
    var newUserSave = await newUser.save();

    req.session.user = {
      name : newUserSave.username,
      id : newUserSave._id
    } 
    // console.log(req.session.user);
    res.redirect('/weather');
  } else {
    res.redirect('/');
  }
});

//Sign In
router.post('/sign-in', async function(req, res) {  
  
  var userSignedIn = await userModel.findOne({
    email : req.body.email,
    password : req.body.password
  });
  // console.log(userSignedIn);

  if(userSignedIn != null) {
    req.session.user = {
      name : userSignedIn.email,
      id : userSignedIn._id
    } 
    // console.log(req.session.user);
    res.redirect('/weather');
  } else {
    res.redirect('/');
  }
});


//Log Out
router.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect("/");
})

module.exports = router;
