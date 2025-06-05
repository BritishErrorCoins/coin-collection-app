import React, { useState, useEffect, useMemo } from "react";

export default function Sold() {
  const [sold, setSold] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("sold") || "[]");
    setSold(data);
  }, []);

  // Date filtered
  const filtered = useMemo(() => {
    if (!dateRange.start && !dateRange.end) return sold;
    const toDate = (d) =>
      d ? new Date(d.split("/").reverse().join("-")) : null;
    const start = toDate(dateRange.start);
    const end = toDate(dateRange.end);
    return sold.filter((row) => {
      const soldDate = toDate(row.soldDate);
      if (start && soldDate < start) return false;
      if (end && soldDate > end) return false;
      return true;
    });
  }, [sold, dateRange]);

  // Totals
  const totals = useMemo(() => {
    let purchase = 0, soldValue = 0;
    filtered.forEach((row) => {
      purchase += parseFloat(row.pricePaid) || 0;
      soldValue += parseFloat(row.soldPrice) || 0;
    });
    return {
      purchase,
      soldValue,
      profit: soldValue - purchase,
    };
  }, [filtered]);

  // Export
  const handleExport = (type) => {
    const fields = [
      "year",
      "denomination",
      "monarch",
      "metal",
      "strikeType",
      "variety",
      "notes",
      "pricePaid",
      "soldPrice",
      "soldNotes",
      "soldDate",
      "id",
    ];
    const rows = [fields.join(",")].concat(
      filtered.map((c) =>
        fields.map((f) => `"${(c[f] || "").toString().replace(/"/g, '""')}"`).join(",")
      )
    );
    const blob = new Blob([rows.join("\r\n")], {
      type:
        type === "csv"
          ? "text/csv"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sold.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <form
          className="flex items-center gap-2 flex-wrap"
          onSubmit={e => e.preventDefault()}
        >
          <span className="font-medium">What period would you like to search?</span>
          <label>
            <span className="ml-2 mr-1">Start Date</span>
            <input
              type="date"
              className="border rounded px-2 py-1"
              value={dateRange.start}
              onChange={e => setDateRange((r) => ({ ...r, start: e.target.value }))}
            />
          </label>
          <label>
            <span className="ml-2 mr-1">End Date</span>
            <input
              type="date"
              className="border rounded px-2 py-1"
              value={dateRange.end}
              onChange={e => setDateRange((r) => ({ ...r, end: e.target.value }))}
            />
          </label>
          <button
            type="button"
            className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg font-semibold"
            onClick={() => setDateRange({ start: "", end: "" })}
          >
            Clear
          </button>
        </form>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <div className="flex flex-col text-sm text-right">
            <span>Total Purchase Price: <b>£{totals.purchase.toFixed(2)}</b></span>
            <span>Total Sold Value: <b>£{totals.soldValue.toFixed(2)}</b></span>
            <span>
              Profit/Loss:{" "}
              <b
                className={`px-2 rounded ${
                  totals.profit > 0
                    ? "bg-green-100 text-green-700"
                    : totals.profit < 0
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                £{totals.profit.toFixed(2)}
              </b>
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            className="px-3 py-1 bg-green-600 text-white rounded-lg font-semibold"
            onClick={() => handleExport("csv")}
          >
            Export CSV
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded-lg font-semibold"
            onClick={() => handleExport("xlsx")}
          >
            Export XLSX
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-2xl overflow-hidden border dark:border-gray-700 text-sm">
          <thead>
            <tr className="bg-burgundy text-white">
              <th>Year</th>
              <th>Denomination</th>
              <th>Monarch</th>
              <th>Metal</th>
              <th>Strike Type</th>
              <th>Variety</th>
              <th>Notes</th>
              <th>Price Paid</th>
              <th>Sold Price</th>
              <th>Sold Notes</th>
              <th>Sold Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="text-center py-8 text-gray-500 dark:text-gray-300">
                  No sold coins in this period.
                </td>
              </tr>
            ) : (
              filtered.map((row, idx) => (
                <tr key={row.id || idx} className={idx % 2 === 0 ? "bg-[#f9f6f3] dark:bg-[#2e2231]" : "bg-[#f3e2e6] dark:bg-[#231821]"}>
                  <td>{row.year}</td>
                  <td>{row.denomination}</td>
                  <td>{row.monarch}</td>
                  <td>{row.metal}</td>
                  <td>{row.strikeType}</td>
                  <td>{row.variety}</td>
                  <td>{row.notes}</td>
                  <td>£{parseFloat(row.pricePaid || 0).toFixed(2)}</td>
                  <td>£{parseFloat(row.soldPrice || 0).toFixed(2)}</td>
                  <td>{row.soldNotes}</td>
                  <td>{row.soldDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
