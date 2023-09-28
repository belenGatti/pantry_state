import React from "react";
import { Route, Routes } from "react-router-dom";
import NewItemForm from "./NewItemForm";
import FoodItemsList from './FoodItemsList'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<FoodItemsList />} />
            <Route path="new-food-item" element={<NewItemForm />} />
            <Route path="update-food-item" element={<NewItemForm />} />
        </Routes>
    )
}

export default AppRoutes;