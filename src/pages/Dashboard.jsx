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
    <div>
      <Header pageTitle="Dashboard" />
      <div className="content-area">
        <h1 className="page-title">Add Coins</h1>
        <form className="coin-form">
          <label>
            Denomination
            <select
              name="Denomination"
              value={formData.Denomination}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {options.Denomination.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
          <label>
            Monarch
            <select
              name="Monarch"
              value={formData.Monarch}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {options.Monarch.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
          <label>
            Metal
            <select
              name="Metal"
              value={formData.Metal}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {options.Metal.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
          <label>
            Strike Type
            <select
              name="Strike Type"
              value={formData["Strike Type"]}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {options["Strike Type"].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
          <label>
            Variety
            <select
              name="Variety"
              value={formData.Variety}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {options.Variety.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </label>
          <label>
            Year
            <input
              name="Year"
              type="text"
              value={formData.Year}
              onChange={handleChange}
              placeholder="Year"
            />
          </label>
          <label>
            Notes
            <input
              name="Notes"
              type="text"
              value={formData.Notes}
              onChange={handleChange}
              placeholder="Notes"
            />
          </label>
        </form>
      </div>
    </div>
  );
}
