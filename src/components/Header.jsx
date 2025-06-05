import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.gif";

const navLinks = [
  { path: "/add", label: "Add Coins" },
  { path: "/mycollection", label: "My Collection" },
  { path: "/browse", label: "Browse Coins" },
  { path: "/mywantlist", label: "My Wantlist" },
  { path: "/sold", label: "Sold" },
  { path: "/contact", label: "Contact" },
];

export default function Header({ darkMode, setDarkMode }) {
  const location = useLocation();
  return (
    <header
      className={`w-full flex items-center justify-between px-4 py-3 shadow-md ${
        darkMode
          ? "bg-black text-white"
          : "bg-burgundy text-white"
      }`}
    >
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-2 min-w-max">
        <img src={logo} alt="Logo"
          className="h-10 w-10 rounded-xl bg-white"
          style={{ objectFit: "contain" }}
        />
        <span className="text-xl font-bold tracking-tight whitespace-nowrap">
          Predecimal Coins of Great Britain
        </span>
      </div>

      {/* Center: Navigation */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex flex-wrap gap-5">
          {navLinks.map((nav) => (
            <li key={nav.path}>
              <Link
                to={nav.path}
                className={`font-semibold hover:underline transition-all ${
                  location.pathname === nav.path
                    ? darkMode
                      ? "underline text-white"
                      : "underline text-pink-200"
                    : ""
                }`}
              >
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right: Ko-fi and toggle */}
      <div className="flex flex-col items-end min-w-max">
        <a
          href="https://ko-fi.com/A0A2XPTPT"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center"
        >
          <img
            src="https://ko-fi.com/img/githubbutton_sm.svg"
            alt="Ko-fi"
            className="h-7 mb-1"
          />
          <span className="text-xs font-medium whitespace-nowrap">Help keep this software free</span>
        </a>
        <button
          title="Toggle Day/Night Mode"
          className="mt-2 px-2 py-1 border border-white rounded-full text-sm"
          onClick={() => setDarkMode((d) => !d)}
        >
          {darkMode ? "🌙 Night" : "☀️ Day"}
        </button>
      </div>
    </header>
  );
}


