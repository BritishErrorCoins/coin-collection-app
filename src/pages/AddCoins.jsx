import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import "../App.css";
import { DATA_URL } from "../utils/dataUtils";

export default function AddCoinForm({ dataset, onSubmit }) {
  const [form, setForm] = useState({
    year: "",
    denomination: "",
    monarch: "",
    metal: "",
    strikeType: "",
    variety: "",
    notes: "",
    pricePaid: "",
  });

  // --- Utility: Filter dataset based on form selections ---
  const filterDataset = (filters) =>
    dataset.filter((coin) => {
      return Object.entries(filters).every(([key, val]) =>
        val ? (coin[key] && coin[key].toString() === val) : true
      );
    });

  // --- Dropdown option lists (filtered by all previous selections) ---

  // Denominations for selected year
  const denominations = useMemo(() => {
    if (!form.year) return [];
    const filtered = dataset.filter(
      (coin) => coin.year && coin.year.toString() === form.year
    );
    return [...new Set(filtered.map((c) => c.denomination))].sort();
  }, [dataset, form.year]);

  // Monarchs for selected year & denomination
  const monarchs = useMemo(() => {
    if (!form.year || !form.denomination) return [];
    const filtered = filterDataset({
      year: form.year,
      denomination: form.denomination,
    });
    return [...new Set(filtered.map((c) => c.monarch))].sort();
  }, [dataset, form.year, form.denomination]);

  // Metals for selected year, denomination, monarch
  const metals = useMemo(() => {
    if (!form.year || !form.denomination || !form.monarch) return [];
    const filtered = filterDataset({
      year: form.year,
      denomination: form.denomination,
      monarch: form.monarch,
    });
    return [...new Set(filtered.map((c) => c.metal))].sort();
  }, [dataset, form.year, form.denomination, form.monarch]);

  // Strike Types for selected year, denomination, monarch, metal
  const strikeTypes = useMemo(() => {
    if (!form.year || !form.denomination || !form.monarch || !form.metal) return [];
    const filtered = filterDataset({
      year: form.year,
      denomination: form.denomination,
      monarch: form.monarch,
      metal: form.metal,
    });
    return [...new Set(filtered.map((c) => c.strikeType))].sort();
  }, [dataset, form.year, form.denomination, form.monarch, form.metal]);

  // Varieties for selected year, denomination, monarch, metal, strikeType
  const varieties = useMemo(() => {
    if (
      !form.year ||
      !form.denomination ||
      !form.monarch ||
      !form.metal ||
      !form.strikeType
    )
      return [];
    const filtered = filterDataset({
      year: form.year,
      denomination: form.denomination,
      monarch: form.monarch,
      metal: form.metal,
      strikeType: form.strikeType,
    });
    return [...new Set(filtered.map((c) => c.variety))].sort();
  }, [
    dataset,
    form.year,
    form.denomination,
    form.monarch,
    form.metal,
    form.strikeType,
  ]);

  // --- Handlers ---

  // Reset all dependent fields if a parent is changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    let reset = {};
    if (name === "year") {
      reset = {
        denomination: "",
        monarch: "",
        metal: "",
        strikeType: "",
        variety: "",
      };
    } else if (name === "denomination") {
      reset = { monarch: "", metal: "", strikeType: "", variety: "" };
    } else if (name === "monarch") {
      reset = { metal: "", strikeType: "", variety: "" };
    } else if (name === "metal") {
      reset = { strikeType: "", variety: "" };
    } else if (name === "strikeType") {
      reset = { variety: "" };
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...reset,
    }));
  };

  // Price Paid formatting
  const formatPrice = (value) => {
    let num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return "";
    return `£${num.toFixed(2)}`;
  };

  const handlePriceChange = (e) => {
    setForm((prev) => ({
      ...prev,
      pricePaid: e.target.value,
    }));
  };

  const handlePriceBlur = () => {
    setForm((prev) => ({
      ...prev,
      pricePaid: formatPrice(prev.pricePaid),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Strip £ for storage, force 2 decimals
    const priceValue = parseFloat(form.pricePaid.replace(/[^0-9.]/g, "")).toFixed(2);
    onSubmit({
      ...form,
      pricePaid: priceValue,
    });
  };

  // --- Render ---
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
    >
      {/* 1. Year */}
      <div>
        <label className="block text-sm font-medium mb-1">Year</label>
        <input
          type="text"
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          placeholder="e.g. 1967"
          className="border rounded-lg px-3 py-2 w-full"
        />
      </div>
      {/* 2. Denomination */}
      <div>
        <label className="block text-sm font-medium mb-1">Denomination</label>
        <select
          name="denomination"
          value={form.denomination}
          onChange={handleChange}
          required
          disabled={!form.year}
          className="border rounded-lg px-3 py-2 w-full"
        >
          <option value="">Select</option>
          {denominations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      {/* 3. Monarch */}
      <div>
        <label className="block text-sm font-medium mb-1">Monarch</label>
        <select
          name="monarch"
          value={form.monarch}
          onChange={handleChange}
          required
          disabled={!form.denomination}
          className="border rounded-lg px-3 py-2 w-full"
        >
          <option value="">Select</option>
          {monarchs.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      {/* 4. Metal */}
      <div>
        <label className="block text-sm font-medium mb-1">Metal</label>
        <select
          name="metal"
          value={form.metal}
          onChange={handleChange}
          required
          disabled={!form.monarch}
          className="border rounded-lg px-3 py-2 w-full"
        >
          <option value="">Select</option>
          {metals.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      {/* 5. Strike Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Strike Type</label>
        <select
          name="strikeType"
          value={form.strikeType}
          onChange={handleChange}
          required
          disabled={!form.metal}
          className="border rounded-lg px-3 py-2 w-full"
        >
          <option value="">Select</option>
          {strikeTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      {/* 6. Variety */}
      <div>
        <label className="block text-sm font-medium mb-1">Variety</label>
        <select
          name="variety"
          value={form.variety}
          onChange={handleChange}
          required
          disabled={!form.strikeType}
          className="border rounded-lg px-3 py-2 w-full"
        >
          <option value="">Select</option>
          {varieties.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>
      {/* 7. Notes */}
      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={2}
          className="border rounded-lg px-3 py-2 w-full"
        />
      </div>
      {/* 8. Price Paid */}
      <div>
        <label className="block text-sm font-medium mb-1">Price Paid (£)</label>
        <input
          type="text"
          name="pricePaid"
          inputMode="decimal"
          value={form.pricePaid}
          onChange={handlePriceChange}
          onBlur={handlePriceBlur}
          placeholder="e.g. £12.00"
          required
          className="border rounded-lg px-3 py-2 w-full"
        />
      </div>
      {/* Submit */}
      <button
        type="submit"
        className="bg-burgundy text-white rounded-2xl px-6 py-2 font-semibold shadow"
      >
        Add Coin
      </button>
    </form>
  );
}
