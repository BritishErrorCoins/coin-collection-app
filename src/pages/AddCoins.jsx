import React, { useState, useEffect } from "react";
import "../App.css";


const datasetUrl = "/data/GB_PreDecimal_dataset.json";

function getUnique(items, key) {
  return [...new Set(items.map(item => item[key]).filter(Boolean))];
}

export default function AddCoins() {
  const [dataset, setDataset] = useState([]);
  const [form, setForm] = useState({
    denomination: "",
    monarch: "",
    metal: "",
    strikeType: "",
    variety: "",
    year: "",
    notes: ""
  });

  useEffect(() => {
    fetch(datasetUrl)
      .then(res => res.json())
      .then(setDataset);
  }, []);

  // Dependent dropdowns logic
  const filteredByDenomination = form.denomination
    ? dataset.filter(item => item.Denomination === form.denomination)
    : dataset;
  const filteredByMonarch = form.monarch
    ? filteredByDenomination.filter(item => item.Monarch === form.monarch)
    : filteredByDenomination;
  const filteredByMetal = form.metal
    ? filteredByMonarch.filter(item => item.Metal === form.metal)
    : filteredByMonarch;
  const filteredByStrike = form.strikeType
    ? filteredByMetal.filter(item => item["Strike Type"] === form.strikeType)
    : filteredByMetal;

  // Dropdown options
  const denominations = getUnique(dataset, "Denomination");
  const monarchs = getUnique(filteredByDenomination, "Monarch");
  const metals = getUnique(filteredByMonarch, "Metal");
  const strikeTypes = getUnique(filteredByMetal, "Strike Type");
  const varieties = getUnique(filteredByStrike, "Variety");

  const handleChange = (field, value) => {
    setForm(f => ({
      ...f,
      [field]: value,
      // Reset dependent fields
      ...(field === "denomination" && { monarch: "", metal: "", strikeType: "", variety: "" }),
      ...(field === "monarch" && { metal: "", strikeType: "", variety: "" }),
      ...(field === "metal" && { strikeType: "", variety: "" }),
      ...(field === "strikeType" && { variety: "" }),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add coin to My Collection (localStorage or API)
    const collection = JSON.parse(localStorage.getItem("collection") || "[]");
    collection.push({ ...form, id: Date.now() });
    localStorage.setItem("collection", JSON.stringify(collection));
    setForm({
      denomination: "",
      monarch: "",
      metal: "",
      strikeType: "",
      variety: "",
      year: "",
      notes: ""
    });
    alert("Coin added to My Collection!");
  };

  return (
    <div>
      <h2>Add Coins</h2>
      <form className="add-coin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Denomination</label>
          <select value={form.denomination} onChange={e => handleChange("denomination", e.target.value)}>
            <option value="">Select</option>
            {denominations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Monarch</label>
          <select value={form.monarch} onChange={e => handleChange("monarch", e.target.value)}>
            <option value="">Select</option>
            {monarchs.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Metal</label>
          <select value={form.metal} onChange={e => handleChange("metal", e.target.value)}>
            <option value="">Select</option>
            {metals.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Strike Type</label>
          <select value={form.strikeType} onChange={e => handleChange("strikeType", e.target.value)}>
            <option value="">Select</option>
            {strikeTypes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Variety</label>
          <select value={form.variety} onChange={e => handleChange("variety", e.target.value)}>
            <option value="">Select</option>
            {varieties.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            value={form.year}
            onChange={e => handleChange("year", e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea
            value={form.notes}
            onChange={e => handleChange("notes", e.target.value)}
          />
        </div>
        <button type="submit" className="burgundy-btn">Add Coin</button>
      </form>
    </div>
  );
}
