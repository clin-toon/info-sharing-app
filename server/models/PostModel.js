const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true, // Name is mandatory
    trim: true, // Removes extra spaces
  },
  postCategory: {
    type: String,
    required: true,
    trim: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postDescription: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "",
  },

  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.index({ postTitle: "text", postDescription: "text" });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
