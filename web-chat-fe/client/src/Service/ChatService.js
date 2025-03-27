import axios from "axios"
import { BASE_API_URL } from "../config/api"


export const updateChatName =async (chatId,chatName,token) => {
    try {
        console.log(chatId,chatName);
        const response = await axios.post(`${BASE_API_URL}/api/chat/change-chat-name`,{chatId,chatName},
            {
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return {success : true, data: response.data}
    } catch (error) {
        return {
            success:false,
            data: error.response.data
         };
    }
}

export const updateChatAvatar =async (chatId,formData,fileNameOld,token) => {
    try {
        console.log(formData);
        const response = await axios.post(`${BASE_API_URL}/api/chat/update-group-avatar?chatId=${chatId}&&fileNameOld=${fileNameOld}`,formData,{
            headers: { 
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        });
        return {success : true, data: response.data}
    } catch (error) {
        return {
            success:false,
            data: error.response.data
         };
    }
}


export const userListInChat =async (chatId,token) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/chat/user-in-list`,{
            params: {
                chatId: chatId,
            },
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return {success : true, data: response.data}
    } catch (error) {
        return {
            success:false,
            data: error.response.data
         };
    }
}