import React from "react";

export default function ReasonRadio({ selected, onChange, otherText, setOtherText }) {
  const reasons = [
    "Missing from my collection",
    "Upgrade",
    "Desire duplicates",
    "Other"
  ];

  return (
    <div className="space-y-2">
      {reasons.map((reason) => (
        <div key={reason}>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value={reason}
              checked={selected === reason}
              onChange={(e) => onChange(e.target.value)}
            />
            <span>{reason}</span>
          </label>
          {reason === "Other" && selected === "Other" && (
            <input
              type="text"
              placeholder="Specify other reason"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              className="border px-2 py-1 mt-1 w-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}