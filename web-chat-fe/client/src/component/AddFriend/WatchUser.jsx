import React, { useEffect, useState } from "react";
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Typography, List } from "@mui/material";
import { MoreVertical } from "lucide-react";
import * as chatService from "./../../Service/ChatService"

const WatchUser = ({chatId,userLogin}) => {
  console.log("ddax ddi vafo day");
  const [userInList,setUserInList] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    getUserInList();
  },[chatId]);
  const getUserInList = async () => {
    await  chatService.userListInChat(chatId,token).then((data) => {
      console.log(data.data);
      
      setUserInList(data.data);
    })
  }
  return (
    <div
      style={{
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", paddingBottom: 1, fontSize: 16 }}>
        Thành viên trong đoạn chat
      </Typography>

      {/* Để cuộn được khi danh sách dài */}
      <div style={{ maxHeight: 350, overflowY: "auto", overflowX: "hidden" }}>
        <List>
          {userInList.map((user) => (
            <ListItem key={user.id} sx={{ display: "flex", alignItems: "center" }}>
              <ListItemAvatar>
                <Avatar sx={{ width: 32, height: 32 }} src={user.thumbnail}></Avatar> {/* Avatar nhỏ */}
              </ListItemAvatar>
              <ListItemText
                primary={<Typography variant="body2">{user.fullName}</Typography>}
                secondary={<Typography variant="caption">{userLogin.userId === user.userId ? "Bạn" : user.typeUser}</Typography>}
              />
              <IconButton size="small">
                <MoreVertical size={16} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default WatchUser;
