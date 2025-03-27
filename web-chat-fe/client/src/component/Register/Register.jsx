import React, { useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "./../../Redux/Auth/Action";
const Register = () => {
  const navigate = useNavigate();
  const {auth} = useSelector(store => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const validateSchema = yup.object().shape({
    fullName: yup.string().required("Tên không được để trống"),
    username: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email bắt buộc"),
    password: yup.string().required("passwordhông được bỏ trống"),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
  });
  const onSubmit =async (data,e) => {
    e.preventDefault()
    const result =await dispatch(userService.register(data));
    if (!result.success) {
        if (result.data.fullName) {
            setError("fullName",{
              type: "manual",
              message: result.data.fullName, // Gán thông báo lỗi từ API
          })}
          else if (result.data.username) {
            setError("username",{
              type: "manual",
              message: result.data.username, // Gán thông báo lỗi từ API
          })
          }
          else if (result.data.password) {
            setError("password",{
              type: "manual",
              message: result.data.password, // Gán thông báo lỗi từ API
          })
          }
          return
        }
        localStorage.setItem("token",result.data);
        navigate("/", { state: { notificationCheck: true } });
    }
  useEffect(() => {
    if (token) {
      console.log("token sau khi đăng ký: ",token);
      dispatch(userService.currentUser(token));
    }
  }, [token]);

  useEffect(() => {
    if (token) {
        dispatch(userService.currentUser(token)); // Gọi API lấy user info
    }
}, [token, dispatch]);

  useEffect(() => {
    if (auth.reqUser?.fullName) {
        console.log("không cần đăng ký vì đã có tài khảon");
        navigate("/")
    }
  },[auth.reqUser, navigate]);

  return (
    <div className="flex bg-[#9BE5D8]  items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-[600px]">
        <h2 className="text-2xl font-semibold text-center mb-4">
          CREATE ACCOUNT
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            {/* Username Input */}
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              className="mb-4 mt-5"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-800">{errors.fullName.message}</p>
            )}
          </div>

          <div className="mb-4">
            {/* Username Input */}
            <TextField
              label="Email"
              fullWidth
              variant="outlined"
              className="mb-4 mt-5"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-800">{errors.username.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              className="mb-2"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-800">{errors.password.message}</p>
            )}
          </div>

          <Button
            fullWidth
            variant="outlined"
            type="submit"
            sx={{
              borderColor: "#9BE5D8",
              color: "#7CC7B8",
              marginTop: "10px",
              padding: "10px 0",
              fontSize: "16px",
              "&:hover": {
                backgroundColor: "#9BE5D8",
                color: "black",
              },
            }}
          >
            SIGN UP
          </Button>
        </form>
        <p className="text-center text-sm mt-4">
          You have account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            back to Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
