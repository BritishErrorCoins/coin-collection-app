import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Optional for styling

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li><Link to="/">Add Coins</Link></li>
          <li><Link to="/mycollection">My Collection</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/mywantlist">My Wantlist</Link></li>
          <li><Link to="/sold">Sold</Link></li>
        </ul>
      </nav>
    </header>
  );
}
