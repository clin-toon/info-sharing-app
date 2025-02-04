import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { timeConverter } from "../../utils/timeConverter";
import { useDispatch } from "react-redux";
import { getCommentsOfPosts } from "../../features/commentsSlice";

import {
  getSinglePost,
  getAllPosts,
  getUserInfo,
} from "../../features/singlePostSlice";

const SearchRes = ({
  title,
  des,
  thumbnail,
  author,
  time,
  cat,
  postId,
  userId,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const gotToSinglePost = () => {
    navigate(`/single-post/${postId}`);
    dispatch(getSinglePost(postId));
    dispatch(getUserInfo(userId));
    dispatch(getAllPosts(postId));
    dispatch(getCommentsOfPosts(postId));
  };

  useEffect(() => {}, []);

  return (
    <div
      className="flex flex-col md:flex-row p-4 hover:bg-gray-100 cursor-pointer m-4 "
      onClick={gotToSinglePost}
    >
      {/* Thumbnail */}
      <div className="w-full md:w-40 h-40 md:h-52 mb-2 md:mb-0 flex-shrink-0">
        <img
          src={thumbnail}
          alt={"Post thumbnaail"}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col md:ml-4">
        {/* Title */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-black- hover:underline"
        >
          {title}
        </a>

        {/* Blog name , views, and upload date */}
        <div className="mt-2">
          <span className="text-lg text-gray-500 mt-1 mr-10">{author}</span>
          <span className="bg-black text-white rounded-md p-1 w-fit">
            {cat}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 mt-2 line-clamp-2">{des}</p>
        <p className="font-bold my-2">
          Posted on <span className="font-normal">{timeConverter(time)}</span>
        </p>
        <button className="w-28 text-white bg-secondary hover:bg-gray-700 outline-2 outline-double focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 mb-2 font-sans">
          Read more
        </button>
      </div>
    </div>
  );
};

export default SearchRes;
