const express = require("express");

const router = express.Router();

const {
  getProfileOfSpecificUser,
  updateProfile,
  addFollowers,
  removeFollowers,
  getUsername,
  checkUserNameAvailability,
} = require("../controllers/ProfileController");

// get profile details
router.get("/get/:userId", getProfileOfSpecificUser);
router.put("/update-profile/:userId", updateProfile);

// get username
router.get("/get/username/:id", getUsername);

// add followers
router.put("/followers/add/:username/:followingUserId", addFollowers);

router.get("/username/available/:id", checkUserNameAvailability);

module.exports = router;
