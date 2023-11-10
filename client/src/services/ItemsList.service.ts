import axios, {AxiosRequestConfig} from "axios";
import { API_URL } from "../constants";
import { APIItem } from "../FoodItems.types";

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

export const createItem = async (accessToken: string, label: string) => {
    const config: AxiosRequestConfig = {
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
      }
    try {
        const response = await axios.post(`${API_URL}/items`, label, config);
        return response.data;
    } catch (e) {
        console.error('Error creating item', e);
        throw e;
    }
}