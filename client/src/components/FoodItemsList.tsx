import React from "react";
import {List} from '@mui/material';
import {useState, useEffect} from 'react'
import {API_URL} from '../constants'

interface FoodItem {
    name: string,
    quantity: number,
    expiration_date: Date
}


function FoodItemsList() {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
      async function fetchFoodItems() {
        try {
          const response = await fetch(`${API_URL}/food_items`);
          if (response.ok) {
            const json = await response.json();
            setFoodItems(json);
          } else {
            throw response
          }
        } catch (e) {
          // set error state
        } finally {
          // set loading state
        }
      }
      fetchFoodItems();
    }, [])
  
    return (
        <>
        <List>
        </List>
        {foodItems.map((foodItem: FoodItem) => (
          <div>
            <p>
              {foodItem.name}
            </p>
            <p>
              {foodItem.quantity}
            </p>
            <p>
              {foodItem.expiration_date.toDateString()}
            </p>
          </div>
        )
        )}
        </>
    )
}

export default FoodItemsList;