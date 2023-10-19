import axios, {AxiosRequestConfig} from "axios";
import { API_URL } from "../constants";

export const getPantryNumber = async (accessToken: string, userId: string): Promise<number> => {
    const config: AxiosRequestConfig = {
        headers: {
          "content-type": "application/json",
          'Authorization': `Bearer ${accessToken}`
        },
      }
    try {
        const response = await axios.get(`${API_URL}/pantries/${userId}`, config);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error getting pantry number')
        }
    } catch (e) {
        console.error('Error getting pantry number', e);
        throw e;
    }
}
