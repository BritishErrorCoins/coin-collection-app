 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/hooks/useDataset.js b/src/hooks/useDataset.js
index 981a48d44fe19e942f8b25b2241699f05d9be5f9..e76c9086155b3b1ea2734bc9007d3cef62c18782 100644
--- a/src/hooks/useDataset.js
+++ b/src/hooks/useDataset.js
@@ -1,18 +1,25 @@
 
 import { useEffect } from "react";
 
 /**
- * Loads a JSON dataset from GitHub and stores it in localStorage and component state.
+ * Loads the local dataset file and optionally stores it in localStorage.
  * @param {string} key - The localStorage key to store the dataset under (e.g. "collection").
  * @param {Function} setFn - The React setState function to update the component state.
  */
 export function useDataset(key, setFn) {
   useEffect(() => {
-    fetch("https://raw.githubusercontent.com/BritishErrorCoins/coin-collection-app/main/public/data/GB_PreDecimal_dataset.json")
+    fetch("/data/GB_PreDecimal_dataset.json")
       .then(res => res.json())
       .then(data => {
-        localStorage.setItem(key, JSON.stringify(data));
-        setFn(data);
+        if (key) {
+          localStorage.setItem(key, JSON.stringify(data));
+        }
+        if (setFn) {
+          setFn(data);
+        }
+      })
+      .catch(() => {
+        if (setFn) setFn([]);
       });
   }, [key, setFn]);
 }
 
EOF
)