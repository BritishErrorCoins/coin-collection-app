
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Sold from "./pages/Sold";
import Missing from "./pages/Missing";
import Dashboard from "./pages/Dashboard";
import UpdatePrompt from "./components/UpdatePrompt";
import NavBar from "./components/NavBar";
import "./index.css";

const App = () => (
  <Router>
    <UpdatePrompt />
    <NavBar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/sold" element={<Sold />} />
      <Route path="/missing" element={<Missing />} />
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
