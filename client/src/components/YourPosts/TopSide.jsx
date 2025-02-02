import React from "react";

const TopSide = (props) => {
  const sortOptions = ["Most Recent", "Likes", "Cateogry"];
  return (
    <div className="">
      <span className="text-xl font-bold ">Sort By : </span>
      <select
        name="sort"
        id=""
        className=" bg-gray-50 text-md p-2 rounded-sm cursor-pointer border-none outline-none hover:bg-slate-50"
      >
        {sortOptions.map((item) => {
          return (
            <option
              value={item}
              key={item}
              className="cursor-pointer hover:bg-gray-200 p-3"
            >
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TopSide;
