// src/pages/AddCoins.jsx

import React, { useState } from "react";
import dataset from "../../public/GB_PreDecimal_dataset.json";
import Header from "../components/Header";
import "../App.css";

export default function AddCoins() {
  const [formData, setFormData] = useState({
    Denomination: "",
    Monarch: "",
    Metal: "",
    Strike: "",
    Variety: "",
    Year: "",
    Notes: "",
  });

  const getUniqueValues = (key) => {
    const values = dataset.map((item) => item[key]).filter(Boolean);
    return [...new Set(values)];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const collection = JSON.parse(localStorage.getItem("collection") || "[]");
    localStorage.setItem("collection", JSON.stringify([...collection, formData]));
    alert("✅ Coin added to My Collection.");
    setFormData({
      Denomination: "",
      Monarch: "",
      Metal: "",
      Strike: "",
      Variety: "",
      Year: "",
      Notes: "",
    });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="title">Add Coins</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-grid">
            <label>
              Denomination:
              <select name="Denomination" value={formData.Denomination} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {getUniqueValues("Denomination").map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>

            <label>
              Monarch:
              <select name="Monarch" value={formData.Monarch} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {getUniqueValues("Monarch").map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>

            <label>
              Metal:
              <select name="Metal" value={formData.Metal} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {getUniqueValues("Metal").map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>

            <label>
              Strike Type:
              <select name="Strike" value={formData.Strike} onChange={handleChange} required>
                <option value="">-- Select --</option>
                {getUniqueValues("Strike").map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>

            <label>
              Variety:
              <select name="Variety" value={formData.Variety} onChange={handleChange}>
                <option value="">-- Select --</option>
                {getUniqueValues("Variety").map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>

            <label>
              Year:
              <input
                type="text"
                name="Year"
                value={formData.Year}
                onChange={handleChange}
                required
                placeholder="e.g. 1928"
              />
            </label>

            <label className="notes-label">
              Notes:
              <textarea
                name="Notes"
                value={formData.Notes}
                onChange={handleChange}
                placeholder="Add optional notes here..."
              />
            </label>
          </div>

          <button type="submit" className="submit-button">Add to My Collection</button>
        </form>
      </div>
    </div>
  );
}
