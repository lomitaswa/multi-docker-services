import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutPage from "./AboutPage";
import Fib from "./Fib.js";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p></p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/">Home</Link>
          <Link to="/about">About Page</Link>
        </header>
        <div>
          <Route exact path="/" component={Fib} />
          <Route path="/about" component={AboutPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
