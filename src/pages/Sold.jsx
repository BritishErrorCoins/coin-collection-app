
import React, { useState, useEffect } from "react";
import { formatPrice } from "../utils/format";

export default function Sold() {
  const [sold, setSold] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("sold")) || [];
    setSold(saved);
  }, []);

  const updateField = (id, field, value) => {
    setSold(prev =>
      prev.map(c =>
        c.id === id ? { ...c, [field]: field.includes("Price") ? parseFloat(value) || 0 : value } : c
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("sold", JSON.stringify(sold));
  }, [sold]);

  const sorted = [...sold].sort((a, b) => b.dateSold.localeCompare(a.dateSold));

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sold Coins</h1>
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
            <th>Sell Price</th>
            <th>Date Sold</th>
            <th>Profit/Loss</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((coin, index) => (
            <tr key={index}>
              <td>{coin.Year || coin.year}</td>
              <td>{coin.Denomination || coin.denomination}</td>
              <td>{coin.Monarch || coin.monarch}</td>
              <td>{coin["Strike Type"] || coin.type}</td>
              <td>{coin.Metal || coin.metal}</td>
              <td>{coin.Mintage?.toLocaleString?.() ?? "-"}</td>
              <td>
                <input
                  type="text"
                  value={formatPrice(coin.purchasePrice)}
                  onChange={(e) => updateField(coin.id, "purchasePrice", e.target.value.replace(/[^0-9.]/g, ""))}
                  className="w-20 border rounded px-1"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={formatPrice(coin.sellPrice)}
                  onChange={(e) => updateField(coin.id, "sellPrice", e.target.value.replace(/[^0-9.]/g, ""))}
                  className="w-20 border rounded px-1"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={coin.dateSold}
                  onChange={(e) => updateField(coin.id, "dateSold", e.target.value)}
                  className="border rounded px-1"
                />
              </td>
              <td className={coin.profit >= 0 ? "text-green-600" : "text-red-600"}>
                {formatPrice(coin.sellPrice - coin.purchasePrice)}
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
