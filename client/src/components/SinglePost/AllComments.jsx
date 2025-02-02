import React, { useRef } from "react";
import SingleComment from "./SingleComment";
import LoginPrompt from "../Normal/LoginPrompt";
import { useSelector, useDispatch } from "react-redux";
import { addCommentToPost, hideComments } from "../../features/commentsSlice";

const AllComments = ({ postId }) => {
  const userCommentRef = useRef(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const comment = useSelector((state) => state.comments.userComment);
  let userId;
  if (isLoggedIn) {
    userId = useSelector((state) => state.auth.user);
  } else {
    userId = null;
  }

  const dispatch = useDispatch();

  const submitUserComment = async () => {
    let commentString = userCommentRef.current.value;

    if (commentString === "") {
      return alert("Please add some comment.");
    }
    dispatch(addCommentToPost({ commentVal: commentString, userId, postId }));
    userCommentRef.current.value = "";
  };

  const comments = useSelector((state) => state.comments.commentsArray);

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center sm:block sm:static sm:bg-white">
      <div className=" bg-white rounded-lg w-11/12 max-w-lg p-5 shadow-lg sm:rounded-none sm:shadow-none sm:w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Comments</h2>
          <span className="text-sm">
            Total Comments :{" "}
            <span className="font-bold">{comments.length}</span>
          </span>
          <button
            onClick={() => dispatch(hideComments())}
            className="text-gray-600 hover:text-gray-800 sm:hidden"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto max-h-80 sm:h-auto sm:overflow-visible sm:max-h-full">
          {isLoggedIn ? (
            comments.map((item) => {
              return (
                <SingleComment
                  content={item.content}
                  key={item._id}
                  author={item.author.name}
                  date={item.createdAt.time}
                />
              );
            })
          ) : (
            <LoginPrompt />
          )}
        </div>

        {isLoggedIn && (
          <div className="flex bg-white rounded-lg p-2 items-center md:w-96 border border-gray-300 outline-2 outline-slate-400">
            <input
              type="text"
              className="focus:outline-none w-full "
              ref={userCommentRef}
              placeholder="Enter your comment.."
            />
            <button
              onClick={submitUserComment}
              className={`text-white bg-secondary hover:bg-gray-700 outline-2 outline-double focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans`}
            >
              {"Post"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllComments;
