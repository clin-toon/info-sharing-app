import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { changeSelectedLink, getSearchElem } from "../../features/searchSlice";
import useAppSelector from "../../hooks/useAppSelector";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser, isLoggedIn } = useAppSelector();
  const dp = useSelector((state) => state.profile.dp);
  const [showMenu, setShowMenu] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [mobileSearchItem, setMobileSearchItem] = useState("");

  const handleResponsive = () => {
    setShowMenu(!showMenu);
  };

  const handleSearchItem = (e) => {
    setSearchItem(e.target.value);
  };

  const handleMobileSearchItem = (e) => {
    setMobileSearchItem(e.target.value);
  };

  const listenForEnterKey = (e) => {
    if (searchItem === "") {
      return;
    }

    if (e.code === "Enter") {
      dispatch(getSearchElem(searchItem));
      navigate(`/search?q=${searchItem}`);
    }
  };

  const handleDashboard = () => {
    dispatch(changeSelectedLink(3));
    navigate(`/dashboard/profile/${authUser}`);
    setShowMenu(false);
  };

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
    window.location.reload();
    return null;
  };

  const handleSearch = () => {
    if (searchItem === "" && mobileSearchItem === "") {
      return;
    }
    if (mobileSearchItem != "") {
      dispatch(getSearchElem(mobileSearchItem));
      handleResponsive();
      navigate(`/search?q=${mobileSearchItem}`);
      return;
    } else {
      dispatch(getSearchElem(searchItem));
      navigate(`/search?q=${searchItem}`);
    }
  };

  useEffect(() => {}, [dp]);

  return (
    <>
      <nav className=" bg-slate-100  border-gray-200   w-full z-20 top-0 left-0 shadow-lg py-3 md:py-6">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Brand Logo */}
          <div className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            <Link
              to={"/"}
              className="font-sans text-black font-bold cursor-pointer space-x-2 "
            >
              InfoShare
            </Link>
          </div>

          {/* Search and Menu Toggle for Mobile */}
          <div className="flex items-center">
            {/* Search Bar (hidden on small screens) */}
            <div className="hidden sm:flex bg-white rounded-lg p-2 items-center w-96 border border-gray-300 outline-2 outline-slate-400">
              <input
                type="text"
                placeholder="Search for information..."
                className="focus:outline-none w-full"
                value={searchItem}
                onChange={handleSearchItem}
                onKeyDown={listenForEnterKey}
              />

              <FaSearch
                onClick={handleSearch}
                className="text-2xl font-bold text-black cursor-pointer"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden ml-2 text-white"
              onClick={handleResponsive}
            >
              <GiHamburgerMenu className="text-2xl text-black" />
            </button>
          </div>

          {/* Action Buttons (hidden on small screens) */}
          <div className="hidden md:flex space-x-4">
            {isLoggedIn && (
              <img
                src={dp}
                alt="Profile Picture"
                className="text-3xl m-1 hover:text-gray-600 cursor-pointer h-10 "
                onClick={handleDashboard}
              />
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogOut}
                className="text-white mx-2 bg-secondary hover:bg-gray-700 outline-2 outline-double  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans"
              >
                Log Out
              </button>
            ) : (
              <section>
                <Link to={"/signup"}>
                  <button className="text-white mx-2 bg-secondary hover:bg-gray-700 outline-2 outline-double  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans">
                    Sign Up
                  </button>
                </Link>

                <Link to={"/login"}>
                  <button className="text-white bg-secondary hover:bg-gray-700 outline-2 outline-double  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans">
                    Log In
                  </button>
                </Link>
              </section>
            )}
          </div>
        </div>

        {/* Mobile Menu (shown when toggled) */}
        {showMenu && (
          <div className="md:hidden bg-slate-100 p-4">
            <div className="flex items-center bg-white rounded-lg p-2 mb-4">
              <input
                type="text"
                placeholder="Search for information..."
                className="focus:outline-none w-full"
                value={mobileSearchItem}
                onChange={handleMobileSearchItem}
              />

              <button>
                <FaSearch
                  className="text-2xl font-bold text-black"
                  onClick={handleSearch}
                />
              </button>
            </div>

            {/* <FaisLoggedInCircle /> */}

            {isLoggedIn ? (
              <section>
                <button
                  onClick={handleDashboard}
                  className="w-full text-white bg-secondary mb-3 hover:bg-gray-700 outline-2 outline-double focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans"
                >
                  Go to Dashboard
                </button>
                <Link to={"/login"}>
                  <button
                    onClick={handleLogOut}
                    className="w-full text-white bg-secondary hover:bg-gray-700 outline-2 outline-double focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans"
                  >
                    Log Out
                  </button>
                </Link>
              </section>
            ) : (
              <section>
                <Link to={"/signup"}>
                  <button
                    onClick={handleResponsive}
                    className="w-full text-white bg-secondary hover:bg-gray-700 outline-2 outline-double focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 mb-2 font-sans"
                  >
                    Sign Up
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button
                    onClick={handleResponsive}
                    className="w-full text-white bg-secondary hover:bg-gray-700 outline-2 outline-double focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 font-sans"
                  >
                    Log In
                  </button>
                </Link>
              </section>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavigationBar;
