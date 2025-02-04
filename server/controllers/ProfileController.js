const Profile = require("../models/ProfileModel");
const User = require("../models/User");

const getProfileOfSpecificUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const searchUser = await Profile.findOne({ user: userId });
    if (!searchUser) {
      return res.status(400).json({ msg: "Invalid user id " });
    }
    res.status(200).json(searchUser);
  } catch (error) {
    next(error);
  }
};

// update profile
const updateProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { profileName, profileBio } = req.body;
  let cat;
  if (postCategory) {
    cat = postCategory.toLowerCase();
  }

  try {
    const searchUser = await Profile.find({ user: userId });
    if (!searchUser) {
      return res.status(400).json({ msg: "Invalid post id " });
    }
    const profileId = searchUser._id;
    let image = searchUser.dp;
    if (req.file) {
      image = imageUrl + req.file.path;
    }

    const data = {
      fullName: profileName,
      bio: profileBio,
      dp: image,
    };

    const updateProfile = await Post.findByIdAndUpdate(profileId, data, {
      new: true,
      runValidators: true,
    });

    return res
      .status(204)
      .json({ msg: "Updated profile successfully", updateProfile });
  } catch (error) {
    next(error);
  }
};

const getUsername = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ msg: "Invalid user id " });
    }
    res.status(200).json({ username: user.username });
  } catch (error) {
    next(error);
  }
};

// adding a follower and following

const addFollowers = async (req, res, next) => {
  const { username, followingUserId } = req.params;

  try {
    const searchUser = await Profile.find({ user: followingUserId });
    const searchUserName = await User.find({ username });
    if (searchUser.length === 0 || searchUserName.length === 0) {
      return res.status(400).json({ msg: "Invalid id or username " });
    }
    const followingId = searchUser[0]._id; // getting profile id of the follwing person'
    const followerId = searchUserName[0]._id;
    const folId = await Profile.find({ user: followerId });
    const followersId = folId[0]._id; // getting profile id of the follower person'

    const ifAlreadyFollowed = await Profile.findById(followingId);

    // checking if the user is already followed
    const checkUser = ifAlreadyFollowed.following.find(
      (val) => val.username === username
    );
    if (checkUser) {
      return res.status(400).json({ msg: "Already following this account " });
    }

    // updating following list
    await Profile.findByIdAndUpdate(
      followingId,
      {
        $push: { following: { userId: searchUserName[0]._id, username } },
      },
      { new: true }
    );

    // updating followers list
    await Profile.findByIdAndUpdate(
      followersId,
      {
        $push: {
          followers: {
            userId: followingUserId,
            username: searchUser[0].fullName,
          },
        },
      },
      { new: true }
    );
    res.status(201).json({ msg: "updated following list" });
  } catch (error) {
    next(error);
  }
};

// check if the username is available or not

const checkUserNameAvailability = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ username: id });

    if (user === null) {
      return res.status(200).json({
        data: true,
      });
    }

    if (user != null) {
      return res.status(200).json({ data: false });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfileOfSpecificUser,
  updateProfile,
  addFollowers,
  getUsername,
  checkUserNameAvailability,
};
