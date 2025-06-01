
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function AddCoins() {
  const [dataset, setDataset] = useState([]);
  const [form, setForm] = useState({
    Denomination: "",
    Monarch: "",
    Metal: "",
    "Strike Type": "",
    Variety: "",
    Year: "",
    Notes: "",
  });

  // Fetch dataset JSON
  useEffect(() => {
    fetch("/GB_PreDecimal_dataset.json")
      .then((res) => res.json())
      .then((json) => setDataset(json));
  }, []);

  const getUnique = (field) => [
    ...new Set(dataset.map((c) => c[field]).filter(Boolean)),
  ];

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("collection") || "[]");
    localStorage.setItem("collection", JSON.stringify([...stored, form]));
    alert("Coin added to your collection!");
    setForm({
      Denomination: "",
      Monarch: "",
      Metal: "",
      "Strike Type": "",
      Variety: "",
      Year: "",
      Notes: "",
    });
  };

  const filteredMonarchs = getUnique("Monarch").filter(
    (m) => !form.Denomination || dataset.some((c) => c.Denomination === form.Denomination && c.Monarch === m)
  );

  const filteredMetals = getUnique("Metal").filter(
    (m) => !form.Monarch || dataset.some((c) => c.Monarch === form.Monarch && c.Metal === m)
  );

  const filteredStrikeTypes = getUnique("Strike Type").filter(
    (s) => !form.Metal || dataset.some((c) => c.Metal === form.Metal && c["Strike Type"] === s)
  );

  const filteredVarieties = getUnique("Variety").filter(
    (v) => !form["Strike Type"] || dataset.some((c) => c["Strike Type"] === form["Strike Type"] && c.Variety === v)
  );

  return (
    <>
      <Header />
      <div className="p-4 max-w-xl mx-auto text-white">
        <h1 className="text-2xl mb-4 font-semibold">Add a Coin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select value={form.Denomination} onChange={(e) => handleChange("Denomination", e.target.value)}>
            <option value="">Select Denomination</option>
            {getUnique("Denomination").map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select value={form.Monarch} onChange={(e) => handleChange("Monarch", e.target.value)}>
            <option value="">Select Monarch</option>
            {filteredMonarchs.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <select value={form.Metal} onChange={(e) => handleChange("Metal", e.target.value)}>
            <option value="">Select Metal</option>
            {filteredMetals.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <select value={form["Strike Type"]} onChange={(e) => handleChange("Strike Type", e.target.value)}>
            <option value="">Select Strike Type</option>
            {filteredStrikeTypes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select value={form.Variety} onChange={(e) => handleChange("Variety", e.target.value)}>
            <option value="">Select Variety</option>
            {filteredVarieties.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter Year"
            value={form.Year}
            onChange={(e) => handleChange("Year", e.target.value)}
            className="w-full p-2 text-black"
          />

          <textarea
            placeholder="Notes"
            value={form.Notes}
            onChange={(e) => handleChange("Notes", e.target.value)}
            className="w-full p-2 text-black"
          />

          <button type="submit" className="bg-white text-black px-4 py-2 rounded">
            Add Coin
          </button>
        </form>
      </div>
    </>
  );
}
