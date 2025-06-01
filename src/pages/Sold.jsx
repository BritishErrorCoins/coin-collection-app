
import React, { useEffect, useState } from "react";
import { formatPrice } from "../utils/format";
import Header from "../components/Header";

export default function Sold() {
  const [sold, setSold] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sold")) || [];
    setSold(stored);
  }, []);

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4 text-[#800020]">Sold Coins</h1>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f8e6e6] text-[#800020]">
              <th>Year</th>
              <th>Denomination</th>
              <th>Monarch</th>
              <th>Type</th>
              <th>Metal</th>
              <th>Mintage</th>
              <th>Purchase Price</th>
              <th>Sell Price</th>
              <th>Date Sold</th>
              <th>Profit</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {sold.map((coin, index) => (
              <tr key={index}>
                <td>{coin.Year}</td>
                <td>{coin.Denomination}</td>
                <td>{coin.Monarch}</td>
                <td>{coin["Strike Type"]}</td>
                <td>{coin.Metal}</td>
                <td>{coin.Mintage?.toLocaleString()}</td>
                <td>{formatPrice(coin.purchasePrice)}</td>
                <td>{formatPrice(coin.sellPrice)}</td>
                <td>{coin.dateSold}</td>
                <td className={coin.profit >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatPrice(coin.profit)}
                </td>
                <td>{coin.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
