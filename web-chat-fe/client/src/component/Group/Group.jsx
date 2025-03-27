import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as groupService from "./../../Service/GroupService";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const Group = ({ open, onClose, setOpenGroup,handleSearchChat,setCheckChat,check }) => {
  const [usersList, setUsersList] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const token = localStorage.getItem("token");
  const [openN, setOpenN] = useState(false);
  const [message, setMessage] = useState("Thêm mới thành công");
  // Hàm bật trạng thái thêm người dùng
  const toggleUser = (id) => {
    setUserIds((prev) => {
      const updatedUsers = prev.includes(id)
        ? prev.filter((userId) => userId !== id) // Xóa nếu đã tồn tại
        : [...prev, id]; // Thêm vào nếu chưa có
      return updatedUsers;
    });
  };

  const validateSchema = yup.object().shape({
    groupName: yup.string().required("*Tên nhóm được bỏ trống"),
  });
  const {
    register,
    handleSubmit,
    setError,
    setValue, // để set lại từng giá trị
    reset, // để reset toàn bộ form
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });

  // Theo dõi thay đổi của selectedUsers
  useEffect(() => {}, [userIds]);

  const handleSearch = async (data) => {
    try {
      await groupService.searchUser({ data, token }).then((data) => {
        if (Array.isArray(data)) {
          setUsersList(data);
        } else {
          console.error("Dữ liệu tìm kiếm không hợp lệ:", data);
        }
      });
    } catch (error) {
      console.error("Lỗi khi tìm kiếm người dùng:", error);
    }
  };

  const onSubmit = async (value) => {
    if (userIds.length === 0) {
      setOpenN(true);
      setMessage("Bạn chưa chọn người tham gia");
    } else {
      const res = groupService
        .createGroup({ userIds,  groupName: value.groupName }, token)
        .then((data) => {
          console.log("data: ", data.data);
          if (!data.success) {
            if (data.data.groupName) {
              setError("groupName", {
                type: "manual",
                message: data.data.groupName, // Gán thông báo lỗi từ API
              });
            }
        }else {
          setMessage("Tạo nhóm mới thành công");
          setOpenN(true);
          setOpenGroup(false);
          setCheckChat(!check);
          handleSearchChat();
        }
        });
    }
  };

  const handleClose = () => {
    setOpenN(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 bg-white rounded-lg">
            {/* Title */}
            <DialogTitle className="text-center text-xl font-semibold text-blue-600">
              Create a group
            </DialogTitle>

            {/* Upload & Input */}
            <div className="flex items-center gap-4 p-4">
              <TextField
                fullWidth
                variant="standard"
                placeholder="Name your group"
                error={!!errors.groupName}
                helperText={errors.groupName?.message}
                {...register("groupName")}
              />
            </div>

            {/* Search Input */}
            <div className="relative mt-4">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search for people to add"
                className="pl-10 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* User List */}
            <div className="mt-4 space-y-2">
              {usersList?.map((user) => {
                const isSelected = userIds.includes(user.userId);
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          !user.thumbnail
                            ? "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                            : user.thumbnail
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium">{user.fullName}</span>
                    </div>
                    <Button
                      variant="contained"
                      color={isSelected ? "success" : "primary"}
                      onClick={() => toggleUser(user.userId)}
                    >
                      {isSelected ? "✔ Added" : "+ Add"}
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <DialogActions className="mt-4">
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </DialogActions>
          </div>
        </form>
      </Dialog>

      <Snackbar
        key={message}
        open={openN}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};

export default Group;
