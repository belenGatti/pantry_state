import axios from "axios";
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