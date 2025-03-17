import { createMessage } from "./Action"
import { CREATE_MESSAGE, GET_ALL_MESSAGE, GET_MESSAGE } from "./ActionType"

const initialValue = {
    newMessage: null,
    messages: [],
    getUserChat: []
}



export const messageReducer = (store = initialValue, {type,payload}) => {
    if (type === CREATE_MESSAGE) {
        return {...store,newMessage: payload}
    }else if (type === GET_ALL_MESSAGE) {
        return {...store,messages: payload}
    }else {
        return store
    }
}