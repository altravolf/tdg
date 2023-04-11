if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
} else {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const Account = require("./models/accounts");
const date = require("date-and-time")
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("./models/admin");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");
const Morgan = require("morgan");


// ip
const serverIp = "localhost";




//  route requires
const accountRoutes = require("./routes/accountRoutes");
const dateRoutes = require("./routes/dateRoutes");
const adminRoutes = require("./routes/adminRoutes");
const AppError = require("./utils/appError");

const dbUrl = process.env.DB_URL;

// const dbUrl = 'mongodb://localhost:27017/tds';

// mongoose connection
main().then(() => console.log("DB connected")).catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

mongoose.connection.on('open', function () {
    console.log("Connection to Mongo DB is open!");
});

// morgan setup
app.use(Morgan("tiny"));

// view ejs setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// To serve static files
app.use(express.static('public'));

// To encode data  
app.use(express.urlencoded({ extended: true }));

// To sanitize mongo
app.use(mongoSanitize());


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// const secret = "Yogi"

// Session setup
app.use(session({
    name: "_blah",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 15,
        maxAge: 1000 * 60 * 60 * 24 * 15
    },
    store: MongoStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 60 * 60
    })
}))

// Flash setup
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Locals middleware
app.use((req, res, next) => {
    res.locals.currPath = req.originalUrl;

    // For showing login and logout we are using this
    res.locals.isSignedIn = req.user;
    next();
})


/* Routes coming from routes folder */
app.use("/", adminRoutes);
app.use("/", dateRoutes);
app.use("/", accountRoutes);


// Routes
app.get("/", async (req, res) => {
    res.render("index");
})


app.all("*", async (req, res, next) => {
    next(new AppError("Page not found", 404));
})

app.use((err, req, res, next) => {
    if (!err.message) {
        err.message = "Something went wrong";
    }
    if (!err.status) {
        err.status = 500;
    }
    res.render("error", { err });
})

const port = 3000;

app.listen(port, () => {
    console.log(`TriveniDhamGaushala.com is listening on: http://${serverIp}:${port}`);
})