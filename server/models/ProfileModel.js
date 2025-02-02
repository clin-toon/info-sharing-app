const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true, // Name is mandatory
    trim: true, // Removes extra spaces
  },
  dp: {
    type: String,
    default: "https://www.webiconio.com/_upload/255/image_255.svg",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: {
    type: String,
    default: "", // Default to an empty bio
    maxlength: 300,
  },

  followers: [
    {
      userId: mongoose.Schema.Types.ObjectId, // Reference to a user
      username: String, // Name of the user
    },
  ],
  following: [
    {
      userId: mongoose.Schema.Types.ObjectId, // Reference to a user
      username: String, // Name of the user
    },
  ],
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
