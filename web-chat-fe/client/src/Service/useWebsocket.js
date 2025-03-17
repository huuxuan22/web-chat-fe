import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

const useWebSocket = (token) => {
  const stompClientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const connect = () => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      console.log("websocket đã kết nối trước đó rồi !");
      return;
    }
  };
  const socketFactory = () => new SockJS("http://localhost:8080/ws");
  const client = Stomp.over(socketFactory);
  client.connect(
    { Authorization: `Bearer ${token}` },
    () => {
      console.log("✅ Kết nối WebSocket thành công!");
      stompClientRef.current = client;
      setConnected(true);
      // lắng nghe yêu cầu kết bạn
      client.subscribe("/topic/notification-add", (message) => {
        console.log("📩 Yêu cầu kết bạn nhận được:", message.body);
        
      });
      // lắng nge thông báo chung
      client.subscribe("/topic/cancel-nofitication-add", (message) => {
        console.log("📩 Thông báo nhận được:", message.body);
        
      });
    },
    (error) => {
      console.error("❌ Lỗi kết nối WebSocket:", error);
    }
  );
  // gửi lời mời kết bạn
  const sendFriendRequest = (userSend, userReceive) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const request = { userSend, userReceive }; // Đảm bảo gửi đúng userSend và userReceive
      stompClientRef.current.send(
        "/app/notification-add",
        {},
        JSON.stringify(request)
      );
    } else {
      console.error("🚨 WebSocket chưa kết nối!");
    }
  };

  // gửi thông báo
  const sendNotification = (message) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      const notification = { message, type: "cancel-nofitication-add" };
      stompClientRef.current.send(
        "/app/notification",
        {},
        JSON.stringify(notification)
      );
    } else {
      console.error("🚨 WebSocket chưa kết nối!");
    }
  };
  useEffect(() => {
    connect();
    return () => stompClientRef.current?.disconnect();
  }, []);
  return { sendFriendRequest, sendNotification,connected };
};

export default useWebSocket;
