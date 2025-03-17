import { GET_ALL_NOTIFICATION } from "./ActionType"

const initialValue = {
    notifications: []
}



export const notificationReducer = (store = initialValue, {type,payload}) => {
    if (type === GET_ALL_NOTIFICATION) {
        return {...store,notifications: payload}
    }else {
        return store
    }
}