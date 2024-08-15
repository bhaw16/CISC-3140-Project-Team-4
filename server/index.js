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
var user;

var nodemailer = require("nodemailer");

var numAppointments = 0;

mongoose.connect("mongodb://http://127.0.0.1:5500/client");

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//sign up for app
app.post("/signup", async (req, res) => {
    user = await User.create({
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
app.post("/login", async (req, res) => {
    try {
        user = await User.findOne({username: req.body.username});
        if (user != null || user!= undefined) { //user exists
            if (req.body.password == user.password) {   //password matches
                res.render("calendar"); //show calendar page so user can make appointments
            }
            else {
                throw new "Incorrect password.";
            }
        }
        else {  //user does not exist
            throw new "User doesn't exist.";
        }
    }
    catch (err) {
        res.status(400).json({error: err.message})
    }
});

//add appointment for logged in user
app.post("/calendar", (req, res) => {
    try {
        user.appointments.push(new Appointment(req.body.consert-date, req.body.concert-name));
        numAppointments++;
        sendEmail().catch(console.error());
    }
    catch (err) {
        res.status(400).json({error: "error making appointment"});
    }
});

/*
search for appointments
ideally the search page would be a different
page than calendar but the front end of the app is not complete
*/
app.get("/calendar", (req, res) => {
    if (req.body.criteria == "date") {  //search by search criteria (date)
        return user.appointments.filter((appointment) => req.body.datetime-local == appointment.date);
    }
    else {  //search by concert name
        return user.appointments.filter((appointment) => req.body.concert-name == appointment.name);
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
        to: user.email,
        subject: `Thanks for signing up for ${user.appointments[numAppointments - 1].toString()}!`,
        text: `Your concert is on ${user.appointments[numAppointments - 1].getDateString()}.\nSee the calendar invite below.\nIf you'd like to remove the reminder, delete the event from your calendar after downloading the ics file.\nIf you'd like to update the appointment details, change the event information in your device's Calendar app.`,
        icalEvent: {
            filename: "invitation.ics",
            method: "request",
            content: user.appointments[numAppointments - 1].toString()
        }
    });
    console.log("Email sent");
}



