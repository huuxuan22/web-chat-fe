import { useDispatch, useSelector } from "react-redux";
import { formatDateTime, formatRelativeTime } from "../../utils/Utils";
import { useEffect } from "react";
import * as userService from "./../../Redux/Auth/Action"
import { searchUser } from './../../Redux/Group/Action';

const ChatCard = ({ item, groupStatus, userLogin }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(userService.currentUser(token));
  }, []);

  // Kiểm tra trạng thái của nhóm (nếu có)
  const statusGroup = groupStatus?.find(statusGroup => statusGroup.chatId === item.chatId);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await dispatch(userService.currentUser(token));
    };

    if (token) {
      fetchUser();
    }
  }, [token, dispatch]);

  console.log("thông tin người dùng: ", auth.currentUser);

  return (
    <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      {/* Ảnh đại diện */}
      <div className="relative">
        <img
          className="h-12 w-12 rounded-full"
          src={
            item.isGroup === 1
              ? "https://cdn-icons-png.flaticon.com/512/21/21104.png" // Ảnh mặc định của nhóm
              : item.avatar ||
                "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
          }
          alt="Avatar"
        />
        {/* Chấm trạng thái online (Chỉ hiển thị nếu là cá nhân) */}
        {item.isGroup === 0 && item.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </div>

      {/* Nội dung tin nhắn */}
      <div className="flex-1 ml-3">
        <div className="flex justify-between items-center">
          <p
            className={`text-sm font-medium ${
              item.isGroup === 1 ? "text-green-800 font-semibold" : "text-gray-900"
            }`}
          >
            {item.chatName}
          </p>
          <p className="text-xs text-gray-500">
            {formatRelativeTime(item.lastMessageTime)}
          </p>
        </div>

        <div className="flex justify-between items-center">
          {/* Nếu là nhóm, hiển thị tên người gửi trước tin nhắn */}
          {item.isGroup === 1 ? (
            <p className="text-xs text-gray-600">
              {userLogin?.fullName === item.senderName ? (
                <div><strong>Bạn:</strong> <span>{item.lastMessage}</span></div>
              ) : (
                <><strong>{item.senderName}:</strong> <span className={`${statusGroup?.isNewMessage ? "font-bold text-green-600" : ""}`}>{item.lastMessage}</span></>
              )}
            </p>
          ) : (
            <div>
              {userLogin?.fullName === item.senderName ? (
                <div><strong>Bạn:</strong> <span>{item.lastMessage}</span></div>
              ) : (
                <><strong>{item.senderName}:</strong> <span className={`${statusGroup?.isNewMessage ? "font-bold text-green-600" : ""}`}>{item.lastMessage}</span></>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;