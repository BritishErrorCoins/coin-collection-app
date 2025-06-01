
import { useEffect } from "react";

/**
 * Loads a JSON dataset from GitHub and stores it in localStorage and component state.
 * @param {string} key - The localStorage key to store the dataset under (e.g. "collection").
 * @param {Function} setFn - The React setState function to update the component state.
 */
export function useDataset(key, setFn) {
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/BritishErrorCoins/coin-collection-app/main/public/data/GB_PreDecimal_dataset.json")
      .then(res => res.json())
      .then(data => {
        localStorage.setItem(key, JSON.stringify(data));
        setFn(data);
      });
  }, [key, setFn]);
}
