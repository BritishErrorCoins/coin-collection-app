import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import AddCoins from "./pages/AddCoins";
import MyCollection from "./pages/Collection";
import Missing from "./pages/Missing";
import Sold from "./pages/Sold";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/add-coins" replace />} />
        <Route path="/add-coins" element={<AddCoins />} />
        <Route path="/my-collection" element={<MyCollection />} />
        <Route path="/missing" element={<Missing />} />
        <Route path="/sold" element={<Sold />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
