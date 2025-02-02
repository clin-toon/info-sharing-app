const Post = require("../models/PostModel");
const User = require("../models/User");

// create new post
const createNewPost = async (req, res, next) => {
  const { postTitle, postDescription, postCategory } = req.body;
  const imageUrl = "http://localhost:8001/";
  let image = "";

  if (req.file) {
    image = imageUrl + req.file.path;
  }

  const userId = req.params.userId;

  try {
    const searchUser = await User.findById(userId);

    if (!searchUser) {
      return res.status(400).json({ message: "Invalid id " });
    }

    const cat = postCategory.toLowerCase();
    const newPost = new Post({
      postCategory: cat,
      postTitle,
      postDescription,
      postedBy: userId,
      thumbnail: image,
    });

    const post = await newPost.save();
    res
      .status(201)
      .json({ post, message: "Created post succesfully ", success: true });
  } catch (error) {
    next(error);
  }
};

// edit a post
const updatePost = async (req, res, next) => {
  const { postId } = req.params;
  const { postTitle, postDescription, postCategory } = req.body;

  let cat;
  if (postCategory) {
    cat = postCategory.toLowerCase();
  }

  try {
    const searchPost = await Post.findById(postId);
    if (!searchPost) {
      return res.status(400).json({ msg: "Invalid post id" });
    }
    let imageUrl = "http://localhost:8001/";
    let image = searchPost.thumbnail;
    if (req.file) {
      image = imageUrl + req.file.path;
    }
    const data = {
      postTitle: postTitle === "" ? searchPost.postTitle : postTitle,
      postDescription:
        postDescription === "" ? searchPost.postDescription : postDescription,
      postCategory: cat === "" ? searchPost.postCategory : cat,
      thumbnail: image,
    };

    const updatePost = await Post.findByIdAndUpdate(postId, data, {
      new: true,
      runValidators: true,
    });

    return res.status(201).json({ msg: "Updated successfully", searchPost });
  } catch (error) {
    next(error);
  }
};

// delete post
const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const searchPost = await Post.findById(postId);
    if (!searchPost) {
      return res.status(400).json({ msg: "Invalid post id " });
    }
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ msg: "Post deleted succesfulyy " });
  } catch (error) {
    next(error);
  }
};

// get post specific to a post id

const getPostofSpecificId = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const findPost = await Post.findById(postId);
    if (!findPost) {
      return res.status(400).json({ msg: "Invalid post id " });
    }

    res.status(200).json(findPost);
  } catch (error) {
    next(error);
  }
};

// fetch all posts

const fetchAllPosts = async (req, res, next) => {
  try {
    const allPosts = await Post.find();
    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
};

// get post of specific user
const getPostOfSpecificUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const searchUser = await User.findById(userId);
    if (!searchUser) {
      return res.status(400).json({ msg: "Invalid id " });
    }

    const posts = await Post.find({ postedBy: userId }).populate(
      "postedBy",
      "username email"
    );

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// serach posts
const searchPosts = async (req, res, next) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ message: 'Query parameter "q" is required' });
  }
  try {
    const results = await Post.find({
      $text: { $search: query },
    }).populate("postedBy", "username ");

    res.json({ results });
  } catch (error) {
    next(error);
  }
};

// search post by category

const searchPostByCategory = async (req, res, next) => {
  let query = req.query.cat;
  query.toLowerCase();
  if (!query) {
    return res
      .status(400)
      .json({ message: 'Query parameter "cat" is required' });
  }
  try {
    const results = await Post.find({
      postCategory: query,
    }).populate("postedBy", "username ");

    res.json({ results });
  } catch (error) {
    next(error);
  }
};

// fetch posts for home page
const fetchPostsForHomePage = async (req, res) => {
  try {
    const allPosts = await Post.find();
    let responseArray = [];
    for (let i = 0; i < 4; i++) {
      responseArray.push(allPosts[i]);
    }
    res.status(200).json(responseArray);
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server error " });
  }
};

const updateLikesOfPost = async (req, res, next) => {
  const { postId, userId } = req.params;

  try {
    const findPost = await Post.findById(postId);
    const findUser = await User.findById(userId);
    if (!findPost || !findUser) {
      return res.status(400).json({ msg: "Invalid post id or user Id" });
    }

    if (findPost.likes.includes(userId)) {
      return res.status(200).json({ msg: "Already liked a post " });
    }

    await Post.updateOne(
      {
        _id: postId,
      },
      { $push: { likes: userId } }
    );

    return res.status(201).json({ msg: "Liked a post " });
  } catch (error) {
    next(error);
  }
};

const removeLikeFromPosts = async (req, res, next) => {
  const { postId, userId } = req.params;

  try {
    const findPost = await Post.findById(postId);
    const findUser = await User.findById(userId);
    if (!findPost || !findUser) {
      return res.status(400).json({ msg: "Invalid post id or user Id" });
    }

    if (findPost.likes.includes(userId)) {
      await Post.updateOne(
        {
          _id: postId,
        },
        { $pull: { likes: userId } }
      );
      return res.status(201).json({ msg: "Removed like" });
    }
  } catch (error) {
    next(error);
  }
};

const savePostsInProfile = async (req, res) => {};

module.exports = {
  createNewPost,
  getPostOfSpecificUser,
  searchPosts,
  searchPostByCategory,
  updatePost,
  deletePost,
  getPostofSpecificId,
  fetchAllPosts,
  fetchPostsForHomePage,
  updateLikesOfPost,
  removeLikeFromPosts,
  savePostsInProfile,
};
