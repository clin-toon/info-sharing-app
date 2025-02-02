import React from "react";
import { useSelector } from "react-redux";

const useSinglePost = (props) => {
  const single = useSelector((state) => state.singlePost);

  const {
    allPosts,
    mainPost,
    postOwnerUsername,
    mainPostLikes,
    otherPosts,
    postOfUserId,
    postOwner,
    mainPostId,
  } = single;

  return {
    allPosts,
    mainPost,
    postOwnerUsername,
    mainPostLikes,
    otherPosts,
    postOfUserId,
    postOwner,
    mainPostId,
  };
};

export default useSinglePost;
