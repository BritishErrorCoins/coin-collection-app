
import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-100 border-b p-4 flex gap-4 text-sm font-medium">
      <Link to="/collection" className="hover:underline">Collection</Link>
      <Link to="/sold" className="hover:underline">Sold</Link>
      <Link to="/missing" className="hover:underline">Missing</Link>
    </nav>
  );
}
