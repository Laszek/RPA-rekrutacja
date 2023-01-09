import React, { useState } from 'react';
import './App.css';
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <header className="header"><h1>Weather Reports</h1></header>
            <Home />
        </div>
    );
}

export default App;
