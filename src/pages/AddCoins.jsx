import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { addToCollection } from "../utils/dataUtils";
import "../App.css";

export default function AddCoins() {
  const [dataset, setDataset] = useState([]);
  const [form, setForm] = useState({
    Denomination: "",
    Monarch: "",
    Metal: "",
    "Strike Type": "",
    Variety: "",
    Year: "",
    Notes: ""
  });

  useEffect(() => {
    fetch("/data/GB_PreDecimal_dataset.json")
      .then((res) => res.json())
      .then((data) => setDataset(data))
      .catch((err) => console.error("Failed to load dataset", err));
  }, []);

  const getUniqueValues = (field) => {
    return [...new Set(dataset.map((coin) => coin[field]).filter(Boolean))];
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToCollection(form);
    setForm({
      Denomination: "",
      Monarch: "",
      Metal: "",
      "Strike Type": "",
      Variety: "",
      Year: "",
      Notes: ""
    });
  };

  return (
    <div className="page">
      <Header />
      <h2 className="page-title">Add Coins</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <select name="Denomination" value={form.Denomination} onChange={handleChange}>
          <option value="">Select Denomination</option>
          {getUniqueValues("Denomination").map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select name="Monarch" value={form.Monarch} onChange={handleChange}>
          <option value="">Select Monarch</option>
          {getUniqueValues("Monarch").map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select name="Metal" value={form.Metal} onChange={handleChange}>
          <option value="">Select Metal</option>
          {getUniqueValues("Metal").map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select name="Strike Type" value={form["Strike Type"]} onChange={handleChange}>
          <option value="">Select Strike Type</option>
          {getUniqueValues("Strike Type").map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <select name="Variety" value={form.Variety} onChange={handleChange}>
          <option value="">Select Variety</option>
          {getUniqueValues("Variety").map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>

        <input
          type="text"
          name="Year"
          value={form.Year}
          onChange={handleChange}
          placeholder="Enter Year"
        />

        <textarea
          name="Notes"
          value={form.Notes}
          onChange={handleChange}
          placeholder="Enter Notes"
        />

        <button type="submit">Add to My Collection</button>
      </form>
    </div>
  );
}
