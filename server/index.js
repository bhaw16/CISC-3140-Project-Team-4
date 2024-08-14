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

app.post("/signup", async (req, res) => {
    var user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.Gender,
        birthday: req.body.dob,
        firstname: req.body.fname,
        lastname: req.body.lname
    });
    return res.status(200).json(user);
});

app.post("/login", (req, res));

app.post("/calendar", (req, res) => {
    try {
        User.appointments.push(new Appointment(req.body.consert-date, req.body.concert-name));
    }
    catch (err) {
        res.status(400).json({error: "error making appointment"});
    }
});

server.listen(3000, () => console.log("Server listening on port 3000"));



