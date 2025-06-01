
import React, { useState, useMemo } from "react";

const initialMissing = JSON.parse(localStorage.getItem("missing")) || [];

const getUnique = (list, key) => [...new Set(list.map(item => item[key]))];

export default function Missing() {
  const [missing, setMissing] = useState([]);
import { useDataset } from "../hooks/useDataset";

  useDataset("missing", setMissing);

  // useEffect(() => {
  fetch("https://raw.githubusercontent.com/BritishErrorCoins/coin-missing-app/main/public/data/GB_PreDecimal_dataset.json")
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("missing", JSON.stringify(data));
      setMissing(data);
    });
}, []);

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
    return missing.filter(c =>
      (!filters.monarch.length || filters.monarch.includes(c.monarch)) &&
      (!filters.metal.length || filters.metal.includes(c.metal)) &&
      (!filters.type.length || filters.type.includes(c.type))
    );
  }, [missing, filters]);

  const unique = {
    monarch: getUnique(missing, "monarch"),
    metal: getUnique(missing, "metal"),
    type: getUnique(missing, "type")
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
          {filtered.map(coin => (
            <tr key={coin.id}>
              <td>{coin.year}</td>
              <td>{coin.denomination}</td>
              <td>{coin.monarch}</td>
              <td>{coin.type}</td>
              <td>{coin.metal}</td>
              <td>{coin.mintage?.toLocaleString?.() ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
