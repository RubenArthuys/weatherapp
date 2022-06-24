var cityModel = require('../models/cities');

var express = require('express');
var router = express.Router();
var request = require('sync-request');

// Login
router.get('/', function(req, res) {
  res.render('login');
});

//Weather
router.get('/weather', async function(req, res) {
  
  if(req.session.user) { 
    var cityList = await cityModel.find();
    res.render('weather', { title : 'Weather App', cityList });
  } else {
    res.redirect('/')
  }
});

//Add city
router.post('/add-city', async function(req, res) {
  var requete = request("GET", "https://api.openweathermap.org/data/2.5/weather?q="+ req.body.newcity +"&appid=ed655ad17c7705dd1baeae5f415d561f&units=metric");
  var dataAPI = JSON.parse(requete.body);
  console.log(dataAPI)

  //Condition pour l'écriture correct des villes
  req.body.newcity = req.body.newcity.charAt([0]).toUpperCase() + req.body.newcity.substr([1]).toLowerCase()

  //Pour éviter les doublons
  var cityExist = await cityModel.findOne({ name : req.body.newcity }) 

  if(cityExist == null && dataAPI.name) {
      var newCity = new cityModel({
        name : req.body.newcity,
        desc : dataAPI.weather[0].description,
        img : "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
        temp_min: dataAPI.main.temp_min, 
        temp_max: dataAPI.main.temp_max,
        lon: dataAPI.coord.lon,
        lat: dataAPI.coord.lat,
      });
      await newCity.save();
  }
  //Pour rafraichir la page :
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

module.exports = router;

