
import React, { useState } from "react";

const dataset = JSON.parse(localStorage.getItem("collection")) || [];

export default function AddCoin() {
  const [year, setYear] = useState("");
  const [monarch, setMonarch] = useState("");
  const [denomination, setDenomination] = useState("");
  const [type, setType] = useState("");
  const [metal, setMetal] = useState("");

  const getUnique = (items, key) => [...new Set(items.map(i => i[key]).filter(Boolean))];

  const monarchs = getUnique(dataset, "Monarch");
  const denominations = getUnique(dataset.filter(c => c.Monarch === monarch), "Denomination");
  const types = getUnique(dataset.filter(c => c.Monarch === monarch && c.Denomination === denomination), "Strike Type");
  const metals = getUnique(dataset.filter(c => c.Monarch === monarch && c.Denomination === denomination && c["Strike Type"] === type), "Metal");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoin = {
      id: Date.now(),
      Year: year,
      Monarch: monarch,
      Denomination: denomination,
      "Strike Type": type,
      Metal: metal,
      notes: "",
      purchasePrice: 0
    };
    const updated = [...(JSON.parse(localStorage.getItem("collection")) || []), newCoin];
    localStorage.setItem("collection", JSON.stringify(updated));
    alert("Coin added!");
    setYear(""); setMonarch(""); setDenomination(""); setType(""); setMetal("");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-[#800020]">Add Coin to Your Collection</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-sm">Year</label>
          <input type="text" value={year} onChange={e => setYear(e.target.value)} className="w-full border px-2 py-1 rounded" required />
        </div>
        <div>
          <label className="block font-medium text-sm">Monarch</label>
          <select value={monarch} onChange={e => setMonarch(e.target.value)} className="w-full border px-2 py-1 rounded" required>
            <option value="">Select Monarch</option>
            {monarchs.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        {monarch && (
          <div>
            <label className="block font-medium text-sm">Denomination</label>
            <select value={denomination} onChange={e => setDenomination(e.target.value)} className="w-full border px-2 py-1 rounded" required>
              <option value="">Select Denomination</option>
              {denominations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        )}
        {denomination && (
          <div>
            <label className="block font-medium text-sm">Strike Type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full border px-2 py-1 rounded" required>
              <option value="">Select Type</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}
        {type && (
          <div>
            <label className="block font-medium text-sm">Metal</label>
            <select value={metal} onChange={e => setMetal(e.target.value)} className="w-full border px-2 py-1 rounded" required>
              <option value="">Select Metal</option>
              {metals.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        )}
        <button type="submit" className="bg-[#800020] text-white px-4 py-2 rounded hover:bg-[#66101a]">Add Coin</button>
      </form>
    </div>
  );
}
