import React from "react";

const PromptUserModal = (props) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 text-center">
        <h2 className="text-lg font-semibold mb-2">Please </h2>
        <p className="mb-3">Log in to comment and like the post.</p>

        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default PromptUserModal;
