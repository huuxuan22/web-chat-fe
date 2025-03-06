import axios from "axios"
import { BASE_API_URL } from "../../config/api"
import { CREATE_MESSAGE, GET_ALL_MESSAGE, GET_CHAT } from "./ActionType";

export const createMessage = (data,token) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/message/create`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({type: CREATE_MESSAGE, payload: res.data});
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

export const getAllMessage = (repData,token) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/message/chat/${repData.chatId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({type: GET_ALL_MESSAGE, payload: res.data});
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