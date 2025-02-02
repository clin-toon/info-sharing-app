const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const saveModel = mongoose.model(SavePost, saveSchema);
module.exports = saveModel;
