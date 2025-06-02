import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../App.css";

export default function Sold() {
  const [sold, setSold] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sold") || "[]");
    setSold(stored);
  }, []);

  return (
    <div>
      <Header />
      <h2>Sold</h2>
      {sold.length === 0 ? (
        <div className="empty-state">No coins sold yet.</div>
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
            {sold.map(coin => (
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
        </table
