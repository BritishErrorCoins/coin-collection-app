// src/pages/Dashboard.jsx
import React from "react";
import Header from "../components/Header";

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-burgundy mb-4">Welcome to Your Coin Collection</h1>
        <p className="text-burgundy">Use the navigation above to add coins, view your collection, or manage missing and sold items.</p>
      </div>
    </>
  );
}
