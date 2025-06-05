import React, { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export default function MyCollection() {
  const [collection, setCollection] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [showSell, setShowSell] = useState(null);
  const [sellPrice, setSellPrice] = useState("");
  const [sellNotes, setSellNotes] = useState("");

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("collection") || "[]");
    setCollection(data);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("collection", JSON.stringify(collection));
  }, [collection]);

  // Group by Denomination and sort by Year
  const grouped = useMemo(() => {
    if (!collection.length) return {};
    let filtered = collection;
    // Search
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.year?.toString().includes(s) ||
          c.notes?.toLowerCase().includes(s)
      );
    }
    // Filtering
    Object.entries(filters).forEach(([key, val]) => {
      if (val) filtered = filtered.filter((c) => c[key] === val);
    });
    // Group and sort
    const groups = {};
    filtered
      .slice()
      .sort((a, b) => (a.year || 0) - (b.year || 0))
      .forEach((c) => {
        if (!groups[c.denomination]) groups[c.denomination] = [];
        groups[c.denomination].push(c);
      });
    return groups;
  }, [collection, search, filters]);

  // Filter dropdown options (from current filtered dataset)
  const filterOptions = (key) => {
    const all = collection.map((c) => c[key]).filter(Boolean);
    return [...new Set(all)].sort();
  };

  // Sum of price paid
  const totalPricePaid = useMemo(
    () =>
      collection.reduce((sum, c) => sum + (parseFloat(c.pricePaid) || 0), 0),
    [collection]
  );

  // Handle inline edit
  const handleEdit = (idx, row) => {
    setEditIdx(idx);
    setEditFields({
      strikeType: row.strikeType,
      variety: row.variety,
      notes: row.notes,
    });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = (row) => {
    setCollection((prev) =>
      prev.map((c) =>
        c.id === row.id
          ? { ...c, ...editFields }
          : c
      )
    );
    setEditIdx(null);
    setEditFields({});
  };

  // Handle Sell
  const handleSell = (row) => {
    setShowSell(row.id);
    setSellPrice("");
    setSellNotes(row.notes || "");
  };
  const confirmSell = (row) => {
    const soldItem = {
      ...row,
      soldPrice: sellPrice,
      soldNotes: sellNotes,
      soldDate: new Date().toLocaleDateString("en-GB"),
    };
    // Move to Sold
    const sold = JSON.parse(localStorage.getItem("sold") || "[]");
    sold.push(soldItem);
    localStorage.setItem("sold", JSON.stringify(sold));
    // Remove from collection
    setCollection((prev) => prev.filter((c) => c.id !== row.id));
    setShowSell(null);
    setSellPrice("");
    setSellNotes("");
  };

  // Export
  const handleExport = (type) => {
    const fields = [
      "year",
      "denomination",
      "monarch",
      "metal",
      "strikeType",
      "variety",
      "notes",
      "pricePaid",
      "id",
    ];
    const rows = [fields.join(",")].concat(
      collection.map((c) =>
        fields.map((f) => `"${(c[f] || "").toString().replace(/"/g, '""')}"`).join(",")
      )
    );
    const blob = new Blob([rows.join("\r\n")], {
      type:
        type === "csv"
          ? "text/csv"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mycollection.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!collection.length)
    return (
      <div className="max-w-xl mx-auto text-center text-lg mt-20 text-gray-500 dark:text-gray-300">
        You have not yet added coins or you have sold your collection.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            className="border px-3 py-1 rounded-lg"
            placeholder="Search by Year or Notes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* Dynamic filters */}
          {["denomination", "monarch", "metal"].map((key) => (
            <select
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
          <button
            className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg font-semibold"
            onClick={() => {
              setSearch("");
              setFilters({});
            }}
          >
            Clear
          </button>
        </div>
        <div className="text-md font-semibold text-burgundy dark:text-pink-200">
          Total Paid: £{totalPricePaid.toFixed(2)}
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded-lg font-semibold"
            onClick={() => handleExport("csv")}
          >
            Export CSV
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold"
            onClick={() => handleExport("xlsx")}
          >
            Export XLSX
          </button>
        </div>
      </div>
      {Object.keys(grouped).map((denomination) => (
        <div key={denomination} className="mb-8">
          <div className="font-bold text-lg mb-2 text-burgundy dark:text-pink-200">
            {denomination}
          </div>
          <div className="rounded-2xl overflow-hidden border dark:border-gray-700">
            {grouped[denomination].map((row, idx) => (
              <div
                key={row.id}
                className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-0 px-4 py-2 ${
                  idx % 2 === 0
                    ? "bg-[#f9f6f3] dark:bg-[#2e2231]"
                    : "bg-[#f3e2e6] dark:bg-[#231821]"
                }`}
              >
                <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-2 w-full">
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Year</div>
                    <div>{row.year}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Monarch</div>
                    <div>{row.monarch}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Metal</div>
                    <div>{row.metal}</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Strike Type</div>
                    {editIdx === row.id ? (
                      <input
                        name="strikeType"
                        value={editFields.strikeType}
                        onChange={handleEditChange}
                        className="border rounded px-1 w-full"
                      />
                    ) : (
                      <div>{row.strikeType}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Variety</div>
                    {editIdx === row.id ? (
                      <input
                        name="variety"
                        value={editFields.variety}
                        onChange={handleEditChange}
                        className="border rounded px-1 w-full"
                      />
                    ) : (
                      <div>{row.variety}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500">Notes</div>
                    {editIdx === row.id ? (
                      <input
                        name="notes"
                        value={editFields.notes}
                        onChange={handleEditChange}
                        className="border rounded px-1 w-full"
                      />
                    ) : (
                      <div>{row.notes}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="text-xs text-gray-500">Price Paid</div>
                  <div>£{parseFloat(row.pricePaid || 0).toFixed(2)}</div>
                  {editIdx === row.id ? (
                    <button
                      className="ml-2 px-3 py-1 bg-green-600 text-white rounded-lg font-semibold"
                      onClick={() => handleUpdate(row)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="ml-2 px-3 py-1 bg-yellow-600 text-white rounded-lg font-semibold"
                      onClick={() => handleEdit(row.id, row)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="ml-2 px-3 py-1 bg-burgundy text-white rounded-lg font-semibold"
                    onClick={() => handleSell(row)}
                  >
                    Sell
                  </button>
                </div>
                {/* Sell prompt modal */}
                {showSell === row.id && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
                    <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
                      <div className="text-lg font-semibold mb-2">Sell Coin</div>
                      <div className="mb-2">
                        <label className="block text-sm mb-1">Sold Price (£)</label>
                        <input
                          type="number"
                          step="0.01"
                          className="border px-2 py-1 rounded w-full"
                          value={sellPrice}
                          onChange={e => setSellPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm mb-1">Notes</label>
                        <textarea
                          className="border px-2 py-1 rounded w-full"
                          rows={2}
                          value={sellNotes}
                          onChange={e => setSellNotes(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          className="px-3 py-1 bg-gray-300 text-gray-900 rounded"
                          onClick={() => setShowSell(null)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded"
                          onClick={() => confirmSell(row)}
                        >
                          Confirm Sell
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
