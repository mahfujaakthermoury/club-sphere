import { useContext, useState } from "react";
import WebContext from "../Context/WebContext";
import { ClickAwayListener } from "@mui/material";
import { Link, NavLink } from "react-router";
import { FiSun, FiMoon } from "react-icons/fi";
import mainLogo from "../assets/logo.png";
import { RiLoginBoxFill, RiLoginBoxLine, RiMenu2Fill } from "react-icons/ri";
import { FiUser, FiGrid, FiLogOut } from "react-icons/fi";


const MainNav = () => {
  const [navShow, setShowNav] = useState(false);
  const navShowHide = () => setShowNav((prev) => !prev);

  const { user, userName, userImage, handleLogout, theme, toggleTheme } =
    useContext(WebContext);

  const [showProfile, setShowProfile] = useState(false);
  const profileShowHide = () => setShowProfile((prev) => !prev);

  const activeStyle =
    "text-[#714747] font-bold border-b-2 border-[#714747]";
  const normalStyle =
    "text-[#714747] font-bold hover:text-[#e59e3b] transition duration-300";

  return (
    <div className="w-full sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-3">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu */}
          <ClickAwayListener onClickAway={() => setShowNav(false)}>
            <div className="relative">
              <button
                className="lg:hidden text-2xl"
                onClick={navShowHide}
              >
                <RiMenu2Fill />
              </button>

              {navShow && (
                <div className="absolute top-12 left-0 bg-base-100 rounded-box shadow-md p-3 z-50">
                  <ul className="flex flex-col gap-3">
                    <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Home</NavLink>
                    <NavLink to="/all-clubs" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Clubs</NavLink>
                    <NavLink to="/all-events" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Events</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : normalStyle}>About Us</NavLink>
                  </ul>
                </div>
              )}
            </div>
          </ClickAwayListener>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={mainLogo}
              alt="ClubSphere"
              className="w-20 h-15 transition-transform duration-300 hover:scale-110"
            />
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-6 pl-10 text-[17px]">
            <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Home</NavLink>
            <NavLink to="/all-clubs" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Clubs</NavLink>
            <NavLink to="/all-events" className={({ isActive }) => isActive ? activeStyle : normalStyle}>Events</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : normalStyle}>About Us</NavLink>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {user ? (
            <ClickAwayListener onClickAway={() => setShowProfile(false)}>
              <div className="relative">
                <button onClick={profileShowHide}>
                  <img
                    src={userImage}
                    alt="User"
                    className="w-12 h-12 rounded-full border cursor-pointer"
                  />
                </button>

                {showProfile && (
                  <div className="absolute right-0 top-14 menu bg-base-100 rounded-box shadow-sm w-60 p-4 z-50">
                    <h3 className="text-center font-bold text-[#714747] hover:text-[#e59e3b]  text-lg">
                      {userName}
                    </h3>
                    <p className="text-center text-sm text-gray-500 mb-3">
                      {user.email}
                    </p>
                    <div className="border-b border-gray-200 mb-5"></div>
                    <Link
                      to="/profile"
                      className="hover:bg-gray-100 px-3 py-2 text-[#714747] hover:text-[#e59e3b] rounded-md font-bold flex items-center gap-2"
                    >
                      <FiUser size={18} />
                      My Profile
                    </Link>

                    <Link
                      to="/dashboard/home"
                      className="hover:bg-gray-100 px-3 py-2 text-[#714747] hover:text-[#e59e3b] rounded-md font-bold flex items-center gap-2"
                    >
                      <FiGrid size={18} />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="hover:bg-gray-100 px-3 py-2 rounded-md font-bold text-red-500 hover:text-[#e59e3b] text-left flex items-center gap-2 w-full"
                    >
                      <FiLogOut size={18} />
                      Logout
                    </button>


                    {/* Theme Toggle */}
                    <button onClick={toggleTheme} className="btn flex flex-row text-[#714747] mt-2 hover:text-[#e59e3b] font-bold items-center justify-center"> Dark / Light
                      {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </button>
                  </div>
                )}
              </div>
            </ClickAwayListener>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="btn bg-[#f8f8f8] text-[#752727] px-8 font-bold hover:bg-[#752727] hover:text-white"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNav;
