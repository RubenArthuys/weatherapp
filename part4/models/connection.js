var mongoose = require('mongoose')

//Mongoose Connect 
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology : true
 }
 mongoose.connect('mongodb+srv://rubenarth:XH2uztbN9ttgnTVQ@cluster0.v5blhg2.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options,        
    function(err) {
     console.log(err);
    }
 )