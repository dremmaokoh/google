const express = require ('express');
const passport = require ('passport')
require("dotenv").config();
const port = process.env.PORT 
const app = express ();
const session = require('express-session');
app.use(
    session({
    secret: process.env.KEYS,
    resave: false,
    saveUninitialized: false,
   cookie: { httpOnly: true,
             secure: false,
             maxAge: 24 * 60 * 60 * 1000,
  }
  }))
  app.use (passport.initialize());
  app.use (passport.session());
require ('./auth');
require("dotenv").config();

//function to check if our user is logged in via middleware
function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus (401);
}
//we want this user to become part of the request when someone logs in, we use espress-session for session management

app.get('/', (req, res)=>
{res.send ( '<a href="/auth/google">Authenticate with Google</a>');
});
//declaring what happens with the link above
//scope is what kind of information do you want to retrive from the customer's profile 
app.get ('/auth/google',
             passport.authenticate('google', {scope : ['email', 'profile']}));

//to take care of callaback
app.get('/google/callback',
passport.authenticate ('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
})
)

// to handle auth/failure
app.get('/auth/failure', (req, res) => {
    res.send ('something went wrong .....')
});



app.get ('/protected', isLoggedIn, (req, res) =>{
res.send(`Hello ${req.user.displayName}`)
});


app.get ('/logout', (req, res) => {
    res.clearCookie("access_token");
    req.session.destroy();
    return res.send (`Goodbye ${req.user.displayName}`);
  });


 app.listen (port, () => console.log (`Server up and running on port http://localhost:${port}`));