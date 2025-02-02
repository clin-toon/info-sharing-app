import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { timeConverter } from "../../utils/timeConverter";
import { useDispatch, useSelector } from "react-redux";
import { changeMainPostId, getUserInfo } from "../../features/singlePostSlice";
import { getUserNameOfPostOwner } from "../../features/singlePostSlice";

const Trending = ({ thumbnail, title, postId, date, userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.userComment);
  useEffect(() => {}, [comments]);

  const handleButtonClick = () => {
    navigate(`/single-post/${postId}`);
    dispatch(changeMainPostId(postId));
    dispatch(getUserNameOfPostOwner(userId));
    dispatch(getUserInfo(userId));
  };

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden sm:mx-2 mt-3">
      <img className="w-full h-48 object-cover" src={thumbnail} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <span>{timeConverter(date)}</span>
        <button
          onClick={handleButtonClick}
          className="mt-4 w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 "
        >
          View post
        </button>
      </div>
    </div>
  );
};

export default Trending;
