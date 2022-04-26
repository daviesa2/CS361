import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { useState } from 'react';

/* Function that defines the REACT app */
function App() {
  /* A state variable and function for editing an existing database item */
  /* The return that defines the contents of the app */
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <HomePage />
          </Route>
          </div>
      </Router>
    </div>
  );
}

export default App;