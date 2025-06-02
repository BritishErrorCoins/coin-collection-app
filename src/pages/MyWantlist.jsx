// src/pages/MyWantlist.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { formatPrice } from "../utils/format";
import "../styles/table.css";

const WANTLIST_KEY = "myWantlist";

function getWantlist() {
  try {
    const raw = localStorage.getItem(WANTLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function MyWantlist() {
  const [wantlist, setWantlist] = useState([]);

  useEffect(() => {
    setWantlist(getWantlist());
  }, []);

  return (
    <div>
      <Header pageTitle="My Wantlist" />
      <div className="content-area">
        <h1 className="page-title">My Wantlist</h1>
        {wantlist.length === 0 ? (
          <div className="empty-message">No coins added yet</div>
        ) : (
          <div className="table-container">
            <table className="main-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Denomination</th>
                  <th>Monarch</th>
                  <th>Type</th>
                  <th>Metal</th>
                  <th>Reason</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {wantlist.map((coin, idx) => (
                  <tr key={idx}>
                    <td>{coin.Year || coin.year}</td>
                    <td>{coin.Denomination || coin.denomination}</td>
                    <td>{coin.Monarch || coin.monarch}</td>
                    <td>{coin["Strike Type"] || coin.type}</td>
                    <td>{coin.Metal || coin.metal}</td>
                    <td>
                      {coin.reason === "Other"
                        ? `Other: ${coin.otherReason || ""}`
                        : coin.reason}
                    </td>
                    <td>{coin.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
