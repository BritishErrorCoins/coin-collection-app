 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/Catalog.jsx b/src/pages/Catalog.jsx
index 0a043a1fc3b3138a19c5bc0bbe48a1a720f36c7e..37b5d663c93fc32bfbf295bceee5fe35491a505e 100644
--- a/src/pages/Catalog.jsx
+++ b/src/pages/Catalog.jsx
@@ -1,48 +1,48 @@
 import React, { useEffect, useState } from "react";
 import Header from "../components/Header";
 import { useDataset } from "../hooks/useDataset";
 import { addToCollection, addToWantlist } from "../utils/dataUtils";
 
 
 export default function Catalog() {
   const [catalog, setCatalog] = useState([]);
   const [filters, setFilters] = useState({
     monarch: [],
     metal: [],
     type: [],
     denomination: []
   });
   const [showPrompt, setShowPrompt] = useState(false);
   const [promptType, setPromptType] = useState(""); // "collection" or "wantlist"
   const [selectedRow, setSelectedRow] = useState(null);
 
   // For wantlist reasons
   const [wantReason, setWantReason] = useState("");
   const [otherReason, setOtherReason] = useState("");
 
-  useDataset(setCatalog);
+  useDataset("catalog", setCatalog);
 
   // Helper to get unique filter options
   function getUnique(arr, field) {
     return [...new Set(arr.map(item => item[field]).filter(Boolean))];
   }
 
   // Filter handling
   const handleFilterChange = (field, value) => {
     setFilters(prev => {
       const prevValues = prev[field];
       return {
         ...prev,
         [field]: prevValues.includes(value)
           ? prevValues.filter(v => v !== value)
           : [...prevValues, value]
       };
     });
   };
 
   const clearFilters = () => setFilters({ monarch: [], metal: [], type: [], denomination: [] });
 
   // Filtered data
   const filteredCatalog = catalog.filter(c =>
     (!filters.monarch.length || filters.monarch.includes(c.Monarch)) &&
     (!filters.metal.length || filters.metal.includes(c.Metal)) &&
 
EOF
)