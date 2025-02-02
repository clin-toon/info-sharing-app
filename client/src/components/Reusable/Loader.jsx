import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0  flex items-center justify-center h-screen w-full bg-gray-white z-50 bg-white">
      <div className="space-y-6">
        <div className="w-10 h-10 rounded-full bg-blue-900 animate-bounce  mx-auto"></div>
        <p className="text-2xl text-black font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
