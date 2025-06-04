import React, { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import "../App.css";
import { DATA_URL } from "../utils/dataUtils";

export default function AddCoins({ onSubmit }) {
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dataset on mount
  useEffect(() => {
    async function fetchDataset() {
      setLoading(true);
      try {
        const res = await fetch(DATA_URL);
        const data = await res.json();
        setDataset(data);
      } catch (e) {
        setDataset([]);
      }
      setLoading(false);
    }
    fetchDataset();
  }, []);

  // --- FORM STATE ---
  const [form, setForm] = useState({
    denomination: "",
    monarch: "",
    metal: "",
    strikeType: "",
    variety: "",
    year: "",
    notes: "",
    pricePaid: "",
  });

  // --- DEPENDENT DROPDOWNS ---
  const denominations = useMemo(
    () => Array.from(new Set(dataset.map((c) => c.denomination))).sort(),
    [dataset]
  );
  const monarchs = useMemo(() => {
    if (!form.denomination) return [];
    return Array.from(
      new Set(dataset.filter((c) => c.denomination === form.denomination).map((c) => c.monarch))
    ).sort();
  }, [dataset, form.denomination]);
  const metals = useMemo(() => {
    if (!form.denomination || !form.monarch) return [];
    return Array.from(
      new Set(
        dataset
          .filter((c) => c.denomination === form.denomination && c.monarch === form.monarch)
          .map((c) => c.metal)
      )
    ).sort();
  }, [dataset, form.denomination, form.monarch]);
  const strikeTypes = useMemo(() => {
    if (!form.denomination || !form.monarch || !form.metal) return [];
    return Array.from(
      new Set(
        dataset
          .filter(
            (c) =>
              c.denomination === form.denomination &&
              c.monarch === form.monarch &&
              c.metal === form.metal
          )
          .map((c) => c.strikeType)
      )
    ).sort();
  }, [dataset, form.denomination, form.monarch, form.metal]);
  const varieties = useMemo(() => {
    if (!form.denomination || !form.monarch || !form.metal || !form.strikeType) return [];
    return Array.from(
      new Set(
        dataset
          .filter(
            (c) =>
              c.denomination === form.denomination &&
              c.monarch === form.monarch &&
              c.metal === form.metal &&
              c.strikeType === form.strikeType
          )
          .map((c) => c.variety)
      )
    ).sort();
  }, [dataset, form.denomination, form.monarch, form.metal, form.strikeType]);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Reset dependent fields if parent changes
    let resetFields = {};
    if (name === "denomination") {
      resetFields = { monarch: "", metal: "", strikeType: "", variety: "" };
    } else if (name === "monarch") {
      resetFields = { metal: "", strikeType: "", variety: "" };
    } else if (name === "metal") {
      resetFields = { strikeType: "", variety: "" };
    } else if (name === "strikeType") {
      resetFields = { variety: "" };
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...resetFields,
    }));
  };

  // Format price to £xx.00
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
    const coinData = {
      ...form,
      pricePaid: priceValue,
    };
    if (onSubmit) onSubmit(coinData);
    // Optional: Reset form here if you want
    // setForm({...});
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <main className="main-content">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
        >
          {/* Denomination */}
          <div>
            <label className="block text-sm font-medium mb-1">Denomination</label>
            <select
              name="denomination"
              value={form.denomination}
              onChange={handleChange}
              required
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
          {/* Monarch */}
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
          {/* Metal */}
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
          {/* Strike Type */}
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
          {/* Variety */}
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
          {/* Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input
              type="text"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="border rounded-lg px-3 py-2 w-full"
              placeholder="e.g. 1967"
            />
          </div>
          {/* Notes */}
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
          {/* Price Paid */}
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
      </main>
    </div>
  );
}
