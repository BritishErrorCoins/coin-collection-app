
// UpdatePrompt Component
import React, { useEffect, useState } from "react";

const CURRENT_DATASET_VERSION = "1.0";

export default function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const localVersion = localStorage.getItem("datasetVersion");
    if (localVersion !== CURRENT_DATASET_VERSION) {
      setShowPrompt(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("datasetVersion", CURRENT_DATASET_VERSION);
    setShowPrompt(false);
    alert("✅ Dataset updated!");
  };

  const handleDecline = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 shadow-lg p-4 rounded z-50 max-w-sm">
      <p className="mb-2 text-sm">
        A new version of the coin dataset is available. Would you like to review and apply the update?
      </p>
      <div className="flex justify-end gap-2">
        <button onClick={handleDecline} className="px-2 py-1 border rounded">Later</button>
        <button onClick={handleAccept} className="px-2 py-1 bg-blue-600 text-white rounded">Update</button>
      </div>
    </div>
  );
}
