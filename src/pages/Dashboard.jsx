import React, { useState } from "react";
import Header from "../components/Header";
import { useDataset } from "../hooks/useDataset";
import { useFormOptions } from "../hooks/useFormOptions";


export default function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [formData, setFormData] = useState({
    Denomination: "",
    Monarch: "",
    Metal: "",
    "Strike Type": "",
    Variety: "",
    Year: "",
    Notes: "",
  });

  useDataset("dashboard", setCoins);
  const options = useFormOptions(coins, formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-burgundy">Add Coin</h2>
        <form className="space-y-4 bg-white p-4 rounded shadow">
          <div className="grid grid-cols-2 gap-4">
            <select name="Denomination" value={formData.Denomination} onChange={handleChange} className="border p-2">
              <option value="">Select Denomination</option>
              {options.denomination.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select name="Monarch" value={formData.Monarch} onChange={handleChange} className="border p-2">
              <option value="">Select Monarch</option>
              {options.monarch.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select name="Metal" value={formData.Metal} onChange={handleChange} className="border p-2">
              <option value="">Select Metal</option>
              {options.metal.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <select name="Strike Type" value={formData["Strike Type"]} onChange={handleChange} className="border p-2">
              <option value="">Select Strike Type</option>
              {options.strikeType.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select name="Variety" value={formData.Variety} onChange={handleChange} className="border p-2">
              <option value="">Select Variety</option>
              {options.variety.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            <input
              type="text"
              name="Year"
              value={formData.Year}
              onChange={handleChange}
              placeholder="Enter Year"
              className="border p-2"
            />
          </div>

          <textarea
            name="Notes"
            value={formData.Notes}
            onChange={handleChange}
            placeholder="Enter any notes..."
            className="w-full border p-2 mt-2"
            rows={3}
          />
        </form>
      </div>
    </>
  );
}