import {  GIVE_VALUE_TO_STATUS_GROUP, UPDATE_VALUE_FROM_STATUS_GROUP } from "./ActionType"

const initialValue = {
    isNewMessage: true,
    groupStatus: [] // cái này để chứa danh sách trạng thái 
}
export const statusReducer = (store = initialValue, {type,payload}) => {
     if (type === GIVE_VALUE_TO_STATUS_GROUP) {
        return {...store,groupStatus: payload}
    }else if (type === UPDATE_VALUE_FROM_STATUS_GROUP) {
        return {...store,groupStatus:payload}
    }   
    else {
        return store
    }
}