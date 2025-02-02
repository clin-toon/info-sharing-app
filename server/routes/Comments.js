const express = require("express");
const {
  addComment,
  getCommentsOfSpecificPost,
} = require("../controllers/CommentController");
const { validateComment } = require("../middlewares/inputValidator");

const router = express.Router();

// adding a comment

router.post("/add/:postId/:userId", addComment);
router.get("/get/:postId", getCommentsOfSpecificPost);

// likes part

module.exports = router;
