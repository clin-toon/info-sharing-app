import React from "react";
import { timeConverter } from "../../utils/timeConverter";

const SingleComment = ({ content, author, date }) => {
  return (
    <div className="flex items-start  p-4 rounded-lg mb-4 max-w-md mx-auto">
      {/* Profile Picture */}
      <img
        src={"https://via.placeholder.com/50"}
        alt={`${author}'s profile`}
        className="w-10 h-10 rounded-full mr-4"
      />

      {/* Comment Content */}
      <div className="flex-1">
        {/* Username and Timestamp */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">{author}</h4>
          <span className="text-xs text-gray-500">{timeConverter(date)}</span>
        </div>

        {/* Comment Text */}
        <p className="text-gray-700 mt-2">{content}</p>
      </div>
    </div>
  );
};

export default SingleComment;
