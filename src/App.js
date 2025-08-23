import logo from './logo.svg';
import React, { useState } from "react";
import { LanguageProvider } from "./components/LanguageProvider";
import './App.css';
import Menu from './pages/menu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LanguageSelect from './components/languageSelect';


function App() {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "EN");

  return (
    <div className="App">
      
      <LanguageProvider>
        <LanguageSelect></LanguageSelect>
        <Router>
          <Routes>
            <Route path="/menu" element={<Menu />} />
            <Route path="/" element={<Menu />} />
          </Routes>
        </Router>

      </LanguageProvider>
    </div>
  );
}

export default App;
