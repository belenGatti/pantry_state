import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import AppRoutes from './components/AppRoutes'
import './App.css'

function App() {

  return (
    <Router>
      <AppRoutes/>
    </Router>
  );
}

export default App;
