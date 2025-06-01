import React, { useEffect, useState } from "react";
import "../App.css"; // or "./Header.css" if preferred

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <header className="header">
      <h1>🪙 Coin Collection App</h1>
      <nav className="nav">
        <a href="/">Add Coins</a>
        <a href="/mycollection">My Collection</a>
        <a href="/catalog">Catalog</a>
        <a href="/mywantlist">My Wantlist</a>
        <a href="/sold">Sold</a>
      </nav>
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </header>
  );
}
