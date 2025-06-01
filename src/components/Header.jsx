
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ children }) {
  const location = useLocation();

  const pages = [
    { name: "Add Coin", path: "/" },
    { name: "My Collection", path: "/collection" },
    { name: "Sold", path: "/sold" },
    { name: "Missing", path: "/missing" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#800020] text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 object-contain rounded-full" />
          <h1 className="text-lg font-semibold">British Error Coins</h1>
        </div>
        <nav className="flex gap-4 text-sm">
          {pages.map(p => (
            <Link
              key={p.path}
              to={p.path}
              className={\`\${location.pathname === p.path ? "underline" : "hover:opacity-80"}\`}
            >
              {p.name}
            </Link>
          ))}
        </nav>
      </div>
      {children && (
        <div className="bg-[#800020] px-4 pb-2 pt-1 border-t border-white">
          {children}
        </div>
      )}
    </header>
  );
}
