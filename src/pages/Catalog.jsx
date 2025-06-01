import React, { useState } from "react";
import { useDataset } from "../hooks/useDataset";
import Header from "../components/Header";
import { addToCollection, addToWantlist } from "../utils/dataUtils";

export default function Catalog() {
  const [catalog, setCatalog] = useState([]);
  const [selected, setSelected] = useState(null);
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  useDataset("missing", setCatalog);

  const handleAddClick = (coin) => setSelected(coin);

  const handleConfirm = () => {
    const finalNotes =
      reason === "Other" && otherReason ? `${reason}: ${otherReason}` : reason;

    addToCollection({
      ...selected,
      Price: price,
      Notes: notes,
    });

    if (reason) {
      addToWantlist({
        ...selected,
        Reason: finalNotes || "Unspecified",
      });
    }

    setSelected(null);
    setPrice("");
    setNotes("");
    setReason("");
    setOtherReason("");
  };

  const reasons = [
    "Missing from my collection",
    "Upgrade",
    "Desire duplicates",
    "Other",
  ];

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Catalog</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th>Denomination</th>
              <th>Year</th>
              <th>Monarch</th>
              <th>Metal</th>
              <th>Type</th>
              <th>Variety</th>
              <th>Strike Type</th>
              <th>Mintage</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {catalog.map((coin, i) => (
              <tr key={i} className="border-t">
                <td>{coin.Denomination}</td>
                <td>{coin.Year}</td>
                <td>{coin.Monarch}</td>
                <td>{coin.Metal}</td>
                <td>{coin.Type}</td>
                <td>{coin.Variety}</td>
                <td>{coin["Strike Type"]}</td>
                <td>{coin.Mintage}</td>
                <td>
                  <button
                    onClick={() => handleAddClick(coin)}
                    className="px-3 py-1 text-sm bg-burgundy text-white rounded"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selected && (
          <div className="mt-6 border p-4 bg-white shadow-lg rounded-md">
            <h2 className="text-lg font-semibold mb-2">Add Coin</h2>
            <label className="block mb-2">
              Purchase Price (£):
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block border px-2 py-1 w-full"
              />
            </label>
            <label className="block mb-2">
              Notes:
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="block border px-2 py-1 w-full"
              />
            </label>
            <div className="mb-2">
              <p className="font-medium">Add to Wantlist (optional):</p>
              {reasons.map((r) => (
                <label key={r} className="block">
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    checked={reason === r}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  {" "}{r}
                  {r === "Other" && reason === "Other" && (
                    <input
                      placeholder="Specify"
                      className="ml-2 border px-2 py-1"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>
            <button
              onClick={handleConfirm}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </>
  );
}
