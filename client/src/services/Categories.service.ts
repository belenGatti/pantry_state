import axios from 'axios';
import { API_URL } from "../constants";

export const getCategoriesNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories`);
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            throw new Error('Error getting categories')
        }
    } catch (e) {
        console.error('Error getting categories', e);
        throw e;
    }
}