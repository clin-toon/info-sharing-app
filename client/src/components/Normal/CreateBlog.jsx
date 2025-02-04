import React from "react";
import { useState } from "react";
import { blogKeywords } from "../../constants/Constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import useAppSelector from "../../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import {
  makeModalTrue,
  makeLoaderFalse,
  changeModalMessage,
  makeLoaderTrue,
} from "../../features/modalSlices";

const CreateBlog = ({}) => {
  const api = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { authUser, authToken } = useAppSelector();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [category, setCategory] = useState("All");
  const [file, setFile] = useState(null);

  const handleCateogryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("postTitle", formData.title);
    form.append("postDescription", formData.description);
    form.append("postCategory", category);
    form.append("file", file);
    dispatch(makeLoaderTrue());
    createPost(form);
  };

  const createPost = async (formData) => {
    try {
      await axios.post(`${api}posts/create/${authUser}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Created post succesfully",
          des: "Your post has been created succesfully ",
        })
      );
      navigate(`/dashboard/your-post/${authUser}`);
    } catch (error) {
      console.log(error);
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Unable to create post ",
          des: error.response ? error.response.data : "Server error ",
        })
      );
    }
  };

  return (
    <div className="flex justify-center items-center w-full p-4">
      {/* Modal */}

      <div className=" flex items-center justify-center ">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg relative">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Create Post</h2>

          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Info Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter info title"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              id="1"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
              onChange={handleCateogryChange}
              value={category}
            >
              <option disabled> Select </option>
              {blogKeywords.map((item) => {
                return (
                  <option
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    value={item}
                    key={item}
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
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter info description"
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
