
// Collection Page
import React, { useState } from "react";
import { formatPrice } from "../utils/format";

const initialCollection = [
  {
    id: 1,
    year: 1999,
    denomination: "£1",
    monarch: "Elizabeth II",
    type: "Business Strike",
    metal: "Nickel-brass",
    mintage: 10000000,
    purchasePrice: 2.5,
    notes: ""
  }
];

export default function Collection() {
  const [collection, setCollection] = useState(initialCollection);

  const handleSell = (id) => {
    const coin = collection.find(c => c.id === id);
    const sellPrice = prompt("Enter sell price (£):", "");
    if (sellPrice && !isNaN(sellPrice)) {
      const soldCoin = {
        ...coin,
        sellPrice: parseFloat(sellPrice),
        dateSold: new Date().toISOString().split("T")[0],
        profit: parseFloat(sellPrice) - coin.purchasePrice
      };
      localStorage.setItem("sold", JSON.stringify([...(JSON.parse(localStorage.getItem("sold")) || []), soldCoin]));
      setCollection(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateNote = (id, value) => {
    setCollection(prev => prev.map(c => c.id === id ? { ...c, notes: value } : c));
  };

  const updatePrice = (id, value) => {
    const parsed = parseFloat(value);
    if (!isNaN(parsed)) {
      setCollection(prev => prev.map(c => c.id === id ? { ...c, purchasePrice: parsed } : c));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Collection</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Type</th>
            <th>Metal</th>
            <th>Mintage</th>
            <th>Purchase Price</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collection.map(coin => (
            <tr key={coin.id}>
              <td>{coin.year}</td>
              <td>{coin.denomination}</td>
              <td>{coin.monarch}</td>
              <td>{coin.type}</td>
              <td>{coin.metal}</td>
              <td>{coin.mintage.toLocaleString()}</td>
              <td>
                <input
                  type="text"
                  value={formatPrice(coin.purchasePrice)}
                  onChange={(e) => updatePrice(coin.id, e.target.value.replace(/[^0-9.]/g, ""))}
                  className="w-20 border rounded px-1"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={coin.notes}
                  onChange={(e) => updateNote(coin.id, e.target.value)}
                  className="w-full border rounded px-1"
                />
              </td>
              <td>
                <button onClick={() => handleSell(coin.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
