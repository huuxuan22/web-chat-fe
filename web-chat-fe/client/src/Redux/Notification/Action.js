import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { GET_ALL_NOTIFICATION } from "./ActionType";


export const getAllNotification = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/notification`, 
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({type: GET_ALL_NOTIFICATION, payload: res.data});
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