import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPrompt = ({}) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-md bg-white max-w-md mx-auto mt-8">
      <h2 className="text-lg font-semibold text-gray-800">
        Log in to view comments
      </h2>
      <p className="text-sm text-gray-600 mt-2">
        You need to log in to see and interact with the comments.
      </p>
      <button
        className="mt-4 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-600 focus:outline-none "
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginPrompt;
