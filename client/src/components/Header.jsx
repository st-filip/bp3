import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 shadow-md">
      {/* Container for Heading and Links */}
      <div className="flex items-center justify-between gap-6 md:gap-4">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold drop-shadow-md">
          Sistem za praćenje proizvodnje alkoholnih pića
        </h1>

        {/* Navigation Links for md+ screens */}
        <nav className="hidden md:flex md:gap-4">
          <Link
            to="/home"
            className="text-white hover:text-gray-200 font-medium text-lg"
          >
            Početna
          </Link>
          <Link
            to="/radni-nalozi"
            className="text-white hover:text-gray-200 font-medium text-lg"
          >
            Radni Nalozi
          </Link>
          <Link
            to="/dnevnici-smena"
            className="text-white hover:text-gray-200 font-medium text-lg"
          >
            Dnevnici Smena
          </Link>
          <Link
            to="/popisi-magacina"
            className="text-white hover:text-gray-200 font-medium text-lg"
          >
            Popisi Magacina
          </Link>
        </nav>

        {/* Burger Icon for small screens */}
        <button
          className="md:hidden text-white hover:text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Navigation for small screens */}
      <nav
        className={`${
          isMenuOpen ? "flex flex-col gap-4 mt-4" : "hidden"
        } md:hidden`}
      >
        <Link
          to="/home"
          className="text-white hover:text-gray-200 font-medium text-lg"
        >
          Početna
        </Link>
        <Link
          to="/radni-nalozi"
          className="text-white hover:text-gray-200 font-medium text-lg"
        >
          Radni Nalozi
        </Link>
        <Link
          to="/dnevnici-smena"
          className="text-white hover:text-gray-200 font-medium text-lg"
        >
          Dnevnici Smena
        </Link>
        <Link
          to="/popisi-magacina"
          className="text-white hover:text-gray-200 font-medium text-lg"
        >
          Popisi Magacina
        </Link>
      </nav>
    </header>
  );
};

export default Header;
