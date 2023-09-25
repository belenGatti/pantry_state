// this service is thought to handle all the requests to the backend related to food items

import axios from "axios";
import { FoodItem } from "../FoodItems.types";
import { API_URL } from "../constants";

// get request to get all the food items
export const getFoodItems = async () => {
}


// post request to create a new food item
export const createFoodItem = async (foodItem: FoodItem) => {
  const expiration_date_parsed = new Date(foodItem.expiration_date);

  try {
    console.log(`${API_URL}/food_items`)
    const response = await axios.post(`${API_URL}/food_items`, {...foodItem, expiration_date: expiration_date_parsed}, {
      headers: {
        'Content-Type': 'application/json'
      }, 
    });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Error creating food item')
    }
    } catch (e) {
      console.error('Error creating food item', e);
      throw e;
        // set error state
    } 
};