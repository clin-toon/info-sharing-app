import React, { useState } from "react";
import InteractionButtons from "../SinglePost/InteractionButtons";
import { timeConverter } from "../../utils/timeConverter";
import { changeDeletePostId, changePostId } from "../../features/postSlices";
import { useDispatch } from "react-redux";

const YourPostElem = ({
  savedPosts,
  onDelete,
  onEdit,
  title,
  des,
  cat,
  thumbnail,
  date,
  pId,
}) => {
  const dispatch = useDispatch();

  const handleEditPost = () => {
    onEdit();
    dispatch(changePostId(pId));
  };

  const handleDeletePost = () => {
    onDelete();
    dispatch(changeDeletePostId(pId));
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto sm:mx-3 mt-4">
      <img
        src={thumbnail}
        alt={"Image title"}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />

      <div className="text-sm text-gray-500 mb-2">
        <span className="font-bold mr-4"> {cat} </span>
        {timeConverter(date)}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{des}</p>
      {savedPosts && <InteractionButtons saved={savedPosts} />}
      {!savedPosts && (
        <div className="flex justify-end space-x-2">
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleEditPost}
          >
            Edit
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={handleDeletePost}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default YourPostElem;
