import { Client, Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { BsEmojiSmile, BsHandThumbsUp, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { store } from "../../Redux/store";
import * as messageService from "./../../Redux/Message/Action";
import * as userService from "./../../Redux/Auth/Action";
import * as statusService from "./../../Redux/Status/Action";
import "./MessageCard.css";
const MessageCard = ({ item, userLogin, groupStatus }) => {
  const [content, setContent] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const token = localStorage.getItem("token");
  const [sendMess, setSendMess] = useState({
    userSend: userLogin.userId,
    receiver: item.chatId,
    data: "",
  });

  useEffect(() => {
    dispatch(
      statusService.updateValueFromGroupStatus(groupStatus, item.chatId)
    );
  }, [token, dispatch]);

  
  useEffect(() => {
    // Khởi tạo WebSocket client
    const socketFactory = () => new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socketFactory);

    client.connect(
      // Truyền token vào header
      {},
      () => {
        console.log("✅ Kết nối WebSocket thành công!");
        setStompClient(client);

        client.subscribe("/topic/messages", (message) => {
          console.log("📩 Tin nhắn nhận được:", message.body);
          const receivedMessage = JSON.parse(message.body);
          dispatch(messageService.getAllMessage(item.chatId, token));
          const keyword = "";
          dispatch(userService.searchUser({ keyword, token }));
        });
      },
      (error) => {
        console.error("❌ Lỗi kết nối WebSocket:", error);
      }
    );

    return () => {
      if (client) {
        client.disconnect(() => {
          console.log("🔌 WebSocket đã đóng kết nối");
        });
      }
    };
  }, [token]);

  useEffect(() => {
    setSendMess((prev) => ({ ...prev, receiver: item.chatId }));
  }, [item]);

  useEffect(() => {
    dispatch(messageService.getAllMessage(item.chatId, token));
  }, [item, token, dispatch, sendMess]);
  
  return (
    <div className="w-full h-full flex flex-col bg-white p-6 rounded-r-lg">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <img
          src={
            "https://th.bing.com/th/id/OIP.4BZL7oQIEuwTFAg7QYsshAHaHa?w=500&h=500&rs=1&pid=ImgDetMain"
          }
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="font-semibold text-lg">{item.chatName}</span>
      </div>

      {/* Content (Hiển thị tin nhắn) */}
      <div className="content-container">
        {message.messages?.map((items, index) => {
          // Giả lập tin nhắn luân phiên 2 bên
          return (
            <div key={index}>
              <div
                className={`flex items-start ${
                  items.userId === userLogin.userId
                    ? "justify-end"
                    : "justify-start"
                } gap-2 overflow-y-auto`}
              >
                {/* Avatar bên trái nếu là người khác gửi */}
                {items.userId !== userLogin.userId && (
                  <img
                    src={
                      items.avatar ||
                      "https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=208&h=208&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}

                <div className="flex flex-col">
                  {/* Hiển thị tên người gửi */}
                  {items.userId === userLogin.userId ? (
                    <span className="text-[10px] text-gray-400 text-right mb-1 mr-2">
                      {items.fullName}
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-400 mt-2 ml-2 mb-1 ">
                      {items.fullName}
                    </span>
                  )}

                  {/* Nội dung tin nhắn */}
                  <div
                    className={`py-1 px-3 rounded-2xl max-w-[100%] text-white ${
                      items.userId === userLogin.userId
                        ? "self-end bg-[#000000dd] ml-auto"
                        : "self-start bg-[#40e812dd] mr-auto "
                    }`}
                  >
                    <p className="text-sm">{items.content || ""}</p>
                  </div>
                </div>

                {/* Avatar bên phải nếu là bạn gửi */}
                {items.userId === userLogin.userId && (
                  <img
                    src={
                      userLogin.avatar ||
                      "https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=208&h=208&c=7&r=0&o=5&dpr=1.1&pid=1.7"
                    }
                    alt="avatar"
                    className="w-8 h-8 rounded-full "
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer (Nhập tin nhắn) */}
      <div className="p-4 flex items-center bg-[#f0f2f5] rounded-b-lg">
        <div className="flex gap-3">
          <BsEmojiSmile size={24} className="cursor-pointer text-gray-600" />
          <ImAttachment size={24} className="cursor-pointer text-gray-600" />
          <BsMicFill size={24} className="cursor-pointer text-gray-600" />
        </div>

        <input
          className="flex-1 mx-4 py-3 px-4 rounded-full outline-none border-none bg-white"
          type="text"
          placeholder="Type message..."
          value={sendMess.data}
          onChange={(e) => {
            setSendMess((prev) => ({ ...prev, data: e.target.value }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!sendMess.data.trim()) {
                console.warn("⚠️ Không thể gửi tin nhắn trống!");
                return;
              }
              console.log("📤 Dữ liệu gửi đi:", sendMess);
              try {
                const jsonMessage = JSON.stringify(sendMess); // Kiểm tra JSON có hợp lệ không
                console.log("✅ JSON hợp lệ:", jsonMessage);
                stompClient.send("/app/chat", {}, jsonMessage);
                setSendMess((prev) => ({ ...prev, data: "" })); // Xóa nội dung sau khi gửi
              } catch (error) {
                console.error("❌ JSON không hợp lệ:", error);
              }
            }
          }}
        />

        <BsHandThumbsUp size={24} className="cursor-pointer text-gray-600" />
      </div>
    </div>
  );
};
export default MessageCard;
