import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AddCoins from "./pages/AddCoins";
import MyCollection from "./pages/MyCollection";
import BrowseCoins from "./pages/BrowseCoins";
import Sold from "./pages/Sold";
import Contact from "./pages/Contact";
import MyWantlist from "./pages/MyWantlist";

import { useDatasetUpdateCheck } from "./hooks/useDatasetUpdateCheck";
import DatasetUpdateModal from "./components/DatasetUpdateModal";
import { DATA_URL } from "./utils/dataUtils";

import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Theme toggle
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  // Dataset update modal logic
  const [showPrompt, setShowPrompt, remoteDate] = useDatasetUpdateCheck("masterDataset");

  const handleUpdate = () => {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("masterDataset", JSON.stringify(data));
        window.location.reload();
      });
  };
  const handleNotNow = () => setShowPrompt(false);

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 bg-[#f9f6f3] dark:bg-[#231821] transition-all">
          {showPrompt && (
            <DatasetUpdateModal
              onAccept={handleUpdate}
              onReject={handleNotNow}
              remoteDate={remoteDate}
            />
          )}
          <Routes>
            <Route path="/" element={<AddCoins />} />
            <Route path="/add" element={<AddCoins />} />
            <Route path="/mycollection" element={<MyCollection />} />
            <Route path="/browse" element={<BrowseCoins />} />
            <Route path="/sold" element={<Sold />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mywantlist" element={<MyWantlist />} />
            <Route path="*" element={<AddCoins />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
