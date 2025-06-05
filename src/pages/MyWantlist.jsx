import React, { useState, useEffect } from "react";
const REASONS = ["Don’t have", "Upgrade", "Duplicate"];

export default function MyWantlist() {
  const [wantlist, setWantlist] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem("wantlist") || "[]");
    setWantlist(wl);
  }, []);

  const handleEdit = (idx, row) => {
    setEditIdx(idx);
    setEditFields({
      reason: row.reason,
      budgetedPrice: row.budgetedPrice,
      notes: row.notes,
    });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFields((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = (row) => {
    const updated = wantlist.map((c, idx) =>
      idx === editIdx ? { ...c, ...editFields } : c
    );
    setWantlist(updated);
    localStorage.setItem("wantlist", JSON.stringify(updated));
    setEditIdx(null);
    setEditFields({});
  };

  // Export as docx
  const exportDocx = () => {
    setExporting(true);
    let html = `
      <html><head><meta charset="utf-8"></head><body>
      <h2>My Wantlist</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Year</th>
          <th>Denomination</th>
          <th>Monarch</th>
          <th>Metal</th>
          <th>Strike Type</th>
          <th>Variety</th>
          <th>Reason</th>
          <th>Budgeted Price</th>
          <th>Notes</th>
        </tr>
        ${wantlist
          .map(
            (c) => `<tr>
            <td>${c.year}</td>
            <td>${c.denomination}</td>
            <td>${c.monarch}</td>
            <td>${c.metal}</td>
            <td>${c.strikeType}</td>
            <td>${c.variety}</td>
            <td>${c.reason}</td>
            <td>£${parseFloat(c.budgetedPrice || 0).toFixed(2)}</td>
            <td>${c.notes}</td>
          </tr>`
          )
          .join("")}
      </table>
      </body></html>
    `;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MyWantlist.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setExporting(false), 1200);
  };

  // Export as xlsx (CSV-format for Excel)
  const exportXlsx = () => {
    setExporting(true);
    const fields = [
      "year",
      "denomination",
      "monarch",
      "metal",
      "strikeType",
      "variety",
      "reason",
      "budgetedPrice",
      "notes",
      "id",
    ];
    const rows = [fields.join(",")].concat(
      wantlist.map((c) =>
        fields
          .map((f) => `"${(c[f] || "").toString().replace(/"/g, '""')}"`)
          .join(",")
      )
    );
    const blob = new Blob([rows.join("\r\n")], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "MyWantlist.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setTimeout(() => setExporting(false), 1200);
  };

  if (!wantlist.length)
    return (
      <div className="max-w-xl mx-auto text-center text-lg mt-20 text-gray-500 dark:text-gray-300">
        Nothing has been added yet. You can add coins on the Browse Coins to Add coins page.
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-8 mb-12">
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          className="px-3 py-1 bg-blue-700 text-white rounded-2xl font-semibold"
          disabled={exporting}
          onClick={exportDocx}
        >
          Export as a Doc
        </button>
        <button
          className="px-3 py-1 bg-green-700 text-white rounded-2xl font-semibold"
          disabled={exporting}
          onClick={exportXlsx}
        >
          Export as a Spreadsheet
        </button>
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
              <th>Reason</th>
              <th>Budgeted Price</th>
              <th>Notes</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {wantlist.map((row, idx) =>
              editIdx === idx ? (
                <tr
                  key={row.id || idx}
                  className={idx % 2 === 0 ? "bg-[#f9f6f3] dark:bg-[#2e2231]" : "bg-[#f3e2e6] dark:bg-[#231821]"}
                >
                  <td>{row.year}</td>
                  <td>{row.denomination}</td>
                  <td>{row.monarch}</td>
                  <td>{row.metal}</td>
                  <td>{row.strikeType}</td>
                  <td>{row.variety}</td>
                  <td>
                    <select
                      name="reason"
                      value={editFields.reason}
                      onChange={handleEditChange}
                      className="border rounded px-1 w-full"
                    >
                      {REASONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="budgetedPrice"
                      value={editFields.budgetedPrice}
                      onChange={handleEditChange}
                      className="border rounded px-1 w-full"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="notes"
                      value={editFields.notes}
                      onChange={handleEditChange}
                      className="border rounded px-1 w-full"
                    />
                  </td>
                  <td>
                    <button
                      className="px-2 py-1 bg-green-600 text-white rounded font-semibold"
                      onClick={() => handleUpdate(row)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={row.id || idx}
                  className={idx % 2 === 0 ? "bg-[#f9f6f3] dark:bg-[#2e2231]" : "bg-[#f3e2e6] dark:bg-[#231821]"}
                >
                  <td>{row.year}</td>
                  <td>{row.denomination}</td>
                  <td>{row.monarch}</td>
                  <td>{row.metal}</td>
                  <td>{row.strikeType}</td>
                  <td>{row.variety}</td>
                  <td>{row.reason}</td>
                  <td>£{parseFloat(row.budgetedPrice || 0).toFixed(2)}</td>
                  <td>{row.notes}</td>
                  <td>
                    <button
                      className="px-2 py-1 bg-yellow-700 text-white rounded font-semibold"
                      onClick={() => handleEdit(idx, row)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
