import { store } from "../store"
import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHAT, RESET_USER_CHAT } from "./ActionType"


const initialValue = {
    createChat: null,
    createGroup: null,
    getUserChat: []
}


export const chatReducer = (store = initialValue, {type,payload}) => {
    if (type === CREATE_CHAT) {
        return {...store,createChat: payload}
    }else if (type === CREATE_GROUP) {
        return {...store,createGroup: payload}
    }else if (type === GET_USER_CHAT) {
        return {...store,getUserChat: payload}
    }else if (type === RESET_USER_CHAT) {
        return {...store,getUserChat: []}
    }else {
        return store
    }
}