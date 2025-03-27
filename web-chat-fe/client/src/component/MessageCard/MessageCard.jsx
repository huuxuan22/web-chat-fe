import { Client, Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { BsEmojiSmile, BsHandThumbsUp, BsMicFill } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import * as messageService from "./../../Redux/Message/Action";
import * as messService from "./../../Service/MessageService";
import * as userService from "./../../Redux/Auth/Action";
import * as statusService from "./../../Redux/Status/Action";
import "./MessageCard.css";
import { formatTimestamp } from "../../utils/Utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";
import { store } from "../../Redux/store";
import { debounce } from "@mui/material";
import { Info, Phone } from "lucide-react";
import { Videocam } from "@mui/icons-material";
import CustomizedMenus from "../Menu/StyledMenu";

const MessageCard = ({ item, userLogin, groupStatus }) => {
  const [currentItem, setCurrentItem] = useState(item);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // page bắt đầu từ 0
  const [size] = useState(15); // số lượng mỗi lần load
  const [hasMore, setHasMore] = useState(true);
  const [content, setContent] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [detail, setDetail] = useState(false);
  const [sendMess, setSendMess] = useState({
    userSend: userLogin.userId,
    receiver: item.chatId,
    data: "",
  });

  useEffect(() => {
    if (!hasMore) {
      setHasMore(true);
    }
    setPage(0);
    dispatch(messageService.setChatId(item.chatId));
    dispatch(messageService.getAllMessage(item.chatId, token, 15, 0));
  }, []);
  useEffect(() => {
    setCurrentItem(item);
    setPage(0);
    setHasMore(true);
    dispatch(messageService.setChatId(item.chatId));
    dispatch(messageService.resetMessage());
    dispatch(messageService.getAllMessage(item.chatId, token, 15, 0));
  }, [item.chatId]);
  const { message } = useSelector((store) => store);

  // Cập nhật sendMess khi chatId thay đổi
  useEffect(() => {
    setSendMess({
      userSend: userLogin.userId,
      receiver: item.chatId, // Cập nhật chatId mới
      data: "",
    });
  }, [item.chatId, userLogin.userId]);

  useEffect(() => {
    dispatch(
      statusService.updateValueFromGroupStatus(groupStatus, item.chatId)
    );
  }, [token]); //  quan trọng

  useEffect(() => {
    const socketFactory = () => new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socketFactory);
    client.connect(
      {},
      () => {
        setStompClient(client);
        client.subscribe("/topic/messages", (messageS) => {
          const receivedMessage = JSON.parse(messageS.body);
          dispatch(
            messageService.getAllMessage(item.chatId, token, size, page)
          );
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
  }, [item.chatId]);
  // giữ ở lại giao diện cũ khi nhắn

  const loadMessages = async () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    if (!scrollableDiv) return;

    // 1️⃣ Lưu vị trí cuộn hiện tại (vị trí của tin nhắn đầu tiên đang hiển thị)
    const prevScrollHeight = scrollableDiv.scrollHeight;
    const prevScrollTop = scrollableDiv.scrollTop;
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      await messService
        .getAllMessage(item.chatId, token, size, nextPage)
        .then((data) => {
          if (data.data.length === 0) {
            setHasMore(false);
          } else {
            dispatch(messageService.addMessages(data.data));
            setPage(nextPage);
          }
        });
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trong InfiniteScroll

  return (
    <div className="w-full h-[600px] md:h-[800px] flex flex-col bg-white p-6 rounded-r-lg">
      <div className="flex items-center justify-between p-4 border-b">
        {/* Avatar & Name */}
        <div className="flex items-center gap-3">
          <img
            src={
              currentItem.chatImage
                ? currentItem.chatImage
                : "https://th.bing.com/th/id/OIP.4BZL7oQIEuwTFAg7QYsshAHaHa?w=500&h=500&rs=1&pid=ImgDetMain"
            }
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="font-semibold text-lg">{currentItem?.chatName}</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-gray-600 text-2xl">
          <Phone className="cursor-pointer hover:text-green-400" size={30} />
          <Videocam className="cursor-pointer hover:text-green-400" size={50} />
          <CustomizedMenus
            item={item}
            setItem={setCurrentItem}
            userLogin={userLogin}
          />
        </div>
      </div>

      {message.messages.length === 0 ? (
        <div className=" content-container flex-1  flex flex-col-reverse parent">
          <div className=" welcome-card child">
            <img
              src="https://th.bing.com/th/id/OIP.DvlYtdWSPZzpLHuEhDXNSwHaFj?rs=1&pid=ImgDetMain"
              alt="Welcome"
              className="welcome-image"
            />
            <div className="welcome-text">
              <span className="emoji">👋</span>
              <span>Hãy gửi lời chào đến người bạn mới!</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          id="scrollableDiv"
          className="flex-1 overflow-y-auto flex flex-col-reverse p-4 relative"
        >
          {/* Overlay loading */}
          {loading && (
            <div className="absolute inset-0 bg-white/50 flex justify-center items-center z-10">
              <ClipLoader color="#36d7b7" size={30} />
            </div>
          )}

          {/* Infinite Scroll */}
          <InfiniteScroll
            dataLength={message.messages.length}
            next={loadMessages}
            hasMore={hasMore}
            inverse={true}
            loader={
              <div className="sticky-loader">
                <ClipLoader
                  size={25}
                  color="#3B82F6"
                  cssOverride={{
                    display: "block",
                    margin: "0 auto",
                    borderWidth: "4px",
                    position: "relative",
                    top: "10px",
                  }}
                />
              </div>
            }
            scrollableTarget="scrollableDiv"
          >
            <div className="flex flex-col gap-3">
              {message.messages
                ?.slice()
                .reverse()
                .map((items, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      items.userId === userLogin.userId
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* Avatar bên trái nếu là người khác */}
                    {items.userId !== userLogin.userId && (
                      <img
                        src={
                          item.chatImage
                            ? item.chatImage
                            : "https://th.bing.com/th/id/OIP.4BZL7oQIEuwTFAg7QYsshAHaHa?w=500&h=500&rs=1&pid=ImgDetMain"
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    )}

                    {/* Nội dung tin nhắn */}
                    <div className="flex flex-col max-w-[75%]">
                      <span
                        className={`text-[10px] text-gray-400 mb-1 ${
                          items.userId === userLogin.userId
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {items.fullName}
                      </span>

                      <div
                        className={`py-2 px-4 rounded-2xl break-words ${
                          items.userId === userLogin.userId
                            ? "bg-black text-white self-end"
                            : "bg-green-500 text-white self-start"
                        }`}
                      >
                        {items.content}
                      </div>

                      <span
                        className={`text-[10px] text-gray-400 mt-1 ${
                          items.userId === userLogin.userId
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {formatTimestamp(items.timestamp)}
                      </span>
                    </div>

                    {/* Avatar bên phải nếu là bạn */}
                    {items.userId === userLogin.userId && (
                      <img
                        src={
                          userLogin?.thumbnail !== null
                            ? userLogin.thumbnail
                            : "https://th.bing.com/th/id/OIP.4BZL7oQIEuwTFAg7QYsshAHaHa?w=500&h=500&rs=1&pid=ImgDetMain"
                        }
                        alt="avatar"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                ))}
            </div>
          </InfiniteScroll>
        </div>
      )}

      {/* Footer (Input gửi tin nhắn) */}
      <div className="flex items-center gap-2 mt-3 p-3 border-t">
        {/* Biểu tượng */}
        <BsEmojiSmile className="text-xl cursor-pointer text-gray-500 hover:text-gray-700" />
        <ImAttachment className="text-xl cursor-pointer text-gray-500 hover:text-gray-700" />

        {/* Input nhập tin nhắn */}
        <input
          type="text"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setSendMess((prev) => ({ ...prev, data: e.target.value }));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && content.trim() !== "") {
              stompClient.send("/app/chat", {}, JSON.stringify(sendMess));
              setContent("");
            }
          }}
          placeholder="Aa"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Biểu tượng micro và like */}
        <BsMicFill className="text-xl cursor-pointer text-gray-500 hover:text-gray-700" />
        <BsHandThumbsUp
          className="text-2xl cursor-pointer text-blue-500 hover:scale-110 transition-transform"
          onClick={() => {
            const likeMessage = { ...sendMess, data: "👍" };
            stompClient.send("/app/chat", {}, JSON.stringify(likeMessage));
          }}
        />
      </div>
    </div>
  );
};

export default MessageCard;
