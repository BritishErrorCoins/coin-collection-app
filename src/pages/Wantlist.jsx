
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";

const datasetUrl = "/GB_PreDecimal_dataset.json";

const Wantlist = () => {
  const [coins, setCoins] = useState([]);
  const [filteredVarieties, setFilteredVarieties] = useState([]);
  const [formData, setFormData] = useState({
    denomination: "",
    monarch: "",
    metal: "",
    strikeType: "",
    variety: "",
    year: "",
    reason: "",
    otherReason: "",
    notes: ""
  });

  useEffect(() => {
    fetch(datasetUrl)
      .then((res) => res.json())
      .then((data) => setCoins(data));
  }, []);

  useEffect(() => {
    const filtered = coins.filter(
      (coin) =>
        (!formData.denomination || coin.Denomination === formData.denomination) &&
        (!formData.monarch || coin.Monarch === formData.monarch) &&
        (!formData.metal || coin.Metal === formData.metal) &&
        (!formData.strikeType || coin["Strike Type"] === formData.strikeType)
    );
    const varieties = [...new Set(filtered.map((c) => c.Variety).filter(Boolean))];
    setFilteredVarieties(varieties);
  }, [formData.denomination, formData.monarch, formData.metal, formData.strikeType, coins]);

  const getUnique = (arr, key) => [...new Set(arr.map((item) => item[key]).filter(Boolean))];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReasonChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      reason: value,
      otherReason: value === "Other" ? prev.otherReason : ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      ...formData,
      reason:
        formData.reason === "Other" ? formData.otherReason : formData.reason
    };
    const stored = JSON.parse(localStorage.getItem("myWantlist")) || [];
    stored.push(entry);
    localStorage.setItem("myWantlist", JSON.stringify(stored));
    alert("Coin added to your Wantlist.");
    setFormData({
      denomination: "",
      monarch: "",
      metal: "",
      strikeType: "",
      variety: "",
      year: "",
      reason: "",
      otherReason: "",
      notes: ""
    });
  };

  return (
    <>
      <Header />
      <div className="page">
        <h2>Add to Wantlist</h2>
        <form onSubmit={handleSubmit}>
          <select name="denomination" value={formData.denomination} onChange={handleChange}>
            <option value="">Denomination</option>
            {getUnique(coins, "Denomination").map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <select name="monarch" value={formData.monarch} onChange={handleChange}>
            <option value="">Monarch</option>
            {getUnique(coins, "Monarch").map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select name="metal" value={formData.metal} onChange={handleChange}>
            <option value="">Metal</option>
            {getUnique(coins, "Metal").map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
          <select name="strikeType" value={formData.strikeType} onChange={handleChange}>
            <option value="">Strike Type</option>
            {getUnique(coins, "Strike Type").map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select name="variety" value={formData.variety} onChange={handleChange}>
            <option value="">Variety</option>
            {filteredVarieties.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
          <input
            name="year"
            type="text"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
          />
          <fieldset>
            <legend>Reason for Wanting</legend>
            {["Missing from my collection", "Upgrade", "Desire duplicates", "Other"].map((r) => (
              <label key={r}>
                <input
                  type="radio"
                  name="reason"
                  value={r}
                  checked={formData.reason === r}
                  onChange={handleReasonChange}
                />
                {r}
              </label>
            ))}
            {formData.reason === "Other" && (
              <input
                type="text"
                name="otherReason"
                placeholder="Enter custom reason"
                value={formData.otherReason}
                onChange={handleChange}
              />
            )}
          </fieldset>
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          />
          <button type="submit">Add to Wantlist</button>
        </form>
      </div>
    </>
  );
};

export default Wantlist;
