import React from "react";
import { useState } from "react";
import { editPostOfUser } from "../../features/postSlices";
import { useDispatch, useSelector } from "react-redux";
import { blogKeywords } from "../../constants/Constants";

const EditBlog = ({ cancelEdit }) => {
  const [formData, setFormData] = useState({
    postTitle: "",
    postCategory: "",
    postDescription: "",
    file: null,
  });

  const dispatch = useDispatch();
  const postId = useSelector((state) => state.posts.idOfEditingPost);

  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("postTitle", formData.postTitle);
    form.append("postDescription", formData.postDescription);
    form.append("postCategory", formData.postCategory);
    form.append("file", formData.file);
    dispatch(editPostOfUser({ postId, userId, token, form }));
    cancelEdit();
  };

  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg relative">
          <button
            onClick={cancelEdit}
            className="absolute top-3 right-3 text-gray-500"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit a Post</h2>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="postTitle"
              value={formData.postTitle}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="postCategory" className="block text-gray-700 mb-2">
              Category
            </label>
            <select
              name="postCategory"
              onChange={handleInputChange}
              id="1"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option selected disabled>
                {" "}
                Select{" "}
              </option>
              {blogKeywords.map((item) => {
                return (
                  <option
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    value={item}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="postDescription"
              value={formData.postDescription}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Choose File */}
          <div className="mb-4">
            <label htmlFor="file" className="block text-gray-700 mb-2">
              Choose File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-full text-gray-700"
            />
          </div>

          {/* Create Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-black text-white p-3 rounded hover:bg-gray-800 transition duration-200"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
