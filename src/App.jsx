import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCoins from "./pages/AddCoins";
import Catalog from "./pages/catalog";
import MyCollection from "./pages/collection";
import Sold from "./pages/sold";
import MyWantlist from "./pages/MyWantlist";
import Wantlist from "./pages/Wantlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCoins />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/collection" element={<MyCollection />} />
        <Route path="/sold" element={<Sold />} />
        <Route path="/wantlist" element={<Wantlist />} />
        <Route path="/mywantlist" element={<MyWantlist />} />
      </Routes>
    </Router>
  );
}

export default App;