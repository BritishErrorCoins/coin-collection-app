import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { getUniqueOptionsFromDataset } from "../utils/dataUtils";
import dataset from "../../public/GB_PreDecimal_dataset.json";

export default function Wantlist() {
  const [formData, setFormData] = useState({
    Denomination: "",
    Monarch: "",
    Metal: "",
    "Strike Type": "",
    Variety: "",
    Year: "",
    Notes: "",
    Reason: "",
    OtherReason: "",
  });

  const [options, setOptions] = useState({
    Denomination: [],
    Monarch: [],
    Metal: [],
    "Strike Type": [],
    Variety: [],
  });

  useEffect(() => {
    const newOptions = {
      Denomination: getUniqueOptionsFromDataset(dataset, "Denomination"),
      Monarch: getUniqueOptionsFromDataset(dataset, "Monarch"),
      Metal: getUniqueOptionsFromDataset(dataset, "Metal"),
      "Strike Type": getUniqueOptionsFromDataset(dataset, "Strike Type"),
      Variety: getUniqueOptionsFromDataset(dataset, "Variety"),
    };
    setOptions(newOptions);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const wantlist = JSON.parse(localStorage.getItem("wantlist")) || [];
    wantlist.push(formData);
    localStorage.setItem("wantlist", JSON.stringify(wantlist));
    alert("Added to Wantlist!");
    setFormData({
      Denomination: "",
      Monarch: "",
      Metal: "",
      "Strike Type": "",
      Variety: "",
      Year: "",
      Notes: "",
      Reason: "",
      OtherReason: "",
    });
  };

  return (
    <>
      <Header />
      <div className="p-4 max-w-3xl mx-auto text-burgundy">
        <h1 className="text-2xl font-semibold mb-4">My Wantlist</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(options).map((key) => (
            <div key={key}>
              <label className="block font-medium">{key}</label>
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select {key}</option>
                {options[key].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div>
            <label className="block font-medium">Year</label>
            <input
              type="text"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Notes</label>
            <textarea
              name="Notes"
              value={formData.Notes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium">Reason</label>
            <div className="space-y-1">
              {["Missing from my collection", "Upgrade", "Desire duplicates", "Other"].map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={reason}
                    name="Reason"
                    value={reason}
                    checked={formData.Reason === reason}
                    onChange={handleChange}
                  />
                  <label htmlFor={reason}>{reason}</label>
                </div>
              ))}
            </div>
          </div>
          {formData.Reason === "Other" && (
            <div>
              <label className="block font-medium">Other Reason</label>
              <input
                type="text"
                name="OtherReason"
                value={formData.OtherReason}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-burgundy text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            Add to Wantlist
          </button>
        </form>
      </div>
    </>
  );
}
