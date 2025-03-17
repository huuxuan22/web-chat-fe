import React, { useState } from "react";
import { Button, Card, CardContent, Typography, Avatar } from "@mui/material";

const FriendRequest = ({
  senderName,
  mutualFriends,
  onAccept,
  onReject,
  check,
}) => {
  return (
    <Card className="w-72 shadow-lg rounded-lg mb-3">
      <CardContent>
        <div className="flex items-center space-x-3">
          <Avatar className="bg-gray-300" />
          <div>
            <Typography variant="h6" className="font-bold">
              {senderName}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {mutualFriends} đã gửi cho bạn lời kết bạn
            </Typography> 
          </div>
        </div>
        {check === 0 && (
          <div className="flex justify-between mt-4">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#20ac8b !important",
                color: "white !important",
                border: "1px solid #20ac8b !important",
                "&:hover": {
                  border: "1px solid #1a9474 !important",
                  backgroundColor: "#1a9474 !important",
                },
              }}
              fullWidth
              onClick={onAccept}
            >
              Xác nhận
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #20ac8b !important",
                color: "#20ac8b !important",
                "&:hover": {
                  border: "1px solid #1a9474 !important",
                  color: "#1a9474 !important",
                },
              }}
              fullWidth
              onClick={onReject}
            >
              Xóa
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FriendRequestsList = ({notifications,setCheck,userLogin}) => {
  const [requests, setRequests] = useState([
    { id: 1, senderName: "Nguyễn Văn A", mutualFriends: 5, check: true },
    { id: 2, senderName: "Trần Thị B", mutualFriends: 2, check: false },
    { id: 3, senderName: "Lê Văn C", mutualFriends: 7, check: true },
  ]);

  console.log("danh sách yêu cầu kết bạn: ", notifications);
  

  const handleAccept = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const handleReject = (id) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <div className="p-4">
      {notifications.map((request) => (
        <FriendRequest
          key={request.id}
          senderName={request.sender.fullName}
          onAccept={() => handleAccept(request.notificationId)}
          onReject={() => handleReject(request.notificationId)}
          check={request.isRead}
        />
      ))}
    </div>
  );
};

export default FriendRequestsList;
