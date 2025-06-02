import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";


export default function MyCollection() {
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("collection") || "[]");
    setCollection(stored);
  }, []);

  return (
    <div>
      <Header />
      <h2>My Collection</h2>
      {collection.length === 0 ? (
        <div className="empty-state">No coins added yet.</div>
      ) : (
        <table className="coin-table">
          <thead>
            <tr>
              <th>Denomination</th>
              <th>Monarch</th>
              <th>Metal</th>
              <th>Strike Type</th>
              <th>Variety</th>
              <th>Year</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {collection.map(coin => (
              <tr key={coin.id}>
                <td>{coin.denomination}</td>
                <td>{coin.monarch}</td>
                <td>{coin.metal}</td>
                <td>{coin.strikeType}</td>
                <td>{coin.variety}</td>
                <td>{coin.year}</td>
                <td>{coin.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
