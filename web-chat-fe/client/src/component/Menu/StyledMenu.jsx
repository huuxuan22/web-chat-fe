import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Height, Info } from "@mui/icons-material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ImageIcon from "@mui/icons-material/Image";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { Alert, Snackbar, TextField } from "@mui/material";
import * as chatService from "./../../Service/ChatService";
import { data } from "autoprefixer";
import { CheckIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import * as chatServiceRedux from "./../../Redux/Chat/Action";
import * as userServiceRedux from "./../../Redux/Auth/Action";
import ErrorIcon from "@mui/icons-material/Error";
import WatchUser from "../AddFriend/WatchUser";

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    with: 300,
    minWidth: 280,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const users = [
  { id: 1, name: "Nguyễn Văn A", avatar: "https://via.placeholder.com/40", isFriend: false },
  { id: 2, name: "Trần Thị B", avatar: "https://via.placeholder.com/40", isFriend: true },
  { id: 3, name: "Phạm Văn C", avatar: "https://via.placeholder.com/40", isFriend: false },
];

export default function InfoMenu({ item, setItem, userLogin }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // Khi click icon, mở menu tại vị trí icon
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  //=====================================UPDATE CHAT NAME===========================
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState("Đổi tên nhóm");
  const [errorGroupName, setErrorGroupName] = useState();
  const [existAlert, setExistAlert] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleChangeFullName = (groupName) => {
    setItem((prev) => ({ ...prev, chatName: groupName }));
  };
  const handleChangChatName = async (event) => {
    event.preventDefault();
    console.log("tên nhóm: ", groupName);
    if (groupName.trim() !== "") {
      await chatService
        .updateChatName(item.chatId, groupName,token)
        .then((data) => {
          if (!data.success) {
            setErrorGroupName(data.data);
          } else {
            dispatch(userServiceRedux.searchUser({ keyword: "", token }));
            setIsEditing(false);
            setExistAlert(true);
            handleChangeFullName(groupName);
            setGroupName("");
          }
        });
    }
  };
  //===================================================================================

  //===========================UPDATE CHAT IMAGE========================================
  const [succesAvatar,setSuccesAvatar] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Có lỗi xảy ra!");
  const handleSelectFile = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Images",
            accept: { "image/*": [".png", ".jpg", ".jpeg"] },
          },
        ],
      });
      const file = await fileHandle.getFile();
      handleFileChange({ target: { files: [file] } }); // Gửi file vào hàm xử lý
    } catch (error) {
      console.log("User cancelled file selection");
    }
  };

  const handleChangeAvatar = (avatar) => {
    setItem((prev) => ({ ...prev, chatImage: avatar }));
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log(item);
    
    try {
      // chatId,chatName,token
      await chatService
        .updateChatAvatar(item.chatId, formData,item.chatImage, token)
        .then((data) => {
          if (!data.success) {
            setErrorMessage(data.data);
            setErrorAlert(true); // Hiển thị thông báo lỗi
          }else {
            dispatch(userServiceRedux.searchUser({ keyword: "", token }));
            handleChangeAvatar(data.data);
            setSuccesAvatar(true);
          }
        });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  // ==================================================================================
  const [showWatchUser,setShowWatchUser] = useState(false);
  const handleWatchUser = () => {
    if (!showWatchUser) {
      setShowWatchUser(true);
    }else {
      setShowWatchUser(false)
    }
  }
  return (

           
    <div >
      {/* Biểu tượng Info */}
      <Info
        onClick={handleClick}
        className="cursor-pointer hover:text-green-400"
        style={{ fontSize: 30 }}
      />
      {/* Menu được hiển thị tại vị trí Info icon */}
      <StyledMenu
        id="info-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "info-button",
        }}
        PaperProps={{
          style: {
            width: 400,  // Điều chỉnh độ rộng menu
          },
        }}
      >
        {item.isGroup === 1 ? (
          <div>
            <MenuItem onClick={handleEditClick} disableRipple>
              {!isEditing ? (
                <div>
                  <DriveFileRenameOutlineIcon />
                  Đổi tên nhóm
                </div>
              ) : (
                <form onSubmit={handleChangChatName}>
                  <TextField
                    autoFocus
                    placeholder="Tên nhóm"
                    onChange={(event) => setGroupName(event.target.value)}
                    size="small"
                    variant="standard"
                  />
                  {errorGroupName && (
                    <p className="text-red-700">{errorGroupName}</p>
                  )}
                </form>
              )}
            </MenuItem>
            <MenuItem onClick={handleSelectFile} disableRipple>
              <PhotoCameraIcon />
              Đổi ảnh đại diện nhóm
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            
            <MenuItem onClick={handleWatchUser} disableRipple>
              <GroupIcon />
                Xem thành viên
                
            </MenuItem>
            {showWatchUser && (<WatchUser  chatId={item.chatId} userLogin={userLogin}/>)}
            <MenuItem onClick={handleClose} disableRipple>
              <SettingsIcon />
              More
            </MenuItem>
            
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose} disableRipple>
              <PersonRemoveIcon />
              Hủy kết bạn
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <ImageIcon />
              File ảnh đa phương tiện
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={handleClose} disableRipple>
              <PersonIcon />
              Trang cá nhân
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <SettingsIcon />
              More
            </MenuItem>
          </div>
        )}
      </StyledMenu>

      <Snackbar
        open={existAlert}
        autoHideDuration={3000} // Tự động ẩn sau 3s
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Hiển thị góc trên bên phải
        onClose={() => setExistAlert(false)} // Tắt thông báo khi hết thời gian
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Bạn đã đổi Tên nhóm
        </Alert>
      </Snackbar>

      <Snackbar
        open={succesAvatar}
        autoHideDuration={3000} // Tự động ẩn sau 3s
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Hiển thị góc trên bên phải
        onClose={() => setSuccesAvatar(false)} // Tắt thông báo khi hết thời gian
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Bạn đã đổi Ảnh nhóm
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setErrorAlert(false)}
      >
        <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      ;
    </div>
  );
}
