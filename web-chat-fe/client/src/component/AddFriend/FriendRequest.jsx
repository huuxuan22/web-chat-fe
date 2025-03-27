import React, { useEffect, useRef } from "react";
import { Button, Card, CardContent, Typography, Avatar } from "@mui/material";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import * as notificationService from "./../../Service/notificationService";

const FriendRequest = ({
  senderName,
  value,
  onAccept,
  onReject,
  userLogin,
  token,
  triggerEffect,
  reloadNotification,
}) => {
  useEffect(() => {
    if (value.isRead === 1) {
      notificationService.deleteNOtificationByIsRead2(
        token,
        value.notificationId
      ).then((res) => {
        reloadNotification()
      });
    }
  }, [triggerEffect]);

  console.log(value);
  console.log("người gửi: ", value.sender.userId);
  console.log("người đăng nhập", userLogin.userId);

  return (
    <Card className="w-72 shadow-lg rounded-lg mb-3">
      {value.sender.userId === userLogin.userId ? (
        Number(value.isRead) === 1 &&
        value.sender.userId === userLogin.userId && (
          <CardContent>
            <div className="flex items-center space-x-3 mb-4">
              <Avatar
                src={value.avatarUrl}
                alt={senderName}
                className="w-12 h-12"
              />
              <Typography variant="h6" className="font-bold">
                {value.receiver.fullName}
                <p className="text-sm">Đã chấp nhận lời mời kết bạn</p>
              </Typography>
            </div>
          </CardContent>
        )
      ) : (
        <div className="flex items-center space-x-3 mb-4">
          <Avatar
            src={value.avatarUrl}
            alt={senderName}
            className="w-12 h-12"
          />
          <Typography variant="h6" className="font-bold">
            <p className="text-sm">Bạn và {value.sender.fullName} đã là bạn bè</p>
          </Typography>
        </div>
      )}
      {Number(value.isRead) === 0 && (
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <Avatar
              src={value.avatarUrl}
              alt={senderName}
              className="w-12 h-12"
            />
            <Typography variant="h6" className="font-bold">
              {senderName}
              <p className="text-sm">Đã gửi cho bạn lời mời kết bạn</p>
            </Typography>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#20ac8b !important",
                color: "white !important",
                border: "1px solid #20ac8b !important",
                flex: 1,
                "&:hover": {
                  border: "1px solid #1a9474 !important",
                  backgroundColor: "#1a9474 !important",
                },
              }}
              onClick={onAccept}
            >
              Xác nhận
            </Button>

            <Button
              variant="outlined"
              sx={{
                border: "1px solid #20ac8b !important",
                color: "#20ac8b !important",
                flex: 1,
                "&:hover": {
                  border: "1px solid #1a9474 !important",
                  color: "#1a9474 !important",
                },
              }}
              onClick={onReject}
            >
              Xóa
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const FriendRequestsList = ({
  notifications,
  setCheck,
  userLogin,
  reloadNotification,
  triggerEffect,
}) => {
  const token = localStorage.getItem("token");
  const stompClientRef = useRef(null);

  useEffect(() => {
    const socketFactory = () => new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socketFactory);

    client.connect(
      {},
      () => {
        console.log("✅ Kết nối WebSocket thành công!");
        stompClientRef.current = client;

        client.subscribe("/topic/messages", (message) => {
          const data = JSON.parse(message.body);
          reloadNotification();
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
  }, []);

  const handleAccept = (value) => {
    try {
      const newInvitation = {
        userSend: value.sender.userId,
        userReceive: value.receiver.userId,
        message: "acceptFriend",
      };
      const jsonMessage = JSON.stringify(newInvitation);
      if (stompClientRef.current) {
        stompClientRef.current.send(
          "/app/accept-notification-add",
          {},
          jsonMessage
        );
        reloadNotification();
      }
    } catch (error) {}
  };

  const handleReject = (value) => {
    try {
      const newInvitation = {
        userSend: value.sender.userId,
        userReceive: value.receiver.userId,
        message: "cancel-add-friend",
      };
      const jsonMessage = JSON.stringify(newInvitation);
      if (stompClientRef.current) {
        stompClientRef.current.send(
          "/app/cancel-notification-add",
          {},
          jsonMessage
        );
        reloadNotification();
      }
    } catch (error) {}
  };

  return (
    <div className="p-4">
      {notifications.length === 0 ? (
        <Card className="w-72 shadow-lg rounded-lg mb-3">
          <CardContent>
            <Typography variant="h6" className="text-center text-gray-500">
               Không có thông báo nào
            </Typography>
          </CardContent>
        </Card>
      ) : (
        notifications.map((request) => (
          <div>
            <FriendRequest
              key={request.notificationId}
              senderName={request.sender.fullName}
              value={request}
              onAccept={() => handleAccept(request)}
              onReject={() => handleReject(request)}
              check={request.isRead}
              userLogin={userLogin}
              reloadNotification={reloadNotification}
              token={token}
              triggerEffect={triggerEffect}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default FriendRequestsList;
