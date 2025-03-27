import { createMessage } from "./Action"
import { ADD_MESSAGE, ADD_MESSAGE_TO_LIST, ADD_NEW_MESSAGE, CREATE_MESSAGE, GET_ALL_MESSAGE, GET_ALL_MESSAGE_LOAD_FISRT, GET_MESSAGE, RESET_MESSAGE, SET_CHAT_ID } from "./ActionType"

const initialValue = {
    newMessage: null,
    messages: [],
    getUserChat: [],
    chatId: null
}



export const messageReducer = (store = initialValue, {type,payload}) => {
    if (type === CREATE_MESSAGE) {
        return {...store,newMessage: payload}
    }else if (type === GET_ALL_MESSAGE) {
        return {...store,messages: payload}
    } else if (type === ADD_MESSAGE) {
        return { ...store, messages: [...store.messages, ...payload] }
    } else if (type === RESET_MESSAGE) {
        return { ...store, messages: [] }
    }else if (type === ADD_NEW_MESSAGE) {
        return { ...store, messages: [payload, ...store.messages] }
    }else if (type === ADD_MESSAGE_TO_LIST) {
        return { ...store, messages: [payload, ...store.messages] }
    }else if (type === SET_CHAT_ID) {
        return { ...store, chatId: payload,
                                 messages: []  }
    }else {
        return store
    }
}