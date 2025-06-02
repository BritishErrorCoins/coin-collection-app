import React, { useEffect, useState } from "react";
import { useDataset } from "../hooks/useDataset";
import Header from "../components/Header";
import "../styles/table.css";

// Helper to fetch or set localStorage collection
function getCollection() {
  try {
    return JSON.parse(localStorage.getItem("collection")) || [];
  } catch {
    return [];
  }
}
function saveCollection(arr) {
  localStorage.setItem("collection", JSON.stringify(arr));
}

export default function Catalog() {
  const [catalog, setCatalog] = useState([]);

  // Load dataset for catalog
  useDataset("catalog", setCatalog);

  // Handler for Add button
  const handleAdd = (coin) => {
    let purchasePrice = prompt("Enter purchase price (£):");
    if (purchasePrice === null) return; // Cancelled
    purchasePrice = purchasePrice.trim();
    if (!purchasePrice || isNaN(purchasePrice)) {
      alert("Invalid price.");
      return;
    }
    let notes = prompt("Enter any notes (optional):") || "";
    const newCoin = {
      ...coin,
      purchasePrice: parseFloat(purchasePrice),
      notes,
      id: Date.now()
    };
    const current = getCollection();
    saveCollection([...current, newCoin]);
    alert("Coin added to My Collection!");
  };

  return (
    <>
      <Header title="Catalog" />
      <div className="page-content">
        <h1>Catalog</h1>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Denomination</th>
              <th>Monarch</th>
              <th>Type</th>
              <th>Metal</th>
              <th>Strike Type</th>
              <th>Variety</th>
              <th>Mintage</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {catalog.map((coin, idx) => (
              <tr key={idx}>
                <td>{coin.Year}</td>
                <td>{coin.Denomination}</td>
                <td>{coin.Monarch}</td>
                <td>{coin.Type}</td>
                <td>{coin.Metal}</td>
                <td>{coin["Strike Type"]}</td>
                <td>{coin.Variety}</td>
                <td>{coin.Mintage}</td>
                <td>
                  <button className="add-btn" onClick={() => handleAdd(coin)}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
