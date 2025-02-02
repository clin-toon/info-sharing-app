import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SmallerHeroPost = (props) => {
  return (
    <Link to="/single-post/123">
      <div className=" rounded-md p-2 relative cursor-pointer ">
        <img
          src="https://media.istockphoto.com/id/1461816749/photo/a-crowd-of-people-with-raised-arms-during-a-music-concert-with-an-amazing-light-show-black.jpg?s=612x612&w=0&k=20&c=-hdWCLDP5AI9A3mjq3JPMPKhXxJ2P1iItPDFktQHxX8="
          className="h-56 object-fit rounded-lg opacity-65 hover:bg-slate-500"
        ></img>
        <div className="absolute mx-2 top-2 inset-0 rounded-md bg-black opacity-50 h-56 "></div>
        <div className="absolute top-[120px] bottom-[100px] left-10 z-10 ">
          <button className=" text-white bg-secondary hover:bg-gray-700  focus:ring-4  font-medium rounded-md text-sm px-3 py-2 font-sans w-auto">
            Category
          </button>
          <h1 className="font-sans text-md font-medium text-white ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
            fugit.{" "}
          </h1>
          <div className="flex my-1 items-center">
            <FaUserCircle className="text-white mr-2 sm:font-bold " />
            <span className="font-light text-xs text-white sm:font-normal">
              John Doe
            </span>
            <span className="font-light text-xs mx-10 text-white sm:font-normal ">
              December 20, 2024
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SmallerHeroPost;
