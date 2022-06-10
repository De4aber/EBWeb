import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
              </>
            } />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
