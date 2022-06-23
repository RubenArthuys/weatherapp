var mongoose = require('mongoose')

//Schema pour la collection-table : users
var userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
//Le modèle, pour consulter et manipuler une collection.
var userModel = mongoose.model('users', userSchema)
//'users' va créer une nouvelle collection 'users' sur MongoDB automatiquement !important!

module.exports = userModel
