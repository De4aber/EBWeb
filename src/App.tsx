import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from './Components/Shared/Navbar/Navbar';
import FrontPage from './Pages/Frontpage/FrontPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes >
            <Route path="/" element={
              <>
                <FrontPage/>
                <Navbar />
              </>
            } />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
