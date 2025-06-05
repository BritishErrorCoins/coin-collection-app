import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.gif";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="flex items-center justify-between py-3 px-6 bg-burgundy text-white shadow-md">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="text-xl font-bold tracking-tight">Predecimal Coins of Great Britain</span>
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://ko-fi.com/A0A2XPTPT"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm font-medium"
        >
          <img
            src="https://ko-fi.com/img/githubbutton_sm.svg"
            alt="Ko-fi"
            className="h-6 mr-1"
          />
          Help keep this software free
        </a>
        <button
          title="Toggle Day/Night Mode"
          className="ml-4 border border-white rounded-full px-2 py-1 text-xs bg-burgundy/80"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
