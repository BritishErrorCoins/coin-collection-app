import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collection from "./pages/Collection";
import Sold from "./pages/Sold";
import Missing from "./pages/Missing";
import UpdatePrompt from "./components/UpdatePrompt";
import "./index.css";

const App = () => (
  <Router>
    <UpdatePrompt />
    <Routes>
      <Route path="/" element={<Collection />} />
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
