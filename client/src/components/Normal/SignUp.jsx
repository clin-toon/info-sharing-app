import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Password toggle icons
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../features/authSlice";
import axios from "axios";
import { changeModalMessage, makeModalTrue } from "../../features/modalSlices";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const api = import.meta.env.VITE_API_URL;

  const [showPasswordError, setShowPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [userNameMesssage, setUsernameMessage] = useState("available");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (value.length >= 8) {
        setShowPasswordError(false);
      } else {
        setShowPasswordError(true);
      }
    }

    if (name === "username") {
      setUserNameError(false);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePassword = (e) => {
    setShowPasswordError(true);
  };

  const handleUsername = async (e) => {
    let user = e.target.value;
    if (user.length === 0) {
      setUserNameError(false);
      return;
    }
    if (user.length < 4) {
      setUserNameError(true);
      setUsernameMessage("unavailable");
      return;
    }

    try {
      const res = await axios.get(`${api}profile/username/available/${user}`);
      if (res.data.data === true) {
        setUserNameError(true);
        setUsernameMessage("available");
      } else {
        setUserNameError(true);
        setUsernameMessage("unavailable");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showPasswordError || userNameMesssage === "unavailable") {
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Opps ! Errors",
          des: "Please solve errors.",
        })
      );
      return;
    }
    const sign = await dispatch(signup(formData));
    if (signup.fulfilled.match(sign)) {
      setShowPasswordError(false);
      setUserNameError(false);
      navigate("/login");
    } else {
      setShowPasswordError(false);
      setUserNameError(false);
      navigate("/signup");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-96 p-5  bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              onBlur={handleUsername}
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {userNameError && (
            <span
              className={`text-md ml-3 ${
                userNameMesssage === "available"
                  ? "text-green-600"
                  : "text-red-600"
              } `}
            >
              {formData.username} is {userNameMesssage}{" "}
            </span>
          )}

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                min={8}
                onFocus={handlePassword}
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <AiFillEye className="w-5 h-5" />
                ) : (
                  <AiFillEyeInvisible className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {showPasswordError && (
            <span className="mt-5 ml-3 text-red-600 text-sm">
              Password must be at least 8 characters.{" "}
            </span>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-4">
          <span className="mx-20">
            Already have an account?
            <Link to="/login">
              <span className="underline cursor-pointer  block text-center mt-1 md:inline">
                Log in
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
