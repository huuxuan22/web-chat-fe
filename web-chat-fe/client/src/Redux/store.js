import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import {thunk}  from "redux-thunk"
import { authReducer } from './Auth/Reducer';
import { chatReducer } from './Chat/Reducer';
import { messageReducer } from './Message/Reducer';
const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer
}); 
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));


// combineReducers dùng để keets hợp nhiều reducer lại thành 1 cái cho dễ quản lý => rootReducer
// applyMiddleware thêm middleware vào redux store chủ yếu là them thunk vào
// legacy_createStore tạo 1 redux store