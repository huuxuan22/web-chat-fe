import {  GIVE_VALUE_TO_STATUS_GROUP, UPDATE_VALUE_FROM_STATUS_GROUP } from "./ActionType"
export const giveValueToGroupStatus = (data) => (dispatch) => {
    const statusData = data?.map((item) => ({
        chatId: item.chatId,
        isNewMessage: true // Mặc định tất cả là tin nhắn mới
    }));
    dispatch({ type: GIVE_VALUE_TO_STATUS_GROUP, payload: statusData });
};


export const updateValueFromGroupStatus = (groupStatus, chatId) => (dispatch) => {
    const statusData = groupStatus?.map((item) => {
        // Kiểm tra nếu item có chatId trùng với chatId được truyền vào
        if (item.chatId === chatId) {
            return { ...item, isNewMessage: false }; // Cập nhật isNewMessage thành false
        }
        return item; // Giữ nguyên các item khác
    });

    dispatch({ type: UPDATE_VALUE_FROM_STATUS_GROUP, payload: statusData });
};
