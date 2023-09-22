import {BrowserRouter as Router, Link} from 'react-router-dom';
import React from 'react';
import AppRoutes from './components/AppRoutes'
import {Typography, Button} from '@mui/material';
import './App.css'

function App() {

  return (
    <Router>
     <div className='app'>
        <Typography variant='h1'>Food Items</Typography>
        <Link to='/new-food-item'>
        <Button variant='outlined'>Add new item</Button>
        </Link>
      </div>
      <AppRoutes/>
    </Router>
  );
}

export default App;
