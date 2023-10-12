import React from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css'
import NewItemForm from './components/NewItemForm';
import FoodItemsList from './components/FoodItemsList';
import LoginPage from './components/LoginPage';

export const App = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="food-items-list" element={<FoodItemsList />} />
      <Route path="new-food-item" element={<NewItemForm />} />
      <Route path="update-food-item" element={<NewItemForm />} />
    </Routes>
  );
}

export default App;
