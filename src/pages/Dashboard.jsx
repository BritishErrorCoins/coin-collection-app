 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Dashboard.jsx b/src/pages/Dashboard.jsx
index 17def68092a60f9bc8faa784175856b43bf9ee91..ec3b023124c4597bfa6beb05c321b1927215ecc9 100644
--- a/src/pages/Dashboard.jsx
+++ b/src/pages/Dashboard.jsx
@@ -1,30 +1,29 @@
 import React, { useState } from "react";
 import Header from "../components/Header";
 import { useDataset } from "../hooks/useDataset";
 import { useFormOptions } from "../hooks/useFormOptions";
-import "../styles/table.css";
 
 export default function Dashboard() {
   const [coins, setCoins] = useState([]);
   const [formData, setFormData] = useState({
     Denomination: "",
     Monarch: "",
     Metal: "",
     "Strike Type": "",
     Variety: "",
     Year: "",
     Notes: "",
   });
 
   useDataset("dashboard", setCoins);
   const options = useFormOptions(coins, formData);
 
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: value,
     }));
   };
 
   return (
 
EOF
)