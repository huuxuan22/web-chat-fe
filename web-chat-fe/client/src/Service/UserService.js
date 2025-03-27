import axios from "axios";
import { BASE_API_URL } from "../config/api";

export const currentUser =async (token) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/user/infor`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

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


export const updateUser =async (data,token) => {
    try {
        const res = await axios.put(`${BASE_API_URL}/api/user/update`,data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

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

export const loginWithGoogle =async (data) => {
    try {
        console.log(data);
        const res = await axios.post(`${BASE_API_URL}/api/user/login-google-facebook`,data);
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Lỗi từ BE:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
}

export const logout =async (token) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/api/user/logout`,{},{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return { success: true, data: res.data };
    } catch (error) {
        console.error("Lỗi từ BE:", error);
        if (error.response) {
            return { success: false, data: error.response.data };
        } else {
            return { success: false, data: "Lỗi máy chủ, vui lòng thử lại!" };
        }
    }
}