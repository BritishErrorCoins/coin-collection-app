
import React, { useState, useMemo } from "react";
import { formatPrice } from "../utils/format";

const initialSold = JSON.parse(localStorage.getItem("sold")) || [];

const getUnique = (list, key) => [...new Set(list.map(item => item[key]))];

export default function Sold() {
  const [sold, setSold] = useState(initialSold);
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

  const filtered = useMemo(() => {
    return sold.filter(c =>
      (!filters.monarch.length || filters.monarch.includes(c.monarch)) &&
      (!filters.metal.length || filters.metal.includes(c.metal)) &&
      (!filters.type.length || filters.type.includes(c.type))
    );
  }, [sold, filters]);

  const updateNote = (id, value) => {
    setSold(prev => prev.map(c => c.id === id ? { ...c, notes: value } : c));
  };

  const updatePrice = (id, value, field) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setSold(prev => prev.map(c => c.id === id ? { ...c, [field]: parsed } : c));
    }
  };

  const unique = {
    monarch: getUnique(sold, "monarch"),
    metal: getUnique(sold, "metal"),
    type: getUnique(sold, "type")
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sold Coins</h1>

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
            <th>Year</th><th>Denomination</th><th>Monarch</th><th>Type</th><th>Metal</th>
            <th>Mintage</th><th>Purchase</th><th>Sell</th><th>Date</th><th>Profit</th><th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(coin => (
            <tr key={coin.id}>
              <td>{coin.year}</td>
              <td>{coin.denomination}</td>
              <td>{coin.monarch}</td>
              <td>{coin.type}</td>
              <td>{coin.metal}</td>
              <td>{coin.mintage.toLocaleString()}</td>
              <td>
                <input
                  type="text"
                  value={formatPrice(coin.purchasePrice)}
                  onChange={(e) => updatePrice(coin.id, e.target.value.replace(/[^0-9.]/g, ""), "purchasePrice")}
                  className="w-20 border rounded px-1"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formatPrice(coin.sellPrice)}
                  onChange={(e) => updatePrice(coin.id, e.target.value.replace(/[^0-9.]/g, ""), "sellPrice")}
                  className="w-20 border rounded px-1"
                />
              </td>
              <td>{coin.dateSold}</td>
              <td className={coin.profit >= 0 ? "text-green-600" : "text-red-600"}>
                {formatPrice(coin.sellPrice - coin.purchasePrice)}
              </td>
              <td>
                <input
                  type="text"
                  value={coin.notes}
                  onChange={(e) => updateNote(coin.id, e.target.value)}
                  className="w-full border rounded px-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
