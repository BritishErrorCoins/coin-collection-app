import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import "../App.css";

const DATA_URL = "/data/GB_PreDecimal_dataset.json";

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
    ? [...new Set(data.filter(c =>
        c.Denomination === form.denomination && c.Monarch === form.monarch
      ).map(c => c.Metal))]
    : [];
  const types = form.denomination && form.monarch && form.metal
    ? [...new Set(data.filter(c =>
        c.Denomination === form.denomination &&
        c.Monarch === form.monarch &&
        c.Metal === form.metal
      ).map(c => c["Strike Type"]))]
    : [];
  const varieties = form.denomination && form.monarch && form.metal && form.type
    ? [...new Set(data.filter(c =>
        c.Denomination === form.denomination &&
        c.Monarch === form.monarch &&
        c.Metal === form.metal &&
        c["Strike Type"] === form.type
      ).map(c => c.Variety))]
    : [];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: value,
      ...(name !== "notes"
        ? {
            ...(name === "denomination" ? { monarch: "", metal: "", type: "", variety: "" } : {}),
            ...(name === "monarch" ? { metal: "", type: "", variety: "" } : {}),
            ...(name === "metal" ? { type: "", variety: "" } : {}),
            ...(name === "type" ? { variety: "" } : {}),
          }
        : {}),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const collection = JSON.parse(localStorage.getItem("myCollection") || "[]");
    collection.push({
      ...form,
      Denomination: form.denomination,
      Monarch: form.monarch,
      Metal: form.metal,
      "Strike Type": form.type,
      Variety: form.variety,
      Year: form.year,
      Notes: form.notes,
    });
    localStorage.setItem("myCollection", JSON.stringify(collection));
    setForm({
      year: "",
      denomination: "",
      monarch: "",
      type: "",
      metal: "",
      variety: "",
      notes: "",
    });
    alert("Coin added to your collection.");
  }

  return (
    <div>
      <Header pageTitle="Add Coins" />
      <div className="content-area">
        <h1 className="page-title">Add Coins</h1>
        <form className="form-stacked" onSubmit={handleSubmit} autoComplete="off">
          <label>
            Year
            <input
              name="year"
              type="text"
              value={form.year}
              onChange={handleChange}
              className="input"
              required
            />
          </label>
          <label>
            Denomination
            <select
              name="denomination"
              value={form.denomination}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select...</option>
              {denominations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
          <label>
            Monarch
            <select
              name="monarch"
              value={form.monarch}
              onChange={handleChange}
              className="input"
              required
              disabled={!form.denomination}
            >
              <option value="">Select...</option>
              {monarchs.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            Metal
            <select
              name="metal"
              value={form.metal}
              onChange={handleChange}
              className="input"
              required
              disabled={!form.monarch}
            >
              <option value="">Select...</option>
              {metals.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </label>
          <label>
            Strike Type
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="input"
              required
              disabled={!form.metal}
            >
              <option value="">Select...</option>
              {types.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Variety
            <select
              name="variety"
              value={form.variety}
              onChange={handleChange}
              className="input"
              required
              disabled={!form.type}
            >
              <option value="">Select...</option>
              {varieties.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="input"
              rows={2}
            />
          </label>
          <button type="submit" className="primary-button">Add Coin</button>
        </form>
      </div>
    </div>
  );
}
