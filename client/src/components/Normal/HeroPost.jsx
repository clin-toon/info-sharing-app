import React from "react";
import { FaUserCircle } from "react-icons/fa";

const HeroPost = ({ arr, index }) => {
  return (
    <>
      <div className="hidden lg:block rounded-md p-2 relative">
        <img
          src={arr[index].image}
          alt="image"
          className={`h- object-fit rounded-lg opacity-65 sm:h-[65vh]  `}
        ></img>
        <div className="absolute mx-2 top-2 inset-0 rounded-md bg-black opacity-50 h-80 sm:h-[65vh] sm:w-[46vw] "></div>
        <div className="absolute top-[200px] bottom-[100px] left-10 z-10 sm:bottom-[0px] sm:top-[330px] sm:w-[500px]">
          <button className=" text-white bg-secondary hover:bg-gray-700  focus:ring-4  font-medium rounded-md text-sm px-3 py-2 font-sans w-auto">
            Category
          </button>
          <h1 className="font-sans text-xl font-medium text-white sm:text-2xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
            fugit.{" "}
          </h1>
          <div className="flex my-1 items-center">
            <FaUserCircle className="text-white mr-2 sm:font-bold sm:text-xl" />
            <span className="font-light text-xs text-white sm:font-normal sm:text-lg">
              John Doe
            </span>
            <span className="font-light text-xs mx-10 text-white sm:font-normal sm:text-lg">
              December 20, 2024
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroPost;
