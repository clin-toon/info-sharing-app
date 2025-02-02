import React from "react";
import { useDispatch } from "react-redux";

import { makeModalFalse } from "../../features/modalSlices";

const ServerErrorModal = ({ msg }) => {
  const dispatch = useDispatch();
  const closeServerError = () => {
    dispatch(makeModalFalse());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800">{msg.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{msg.des}</p>
        </div>
        <div className="flex justify-end p-4">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-600 focus:outline-none "
            onClick={closeServerError}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerErrorModal;
