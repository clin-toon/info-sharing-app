import React from "react";

const EditorPick = (props) => {
  return (
    <>
      <div className="flex items-start p-2 rounded-lg max-w-lg my-4 mx-2  border border-gray-200">
        {/* Image Section */}
        <img
          src="https://www.birds.cornell.edu/home/wp-content/uploads/2023/09/334289821-Baltimore_Oriole-Matthew_Plante.jpg"
          alt="Product"
          className="w-24 h-24 rounded-md object-cover mr-2"
        />

        {/* Content Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold">Product Title</h2>
            <p className="text-gray-600 mt-1">
              Product description goes here. This is a short description about
              the product.
            </p>
          </div>

          {/* Date Section */}
          <span className="text-gray-400 text-sm mt-2">Date: 2024-11-09</span>
        </div>
      </div>
    </>
  );
};

export default EditorPick;
