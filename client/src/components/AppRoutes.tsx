import React from "react";
import { Route, Routes } from "react-router-dom";
import NewItemForm from "./NewItemForm";
import FoodItem from "./FoodItem";
import FoodItemsList from './FoodItemsList'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<FoodItemsList />} />
            <Route path="new-food-item" element={<NewItemForm />} />
            {/* <Route path="food-item" element={<FoodItem />} /> */}
        </Routes>
    )
}

export default AppRoutes;