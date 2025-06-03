import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDataset } from "../hooks/useDataset";
import { addToCollection, addToWantlist } from "../utils/dataUtils";

export default function Catalog() {
  const [catalog, setCatalog] = useState([]);
  const [filters, setFilters] = useState({
    monarch: [],
    metal: [],
    type: [],
    denomination: []
  });
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptType, setPromptType] = useState(""); // "collection" or "wantlist"
  const [selectedRow, setSelectedRow] = useState(null);

  // For wantlist reasons
  const [wantReason, setWantReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  useDataset("catalog", setCatalog);

  function getUnique(arr, field) {
    return [...new Set(arr.map(item => item[field]).filter(Boolean))];
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => {
      const prevValues = prev[field];
      return {
        ...prev,
        [field]: prevValues.includes(value)
          ? prevValues.filter(v => v !== value)
          : [...prevValues, value]
      };
    });
  };

  const clearFilters = () => setFilters({ monarch: [], metal: [], type: [], denomination: [] });

  const filteredCatalog = catalog.filter(c =>
    (!filters.monarch.length || filters.monarch.includes(c.Monarch)) &&
    (!filters.metal.length || filters.metal.includes(c.Metal)) &&
    (!filters.type.length || filters.type.includes(c["Strike Type"])) &&
    (!filters.denomination.length || filters.denomination.includes(c.Denomination))
  );

  function handleAdd(row, type) {
    setPromptType(type);
    setSelectedRow(row);
    setShowPrompt(true);
    setWantReason("");
    setOtherReason("");
  }

  function handlePromptSubmit(e) {
    e.preventDefault();
    if (promptType === "collection") {
      addToCollection({
        ...selectedRow,
        purchasePrice: e.target.purchasePrice.value,
        notes: e.target.notes.value
      });
    } else if (promptType === "wantlist") {
      addToWantlist({
        ...selectedRow,
        reason: wantReason,
        otherReason: wantReason === "Other" ? otherReason : "",
        notes: e.target.notes.value
      });
    }
    setShowPrompt(false);
    setSelectedRow(null);
    setWantReason("");
    setOtherReason("");
  }

  return (
    <div>
      <Header pageTitle="Catalog" />
      <div className="content-area">
        <h1 className="page-title">Catalog</h1>
        <div className="filters-row">
          <div>
            <span>Monarch:</span>
            {getUnique(catalog, "Monarch").map(v => (
              <label key={v}>
                <input
                  type="checkbox"
                  checked={filters.monarch.includes(v)}
                  onChange={() => handleFilterChange("monarch", v)}
                />
                {v}
              </label>
            ))}
          </div>
          <div>
            <span>Metal:</span>
            {getUnique(catalog, "Metal").map(v => (
              <label key={v}>
                <input
                  type="checkbox"
                  checked={filters.metal.includes(v)}
                  onChange={() => handleFilterChange("metal", v)}
                />
                {v}
              </label>
            ))}
          </div>
          <div>
            <span>Type:</span>
            {getUnique(catalog, "Strike Type").map(v => (
              <label key={v}>
                <input
                  type="checkbox"
                  checked={filters.type.includes(v)}
                  onChange={() => handleFilterChange("type", v)}
                />
                {v}
              </label>
            ))}
          </div>
          <div>
            <span>Denomination:</span>
            {getUnique(catalog, "Denomination").map(v => (
              <label key={v}>
                <input
                  type="checkbox"
                  checked={filters.denomination.includes(v)}
                  onChange={() => handleFilterChange("denomination", v)}
                />
                {v}
              </label>
            ))}
          </div>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>

        <div className="table-container">
          <table className="main-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Denomination</th>
                <th>Monarch</th>
                <th>Type</th>
                <th>Metal</th>
                <th>Variety</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCatalog.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.Year}</td>
                  <td>{row.Denomination}</td>
                  <td>{row.Monarch}</td>
                  <td>{row["Strike Type"]}</td>
                  <td>{row.Metal}</td>
                  <td>{row.Variety}</td>
                  <td>
                    <button onClick={() => handleAdd(row, "collection")}>
                      Add to Collection
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleAdd(row, "wantlist")}>
                      Add to Wantlist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPrompt && (
          <div className="modal">
            <div className="modal-content">
              <form onSubmit={handlePromptSubmit}>
                {promptType === "collection" && (
                  <>
                    <label>
                      Purchase Price
                      <input name="purchasePrice" required />
                    </label>
                    <label>
                      Notes
                      <input name="notes" />
                    </label>
                  </>
                )}
                {promptType === "wantlist" && (
                  <>
                    <div>
                      <span>Reason:</span>
                      <label>
                        <input
                          type="radio"
                          name="reason"
                          value="Missing from my collection"
                          checked={wantReason === "Missing from my collection"}
                          onChange={e => setWantReason(e.target.value)}
                        />
                        Missing from my collection
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="reason"
                          value="Upgrade"
                          checked={wantReason === "Upgrade"}
                          onChange={e => setWantReason(e.target.value)}
                        />
                        Upgrade
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="reason"
                          value="Desire duplicates"
                          checked={wantReason === "Desire duplicates"}
                          onChange={e => setWantReason(e.target.value)}
                        />
                        Desire duplicates
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="reason"
                          value="Other"
                          checked={wantReason === "Other"}
                          onChange={e => setWantReason(e.target.value)}
                        />
                        Other
                      </label>
                      {wantReason === "Other" && (
                        <input
                          name="otherReason"
                          placeholder="Enter reason"
                          value={otherReason}
                          onChange={e => setOtherReason(e.target.value)}
                        />
                      )}
                    </div>
                    <label>
                      Notes
                      <input name="notes" />
                    </label>
                  </>
                )}
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowPrompt(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
