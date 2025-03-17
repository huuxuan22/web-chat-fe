import { SEARCH_USER_GROUP } from "./ActionType"

const initialValue = {
    searchUser: null,
}



export const groupReducer = (store = initialValue, {type,payload}) => {
    if (type === SEARCH_USER_GROUP) {
        return {...store,searchUser: payload}
    }else {
        return store
    }
}