const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference the user
    name: { type: String, required: true }, // Store user's name for convenience
  },
  post: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference the post
    title: { type: String, required: true }, // Store post's title for convenience
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the like was created
  },
});

const Like = mongoose.model("Like", LikeSchema);
module.exports = Like;
