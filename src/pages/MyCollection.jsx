 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/src/pages/MyCollection.jsx b/src/pages/MyCollection.jsx
index 0824e9a51fa0a7b383bf0b6624fec9333640710b..822ce44e7e9cb2e75f3c7de5b233754a5cff4a82 100644
--- a/src/pages/MyCollection.jsx
+++ b/src/pages/MyCollection.jsx
@@ -5,46 +5,48 @@ import "../App.css";
 
 export default function MyCollection() {
   const [collection, setCollection] = useState([]);
 
   useEffect(() => {
     const stored = JSON.parse(localStorage.getItem("collection") || "[]");
     setCollection(stored);
   }, []);
 
   return (
     <div>
       <Header />
       <h2>My Collection</h2>
       {collection.length === 0 ? (
         <div className="empty-state">No coins added yet.</div>
       ) : (
         <table className="coin-table">
           <thead>
             <tr>
               <th>Denomination</th>
               <th>Monarch</th>
               <th>Metal</th>
               <th>Strike Type</th>
               <th>Variety</th>
               <th>Year</th>
+              <th>Price Paid</th>
               <th>Notes</th>
             </tr>
           </thead>
           <tbody>
             {collection.map(coin => (
               <tr key={coin.id}>
                 <td>{coin.denomination}</td>
                 <td>{coin.monarch}</td>
                 <td>{coin.metal}</td>
                 <td>{coin.strikeType}</td>
                 <td>{coin.variety}</td>
                 <td>{coin.year}</td>
+                <td>{coin.pricePaid}</td>
                 <td>{coin.notes}</td>
               </tr>
             ))}
           </tbody>
         </table>
       )}
     </div>
   );
 }
 
EOF
)