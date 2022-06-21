var express = require('express');
var router = express.Router();
var request = require('sync-request');


var cityList = [
  {name: "Bordeaux", desc: "Soleil", img:"/images/picto-1.png", temp_min:2, temp_max: 19},
  {name: "Marseille", desc: "Couvert", img:"/images/picto-1.png", temp_min:6, temp_max: 12},
  {name: "Lyon", desc: "Couvert", img:"/images/picto-1.png", temp_min:8, temp_max: 11},
]

// Login
router.get('/', function(req, res, next) {
  res.render('login', {  });
});

//Weather
router.get('/weather', function(req, res, next) {
  res.render('weather', { title : 'Weather App', cityList });
});

//Add city
router.post('/add-city', function(req, res, next) {
  var requete = request("GET", "https://api.openweathermap.org/data/2.5/weather?q="+ req.body.newcity +"&appid=ed655ad17c7705dd1baeae5f415d561f&units=metric");
  var dataAPI = JSON.parse(requete.body);
  // console.log(dataAPI);

  let cityExist = false;

  for(var i=0; i<cityList.length; i++) {
      if(cityList[i].name == req.body.newcity) {
        cityExist = true;
      }
  }
  if(cityExist == false && dataAPI.name) {
      cityList.push({
        name : req.body.newcity,
        desc : dataAPI.weather[0].description,
        img : "http://openweathermap.org/img/wn/"+dataAPI.weather[0].icon+".png",
        temp_min: dataAPI.main.temp_min, 
        temp_max: dataAPI.main.temp_max
      })
  }
  res.render('weather', { title : 'Weather App', cityList });
});

//Delete city
router.get('/delete-city', function(req, res, next) {

  cityList.splice(req.query.position, 1)
  
  res.render('weather', { title : 'Weather App', cityList });
});


module.exports = router;