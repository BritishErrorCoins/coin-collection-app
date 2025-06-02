import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCollection from "./pages/MyCollection";
import Sold from "./pages/Sold";
import Catalog from "./pages/Catalog";
import AddCoins from "./pages/AddCoins";
import MyWantlist from "./pages/MyWantlist";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCoins />} />
        <Route path="/mycollection" element={<MyCollection />} />
        <Route path="/sold" element={<Sold />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/addcoins" element={<AddCoins />} />
        <Route path="/mywantlist" element={<MyWantlist />} />
      </Routes>
    </Router>
  );
}

export default App;
