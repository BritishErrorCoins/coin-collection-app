 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/AddCoins.jsx b/src/pages/AddCoins.jsx
index 8842033d0edf865029441cc0d070a07070595b2b..ee4aa0f01a12e7356be130e489894cf1637fe1e1 100644
--- a/src/pages/AddCoins.jsx
+++ b/src/pages/AddCoins.jsx
@@ -1,30 +1,29 @@
 import React, { useState, useEffect } from "react";
 import Header from "../components/Header";
 import "../App.css";
-
-const DATA_URL = "/data/GB_PreDecimal_dataset.json";
+import { DATA_URL } from "../utils/dataUtils";
 
 export default function AddCoins() {
   const [data, setData] = useState([]);
   const [form, setForm] = useState({
     year: "",
     denomination: "",
     monarch: "",
     type: "",
     metal: "",
     variety: "",
     notes: "",
   });
 
   useEffect(() => {
     fetch(DATA_URL)
       .then(res => res.json())
       .then(setData)
       .catch(() => setData([]));
   }, []);
 
   const denominations = [...new Set(data.map(c => c.Denomination))];
   const monarchs = form.denomination
     ? [...new Set(data.filter(c => c.Denomination === form.denomination).map(c => c.Monarch))]
     : [];
   const metals = form.denomination && form.monarch
 
EOF
)