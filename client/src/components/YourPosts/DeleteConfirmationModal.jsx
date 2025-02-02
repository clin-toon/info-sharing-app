import React from "react";
import { deletePostsOfUser } from "../../features/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteConfirmationModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const postId = useSelector((state) => state.posts.idOfDeletingPost);
  const userId = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const handleDelete = () => {
    onCancel();
    dispatch(deletePostsOfUser({ postId, userId, token }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Are you sure you want to delete the post?
        </h3>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
