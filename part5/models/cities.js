var mongoose = require('mongoose')

//Schema pour la collection-table : cities
var citySchema = mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number,
  lon: Number,
  lat: Number
});

//Le modèle, pour consulter et manipuler une collection.
var cityModel = mongoose.model('cities', citySchema)
//'cities' va créer une nouvelle collection 'cities' sur MongoDB automatiquement !important!

module.exports = cityModel
