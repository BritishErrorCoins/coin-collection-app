
// Sold Page
import React, { useEffect, useState } from "react";
import { formatPrice } from "../utils/format";

export default function Sold() {
  const [soldCoins, setSoldCoins] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("sold")) || [];
    setSoldCoins(data);
  }, []);

  const updateField = (id, key, value) => {
    setSoldCoins(prev => {
      const updated = prev.map(c =>
        c.id === id ? { ...c, [key]: key === "sellPrice" ? parseFloat(value) : value } : c
      );
      localStorage.setItem("sold", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sold Coins</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Purchase Price</th>
            <th>Sell Price</th>
            <th>Profit/Loss</th>
            <th>Date Sold</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {soldCoins.map(coin => (
            <tr key={coin.id}>
              <td>{coin.year}</td>
              <td>{coin.denomination}</td>
              <td>{coin.monarch}</td>
              <td>{formatPrice(coin.purchasePrice)}</td>
              <td>
                <input
                  type="text"
                  value={formatPrice(coin.sellPrice)}
                  onChange={(e) => updateField(coin.id, "sellPrice", e.target.value.replace(/[^0-9.]/g, ""))}
                  className="w-20 border rounded px-1"
                />
              </td>
              <td className={coin.profit >= 0 ? "text-green-600" : "text-red-600"}>
                {formatPrice(coin.profit)}
              </td>
              <td>
                <input
                  type="date"
                  value={coin.dateSold}
                  onChange={(e) => updateField(coin.id, "dateSold", e.target.value)}
                  className="border rounded px-1"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={coin.notes || ""}
                  onChange={(e) => updateField(coin.id, "notes", e.target.value)}
                  className="w-full border rounded px-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
