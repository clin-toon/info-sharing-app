const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },

  fullName: {
    type: String,
    minlength: 5,
  },

  displayPicture: {
    type: String,
    default: "https://www.webiconio.com/_upload/255/image_255.svg",
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows Google ID to be optional for local users
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
