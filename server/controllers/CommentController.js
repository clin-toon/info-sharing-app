const Post = require("../models/PostModel");
const User = require("../models/User");
const Comment = require("../models/CommentModel");

// adding a comment controler
const addComment = async (req, res, next) => {
  const { postId, userId } = req.params;
  const { comment } = req.body;

  if (comment === "" || !comment) {
    return res.status(400).json({ msg: "Comment field should not be empty " });
  }
  try {
    const findPost = await Post.findById(postId);
    const findUser = await User.findById(userId);

    if (!findPost || !findUser) {
      return res.status(400).json({ msg: "Invalid user id or post id" });
    }

    const { username } = findUser;
    const { _id, postTitle } = findPost;

    const newComment = new Comment({
      content: comment,
      author: { id: findUser._id, name: username },
      post: { id: _id, title: postTitle },
    });

    const cmt = await newComment.save();
    return res.status(201).json({ msg: "Added comment ", cmt });
  } catch (error) {
    next(error);
  }
};

const getCommentsOfSpecificPost = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const findPost = await Post.findById(postId);
    if (!findPost) {
      return res.status(400).json({ msg: "Invalid post id" });
    }
    let allComments = await Comment.find({ "post.id": postId });
    allComments.sort(
      (a, b) => new Date(b.createdAt.time) - new Date(a.createdAt.time)
    );

    res.status(200).json({ allComments });
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, getCommentsOfSpecificPost };
