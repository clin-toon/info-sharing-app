import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-96 bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-black-500 mb-4">404</h1>
        <p className="text-2xl mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={goHome}
          className="px-6 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
