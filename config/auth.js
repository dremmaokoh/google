const passport = require ('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require("dotenv").config();
const User = require("../models/models.user");


passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser( (id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });
  

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:9450/google/callback"
  },
  function(accessToken, refreshToken, profile, done)  {
    console.log(profile);
    User.findOne({ googleid: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log(`User is ${currentUser}`);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture,
          })
            .save()
            .then((newUser) => {
              console.log(`new user created ${newUser}`);
              done(null, newUser);
            });
        }
      });
      const dataInfo = {
        status: "success",
        message: "login successfull",
        accessToken:  accessToken,
      };
    console.log(dataInfo);
    }
  )
);


// passport.serializeUser(function (user,done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user,done) {
//     done(null, user);
// });




//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));


// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       callbackURL: "https://bookie.onrender.com/auth/google/redirect",
//       clientID: process.env.clientID,
//       clientSecret: process.env.clientSecret,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // console.log(profile);
//       User.findOne({ googleid: profile.id }).then((currentUser) => {
//         if (currentUser) {
//           console.log(`User is ${currentUser}`);
//           done(null, currentUser);
//         } else {
//           new User({
//             username: profile.displayName,
//             googleId: profile.id,
//             thumbnail: profile._json.picture,
//           })
//             .save()
//             .then((newUser) => {
//               console.log(`new user created ${newUser}`);
//               done(null, newUser);
//             });
//         }
//       });
//       const dataInfo = {
//         status: "success",
//         message: "login successfull",
//         accessToken:  accessToken,
//       };
//     console.log(dataInfo);
//     }
//   )
// );