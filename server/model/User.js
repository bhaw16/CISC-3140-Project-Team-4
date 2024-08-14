var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var User = new Schema({
 username:String, 
 password: String,
 email: String,
 firstname: String,
 lastname: String,
 gender: String,
 birthday: {type: Date},
 appointments: {type: Array, default: []}
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", User);