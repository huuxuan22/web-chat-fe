import axios from "axios";
import { BASE_API_URL } from "../config/api";

export const getAllMessage =async (repData,token,size,page) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/message/chat`, 
        {
            params:{
                chatId: repData,
                size: size,
                page: page
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res.data);
        
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