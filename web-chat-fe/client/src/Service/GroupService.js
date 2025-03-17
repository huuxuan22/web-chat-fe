import axios from "axios";
import { BASE_API_URL } from "../config/api";

export const searchUser =async (data)  => {
    try {
        const res = await axios.get(
            `${BASE_API_URL}/api/user/search?name=${data.data}`,
            {
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error("Lỗi API:", error);
        return {
            error: error.response?.data?.message || "Lỗi máy chủ, vui lòng thử lại!"
        };
    }
}


export const createGroup = async (createGroupDTO,token) => {
    try {
        console.log(createGroupDTO);
        
        const res = await axios.post(
            `${BASE_API_URL}/api/chat/group`,createGroupDTO,
            {
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return {success:true, data: res.data};
    } catch (error) {
        console.error("Lỗi API:", error);
        return {
           success:false,
           data: error.response.data
        };
    }
};


