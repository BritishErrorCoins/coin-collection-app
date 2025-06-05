import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

// Example: Load your dataset with useDataset or context
import { useDataset } from "../hooks/useDataset";

export default function AddCoins() {
  const [dataset, setDataset] = useState([]);
  useDataset("masterDataset", setDataset); // Loads from DATA_URL

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

  const [showModal, setShowModal] = useState(false);
  const [addedId, setAddedId] = useState(null);

  // Years: min-max from dataset
  const years = useMemo(() => {
    if (!dataset.length) return [];
    const nums = dataset.map((c) => Number(c.year)).filter(Boolean);
    if (!nums.length) return [];
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    return Array.from({ length: max - min + 1 }, (_, i) => (min + i).toString());
  }, [dataset]);

  // Dependent dropdowns
  const denominations = useMemo(() => {
    if (!form.year) return [];
    return [...new Set(dataset.filter(c => c.year && c.year.toString() === form.year).map(c => c.denomination))].sort();
  }, [dataset, form.year]);

  const monarchs = useMemo(() => {
    if (!form.year || !form.denomination) return [];
    return [...new Set(dataset.filter(
      c => c.year && c.year.toString() === form.year && c.denomination === form.denomination
    ).map(c => c.monarch))].sort();
  }, [dataset, form.year, form.denomination]);

  const metals = useMemo(() => {
    if (!form.year || !form.denomination || !form.monarch) return [];
    return [...new Set(dataset.filter(
      c =>
        c.year && c.year.toString() === form.year &&
        c.denomination === form.denomination &&
        c.monarch === form.monarch
    ).map(c => c.metal))].sort();
  }, [dataset, form.year, form.denomination, form.monarch]);

  const strikeTypes = useMemo(() => {
    if (!form.year || !form.denomination || !form.monarch || !form.metal) return [];
    return [...new Set(dataset.filter(
      c =>
        c.year && c.year.toString() === form.year &&
        c.denomination === form.denomination &&
        c.monarch === form.monarch &&
        c.metal === form.metal
    ).map(c => c.strikeType))].sort();
  }, [dataset, form.year, form.denomination, form.monarch, form.metal]);

  const varieties = useMemo(() => {
    if (!form.year || !form.denomination || !form.monarch || !form.metal || !form.strikeType) return [];
    return [...new Set(dataset.filter(
      c =>
        c.year && c.year.toString() === form.year &&
        c.denomination === form.denomination &&
        c.monarch === form.monarch &&
        c.metal === form.metal &&
        c.strikeType === form.strikeType
    ).map(c => c.variety))].sort();
  }, [dataset, form.year, form.denomination, form.monarch, form.metal, form.strikeType]);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    let reset = {};
    if (name === "year") reset = { denomination: "", monarch: "", metal: "", strikeType: "", variety: "" };
    else if (name === "denomination") reset = { monarch: "", metal: "", strikeType: "", variety: "" };
    else if (name === "monarch") reset = { metal: "", strikeType: "", variety: "" };
    else if (name === "metal") reset = { strikeType: "", variety: "" };
    else if (name === "strikeType") reset = { variety: "" };
    setForm((prev) => ({ ...prev, [name]: value, ...reset }));
  };

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
    const priceValue = parseFloat(form.pricePaid.replace(/[^0-9.]/g, "")).toFixed(2);
    const entry = {
      ...form,
      pricePaid: priceValue,
      id: uuidv4(),
    };
    // Add to My Collection in localStorage
    const current = JSON.parse(localStorage.getItem("collection") || "[]");
    current.push(entry);
    localStorage.setItem("collection", JSON.stringify(current));
    setAddedId(entry.id);
    setShowModal(true);
    setForm({
      year: "",
      denomination: "",
      monarch: "",
      metal: "",
      strikeType: "",
      variety: "",
      notes: "",
      pricePaid: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-8">
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
        {/* 1. Year */}
        <div>
          <label className="block text-sm font-medium mb-1">Year</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
            className="border rounded-lg px-3 py-2 w-full"
          >
            <option value="">Select</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
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
              <option key={d} value={d}>{d}</option>
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
              <option key={m} value={m}>{m}</option>
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
              <option key={m} value={m}>{m}</option>
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
              <option key={s} value={s}>{s}</option>
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
              <option key={v} value={v}>{v}</option>
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
        <button
          type="submit"
          className="bg-burgundy text-white rounded-2xl px-6 py-2 font-semibold shadow"
        >
          Add Coin
        </button>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
            <div className="text-lg font-semibold mb-2">Coin Added!</div>
            <div>Your coin was added with ID:</div>
            <div className="font-mono text-burgundy my-2">{addedId}</div>
            <button
              className="mt-4 bg-burgundy text-white px-4 py-2 rounded-2xl"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
