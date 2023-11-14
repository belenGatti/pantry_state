import axios, {AxiosRequestConfig} from "axios";
import { API_URL } from "../constants";
import { APIItem, NewItem } from "../FoodItems.types";

export const getItemsList = async (): Promise<APIItem[]> => {
    try {
        const response = await axios.get(`${API_URL}/items`);
        const items = response.data;
        return items;
    } catch (e) {
        console.error('Error getting items', e);
        throw e;
    }
}

export const createItem = async (accessToken: string, newItem: NewItem) => {
    const config: AxiosRequestConfig = {
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
      }
    const newItemToAPIFormat = {
        label: newItem.label,
        category: newItem.category,
        measurement_unit: newItem.measurementUnit,
    }
    try {
        const response = await axios.post(`${API_URL}/items`, newItemToAPIFormat, config);
        return response.data;
    } catch (e) {
        console.error('Error creating item', e);
        throw e;
    }
}