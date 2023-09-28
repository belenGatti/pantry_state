// this service is thought to handle all the requests to the backend related to food items

import axios from "axios";
import { APIFoodItem, FoodItem, FoodItemRequest } from "../FoodItems.types";
import { API_URL } from "../constants";
import {transformFromAPI, transformToAPI} from '../helper/FoodItems.transformer'

// get request to get all the food items
export const getFoodItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/food_items`);
    if (response.status === 200) {
      const foodItems = response.data.map((foodItem: APIFoodItem) => transformFromAPI(foodItem));
      return foodItems;
    } else {
      throw new Error('Error getting food items')
    }
  } catch (e) {
    console.error('Error getting food items', e);
    throw e;
  }
}


// post request to create a new food item
export const createFoodItem = async (foodItem: FoodItemRequest) => {
  const foodItemAPI = transformToAPI(foodItem);
  const expiration_date_parsed = new Date(foodItem.expirationDate);

  try {
    console.log(`${API_URL}/food_items`)
    const response = await axios.post(`${API_URL}/food_items`, {...foodItemAPI, expiration_date: expiration_date_parsed}, {
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
// @TODO add a transformer from backend to frontend food item
export const updateFoodItem = async (foodItem: FoodItem) => {
  const foodItemAPI = transformToAPI(foodItem);
  const expiration_date_parsed = new Date(foodItem.expirationDate);

  try {
    const response = await axios.put(`${API_URL}/food_items/${foodItem.id}`, {...foodItemAPI, expiration_date: expiration_date_parsed}, {
      headers: {
        'Content-Type': 'application/json'
      }, 
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Error updating food item')
    }
    } catch (e) {
      console.error('Error updating food item', e);
      throw e;
        // set error state
    } 
}

export const deleteFoodItem = async (foodItemId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/food_items/${foodItemId}`, {
      headers: {
        'Content-Type': 'application/json'
      }, 
    });
    if (response.status === 204) {
      return response.data;
    } else {
      throw new Error('Error deleting food item')
    }
    } catch (e) {
      console.error('Error deleting food item', e);
      throw e;
        // set error state
    } 
}