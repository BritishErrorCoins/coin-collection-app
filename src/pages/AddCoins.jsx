import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";
import { DATA_URL } from "../utils/dataUtils";

export default function AddCoins() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    year: "",
    denomination: "",
    monarch: "",
    type: "",
    metal: "",
    variety: "",
    notes: "",
  });

  useEffect(() => {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  const denominations = [...new Set(data.map(c => c.Denomination))];
  const monarchs = form.denomination
    ? [...new Set(data.filter(c => c.Denomination === form.denomination).map(c => c.Monarch))]
    : [];
  const metals = form.denomination && form.monarch
    ? [...new Set(data.filter(
        c => c.Denomination === form.denomination && c.Monarch === form.monarch
      ).map(c => c.Metal))]
    : [];
  const types = form.denomination && form.monarch && form.metal
    ? [...new Set(data.filter(
        c =>
          c.Denomination === form.denomination &&
          c.Monarch === form.monarch &&
          c.Metal === form.metal
      ).map(c => c["Strike Type"]))]
    : [];
  const varieties = form.denomination && form.monarch && form.metal && form.type
    ? [...new Set(data.filter(
        c =>
          c.Denomination === form.denomination &&
          c.Monarch === form.monarch &&
          c.Metal === form.metal &&
          c["Strike Type"] === form.type
      ).map(c => c.Variety))]
    : [];

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Add logic to save coin
    setForm({
      year: "",
      denomination: "",
      monarch: "",
      type: "",
      metal: "",
      variety: "",
      notes: "",
    });
  }

  return (
    <div>
      <Header pageTitle="Add Coins" />
      <div className="content-area">
        <h1 className="page-title">Add Coins</h1>
        <form onSubmit={handleSubmit} className="coin-form">
          <label>
            Year
            <input name="year" value={form.year} onChange={handleChange} required />
          </label>
          <label>
            Denomination
            <select name="denomination" value={form.denomination} onChange={handleChange} required>
              <option value="">Select</option>
              {denominations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
          <label>
            Monarch
            <select name="monarch" value={form.monarch} onChange={handleChange} required>
              <option value="">Select</option>
              {monarchs.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            Metal
            <select name="metal" value={form.metal} onChange={handleChange} required>
              <option value="">Select</option>
              {metals.map(metal => (
                <option key={metal} value={metal}>{metal}</option>
              ))}
            </select>
          </label>
          <label>
            Strike Type
            <select name="type" value={form.type} onChange={handleChange} required>
              <option value="">Select</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Variety
            <select name="variety" value={form.variety} onChange={handleChange}>
              <option value="">Select</option>
              {varieties.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Notes
            <input name="notes" value={form.notes} onChange={handleChange} />
          </label>
          <button type="submit">Add Coin</button>
        </form>
      </div>
    </div>
  );
}
