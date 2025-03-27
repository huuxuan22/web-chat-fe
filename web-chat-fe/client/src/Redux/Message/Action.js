import axios from "axios"
import { BASE_API_URL } from "../../config/api"
import { ADD_MESSAGE, ADD_MESSLIST_TO_LIST, CREATE_MESSAGE, GET_ALL_MESSAGE, GET_CHAT, RESET_MESSAGE } from "./ActionType";

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

export const getAllMessage = (repData,token,size,page) => async (dispatch) => {
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

export const get15MessNext = (repData,token,size,page) => async (dispatch) => {
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

export const addMessages = (data) => async (dispatch) => {
    dispatch({ type: ADD_MESSAGE, payload: data }); // data là mảng
}
export const addMessListToList = (data) => async (dispatch) => {
    dispatch({ type: ADD_MESSLIST_TO_LIST, payload: data });
}
export const resetMessage = () => {
    return {
        type: RESET_MESSAGE
    }
}

export const addNewMessage = (message) => ({
    type: 'ADD_NEW_MESSAGE',
    payload: message
  });

  export const addListToListMessage = (messages) => ({
    type: 'ADD_MESSAGE_TO_LIST',
    payload: messages
  });

  export const setChatId = (data) => ({
    type: "SET_CHAT_ID",
    payload: data
  })
