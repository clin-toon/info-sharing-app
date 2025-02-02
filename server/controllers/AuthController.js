const User = require("../models/User");
const Profile = require("../models/ProfileModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
// sign up functions

const passwordHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const SignUpController = async (req, res, next) => {
  const { username, email, password, fullName, displayPicture } = req.body;

  const findUser = await User.findOne({ username: username });
  const fineUserByEmail = await User.findOne({ email: email });

  if (findUser || fineUserByEmail) {
    res.status(400).json("User exists ");
  } else {
    try {
      const hashPassword = await passwordHash(password);
      const newUser = new User({
        username: username,
        email,
        displayName: fullName,
        displayPicture,
        password: hashPassword,
      });
      const result = await newUser.save();

      const newProfile = new Profile({
        fullName,
        user: result._id,
      });

      await newProfile.save();
      res.status(201).json(newProfile);
    } catch (error) {
      next(error);
    }
  }
};

const LoginController = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    try {
      const payload = {
        userId: user._id,
        username: user.username,
      };
      // Create a JWT token with an expiration time
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      // Respond with the token and user details
      res.status(200).json({
        message: "Login successful",
        jwt: token,
        user: { userId: user._id, username: user.username, email: user.email },
      });
    } catch (error) {
      return next(error); // In case of any error while generating the token
    }
  })(req, res, next);
};

module.exports = {
  SignUpController,
  LoginController,
};
