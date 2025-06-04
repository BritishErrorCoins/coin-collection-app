import { useEffect } from "react";
import { DATA_URL } from "../utils/dataUtils";

/**
 * Loads a JSON dataset from GitHub and stores it in localStorage and component state.
 * @param {string} key - The localStorage key to store the dataset under (e.g. "collection").
 * @param {Function} setFn - The React setState function to update the component state.
 */
export function useDataset(key, setFn) {
  useEffect(() => {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem(key, JSON.stringify(data));
        setFn(data);
      });
  }, [key, setFn]);
}
