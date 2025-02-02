import React from "react";

const CategoryButton = ({ innerText }) => {
  return (
    <button className=" text-white  bg-secondary hover:bg-gray-700    font-medium rounded-md text-sm px-3 py-2 font-sans w-auto">
      {innerText}
    </button>
  );
};

export default CategoryButton;
