const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            displayName: profile.displayName,
            password: "***************",
            displayPicture: profile.photos[0].value,
          });
        }
        const token = jwt.sign(
          { id: user.id, googleId: user.googleId },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // The field that Passport will use to find the user (in this case, 'email')
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // 1. Find user by email
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return done(null, false, { message: "Incorrect email or password." });
        }

        // 3. Successful authentication: return the user object
        return done(null, user);
      } catch (error) {
        return done(error); // Pass any errors to the error handler
      }
    }
  )
);
