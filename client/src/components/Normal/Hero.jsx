import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";

const Hero = (props) => {
  const { authUser, isLoggedIn } = useAppSelector();

  const naviagte = useNavigate();

  const handleNavigation = () => {
    if (isLoggedIn) {
      naviagte(`/dashboard/your-post/${authUser}`);
    } else {
      naviagte("/signup");
    }
  };

  return (
    <div>
      <div className="relative h-96 md:h-screen bg-gray-900 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-slate-300">INFO SHARE</span>
          </h1>
          <p className="text-lg md:text-xl mb-1">
            Share your thoughts, connect with others, and explore the world of
            ideas.
          </p>
          <p className="text-lg md:text-xl mb-6 italic font-bold">
            " Share, Connect, and Elevate Your Ideas."
          </p>
          <button
            onClick={handleNavigation}
            className="px-6 py-3 bg-slate-800 hover:bg-teal-600 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
          >
            {isLoggedIn ? "Your Posts" : "Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
