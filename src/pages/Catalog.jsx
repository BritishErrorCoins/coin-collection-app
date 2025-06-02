import React, { useEffect, useState } from "react";
import { useDataset } from "../hooks/useDataset";
import Header from "../components/Header";
import "../styles/table.css";

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

function getWantlist() {
  try {
    return JSON.parse(localStorage.getItem("wantlist")) || [];
  } catch {
    return [];
  }
}
function saveWantlist(arr) {
  localStorage.setItem("wantlist", JSON.stringify(arr));
}

export default function Catalog() {
  const [catalog, setCatalog] = useState([]);
  const [promptOpen, setPromptOpen] = useState(false);
  const [promptType, setPromptType] = useState(""); // 'wantlist' or 'collection'
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [wantReason, setWantReason] = useState("");
  const [wantOther, setWantOther] = useState("");

  useDataset("catalog", setCatalog);

  const handleAddToCollection = (coin) => {
    let purchasePrice = prompt("Enter purchase price (£):");
    if (purchasePrice === null) return;
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

  // Handle Add to Wantlist with radio checklist
  const openWantlistPrompt = (coin) => {
    setSelectedCoin(coin);
    setWantReason("");
    setWantOther("");
    setPromptOpen(true);
  };

  const handleWantlistSubmit = () => {
    if (!wantReason) {
      alert("Please select a reason.");
      return;
    }
    let entry = {
      ...selectedCoin,
      reason: wantReason === "Other" ? wantOther : wantReason,
      id: Date.now()
    };
    const wantlist = getWantlist();
    saveWantlist([...wantlist, entry]);
    setPromptOpen(false);
    setSelectedCoin(null);
    setWantReason("");
    setWantOther("");
    alert("Coin added to your Wantlist!");
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
              <th></th> {/* Buttons will go here, but no heading label */}
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
                <td style={{ whiteSpace: "nowrap" }}>
                  <button
                    className="add-btn"
                    style={{ marginRight: 8 }}
                    onClick={() => handleAddToCollection(coin)}
                  >
                    Add to Collection
                  </button>
                  <button
                    className="wantlist-btn"
                    onClick={() => openWantlistPrompt(coin)}
                  >
                    Add to Wantlist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal-like prompt for wantlist reason */}
        {promptOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add to Wantlist</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleWantlistSubmit();
                }}
              >
                <div>
                  <label>
                    <input
                      type="radio"
                      name="reason"
                      value="Missing from my collection"
                      checked={wantReason === "Missing from my collection"}
                      onChange={e => setWantReason(e.target.value)}
                    />
                    Missing from my collection
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="reason"
                      value="Upgrade"
                      checked={wantReason === "Upgrade"}
                      onChange={e =>
