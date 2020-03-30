import React from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
    <BrowserRouter forceRefresh = {true}> 
    <Dashboard />
    </BrowserRouter>
    </div>
  );
}

export default App;
