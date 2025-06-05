import { useEffect, useState } from "react";
import { DATA_URL } from "../utils/dataUtils";

// DATA_URL must return a JSON object with at least a "lastUpdated" or "date" property.

export function useDatasetUpdateCheck(localKey = "masterDataset") {
  const [showPrompt, setShowPrompt] = useState(false);
  const [updateDate, setUpdateDate] = useState("");
  const [remoteDate, setRemoteDate] = useState("");

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(DATA_URL);
        const remote = await res.json();
        const remoteLastUpdated = remote.lastUpdated || remote.date;
        setRemoteDate(remoteLastUpdated);
        // Get local
        const localRaw = localStorage.getItem(localKey);
        if (!localRaw) {
          setShowPrompt(true);
          setUpdateDate(remoteLastUpdated);
          return;
        }
        const local = JSON.parse(localRaw);
        const localLastUpdated = local.lastUpdated || local.date;
        setUpdateDate(localLastUpdated);

        if (localLastUpdated !== remoteLastUpdated) {
          setShowPrompt(true);
        }
      } catch (err) {
        // Ignore errors, don't show modal
      }
    }
    check();
  }, [localKey]);

  // Returns [showPrompt, acceptCallback, rejectCallback, remoteDate]
  return [showPrompt, setShowPrompt, remoteDate];
}
