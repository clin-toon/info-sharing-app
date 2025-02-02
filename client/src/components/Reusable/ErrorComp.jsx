import React from "react";

const ErrorComp = ({ errorMessage }) => {
  const retry = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-96">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-black mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-6">
          {errorMessage || "We couldn’t fetch the data. Please try again."}
        </p>
        <button
          onClick={retry}
          className="bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorComp;
