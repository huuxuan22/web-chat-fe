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
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Group from "../Group/Group";
const HomePage = () => {
  const [query, setQuery] = useState(null);
  const [currentChat, setCurrentChat] = useState(false);
  const [content, setContent] = useState("");
  const handleSearch = () => {};
  const [isProfile, setIsProfile] = useState(true);
  const navigate = useNavigate();
  const [openGroup, setOpenGroup] = useState(false);
  const handleClickOnChatCard = () => {
    setCurrentChat(true);
  };

  const handleCreateNewMessage = () => {};
  const handleShowProfile = () => {
    setIsProfile(false);
  };
  console.log(isProfile);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
                  src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
                  alt="User Avatar"
                />
                <p className="font-semibold">Username</p>
              </div>
              <div className="space-x-3 text-2xl flex cursor-pointer">
                <TbCircleDashed
                  onClick={() => {
                    navigate("/status");
                  }}
                />
                <BiCommentDetail onClick={handleClick} />
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
                    <MenuItem onClick={() => setOpenGroup(true)}>Create Group</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
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
            <div className="flex-1  space-y-1 overflow-y-auto bg-white rounded-lg shadow-inner p-2">
              {query &&
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                  <div
                    key={index}
                    onClick={handleClickOnChatCard}
                    className="mb-2 border-b pb-2"
                  >
                    <ChatCard />
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <Profile setIsProfile={setIsProfile} />
        )}

        {/* Main Chat Area */}
        {currentChat ? (
          <div className="w-2/3 h-full flex flex-col   bg-white p-2 rounded-r-lg">
            <div className="flex items-center gap-3 p-3 border-b">
              {/* Ảnh đại diện */}
              <img
                src="https://th.bing.com/th/id/OIP.OR_D8o6tNo83MYoZrQexOwHaGj?rs=1&pid=ImgDetMain" // Thay bằng URL avatar thật
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              {/* Tên người dùng */}
              <span className="font-semibold text-lg">Nguyễn Văn A</span>
            </div>
            <div className="flex flex-col h-full gap-1 border border-none display-right mt-8">
              {[1, 1, 1, 1, 1].map((item, index) => (
                <MessageCard
                  key={index}
                  isRequest={index % 2 === 0}
                  content={"heeeeeeee"}
                />
              ))}
            </div>
            <div className="footer p-[10px] flex bg-[#f0f2f5]">
              <div className="w-[20%] gap-3 flex justify-between items-center px-5 relative">
                <BsEmojiSmile size={24} className="cursor-pointer" />
                <ImAttachment size={24} className="cursor-pointer" />
                <BsMicFill size={24} className="cursor-pointer" />
              </div>
              <div className="w-[100%]">
                <input
                  className="py-3 rounded-xl  outline-none border-none  bg-white pl-8 rounder-md w-[100%]"
                  type="text"
                  placeholder="Type message......."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key == "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
              </div>

              <div className="w-[10%] gap-3 flex justify-center items-center  relative">
                <BsHandThumbsUp size={24} className="cursor-pointer " />
              </div>
            </div>
          </div>
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
      <Group open={openGroup} onClose={() => setOpenGroup(false)} />

      {/* cửa sổ nhắn tin chỗ này  */}
    </div>
  );
};

export default HomePage;
