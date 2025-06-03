 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/utils/dataUtils.js b/src/utils/dataUtils.js
index 261bc3e6cc295cdf915eeedebbc95d42125ae3c0..7b2b23a17954af4ae9d5a71bc6c80ad8b989746e 100644
--- a/src/utils/dataUtils.js
+++ b/src/utils/dataUtils.js
@@ -1,35 +1,26 @@
- (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
-diff --git a/src/utils/dataUtils.js b/src/utils/dataUtils.js
-index befd506c5fd8c793e3fef1ca594529cd2979332c..4797af2b622c7775dfc256d6967d632d94718a79 100644
---- a/src/utils/dataUtils.js
-+++ b/src/utils/dataUtils.js
-@@ -1,14 +1,25 @@
- export function getUniqueValues(data, key) {
-   return [...new Set(data.map((item) => item[key]).filter(Boolean))].sort();
- }
- export function addToCollection(newCoin) {
-+  const coin = {
-+    id: Date.now(),
-+    denomination: newCoin.Denomination || newCoin.denomination,
-+    monarch: newCoin.Monarch || newCoin.monarch,
-+    metal: newCoin.Metal || newCoin.metal,
-+    strikeType: newCoin["Strike Type"] || newCoin.strikeType,
-+    variety: newCoin.Variety || newCoin.variety,
-+    year: newCoin.Year || newCoin.year,
-+    pricePaid: newCoin.purchasePrice || newCoin.pricePaid || "",
-+    notes: newCoin.notes || "",
-+  };
-   const current = JSON.parse(localStorage.getItem("collection") || "[]");
--  current.push(newCoin);
-+  current.push(coin);
-   localStorage.setItem("collection", JSON.stringify(current));
- }
- 
- export function addToWantlist(newItem) {
-   const current = JSON.parse(localStorage.getItem("wantlist") || "[]");
-   current.push(newItem);
-   localStorage.setItem("wantlist", JSON.stringify(current));
- }
- 
-EOF
-)
+export function getUniqueValues(data, key) {
+  return [...new Set(data.map((item) => item[key]).filter(Boolean))].sort();
+}
+
+export function addToCollection(newCoin) {
+  const coin = {
+    id: Date.now(),
+    denomination: newCoin.Denomination || newCoin.denomination,
+    monarch: newCoin.Monarch || newCoin.monarch,
+    metal: newCoin.Metal || newCoin.metal,
+    strikeType: newCoin["Strike Type"] || newCoin.strikeType,
+    variety: newCoin.Variety || newCoin.variety,
+    year: newCoin.Year || newCoin.year,
+    pricePaid: newCoin.purchasePrice || newCoin.pricePaid || "",
+    notes: newCoin.notes || "",
+  };
+  const current = JSON.parse(localStorage.getItem("collection") || "[]");
+  current.push(coin);
+  localStorage.setItem("collection", JSON.stringify(current));
+}
+
+export function addToWantlist(newItem) {
+  const current = JSON.parse(localStorage.getItem("wantlist") || "[]");
+  current.push(newItem);
+  localStorage.setItem("wantlist", JSON.stringify(current));
+}
 
EOF
)