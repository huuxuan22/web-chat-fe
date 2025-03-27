import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axios from "axios"; // Thêm axios để gửi request
import * as userService from "./../../Redux/Auth/Action";
import * as userService1 from "./../../Service/UserService";
import { BASE_API_URL } from "../../config/api";
import { Alert, Button, Snackbar } from "@mui/material";
import { data } from "autoprefixer";

const Profile = ({ setIsProfile, userLogin, LoadUser }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: userLogin?.fullName || "",
      password: "12345678",
    },
  });

  useEffect(() => {
    setOpen(false);
  }, []);
  const [inputValue, setInputValue] = useState("12345678");
  const [showErr, setShowErr] = useState(false);
  const [dataErr, setDataErr] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  // ===== 3. HANDLE FORM SUBMIT (NAME + PASSWORD) =====
  const onSubmit = async (data) => {
    try {
      if (data.password === "12345678") {
        data = { ...data, password: "" };
      }
      await userService1
        .updateUser(
          {
            fullName: data.fullName,
            password: data.password,
          },
          token
        )
        .then((data) => {
          if (!data.success) {
            if (data.data.fullName) {
              setError("fullName", {
                type: "manual",
                message: data.data.fullName, // Gán thông báo lỗi từ API
              });
            } else if (data.data.password) {
              setError("password", {
                type: "manual",
                message: data.data.password, // Gán thông báo lỗi từ API
              });
            }
          } else {
            LoadUser();
            // Delay 1 chút rồi chuyển màn
            setTimeout(() => {
              setIsProfile(true);
            }, 1000);
            setOpen(true);
          }
        });
      console.log(data);

      // console.log(res.data);
      // Optional: Update redux nếu cần
      // dispatch(userService.updateProfile(res.data));
    } catch (err) {
      console.error(err);
      alert("Error updating profile!");
    }
  };

  const handleShowProfile = () => {
    setIsProfile(true);
  };

  const [previewImage, setPreviewImage] = useState(
    userLogin?.thumbnail ||
      "https://th.bing.com/th/id/OIP.FMqCl9QpsBme2zXSegsolwHaHa?rs=1&pid=ImgDetMain"
  );
  const [selectedFile, setSelectedFile] = useState(null); // Lưu file ảnh

  // ===== 1. HANDLE IMAGE CHANGE =====
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedFile(file); // Lưu file để submit
    }
  };

  // ===== 2. HANDLE AVATAR UPLOAD =====
  const handleUpdateAvatar = async () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("formData: ", formData);

    try {
      const res = await axios.post(
        `${BASE_API_URL}/api/user/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      [...formData.entries()].forEach(([key, value]) => {
        console.log("Đây là dữ liệu nè: ");
        console.log(`${key}:`, value);
      });
      setShowSuccess(true);

      // Optional: Update redux nếu cần
      // dispatch(userService.updateAvatar(res.data));
      LoadUser();
    } catch (err) {
      console.error(err);
      setShowErr(true);
      setDataErr(err.response?.data);
    }
  };

  return (
    <div className="w-1/3 h-full bg-gray-200 flex flex-col">
      {showErr && (
        <Alert
          severity="warning"
          onClose={() => {
            setShowErr(false);
          }}
        >
          {dataErr}
        </Alert>
      )}
      {showSuccess && (
        <Alert
          severity="success"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                setShowSuccess(false);
              }}
            >
              UNDO
            </Button>
          }
        >
          Bạn đã cập nhật ảnh thành công
        </Alert>
      )}
      {/* Header */}
      <div
        onClick={handleShowProfile}
        className="bg-[#20ac8b] text-white flex items-center cursor-pointer px-4 py-3 shadow-md"
      >
        <FaArrowLeft className="text-lg mr-4 " />
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>

      <div className="flex flex-col items-center relative">
        <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-white shadow-lg relative group">
          <img
            src={previewImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {/* Overlay camera */}
          <label className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <FaCamera className="text-white text-3xl" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Chạm vào camera để cập nhật
        </p>

        {/* BUTTON UPDATE AVATAR */}
        <button
          type="button"
          onClick={handleUpdateAvatar}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Cập nhật ảnh
        </button>
      </div>
      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-6 space-y-6"
      >
        {/* PROFILE PICTURE */}

        {/* NAME */}
        <div className="w-2/3">
          <label className="block text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Name is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="w-2/3">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder={register.password}
            onFocus={() => {
              setValue("password", "");
            }}
            {...register("password")}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-[#20ac8b] text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          Update Profile
        </button>
      </form>

      {/* Info */}
      <div className="px-4 py-3 bg-gray-300 mt-6 text-gray-700 text-sm">
        This is not your username, this name will be visible to your WhatsApp
        contacts.
      </div>
      <Snackbar
        open={open}
        autoHideDuration={5000} // 👈 thời gian hiển thị: 5000ms = 5s
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
