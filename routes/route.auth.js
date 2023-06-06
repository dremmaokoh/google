const router = require("express").Router();
const passport = require("passport");

//function to check if our user is logged in via middleware
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  //declaring what happens with the link above
  //scope is what kind of information do you want to retrive from the customer's profile
  router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  
  //to take care of callaback
  router.get("/google/callback", passport.authenticate("google"), (req, res) => {
    res.redirect("/protected");
  });
  
  // to handle auth/failure
  router.get("/auth/failure", (req, res) => {
    res.send("something went wrong .....");
  });
  
  router.get("/protected", isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.username}`);
  });
  
  router.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    req.session.destroy();
    return res.send(`Goodbye`);
  });

  module.exports = router;