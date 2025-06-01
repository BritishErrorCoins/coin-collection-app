
import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold underline"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="bg-white border-b px-6 py-3 shadow flex items-center justify-between">
      <div className="text-lg font-bold text-blue-800">🪙 Coin App</div>
      <div className="flex gap-6 text-sm">
        <NavLink to="/collection" className={linkClass}>Collection</NavLink>
        <NavLink to="/sold" className={linkClass}>Sold</NavLink>
        <NavLink to="/missing" className={linkClass}>Missing</NavLink>
      </div>
    </nav>
  );
}
