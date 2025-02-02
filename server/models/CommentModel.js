const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
  },
  post: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference the post
    title: { type: String, required: true }, // Store the post's title for convenience
  },
  createdAt: {
    time: {
      type: Date,
      default: Date.now,
    },
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
