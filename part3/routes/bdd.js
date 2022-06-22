var mongoose = require('mongoose');

//Mongoose Connect 
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
 }
 mongoose.connect('mongodb+srv://rubenarth:ilypo002@cluster0.v5blhg2.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options,        
    function(err) {
     console.log(err);
    }
 );

//Schema pour la collection-table : cities
var citySchema = mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number
});
//Le modèle, pour consulter et manipuler une collection.
var cityModel = mongoose.model('cities', citySchema);
//'cities' va créer une nouvelle collection 'cities' sur MongoDB automatiquement !important!

module.exports = cityModel