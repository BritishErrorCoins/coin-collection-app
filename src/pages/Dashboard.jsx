
import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Welcome to your Coin Collection</h1>
      <p className="text-gray-600">Track, manage, and explore your collection.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <Link to="/collection" className="bg-blue-50 border p-4 rounded shadow hover:bg-blue-100">
          <h2 className="font-medium">📁 View Collection</h2>
        </Link>
        <Link to="/sold" className="bg-green-50 border p-4 rounded shadow hover:bg-green-100">
          <h2 className="font-medium">💰 View Sold</h2>
        </Link>
        <Link to="/missing" className="bg-yellow-50 border p-4 rounded shadow hover:bg-yellow-100">
          <h2 className="font-medium">📋 View Missing</h2>
        </Link>
      </div>
    </div>
  );
}
