import React from "react";

const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] bg-gray-100 px-4 m-3">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          No Search Results Found
        </h1>
        <p className="text-gray-600 mb-6">
          We couldn’t find anything matching your search. Try again with
          different keywords.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-700 transition duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default NoSearchResults;
