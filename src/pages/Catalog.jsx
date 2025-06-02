import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDataset } from "../hooks/useDataset";
import { addToCollection, addToWantlist } from "../utils/dataUtils";
import "../styles/table.css";
import "../styles/table.css";

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

  useDataset(setCatalog);

  // Helper to get unique filter options
  function getUnique(arr, field) {
    return [...new Set(arr.map(item => item[field]).filter(Boolean))];
  }

  // Filter handling
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

  // Filtered data
  const filteredCatalog = catalog.filter(c =>
    (!filters.monarch.length || filters.monarch.includes(c.Monarch)) &&
    (!filters.metal.length || filters.metal.includes(c.Metal)) &&
    (!filters.type.length || filters.type.includes(c["Strike Type"])) &&
    (!filters.denomination.length || filters.denomination.includes(c.Denomination))
  );

  // Prompt logic
  const handleAddToCollection = row => {
    setSelectedRow(row);
    setPromptType("collection");
    setShowPrompt(true);
  };

  const handleAddToWantlist = row => {
    setSelectedRow(row);
    setPromptType("wantlist");
    setShowPrompt(true);
    setWantReason(""); // reset
    setOtherReason("");
  };

  const handlePromptSubmit = e => {
    e.preventDefault();
    if (promptType === "collection") {
      const price = e.target.price.value;
      const notes = e.target.notes.value;
      addToCollection({ ...selectedRow, purchasePrice: price, notes });
    } else if (promptType === "wantlist") {
      const reason = wantReason === "Other" ? otherReason : wantReason;
      addToWantlist({ ...selectedRow, reason });
    }
    setShowPrompt(false);
    setSelectedRow(null);
    setWantReason("");
    setOtherReason("");
  };

  return (
    <>
      <Header title="Catalog">
        {/* Filter Section */}
        <div className="filters burgundy-bg">
          <div>
            <strong>Monarch:</strong>
            {getUnique(catalog, "Monarch").map(monarch => (
              <label key={monarch} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.monarch.includes(monarch)}
                  onChange={() => handleFilterChange("monarch", monarch)}
                />
                {monarch}
              </label>
            ))}
          </div>
          <div>
            <strong>Metal:</strong>
            {getUnique(catalog, "Metal").map(metal => (
              <label key={metal} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.metal.includes(metal)}
                  onChange={() => handleFilterChange("metal", metal)}
                />
                {metal}
              </label>
            ))}
          </div>
          <div>
            <strong>Type:</strong>
            {getUnique(catalog, "Strike Type").map(type => (
              <label key={type} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.type.includes(type)}
                  onChange={() => handleFilterChange("type", type)}
                />
                {type}
              </label>
            ))}
          </div>
          <div>
            <strong>Denomination:</strong>
            {getUnique(catalog, "Denomination").map(den => (
              <label key={den} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.denomination.includes(den)}
                  onChange={() => handleFilterChange("denomination", den)}
                />
                {den}
              </label>
            ))}
          </div>
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All
          </button>
        </div>
      </Header>

      {/* Prompt Modal */}
      {showPrompt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handlePromptSubmit}>
              {promptType === "collection" ? (
                <>
                  <h3>Add to Collection</h3>
                  <label>
                    Purchase Price (£):{" "}
                    <input name="price" type="number" min="0" step="0.01" required />
                  </label>
                  <label>
                    Notes: <textarea name="notes" />
                  </label>
                </>
              ) : (
                <>
                  <h3>Add to Wantlist</h3>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Missing from my collection"
                        checked={wantReason === "Missing from my collection"}
                        onChange={() => setWantReason("Missing from my collection")}
                      />
                      Missing from my collection
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Upgrade"
                        checked={wantReason === "Upgrade"}
                        onChange={() => setWantReason("Upgrade")}
                      />
                      Upgrade
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Desire duplicates"
                        checked={wantReason === "Desire duplicates"}
                        onChange={() => setWantReason("Desire duplicates")}
                      />
                      Desire duplicates
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="reason"
                        value="Other"
                        checked={wantReason === "Other"}
                        onChange={() => setWantReason("Other")}
                      />
                      Other
                    </label>
                    {wantReason === "Other" && (
                      <input
                        type="text"
                        placeholder="Enter reason"
                        value={otherReason}
                        onChange={e => setOtherReason(e.target.value)}
                        required
                        style={{ marginLeft: "1em" }}
                      />
                    )}
                  </div>
                </>
              )}
              <div style={{ marginTop: 16 }}>
                <button type="submit" className="burgundy-btn">Submit</button>
                <button type="button" onClick={() => setShowPrompt(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="coin-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Denomination</th>
              <th>Monarch</th>
              <th>Type</th>
              <th>Metal</th>
              <th>Mintage</th>
              <th>Variety</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCatalog.map((coin, idx) => (
              <tr key={idx}>
                <td>{coin.Year}</td>
                <td>{coin.Denomination}</td>
                <td>{coin.Monarch}</td>
                <td>{coin["Strike Type"]}</td>
                <td>{coin.Metal}</td>
                <td>{coin.Mintage}</td>
                <td>{coin.Variety}</td>
                <td>
                  <button
                    className="burgundy-btn"
                    onClick={() => handleAddToCollection(coin)}
                  >
                    Add to Collection
                  </button>
                </td>
                <td>
                  <button
                    className="burgundy-btn"
                    onClick={() => handleAddToWantlist(coin)}
                  >
                    Add to Wantlist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredCatalog.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: "#800020" }}>
            No coins match your filters.
          </div>
        )}
      </div>
    </>
  );
}
