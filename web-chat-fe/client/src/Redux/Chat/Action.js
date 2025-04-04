import  axios  from 'axios';
import { BASE_API_URL } from '../../config/api';
import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHAT } from './ActionType';

export const createChat  =(data,token)=>async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/chat/single`,data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        } )
        dispatch({type: CREATE_CHAT, payload: res.data});
        return {success: true, data: res.data}; 
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        }
    }
} 

export const creaeGroup  =(data,token)=>async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/chat/group`,data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        } )
        dispatch({type: CREATE_GROUP, payload: res.data});
        return {success: true, data: res.data};    
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        } 
    }
} 

export const getUserChat  =(data,token)=>async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/chat/get-all`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        } )
        dispatch({type: GET_USER_CHAT, payload: res.data});
        console.log("kiểm tra getUserChat trong phần service: ", res.data);
        return {success: true, data: res.data};    
    } catch (error) {
        console.log("Lỗi khi createChat :", error);
        if (error.response) {
            return {success: false,data: error.response.data}
        }else {
            return {success: false, data: "Lỗi ở server vui lòng truy cập lại"}
        } 
    }
} 


export const resetUserChat = () => async (dispatch) => {
    
}