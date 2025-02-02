const express = require("express");
const router = express.Router();
const { upload } = require("../middlewares/multer");
const verifyToken = require("../middlewares/VerifyToken");

const {
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
} = require("../controllers/PostController");
const { validatePosts } = require("../middlewares/inputValidator");

// create post
router.post(
  "/create/:userId",
  verifyToken,
  upload.single("file"),
  validatePosts,
  createNewPost
);

// edit a post
router.put("/update/:postId", upload.single("file"), verifyToken, updatePost);

// delete a post

router.delete("/delete/:postId", verifyToken, deletePost);

// get post specific to user
router.get("/get/:userId", verifyToken, getPostOfSpecificUser);

// get all the posts
router.get("/find/all", fetchAllPosts);

// seach post related to title in search results
router.get("/search", searchPosts);

// get a specific to postId
router.get("/get/single/:postId", getPostofSpecificId);

// search post by category
router.get("/search/category", searchPostByCategory);

// posts for home page
router.get("/home-page", fetchPostsForHomePage);

// increase like on a posts

router.put("/like/:postId/:userId", updateLikesOfPost);

// remove like from post
router.put("/remove-like/:postId/:userId", removeLikeFromPosts);

// save post
router.put("/save-posts", savePostsInProfile);

module.exports = router;
