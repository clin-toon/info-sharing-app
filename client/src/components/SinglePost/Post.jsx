import React, { useEffect, useState } from "react";
import InteractionButtons from "./InteractionButtons";
import AllComments from "./AllComments";
import { timeConverter } from "../../utils/timeConverter";
import { useSelector, useDispatch } from "react-redux";
import { hideComments, showComments } from "../../features/commentsSlice";
import { useCallback } from "react";
import useAppSelector from "../../hooks/useAppSelector";

const Post = ({
  title,
  des,
  thumbnail,
  author,
  time,
  cat,
  postId,
  picture,
  postOwner,
}) => {
  const showAllComments = useSelector(
    (state) => state.comments.showCommentModal
  );
  const { authUser } = useAppSelector();

  const dispatch = useDispatch();

  const handleShowAllComment = () => {
    dispatch(showComments());
  };

  const handleHideAllComment = () => {};

  useEffect(() => {
    if (window.innerWidth >= 1000) {
      dispatch(showComments());
    } else {
      dispatch(hideComments());
    }
  }, []);

  return (
    <div className="max-w-md mx-auto sm:max-w-2xl bg-white rounded-lg overflow-hidden shadow-lg my-4 sm">
      {/* Post Image */}
      <img
        src={thumbnail}
        alt="Post"
        className="w-full h-48 object-cover sm:h-96"
      />

      {/* Post Content */}
      <div className="p-6">
        {/* Title and Timestamp */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">
            Posted on {timeConverter(time)}
          </p>
        </div>
        {/* Category */}
        <div className="mb-4">
          <span className="inline-block bg-black text-white  text-xs font-semibold px-2 py-1 rounded">
            {cat}
          </span>
        </div>
        {/* Post Details */}
        <p className="text-gray-700 mb-4">{des}</p>
        {/* Profile Info */}

        {postOwner === authUser ? (
          <h1 className="text-md  font-bold bg-gray-100 rounded-md inline p-2">
            Posted By You
          </h1>
        ) : (
          <div className="flex items-center">
            <img
              src={picture}
              alt={author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-gray-800 font-semibold">{author}</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between  my-4">
          <InteractionButtons postOwnerId={postOwner} />
          <div>
            <button
              onClick={handleShowAllComment}
              className={`sm:hidden text-white bg-secondary hover:bg-gray-700 outline-2 outline-double  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans`}
            >
              {"View Comments"}
            </button>
          </div>
        </div>
        {showAllComments && (
          <AllComments hideComment={handleHideAllComment} postId={postId} />
        )}
      </div>
    </div>
  );
};

export default Post;
