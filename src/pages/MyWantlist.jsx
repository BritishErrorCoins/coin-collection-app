import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { getCollection, saveCollection } from "../utils/storage";
import { formatPrice } from "../utils/format";
import "../styles/table.css";

export default function MyWantlist() {
  const [wantlist, setWantlist] = useState([]);

  useEffect(() => {
    const data = getCollection("wantlist");
    setWantlist(data);
  }, []);

  return (
    <>
      <Header />
      <div className="page-container">
        <h1 className="page-title">My Wantlist</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Denomination</th>
                <th>Year</th>
                <th>Monarch</th>
                <th>Metal</th>
                <th>Strike Type</th>
                <th>Variety</th>
                <th>Reason</th>
                <th>Other Notes</th>
              </tr>
            </thead>
            <tbody>
              {wantlist.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.Denomination}</td>
                  <td>{item.Year}</td>
                  <td>{item.Monarch}</td>
                  <td>{item.Metal}</td>
                  <td>{item["Strike Type"]}</td>
                  <td>{item.Variety}</td>
                  <td>{item.Reason}</td>
                  <td>{item.Notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}