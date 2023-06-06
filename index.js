const express = require("express");
const User = require("./models/models.user");
const passport = require("passport");
require("dotenv").config();
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/route.auth");
const port = process.env.PORT;
const app = express();
const session = require("express-session");
app.use(
  session({
    secret: process.env.KEYS,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());
//require ('./config/auth.js');
const passportSetup = require("./config/auth.js");
require("dotenv").config();

//Connecting to database
connectDB();

//we want this user to become part of the request when someone logs in, we use espress-session for session management

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.use("/auth", authRoutes);


app.listen(port, () =>
  console.log(`Server up and running on port http://localhost:${port}`)
);
