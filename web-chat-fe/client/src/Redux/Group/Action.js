import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { SEARCH_USER_GROUP } from "./../Group/ActionType";

export const searchUser = (data) => async (dispatch) => {
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
        dispatch({ type:SEARCH_USER_GROUP, payload: res.data });
        return res.data;
    } catch (error) {
        console.error("Lỗi API:", error);
        return {
            error: error.response?.data?.message || "Lỗi máy chủ, vui lòng thử lại!"
        };
    }
}