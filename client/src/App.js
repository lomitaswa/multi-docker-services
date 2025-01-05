import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AboutPage from "./AboutPage";
import Fib from "./Fib.js";

function App() {
  return (
    <Router>
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
          </header>
        </div>
        <div>
          <Route exact path='/' component={Fib} />
          <Route path='/about' component={AboutPage}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
