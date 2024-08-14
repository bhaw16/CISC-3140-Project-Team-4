var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer();

var { default: mongoose } = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("model/User");

mongoose.connect("mongodb://http://127.0.0.1:5500/client");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

server.listen(3000, () => console.log("Server listening on port 3000"));



