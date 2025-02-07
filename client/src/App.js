import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AboutPage from "./AboutPage.js";
import Fib from "./Fib.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h3>fibonacci Calculator</h3>
        </header>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <div>
          <Routes>
            <Route path="/" element={<Fib />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
