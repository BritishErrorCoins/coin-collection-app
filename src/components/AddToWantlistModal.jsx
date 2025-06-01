
import React, { useState } from "react";

export default function AddToWantlistModal({ coin, onClose, onAdd }) {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [showOtherField, setShowOtherField] = useState(false);

  const handleSubmit = () => {
    const finalReason = showOtherField ? otherReason : reason;
    onAdd({ ...coin, reason: finalReason });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add to My Wantlist</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Reason for Adding:</label>
            <div className="space-y-2">
              {["Missing from my collection", "Upgrade", "Desire duplicates", "Other"].map((r) => (
                <label key={r} className="block">
                  <input
                    type="radio"
                    name="reason"
                    value={r}
                    onChange={(e) => {
                      setReason(e.target.value);
                      setShowOtherField(e.target.value === "Other");
                    }}
                    className="mr-2"
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>
          {showOtherField && (
            <div>
              <label className="block font-medium mb-1">Other (please specify):</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
              />
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-burgundy text-white rounded hover:bg-opacity-90"
            >
              Add to Wantlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
