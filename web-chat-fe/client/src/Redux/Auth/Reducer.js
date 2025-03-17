
import { searchUser, searchUserForAdd, updateUser } from './Action';
import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, SEARCH_USER_FOR_ADD_FRIEND, UPDATE_USER } from './ActionType';

const initialValue = {
    signup: null,
    signin: null,
    repUser: null,
    searchUser: [],
    searchUserForAdd: [],
    updateUser:null
}

export const authReducer = (store = initialValue, {type,payload}) => {
    if (type === REGISTER) {
        return {...store,signup:payload}
    }else if (type ===LOGIN) {
        return {...store,signin:payload}
    }else if (type === REQ_USER) {
        return {...store,reqUser:payload}
    } else if (type === SEARCH_USER) {
        return {...store,searchUser:payload }
    }else if (type === UPDATE_USER) {
        return {...store, updateUser: payload}
    }else if (type === SEARCH_USER_FOR_ADD_FRIEND) {
        return {...store, searchUserForAdd: payload}
    }else {
        return store;
    }
}