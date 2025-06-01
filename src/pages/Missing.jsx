
import React, { useState } from "react";
import { useDataset } from "../hooks/useDataset";

const getUnique = (list, key) => [...new Set(list.map(item => item[key]))];

export default function Missing() {
  const [missing, setMissing] = useState([]);

  useDataset("missing", setMissing);

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

  const filtered = missing.filter(c =>
    (!filters.monarch.length || filters.monarch.includes(c.Monarch)) &&
    (!filters.metal.length || filters.metal.includes(c.Metal)) &&
    (!filters.type.length || filters.type.includes(c["Strike Type"]))
  );

  const unique = {
    monarch: getUnique(missing, "Monarch"),
    metal: getUnique(missing, "Metal"),
    type: getUnique(missing, "Strike Type")
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Missing Coins</h1>

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
            <th>Year</th><th>Denomination</th><th>Monarch</th><th>Type</th><th>Metal</th><th>Mintage</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
