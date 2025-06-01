
import React, { useState } from "react";
import { useDataset } from "../hooks/useDataset";
import { formatPrice } from "../utils/format";
import Header from "../components/Header";

export default function Collection() {
  const [collection, setCollection] = useState([]);
  const [filters, setFilters] = useState({
    monarch: [],
    metal: [],
    type: [],
    denomination: []
  });

  useDataset("collection", setCollection);

  const getUnique = (items, key) =>
    [...new Set(items.map(item => item[key]).filter(Boolean))];

  const toggleFilter = (key, value) => {
    setFilters(prev => {
      const values = prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: values };
    });
  };

  const clearFilters = () => {
    setFilters({ monarch: [], metal: [], type: [], denomination: [] });
  };

  const matchesFilters = (c) =>
    (!filters.monarch.length || filters.monarch.includes(c.Monarch)) &&
    (!filters.metal.length || filters.metal.includes(c.Metal)) &&
    (!filters.type.length || filters.type.includes(c["Strike Type"])) &&
    (!filters.denomination.length || filters.denomination.includes(c.Denomination));

  return (
    <>
      <Header>
        <div className="flex flex-wrap gap-4">
          {["monarch", "metal", "type", "denomination"].map(field => (
            <div key={field}>
              <label className="block text-xs font-semibold mb-1 capitalize">{field}</label>
              {getUnique(collection, field === "type" ? "Strike Type" : field.charAt(0).toUpperCase() + field.slice(1)).map(value => (
                <label key={value} className="block text-xs">
                  <input
                    type="checkbox"
                    checked={filters[field].includes(value)}
                    onChange={() => toggleFilter(field, value)}
                    className="mr-1"
                  />
                  {value}
                </label>
              ))}
            </div>
          ))}
          <div className="self-end">
            <button
              onClick={clearFilters}
              className="bg-white text-[#800020] px-3 py-1 rounded border border-white hover:bg-[#ffe6e6]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </Header>

      <div className="p-4">
        <h1 className="text-xl font-bold mb-4 text-[#800020]">My Collection</h1>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f8e6e6] text-[#800020]">
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
            {collection.filter(matchesFilters).map((coin) => (
              <tr key={coin.id}>
                <td>{coin.Year}</td>
                <td>{coin.Denomination}</td>
                <td>{coin.Monarch}</td>
                <td>{coin["Strike Type"]}</td>
                <td>{coin.Metal}</td>
                <td>{coin.Mintage?.toLocaleString()}</td>
                <td>{formatPrice(coin.purchasePrice)}</td>
                <td>{coin.notes}</td>
                <td>
                  {/* Future: sell logic here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
