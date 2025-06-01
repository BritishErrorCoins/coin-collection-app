import React, { useState } from "react";

export default function CatalogRowPrompt({ row, onAdd }) {
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onAdd({ ...row, PurchasePrice: price, Notes: notes });
  };

  return (
    <div className="p-4 border bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Add to My Collection</h3>
      <label className="block mb-1">Purchase Price (£)</label>
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border px-2 py-1 mb-2"
      />
      <label className="block mb-1">Notes</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full border px-2 py-1 mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-burgundy text-white px-4 py-2 rounded hover:bg-opacity-80"
      >
        Add
      </button>
    </div>
  );
}