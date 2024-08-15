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

var nodemailer = require("nodemailer");

var numAppointments = 0;

mongoose.connect("mongodb://http://127.0.0.1:5500/client");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

//sign up for sapp
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

//login to app
app.post("/login", (req, res));

//add appointment for logged in user
app.post("/calendar", (req, res) => {
    try {
        User.appointments.push(new Appointment(req.body.consert-date, req.body.concert-name));
        numAppointments++;
    }
    catch (err) {
        res.status(400).json({error: "error making appointment"});
    }
});

server.listen(3000, () => console.log("Server listening on port 3000"));

async function sendEmail() {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: "brianna.hawkins@macaulay.cuny.edu",
            pass: "mnwj mfir bpok gsgn" //auto-generated password from 2 step app verification
        }
    });

    await transporter.sendMail({
        from: "\"Concert Event Reminders\" <brianna.hawkins@macaulay.cuny.edu>",
        to: User.email,
        subject: `Thanks for signing up for ${User.appointments[numAppointments - 1].toString()}!`,
        text: `Your concert is on ${User.appointments[numAppointments - 1].getDateString()}.\nSee the calendar invite below.`
    });
    console.log("Email sent");
    
}



