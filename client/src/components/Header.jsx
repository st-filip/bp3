import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/home", label: "Početna" },
    { path: "/radni-nalozi", label: "Radni Nalozi" },
    { path: "/dnevnici-smena", label: "Dnevnici Smena" },
    { path: "/popisi-magacina", label: "Popisi Magacina" },
    { path: "/zaposleni", label: "Zaposleni" },
    { path: "/proizvodi", label: "Proizvodi" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 shadow-md">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl lg:text-2xl font-extrabold drop-shadow-md leading-tight">
          Sistem za praćenje proizvodnje alkoholnih pića
        </h1>

        <nav className="hidden lg:flex lg:gap-6 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`font-medium text-sm lg:text-lg px-3 py-1 hover:text-gray-200 ${
                location.pathname === path ? "text-gray-300" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          className="lg:hidden text-white hover:text-gray-200 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
        </button>
      </div>

      <nav
        className={`${
          isMenuOpen ? "flex flex-col gap-4 mt-4" : "hidden"
        } lg:hidden`}
      >
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`font-medium text-lg px-3 py-2 hover:text-gray-200 ${
              location.pathname === path ? "text-gray-300" : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
