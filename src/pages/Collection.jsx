
import React, { useState } from "react";
import { formatPrice } from "../utils/format";
import { useDataset } from "../hooks/useDataset";

const getUnique = (list, key) => [...new Set(list.map(item => item[key]))];

export default function Collection() {
  const [collection, setCollection] = useState([]);
  useDataset("collection", setCollection);

  const [filters, setFilters] = useState({ monarch: [], metal: [], type: [] });

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => setFilters({ monarch: [], metal: [], type: [] });

  const filtered = collection.filter(c =>
    (!filters.monarch.length || filters.monarch.includes(c.Monarch)) &&
    (!filters.metal.length || filters.metal.includes(c.Metal)) &&
    (!filters.type.length || filters.type.includes(c["Strike Type"]))
  );

  const unique = {
    monarch: getUnique(collection, "Monarch"),
    metal: getUnique(collection, "Metal"),
    type: getUnique(collection, "Strike Type")
  };

  const handleSell = (id) => {
    const coin = collection.find(c => c.id === id);
    const sellPrice = prompt("Enter sell price (£):", "");
    if (sellPrice && !isNaN(sellPrice)) {
      const soldCoin = {
        ...coin,
        sellPrice: parseFloat(sellPrice),
        dateSold: new Date().toISOString().split("T")[0],
        profit: parseFloat(sellPrice) - coin.purchasePrice
      };
      localStorage.setItem("sold", JSON.stringify([...(JSON.parse(localStorage.getItem("sold")) || []), soldCoin]));
      setCollection(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateNote = (id, value) => {
    setCollection(prev => prev.map(c => c.id === id ? { ...c, notes: value } : c));
  };

  const updatePrice = (id, value) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setCollection(prev => prev.map(c => c.id === id ? { ...c, purchasePrice: parsed } : c));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Collection</h1>

      <div className="mb-4 space-y-2">
        {["monarch", "metal", "type"].map(key => (
          <div key={key}>
            <strong className="capitalize">{key}:</strong>
            <div className="flex gap-2 flex-wrap">
              {unique[key].map(value => (
                <label key={value} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={filters[key].includes(value)}
                    onChange={() => toggleFilter(key, value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button onClick={clearFilters} className="bg-gray-200 rounded px-2 py-1 mt-2">Clear Filters</button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Type</th>
            <th>Metal</th>
            <th>Mintage</th>
            <th>Purchase Price</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((coin, index) => (
            <tr key={index}>
              <td>{coin.Year}</td>
              <td>{coin.Denomination}</td>
              <td>{coin.Monarch}</td>
              <td>{coin["Strike Type"]}</td>
              <td>{coin.Metal}</td>
              <td>{coin.Mintage?.toLocaleString?.() ?? "-"}</td>
              <td>
                <input
                  type="text"
                  value={formatPrice(coin.purchasePrice)}
                  onChange={(e) => updatePrice(coin.id, e.target.value.replace(/[^0-9.]/g, ""))}
                  className="w-20 border rounded px-1"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={coin.notes || ""}
                  onChange={(e) => updateNote(coin.id, e.target.value)}
                  className="w-full border rounded px-1"
                />
              </td>
              <td>
                <button onClick={() => handleSell(coin.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
