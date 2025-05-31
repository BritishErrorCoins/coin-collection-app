
// Missing Page
import React, { useEffect, useState } from "react";

const fullDataset = [
  { id: 1, year: 1999, denomination: "£1", monarch: "Elizabeth II", type: "Business Strike", metal: "Nickel-brass", mintage: 10000000 },
  { id: 2, year: 2000, denomination: "£1", monarch: "Elizabeth II", type: "Proof", metal: "Silver", mintage: 7500 },
  { id: 3, year: 2001, denomination: "£2", monarch: "Elizabeth II", type: "Business Strike", metal: "Bimetallic", mintage: 11000000 }
];

export default function Missing() {
  const [missingCoins, setMissingCoins] = useState([]);

  useEffect(() => {
    const owned = JSON.parse(localStorage.getItem("collection")) || [];
    const ownedIds = owned.map(c => c.id);
    const missing = fullDataset.filter(coin => !ownedIds.includes(coin.id));
    setMissingCoins(missing);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Missing Coins</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Year</th>
            <th>Denomination</th>
            <th>Monarch</th>
            <th>Type</th>
            <th>Metal</th>
            <th>Mintage</th>
          </tr>
        </thead>
        <tbody>
          {missingCoins.map(coin => (
            <tr key={coin.id}>
              <td>{coin.year}</td>
              <td>{coin.denomination}</td>
              <td>{coin.monarch}</td>
              <td>{coin.type}</td>
              <td>{coin.metal}</td>
              <td>{coin.mintage.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
