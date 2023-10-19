import axios, {AxiosRequestConfig} from "axios";
import { APIFoodItem, FoodItem, FoodItemRequest } from "../FoodItems.types";
import { API_URL } from "../constants";
import {transformFromAPI, transformToAPI} from '../helper/FoodItems.transformer'
import { redirect } from "react-router-dom";

// get request to get all the food items
export const getFoodItems = async (accessToken: string, pantryId: string): Promise<FoodItem[]> => {
  const config: AxiosRequestConfig = {
    headers: {
      "content-type": "application/json",
      'Authorization': `Bearer ${accessToken}`
    },
  }
  try {
    const response = await axios.get(`${API_URL}/pantry_items/${pantryId}`, config);
    if (response.status >= 200 && response.status < 300) {
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
export const createFoodItem = async (foodItem: FoodItemRequest, accessToken: string, pantryId: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      "content-type": "application/json",
      'Authorization': `Bearer ${accessToken}`
    }
  }
  const foodItemAPI = transformToAPI(foodItem);
  const expiration_date_parsed = new Date(foodItem.expirationDate);
  try {
    const response = await axios.post(`${API_URL}/pantry_items`, {...foodItemAPI, expiration_date: expiration_date_parsed, pantry_id: pantryId}, config);
    if (response.status >= 200 && response.status < 300) {
      redirect('/food-items-list')
    } else {
      throw new Error('Error creating food item')
    }
    } catch (e) {
      console.error('Error creating food item', e);
      throw e;
        // set error state
    } 
};

export const updateFoodItem = async (foodItem: FoodItem, accessToken: string, pantryId: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      "content-type": "application/json",
      'Authorization': `Bearer ${accessToken}`
    }
  }
  const foodItemAPI = transformToAPI(foodItem);
  const expiration_date_parsed = new Date(foodItem.expirationDate);
  try {
    const response = await axios.put(`${API_URL}/pantry_items/${foodItem.id}`, {...foodItemAPI, expiration_date: expiration_date_parsed, pantry_id: pantryId}, config);
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

export const deleteFoodItem = async (foodItemId: number, accessToken: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      "content-type": "application/json",
      'Authorization': `Bearer ${accessToken}`
    }
  }
  try {
    const response = await axios.delete(`${API_URL}/pantry_items/${foodItemId}`, config);
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