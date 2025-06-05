import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDataset } from "../hooks/useDataset";

const WANT_REASONS = ["Don’t have", "Upgrade", "Duplicate"];

function getIndicatorStatus(coin, collection, wantlist) {
  if (collection.some((c) => c.id === coin.id)) return "green";
  if (wantlist.some((w) => w.id === coin.id)) return "yellow";
  return "grey";
}

export default function BrowseCoins() {
  const [dataset, setDataset] = useState([]);
  useDataset("masterDataset", setDataset);

  const [collection] = useState(() => JSON.parse(localStorage.getItem("collection") || "[]"));
  const [wantlist, setWantlist] = useState(() => JSON.parse(localStorage.getItem("wantlist") || "[]"));
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [denomFilter, setDenomFilter] = useState("");
  const [showAdd, setShowAdd] = useState(null);
  const [showWant, setShowWant] = useState(null);
  const [addPrice, setAddPrice] = useState("");
  const [addNotes, setAddNotes] = useState("");
  const [wantReason, setWantReason] = useState(WANT_REASONS[0]);
  const [wantBudget, setWantBudget] = useState("");
  const [wantNotes, setWantNotes] = useState("");
  const [addedMsg, setAddedMsg] = useState("");

  // Denomination buttons
  const denominations = useMemo(() => {
    if (!dataset.length) return [];
    return [...new Set(dataset.map((c) => c.Denomination))].sort();
  }, [dataset]);

  // Filtered & Searched
  const filtered = useMemo(() => {
    let rows = dataset;
    if (denomFilter) rows = rows.filter((c) => c.Denomination === denomFilter);
    Object.entries(filters).forEach(([key, val]) => {
      if (val) rows = rows.filter((c) => c[key] === val);
    });
    if (search) {
      const s = search.toLowerCase();
      rows = rows.filter(
        (c) =>
          c.Year?.toString().includes(s) ||
          c.Denomination?.toLowerCase().includes(s) ||
          c.Monarch?.toLowerCase().includes(s) ||
          c.Notes?.toLowerCase().includes(s)
      );
    }
    return rows;
  }, [dataset, denomFilter, filters, search]);

  // Row filter options
  const filterOptions = (key) => {
    return [...new Set(filtered.map((c) => c[key]).filter(Boolean))].sort();
  };

  // Add coin to collection
  const handleAdd = (row) => {
    const priceValue = parseFloat(addPrice.replace(/[^0-9.]/g, "")).toFixed(2);
    const newCoin = {
      ...row,
      pricePaid: priceValue,
      notes: addNotes,
      id: uuidv4(),
    };
    const coll = JSON.parse(localStorage.getItem("collection") || "[]");
    coll.push(newCoin);
    localStorage.setItem("collection", JSON.stringify(coll));
    setAddedMsg(`Added with ID: ${newCoin.id}`);
    setShowAdd(null);
    setAddPrice("");
    setAddNotes("");
    setTimeout(() => setAddedMsg(""), 2500);
  };

  // Add coin to wantlist
  const handleWant = (row) => {
    const budgetValue = parseFloat(wantBudget.replace(/[^0-9.]/g, "")).toFixed(2);
    const newWant = {
      ...row,
      reason: wantReason,
      budgetedPrice: budgetValue,
      notes: wantNotes,
      id: uuidv4(),
    };
    const wl = JSON.parse(localStorage.getItem("wantlist") || "[]");
    wl.push(newWant);
    localStorage.setItem("wantlist", JSON.stringify(wl));
    setWantlist(wl);
    setAddedMsg(`Wantlist entry added (ID: ${newWant.id})`);
    setShowWant(null);
    setWantBudget("");
    setWantNotes("");
    setTimeout(() => setAddedMsg(""), 2500);
  };

  // Reset filters
  const resetFilters = () => {
    if (window.confirm("This will reset all filters and searches back to the default. Are you sure you want to do this?")) {
      setSearch("");
      setFilters({});
      setDenomFilter("");
    }
  };

  // ---- Debug log for data ----
  console.log("Dataset for BrowseCoins:", dataset);

  return (
    <div className="max-w-6xl mx-auto mt-8 mb-12">
      <div className="flex flex-wrap gap-3 mb-4">
        {denominations.map((d) => (
          <button
            key={d}
            className={`px-3 py-1 rounded-2xl font-semibold ${denomFilter === d ? "bg-burgundy text-white" : "bg-gray-200 text-burgundy"} `}
            onClick={() => setDenomFilter(d)}
          >
            {d}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded-2xl font-semibold bg-red-600 text-white border border-red-800 shadow"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          id="browse-search"
          name="browse-search"
          type="text"
          className="border px-3 py-1 rounded-lg"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {["Monarch", "Year", "Metal"].map((key) => (
          <select
            id={`browse-filter-${key.toLowerCase()}`}
            name={`browse-filter-${key.toLowerCase()}`}
            key={key}
            className="border px-2 py-1 rounded-lg"
            value={filters[key] || ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                [key]: e.target.value || undefined,
              }))
            }
          >
            <option value="">{key.charAt(0).toUpperCase() + key.slice(1)}</option>
            {filterOptions(key).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-2xl overflow-hidden border dark:border-gray-700 text-sm">
          <thead>
            <tr className="bg-burgundy text-white">
              <th></th>
              <th>Year</th>
              <th>Denomination</th>
              <th>Monarch</th>
              <th>Metal</th>
              <th>Strike Type</th>
              <th>Variety</th>
              <th>Notes</th>
              <th>Add</th>
              <th>Want</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => {
              const status = getIndicatorStatus(row, collection, wantlist);
              return (
                <tr key={row.id || idx} className={idx % 2 === 0 ? "bg-[#f9f6f3] dark:bg-[#2e2231]" : "bg-[#f3e2e6] dark:bg-[#231821]"}>
                  {/* Indicator */}
                  <td>
                    <span
                      className={`inline-block w-4 h-4 rounded-full border-2 border-gray-400`}
                      style={{
                        backgroundColor:
                          status === "green"
                            ? "#6cd37e"
                            : status === "yellow"
                            ? "#ffe45e"
                            : "#d3d3d3",
                      }}
                      title={
                        status === "green"
                          ? "In your collection"
                          : status === "yellow"
                          ? "In your Wantlist"
                          : "Not in a user list"
                      }
                    />
                  </td>
                  <td>{row.Year}</td>
                  <td>{row.Denomination}</td>
                  <td>{row.Monarch}</td>
                  <td>{row.Metal}</td>
                  <td>{row["Strike Type"]}</td>
                  <td>{row.Variety}</td>
                  <td>{row.Notes}</td>
                  {/* Add button */}
                  <td>
                    <button
                      className="bg-green-600 text-white rounded-xl px-2 py-1"
                      onClick={() => setShowAdd(idx)}
                    >
                      Add
                    </button>
                    {showAdd === idx && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                        <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
                          <div className="text-lg font-semibold mb-2">Add Coin</div>
                          <div className="mb-2">
                            <label htmlFor="add-price" className="block text-sm mb-1">Price Paid (£)</label>
                            <input
                              id="add-price"
                              name="add-price"
                              type="text"
                              className="border px-2 py-1 rounded w-full"
                              value={addPrice}
                              onChange={e => setAddPrice(e.target.value)}
                              onBlur={() => setAddPrice((v) => {
                                let num = parseFloat(addPrice.replace(/[^0-9.]/g, ""));
                                return isNaN(num) ? "" : `£${num.toFixed(2)}`;
                              })}
                            />
                          </div>
                          <div className="mb-2">
                            <label htmlFor="add-notes" className="block text-sm mb-1">Notes</label>
                            <textarea
                              id="add-notes"
                              name="add-notes"
                              className="border px-2 py-1 rounded w-full"
                              rows={2}
                              value={addNotes}
                              onChange={e => setAddNotes(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              className="px-3 py-1 bg-gray-300 text-gray-900 rounded"
                              onClick={() => setShowAdd(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-3 py-1 bg-green-600 text-white rounded"
                              onClick={() => handleAdd(row)}
                            >
                              Add Coin
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  {/* Want button */}
                  <td>
                    <button
                      className="bg-yellow-400 text-black rounded-xl px-2 py-1"
                      onClick={() => setShowWant(idx)}
                    >
                      Want
                    </button>
                    {showWant === idx && (
                      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                        <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
                          <div className="text-lg font-semibold mb-2">Add to Wantlist</div>
                          <div className="mb-2">
                            <label className="block text-sm mb-1">Reason</label>
                            {WANT_REASONS.map((r) => (
                              <label key={r} className="mr-3">
                                <input
                                  id={`want-reason-${r.replace(/\s+/g, '').toLowerCase()}`}
                                  name="want-reason"
                                  type="radio"
                                  checked={wantReason === r}
                                  onChange={() => setWantReason(r)}
                                />{" "}
                                {r}
                              </label>
                            ))}
                          </div>
                          <div className="mb-2">
                            <label htmlFor="want-budget" className="block text-sm mb-1">Budgeted Price (£)</label>
                            <input
                              id="want-budget"
                              name="want-budget"
                              type="text"
                              className="border px-2 py-1 rounded w-full"
                              value={wantBudget}
                              onChange={e => setWantBudget(e.target.value)}
                              onBlur={() => setWantBudget((v) => {
                                let num = parseFloat(wantBudget.replace(/[^0-9.]/g, ""));
                                return isNaN(num) ? "" : `£${num.toFixed(2)}`;
                              })}
                            />
                          </div>
                          <div className="mb-2">
                            <label htmlFor="want-notes" className="block text-sm mb-1">Notes</label>
                            <textarea
                              id="want-notes"
                              name="want-notes"
                              className="border px-2 py-1 rounded w-full"
                              rows={2}
                              value={wantNotes}
                              onChange={e => setWantNotes(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              className="px-3 py-1 bg-gray-300 text-gray-900 rounded"
                              onClick={() => setShowWant(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-3 py-1 bg-yellow-400 text-black rounded"
                              onClick={() => handleWant(row)}
                            >
                              Add to Wantlist
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {addedMsg && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-2xl shadow-lg z-50">
          {addedMsg}
        </div>
      )}
    </div>
  );
}
