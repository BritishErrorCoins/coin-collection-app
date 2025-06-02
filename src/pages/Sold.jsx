import React from "react";
import Header from "../components/Header";
import { getSold } from "../utils/storage";
import { formatPrice } from "../utils/format";
import "../App.css";

export default function Sold() {
  const [sold, setSold] = React.useState([]);

  React.useEffect(() => {
    setSold(getSold());
  }, []);

  return (
    <div className="page-content">
      <Header title="Sold Coins" />
      <h2 className="section-title">Sold Coins</h2>
      {sold.length === 0 ? (
        <div className="empty-state">No coins sold yet.</div>
      ) : (
        <table className="main-table">
          <thead>
            <tr>
              <th>Denomination</th>
              <th>Monarch</th>
              <th>Year</th>
              <th>Purchase Price</th>
              <th>Sell Price</th>
              <th>Date Sold</th>
              <th>Profit/Loss</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {sold.map((coin, i) => (
              <tr key={i}>
                <td>{coin.Denomination}</td>
                <td>{coin.Monarch}</td>
                <td>{coin.Year}</td>
                <td>{formatPrice(coin.purchasePrice)}</td>
                <td>{formatPrice(coin.sellPrice)}</td>
                <td>{coin.dateSold}</td>
                <td style={{ color: coin.profitLoss >= 0 ? "green" : "red" }}>
                  {formatPrice(coin.profitLoss)}
                </td>
                <td>{coin.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
