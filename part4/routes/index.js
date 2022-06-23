var cityModel = require('../models/cities');
var userModel = require('../models/users');

var express = require('express');
var router = express.Router();
var request = require('sync-request');

// Login
router.get('/', function(req, res) {
  res.render('login', {  });
});

//Weather
router.get('/weather', async function(req, res) {
  var cityList = await cityModel.find();
  res.render('weather', { title : 'Weather App', cityList });
});

//Add city
router.post('/add-city', async function(req, res) {
  var requete = request("GET", "https://api.openweathermap.org/data/2.5/weather?q="+ req.body.newcity +"&appid=ed655ad17c7705dd1baeae5f415d561f&units=metric");
  var dataAPI = JSON.parse(requete.body);

  if (dataAPI.name) {
    dataAPI.name = dataAPI.name.charAt(0).toUpperCase() + dataAPI.name.substr(1).toLowerCase()
    req.body.newcity = req.body.newcity.charAt(0).toUpperCase() + req.body.newcity.substr(1).toLowerCase()
  }

  var cityExist = await cityModel.findOne({ name : req.body.newcity }) 

  if(cityExist == null && dataAPI.name) {
      var newCity = new cityModel({
        name : req.body.newcity,
        desc : dataAPI.weather[0].description,
        img : "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
        temp_min: dataAPI.main.temp_min, 
        temp_max: dataAPI.main.temp_max
      });
      await newCity.save();
  }
  
  cityList = await cityModel.find();
  res.render('weather', { title : 'Weather App', cityList });
});

//Delete city
router.get('/delete-city', async function(req, res) {
  await cityModel.deleteOne({ _id : req.query.id });

  var cityList = await cityModel.find();
  res.render('weather', { title : 'Weather App', cityList });
});

//Update city
router.get('/update-cities', async function(req, res) {
  var cityList = await cityModel.find();

  for(var i=0; i<cityList.length; i++) {
    var requete = request("GET", "https://api.openweathermap.org/data/2.5/weather?q="+ cityList[i].name +"&appid=ed655ad17c7705dd1baeae5f415d561f&units=metric");
    var dataAPI = JSON.parse(requete.body);

    //Dans la doc de Mongoose : updateOne({ _id: doc._id }, { $set: { name: 'foo' } })
    await cityModel.updateOne({_id : cityList[i]._id}, 
      {
        name : cityList[i].name,
        desc : dataAPI.weather[0].description,
        img : "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
        temp_min: dataAPI.main.temp_min, 
        temp_max: dataAPI.main.temp_max
      });
  }
  //Pour rafraichir la page :
  cityList = await cityModel.find();

  res.render('weather', { title : 'Weather App', cityList });
});

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

