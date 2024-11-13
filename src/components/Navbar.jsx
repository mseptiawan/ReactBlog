import React, { useState } from "react";
import { menu, close, logo } from "../assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const handleLogoClick = (e) => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-full h-[80px] z-20 bg-[#000000] fixed top-0 drop-shadow-lg ">
      <div className="flex justify-between items-center w-full h-full md:max-w-[1240px] m-auto">
        <div className="flex items-center" onClick={handleLogoClick}>
          <NavLink to="/">
            <img
              src={logo}
              alt="logo"
              className="sm:ml-10 ss:ml-10 md:ml-3 w-full sm:h-[120px] xs:h-[100px]"
            />
          </NavLink>
        </div>

        <div className="flex items-center text-white font-poppins">
          <ul className="hidden md:flex">
            <li className="px-4 py-2">
              <a
                href="https://septiawantechnology.com/semua-kursus/"
                className="text-xl hover:bg-gray-800 px-4 py-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Layanan edukasi
              </a>
            </li>
            <li className="px-4 py-2" onClick={handleLogoClick}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "hover:bg-white px-4 py-2 bg-white text-black"
                    : "hover:bg-gray-800 px-4 py-2 "
                }
              >
                Artikel
              </NavLink>
            </li>
            <li className="px-4 py-2" onClick={handleLogoClick}>
              <NavLink
                to="/kontak"
                className={({ isActive }) =>
                  isActive
                    ? "hover:bg-white px-4 py-2 bg-white text-black"
                    : "hover:bg-gray-800 px-4 py-2"
                }
              >
                Kontak kita
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <img
            src={!toggle ? menu : close}
            alt="menu"
            className="w-[28px] h-[28px] object-contain mr-10"
          />
        </div>
      </div>

      <ul
        className={
          toggle
            ? "absolute bg-black text-white w-full px-8 md:hidden font-poppins top-[80px] left-0 transition-all duration-300 h-[150px]"
            : "hidden"
        }
      >
        <li className="px-4 py-2">
          <a
            href="https://septiawantechnology.com/semua-kursus/"
            className="text-xl hover:bg-gray-800 px-4 py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Layanan edukasi
          </a>
        </li>
        <li className="px-4 py-2" onClick={handleLogoClick}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "hover:bg-white px-4 py-2 bg-white text-black"
                : "hover:bg-gray-800 px-4 py-2 "
            }
          >
            Artikel
          </NavLink>
        </li>
        <li className="px-4 py-2" onClick={handleLogoClick}>
          <NavLink
            to="/kontak"
            className={({ isActive }) =>
              isActive
                ? "hover:bg-white px-4 py-2 bg-white text-black"
                : "hover:bg-gray-800 px-4 py-2"
            }
          >
            Kontak kita
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
