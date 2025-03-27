import { TbCircleDashed } from "react-icons/tb";
import "./HomePage.css";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEmojiSmile, BsFilter, BsMicFill } from "react-icons/bs";
import ChatCard from "../ChatCard/ChatCard";
import { useState } from "react";
import MessageCard from "../MessageCard/MessageCard";
import { ImAttachment } from "react-icons/im";
import { BiSend } from "react-icons/bi";
import { BsHandThumbsUp } from "react-icons/bs";
import Profile from "../Profile/Profile";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Group from "../Group/Group";
import * as userService from "./../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../Redux/store";
import { useEffect } from "react";
import SockJS from "sockjs-client";
import * as statusService from "./../../Redux/Status/Action";
import { Stomp } from "@stomp/stompjs";
import { Alert, Badge, Snackbar } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddFriend from "../AddFriend/AddFriend";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Import biểu tượng mới
import FriendRequestsList from "../AddFriend/FriendRequest";
import * as notificationService from "./../../../src/Service/notificationService";
import * as userService1 from "./../../Service/UserService";
import { set } from "react-hook-form";
import { useAuth } from "./../../contexts/authContext/index";
import { useContext } from "react";
import StaticModal from "../Modal/StaticModal";

const HomePage = ({ children }) => {
  const [query, setQuery] = useState(null);
  const location = useLocation();
  const { notificationCheck } = location.state || {};
  const [openNotification, setOpenNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logout,setLogout] = useState(false);
  // Khi component mount, nếu nhận được openNotification, thì mở Snackbar
  useEffect(() => {
    if (notificationCheck) {
      setOpenNotification(true);
    }
  }, [notificationCheck]);
  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenNotification(false); // đóng Snackbar
  };
  const [currentChat, setCurrentChat] = useState(false);
  const [isProfile, setIsProfile] = useState(true);
  const [chatUser, setChatUser] = useState(null);
  const [userLogin, setUserLogin] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, chat, message, status } = useSelector((store) => store);
  const { notification } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [openGroup, setOpenGroup] = useState(false);
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [check, setCheck] = useState(false);
  const [checkChat, setCheckChat] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const { currentUser } = useAuth();
  if (!token && !currentUser) {
    navigate("/signin");
  }
  const reloadNotification = async () => {
    await notificationService.getAllNotification(token).then((res) => {
      setNotificationList(res.data);
    });
  };
  const LoadUser = async () => {
    await userService1.currentUser(token).then((data) => {
      setUserLogin(data.data);
    });
  };
  useEffect(() => {
    reloadNotification();
    LoadUser();
  }, []);

  useEffect(() => {}, [setCheckChat]);

  const handleClickOnChatCard = (value) => {
    setChatUser(value);
    setCurrentChat(true);
  };

  const handleShowProfile = () => {
    setIsProfile(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await dispatch(userService.currentUser(token));
    };

    if (token) {
      fetchUser();
    }
  }, [token, dispatch]);

  const handleSearch = async (keyword) => {
    await dispatch(userService.searchUser({ keyword, token }));
  };

  useEffect(() => {
    if (token) {
      const keyword = "";
      dispatch(userService.searchUser({ keyword, token }));
    }
  }, []);

  useEffect(() => {
    if (auth.searchUser) {
      dispatch(statusService.giveValueToGroupStatus(auth.searchUser));
    }
  }, [auth.searchUser]);

  useEffect(() => {
    if (token) {
      const keyword = "";
      dispatch(userService.searchUser({ keyword, token }));
    }
  }, [checkChat]);

  // webSocket ========================================================================
  const socketFactory = () => new SockJS("http://localhost:8080/ws");
  const client = Stomp.over(socketFactory);
  const [stompClient, setStompClient] = useState(null);
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
  const handleClickAddFriend = () => {
    setOpenAddFriend(true);
  };

  // <button data-modal-target="static-modal" data-modal-toggle="static-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  //   Toggle modal
  // </button>

  // <!-- Main modal -->

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-200">
      <div className="w-full py-6 bg-[#20ac8b]"></div>
      <div className="flex flex-row bg-[#f1f2f3] h-[90vh] m-6 rounded-lg overflow-hidden shadow-lg">
        {/* Sidebar */}
        {isProfile ? (
          <div className="w-1/3 bg-white h-full p-4 flex flex-col border-r">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 cursor-pointer">
              <div
                onClick={handleShowProfile}
                className="flex items-center space-x-3"
              >
                <img
                  className="rounded-full w-10 h-10 cursor-pointer"
                  src={
                    userLogin?.thumbnail === null
                      ? "https://th.bing.com/th/id/OIP.FMqCl9QpsBme2zXSegsolwHaHa?rs=1&pid=ImgDetMain"
                      : userLogin?.thumbnail
                  }
                  alt="User Avatar"
                />
                <p className="font-semibold">{userLogin?.fullName}</p>
              </div>
              <div className="space-x-3 text-2xl flex cursor-pointer">
                <TbCircleDashed
                  onClick={() => {
                    navigate("/status");
                  }}
                />
                <div className="relative">
                  <Badge
                    badgeContent={notificationList.length}
                    color="error"
                    onClick={() => {
                      setShowFriendRequests(!showFriendRequests);
                      setTriggerEffect((prev) => !prev);
                    }} // Toggle hiển thị danh sách
                    className="cursor-pointer"
                  >
                    <PersonAddIcon
                      style={{ fontSize: "30px", marginBottom: "10px" }}
                    />
                  </Badge>
                  {showFriendRequests && (
                    <div className="friendship-list absolute">
                      <FriendRequestsList
                        notifications={notificationList}
                        setCheck={setCheck}
                        check={check}
                        userLogin={userLogin}
                        reloadNotification={reloadNotification}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <BsThreeDotsVertical
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={() => setOpenGroup(true)}>
                      CREATE GROUP
                    </MenuItem>
                    <MenuItem onClick={handleClickAddFriend}>
                      ADD FRIEND
                    </MenuItem>
                    <MenuItem  onClick={() => setIsModalOpen(true)} >
                    
                    LOGOUT</MenuItem>
                  </Menu>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center bg-gray-100 rounded-lg p-2 mb-4">
              <AiOutlineSearch className="text-gray-500 absolute left-3 text-xl" />
              <input
                className="border-none outline-none bg-transparent pl-10 pr-4 py-2 w-full text-gray-700"
                type="text"
                placeholder="Search or start new Chat"
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                value={query}
              />
              <BsFilter className="ml-3 text-2xl cursor-pointer text-gray-600" />
            </div>

            {/* Chat List */}
            <div className="flex-1 space-y-1 overflow-y-auto bg-white rounded-lg shadow-inner p-2">
              {/* Nếu không có user nào */}
              {auth.searchUser.length === 0 ? (
                <div className="flex items-center justify-center px-4 py-6 bg-gray-50 rounded-lg text-gray-500">
                  Không có bạn bè nào
                </div>
              ) : (
                // Có dữ liệu thì map render ChatCard
                auth.searchUser
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleClickOnChatCard(item)}
                      className="mb-2 border-b pb-2"
                    >
                      <ChatCard
                        item={item}
                        image={item.chatImage}
                        groupStatus={status.groupStatus}
                        userLogin={userLogin}
                      />
                    </div>
                  ))
              )}
            </div>
          </div>
        ) : (
          <Profile
            setIsProfile={setIsProfile}
            userLogin={userLogin}
            LoadUser={LoadUser}
          />
        )}

        {/* Main Chat Area 
          userId,chatId,fullName,image
        */}
        {currentChat ? (
          <MessageCard
            item={chatUser}
            userLogin={userLogin}
            groupStatus={status.groupStatus}
          />
        ) : (
          <div className="w-2/3 h-full flex flex-col items-center justify-center bg-white p-6 rounded-r-lg">
            <img
              src="https://uploads-ssl.webflow.com/62396affb4902b847d57a975/6447c56a51c36d7cd2950602_Website_Blog_Feature-Image_How-to-use-WA-Web-for-Business.png"
              alt="Chat Illustration"
              className="w-1/2 mb-6"
            />
            <h1 className="text-3xl text-gray-700 font-bold">
              FRIENDSHIP CONNECTOR
            </h1>
            <p className="mt-4 text-gray-500 text-center max-w-md">
              The messaging app is simple, allowing users to search and start
              conversations quickly. With a minimalist, user-friendly interface,
              ChatApp supports message entry, conversation search, and message
              filters.
            </p>
          </div>
        )}
      </div>
      <Group
        open={openGroup}
        setOpenGroup={setOpenGroup}
        onClose={() => setOpenGroup(false)}
        handleSearchChat={handleSearch}
        setCheckChat={setCheckChat}
        check={check}
      />
      <AddFriend
        open={openAddFriend}
        onClose={setOpenAddFriend}
        userLogin={userLogin}
        setCheck={setCheck}
        check={check}
        reloadNotification={reloadNotification}
        triggerEffect={triggerEffect}
      />
      <Snackbar
        open={openNotification}
        onClose={handleCloseNotification}
        autoHideDuration={2000} // 👈 thời gian hiển thị: 5000ms = 5s
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "200%" }}>
          Bạn đã đăng nhập thành công!
        </Alert>
      </Snackbar>

      <StaticModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* cửa sổ nhắn tin chỗ này  */}
    </div>
  );
};

export default HomePage;
