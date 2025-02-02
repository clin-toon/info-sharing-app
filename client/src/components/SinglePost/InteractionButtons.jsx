import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { makeModalTrue, changeModalMessage } from "../../features/modalSlices";
import AllComments from "./AllComments";
import { useSelector, useDispatch } from "react-redux";
import { likePost, removeLike } from "../../features/singlePostSlice";
import { updateFollowers } from "../../features/profileSlice";

const InteractionButtons = ({ saved }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [followed, setFollowed] = useState(false);
  const postOwnerUserId = useSelector(
    (state) => state.singlePost.mainPost.postedBy
  );
  const dispatch = useDispatch();
  const likesCount = useSelector((state) => state.singlePost.mainPostLikes);
  const mainPost = useSelector((state) => state.singlePost.mainPost);
  const userId = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.singlePost.postOwnerUsername);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const postId = useSelector((state) => state.singlePost.mainPost._id);
  const followers = useSelector(
    (state) => state.singlePost.postOwner.followers
  );

  useEffect(() => {
    if (likesCount != null) {
      if (likesCount.includes(userId)) {
        setIsLiked(true);
      }
      if (likesCount.length === 0) {
        setIsLiked(false);
      }
    }

    if (followers != undefined) {
      for (let i = 0; i < followers.length; i++) {
        if (followers[i].userId === userId) {
          setFollowed(true);
          break;
        } else {
          setFollowed(false);
        }
      }
    }
  }, [likesCount, mainPost, followers, dispatch]);

  const handleLike = () => {
    if (!isLoggedIn) {
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Log in required.",
          des: "Please log in to like and comment on posts.",
        })
      );
    } else {
      dispatch(likePost({ postId, userId }));
    }
  };

  const handleDecreaseLike = () => {
    if (!isLoggedIn) {
      dispatch({ type: "CHANGE_LOGIN_MSG" });
      dispatch({ type: "SHOW_SERVER_ERROR" });
    } else {
      dispatch(removeLike({ postId, userId }));
      setIsLiked(false);
    }
  };

  const follow = async () => {
    if (!isLoggedIn) {
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Log in required.",
          des: "Please log in to like , comment on posts and follow accounts.",
        })
      );
      return;
    }
    try {
      const result = await dispatch(
        updateFollowers({ userId, token, username, postOwnerUserId })
      ).unwrap();
      console.log("Request fulfilled:", result);
      setFollowed(true);
    } catch (error) {
      console.error("Request failed:", error.message);
      setFollowed(false);
    }
  };

  const unfollow = () => {
    alert("Unfollow button clicked.");
  };

  return (
    <div className="flex space-x-1 ">
      {/* Like Button */}
      <div className="px-4 py-2 bg flex items-center  bg-black rounded-lg ">
        <button className="hover:bg-gray-700">
          {isLiked ? (
            <AiFillLike
              className="text-xl text-white"
              onClick={handleDecreaseLike}
            />
          ) : (
            <AiOutlineLike
              className="text-xl text-white"
              onClick={handleLike}
            />
          )}
        </button>

        <span className="text-white mx-2">
          {" "}
          {likesCount === null ? "Loading..." : likesCount.length}
        </span>
      </div>

      {/* Follow Button */}
      {!followed ? (
        <button
          onClick={follow}
          className={`text-white bg-secondary hover:bg-gray-700 outline-2 outline-double focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans`}
        >
          {"Follow "}
        </button>
      ) : (
        <button
          onClick={unfollow}
          className={`text-white bg-secondary hover:bg-gray-700 outline-2 outline-double focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans`}
        >
          {"Following"}
        </button>
      )}
    </div>
  );
};

export default InteractionButtons;
