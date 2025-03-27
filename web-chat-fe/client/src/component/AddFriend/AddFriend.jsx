  import React, { useEffect, useState, useRef, use } from "react";
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
  } from "@mui/material";
  import SearchIcon from "@mui/icons-material/Search";
  import { useDispatch, useSelector } from "react-redux";
  import * as userService from "./../../Redux/Auth/Action";
  import ChatIcon from "@mui/icons-material/Chat";
  import AddIcon from "@mui/icons-material/Add";
  import SockJS from "sockjs-client";
  import { Stomp } from "@stomp/stompjs";
  import useWebSocket from "../../Service/useWebsocket";
  import * as notificationService from "./../../Redux/Notification/Action";
  import { set } from "react-hook-form";
  
  const AddFriend = ({ open, onClose, userLogin,reloadNotification,setUserChat }) => {
    const [search, setSearch] = useState("");
    const stompClientRef = useRef(null); // Sử dụng useRef để giữ WebSocket client
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const token = localStorage.getItem("token");

    
    useEffect(() => {
      // Khởi tạo WebSocket client chỉ một lần khi component được mount
      const socketFactory = () => new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socketFactory);

      client.connect(
        {},
        () => {
          stompClientRef.current = client;
          client.subscribe("/topic/messages", (message) => {
            dispatch(userService.searchUserForAdd({ search, token }));
            reloadNotification();
          });
        },
        (error) => {
        }
      );

      return () => {
        if (client) {
          client.disconnect(() => {
          });
        }
      };
    }, []);

    const handleSearch = async () => {
      await dispatch(userService.searchUserForAdd({ search, token }));
    };

    const handleClose = () => {
      onClose(false);
    };

    
    const handleAddFriend = async (friend) => {
      try {
        const newInvitation = {
          userSend: userLogin.userId,
          userReceive: friend.userId,
          message : "addFriend"
        };
        const jsonMessage = JSON.stringify(newInvitation);
        if (stompClientRef.current) {
          stompClientRef.current.send("/app/notification-add", {}, jsonMessage);
          reloadNotification();
          handleSearch();
        }
      } catch (error) {
        
      }
    };
    const handleCancelAddFriend = async (friend) => {
    
      try {
          const cancelInvitation = {
            userSend: userLogin.userId,
            userReceive: friend.userId,
            message : "cancelFriend"
          };
          const jsonMessage = JSON.stringify(cancelInvitation);
          stompClientRef.current.send("/app/cancel-notification-add", {}, jsonMessage);
          reloadNotification();
          handleSearch();
      } catch (error) {
        
      }
    };


    const handleChat = (value) => {
        setUserChat(value);
        handleClose();
    }
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiDialog-paper": { maxHeight: "90vh" } }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "#20ac8b" }}>
          TÌM KIẾM BẠN BÈ
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm bạn bè"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* ✅ Hiển thị danh sách tìm kiếm */}
          {search && (
            <List
              sx={{
                mt: 2,
                maxHeight: 500,
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              {auth.searchUserForAdd.length > 0 ? (
                auth.searchUserForAdd.map((friend) => {
                  return (
                    <ListItem
                      key={friend.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          transition: "background-color 0.3s ease",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={friend?.thubnail ? friend.thubnail : "https://th.bing.com/th/id/OIP.FMqCl9QpsBme2zXSegsolwHaHa?rs=1&pid=ImgDetMain"} />
                      </ListItemAvatar>
                      <ListItemText primary={friend.fullName} />

                      {/* ✅ Nút Kết bạn / Nhắn tin / Hủy lời mời */}
                      {friend.isGroup === 1 || friend.isGroup === 2 ? (
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<ChatIcon />}
                          onClick={() => handleChat(friend)}
                        >
                          Nhắn tin
                        </Button>
                      ) :  friend.isGroup === 3 ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleCancelAddFriend(friend)}
                          startIcon={<AddIcon />}
                        >
                          Hủy lời mời
                        </Button>
                      ) : friend.isGroup === 4 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleAddFriend(friend)}
                          startIcon={<AddIcon />}
                        >
                          Kết bạn
                        </Button>
                      ) : null}
                    </ListItem>
                  );
                })
              ) : (
                <Typography sx={{ p: 2, textAlign: "center", color: "gray" }}>
                  Không tìm thấy bạn bè
                </Typography>
              )}
            </List>
          )}
        </DialogContent>

        <DialogContent
          sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
        >
          <Typography
            sx={{ cursor: "pointer", color: "purple", fontWeight: "bold" }}
            onClick={handleClose}
          >
            CANCEL
          </Typography>
        </DialogContent>
      </Dialog>
    );
  };

  export default AddFriend;