 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/utils/storage.js b/src/utils/storage.js
index a179c678846382f853ebb71483f852bf2f53c45b..69ef1231f0fbe4416992645bff9ebb53f77ad4e9 100644
--- a/src/utils/storage.js
+++ b/src/utils/storage.js
@@ -2,26 +2,31 @@
 
 export function getCollection() {
   return JSON.parse(localStorage.getItem("collection") || "[]");
 }
 
 export function saveCollection(data) {
   localStorage.setItem("collection", JSON.stringify(data));
 }
 
 export function getWantlist() {
   return JSON.parse(localStorage.getItem("wantlist") || "[]");
 }
 
 export function saveWantlist(data) {
   localStorage.setItem("wantlist", JSON.stringify(data));
 }
 const SOLD_KEY = "mySold";
 
 export function getSold() {
   try {
     const raw = localStorage.getItem(SOLD_KEY);
     return raw ? JSON.parse(raw) : [];
   } catch {
     return [];
   }
-}
+}
+
+export function saveSold(data) {
+  localStorage.setItem(SOLD_KEY, JSON.stringify(data));
+}
+
 
EOF
)