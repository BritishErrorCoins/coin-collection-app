import { useState } from "react";
import Header from "../components/Header";
import { getUniqueFromDataset } from "../utils/dataUtils";
import dataset from "../../public/GB_PreDecimal_dataset.json";

export default function AddCoins() {
  const [form, setForm] = useState({
    denomination: "",
    monarch: "",
    metal: "",
    strikeType: "",
    variety: "",
    year: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCoin = {
      ...form,
      id: Date.now()
    };
    const existing = JSON.parse(localStorage.getItem("collection") || "[]");
    localStorage.setItem("collection", JSON.stringify([...existing, newCoin]));
    alert("✅ Coin added to your collection.");
    setForm({
      denomination: "",
      monarch: "",
      metal: "",
      strikeType: "",
      variety: "",
      year: "",
      notes: ""
    });
  };

  const filteredByDenomination = dataset.filter(
    (coin) => form.denomination === "" || coin.Denomination === form.denomination
  );

  const filteredByMonarch = filteredByDenomination.filter(
    (coin) => form.monarch === "" || coin.Monarch === form.monarch
  );

  const filteredByMetal = filteredByMonarch.filter(
    (coin) => form.metal === "" || coin.Metal === form.metal
  );

  const filteredByStrike = filteredByMetal.filter(
    (coin) => form.strikeType === "" || coin["Strike Type"] === form.strikeType
  );

  return (
    <>
      <Header />
      <main className="p-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-burgundy">Add Coin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="denomination" value={form.denomination} onChange={handleChange} required className="w-full p-2 border">
            <option value="">Select Denomination</option>
            {getUniqueFromDataset(dataset, "Denomination").map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select name="monarch" value={form.monarch} onChange={handleChange} required className="w-full p-2 border">
            <option value="">Select Monarch</option>
            {getUniqueFromDataset(filteredByDenomination, "Monarch").map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select name="metal" value={form.metal} onChange={handleChange} required className="w-full p-2 border">
            <option value="">Select Metal</option>
            {getUniqueFromDataset(filteredByMonarch, "Metal").map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select name="strikeType" value={form.strikeType} onChange={handleChange} required className="w-full p-2 border">
            <option value="">Select Strike Type</option>
            {getUniqueFromDataset(filteredByMetal, "Strike Type").map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select name="variety" value={form.variety} onChange={handleChange} className="w-full p-2 border">
            <option value="">Select Variety</option>
            {getUniqueFromDataset(filteredByStrike, "Variety").map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Enter Year"
            className="w-full p-2 border"
            required
          />

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes (optional)"
            className="w-full p-2 border"
          />

          <button type="submit" className="bg-burgundy text-white px-4 py-2 rounded">
            Add to My Collection
          </button>
        </form>
      </main>
    </>
  );
}
