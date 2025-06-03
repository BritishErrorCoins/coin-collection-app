 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/hooks/useDataset.js b/src/hooks/useDataset.js
index 981a48d44fe19e942f8b25b2241699f05d9be5f9..fff02eea69c77f0592e7fe1ee4f65a7aa1241dfe 100644
--- a/src/hooks/useDataset.js
+++ b/src/hooks/useDataset.js
@@ -1,18 +1,19 @@
 
 import { useEffect } from "react";
+import { DATA_URL } from "../utils/dataUtils";
 
 /**
  * Loads a JSON dataset from GitHub and stores it in localStorage and component state.
  * @param {string} key - The localStorage key to store the dataset under (e.g. "collection").
  * @param {Function} setFn - The React setState function to update the component state.
  */
 export function useDataset(key, setFn) {
   useEffect(() => {
-    fetch("https://raw.githubusercontent.com/BritishErrorCoins/coin-collection-app/main/public/data/GB_PreDecimal_dataset.json")
+    fetch(DATA_URL)
       .then(res => res.json())
       .then(data => {
         localStorage.setItem(key, JSON.stringify(data));
         setFn(data);
       });
   }, [key, setFn]);
 }
 
EOF
)