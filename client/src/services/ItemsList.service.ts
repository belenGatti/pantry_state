import axios from "axios";
import { API_URL } from "../constants";

interface APIItem {
    category: string;
    created_at: string;
    id: number;
    image: string;
    intern_id: string;
    label: string;
    measurement_unit: string;
    updated_at: string;
}

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