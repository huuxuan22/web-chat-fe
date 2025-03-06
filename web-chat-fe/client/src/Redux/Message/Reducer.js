import { createMessage } from "./Action"
import { CREATE_MESSAGE, GET_ALL_MESSAGE, GET_MESSAGE } from "./ActionType"

const initialValue = {
    createMessage: null,
    getAllMessage: null,
    getUserChat: []
}



export const messageReducer = (store = initialValue, {type,payload}) => {
    if (type === CREATE_MESSAGE) {
        return {...store,createMessage: payload}
    }else if (type === GET_ALL_MESSAGE) {
        return {...store,getAllMessage: payload}
    }else {
        return store
    }
}