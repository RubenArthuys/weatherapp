var mongoose = require('mongoose')

//Mongoose options 
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
 }

//Mongoose connect
mongoose.connect('mongodb+srv://rubenarth:ilypo002@cluster0.v5blhg2.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options,        
    function(err) {
     console.log(err);
    }
 )

