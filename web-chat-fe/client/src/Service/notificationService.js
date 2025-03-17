import axios from "axios";
import { BASE_API_URL } from "../config/api";

export const getAllNotification =async (token) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/notification`, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return {success: true , data: res.data};
    } catch (error) {
        console.log("Lỗi ở createMessage: ", error);
        if (error.response) {
            return {success: false , data: error.response.data};
        } else {
            return {success: false, data: error.response.data}
        }
    }
}