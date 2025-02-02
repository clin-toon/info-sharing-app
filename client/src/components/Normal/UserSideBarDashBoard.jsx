import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeSelectedLink } from "../../features/searchSlice";

const UserSideBarDashBoard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bringNav, setBringNav] = useState(false);
  const userId = useSelector((state) => state.auth.user);
  const selectedTab = useSelector((state) => state.search.selectedLink);

  // setting active link
  const handleClicksOfNav = (val) => {
    dispatch(changeSelectedLink(val));
    if (val === 1) {
      navigate("/dashboard/create-post");
    } else if (val === 2) {
      navigate(`/dashboard/your-post/${userId}`);
    } else if (val === 3) {
      navigate(`/dashboard/profile/${userId}`);
    } else if (val === 6) {
      console.log("seting");
      navigate("/dashboard/settings");
    }
  };

  const showNavBar = () => {
    setBringNav(true);
  };

  const hideNavBar = () => {
    setBringNav(false);
  };

  return (
    <>
      {!bringNav ? (
        <GiHamburgerMenu
          className="mx-1 fixed text-3xl mt-2 cursor-pointer transition duration-1000 sm:hidden "
          onClick={showNavBar}
        />
      ) : null}

      <aside
        className={`${
          bringNav
            ? "transfrom translate-x-0 "
            : "transfrom -translate-x-full sm:transform sm:translate-x-0"
        }  bg-slate-200 h-[90vh] w-fit shadow-lg  p-2 transition duration-700 fixed z-20`}
      >
        <nav className=" mx-10 mt-3 ">
          <ImCross
            className="mx-3 text-xl mt-2 cursor-pointer absolute top-0 right-0 hover:text-gray-400 sm:hidden"
            onClick={hideNavBar}
          />

          <div
            onClick={() => handleClicksOfNav(1)}
            className={`flex justify-center items-center cursor-pointer  p-2 mt-4  hover:text-gray-400 ${
              selectedTab === 1 && "text-gray-400"
            }`}
          >
            <IoMdCreate className="mx-3 text-3xl  " />
            <li className="list-none cursor-pointer font-bold w-full text-lg ">
              Create Post
            </li>
          </div>
          <div
            onClick={() => handleClicksOfNav(2)}
            className={`flex justify-center items-center mt- cursor-pointer  mt-4 p-2 hover:text-gray-400 ${
              selectedTab === 2 && "text-gray-400"
            }`}
          >
            <MdGridView className="mx-3 text-3xl cursor-pointer " />
            <li className="list-none cursor-pointer  font-bold w-full text-lg">
              Your Posts
            </li>
          </div>

          <div
            onClick={() => handleClicksOfNav(3)}
            className={`flex justify-center items-center mt- cursor-pointer text-black mt-4 rounded-md p-2 hover:text-gray-400 ${
              selectedTab === 3 && "text-gray-400"
            }`}
          >
            <CgProfile className="mx-3 text-3xl cursor-pointer " />
            <Link className="list-none cursor-pointer  font-bold w-full text-lg  ">
              Your Profile
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default UserSideBarDashBoard;
