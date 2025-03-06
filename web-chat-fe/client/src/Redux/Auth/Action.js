import { BASE_API_URL } from "../../config/api"
import { LOGIN, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";
import axios from "axios"


export const register = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/user/register`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return { success: true, data: res.data };
    } catch (error) {
        console.log("Lỗi từ BE:", error);
        if (error.response) {
            // Trả về lỗi từ backend (BE)
            return { success: false, data: error.response.data };
        } else {
            // Lỗi mạng hoặc lỗi không xác định
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const login = (data) => async (dispatch) => {
    try {
        console.log("dữ liệu đăng nhập: ", data);
        const res = await axios.post(`${BASE_API_URL}/api/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({ type: LOGIN, payload: res.data });
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        if (error.response) {
            // Trả về lỗi từ BE nếu có
            return { success: false, data: error.response.data };
        } else {
            // Lỗi mạng hoặc lỗi không xác định
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};

export const currentUser = (token) => async (dispatch) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/user/infor`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        dispatch({ type: REQ_USER, payload: res.data });

        return { success: true, data: res.data };
    } catch (error) {
        console.error("Lỗi từ BE:", error);

        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
};


export const searchUser = (data) => async (dispatch) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/user/search?name=${data.keyword}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`, // Thêm token vào headers
                    "Content-Type": "application/json"
                }
            }
        );
        dispatch({ type: SEARCH_USER, payload: res.data });
        return res;
    } catch (error) {
        console.error("Lỗi API:", error);

        return {
            error: error.response?.data?.message || "Lỗi máy chủ, vui lòng thử lại!"
        };
    }
}

export const updateUser = (data) => async (dispatch) => {
    try {
        const res = await axios.post(
            `${BASE_API_URL}/api/user/update/${data.id}`,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`, // Thêm token vào headers
                    "Content-Type": "application/json"
                }
            }
        );
        dispatch({ type: UPDATE_USER, payload: res.data });
        return res;
    } catch (error) {
        console.error("Lỗi API:", error);

        return {
            error: error.response?.data?.message || "Lỗi máy chủ, vui lòng thử lại!"
        };
    }
}