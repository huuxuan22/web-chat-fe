import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { store } from "../../Redux/store";
import * as userService from "./../../Redux/Auth/Action";
import { useAuth } from "./../../contexts/authContext/index";
import { doSignInWithFaceBook, doSignInWithGoogle } from "../../firebase/auth";
import * as userService1 from "./../../Service/UserService";
const Login = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);
  // const { userLoggedIn } = useAuth();
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    console.log("Đã vào trong này");
    if (!isSignIn) {
      console.log("vào kiểm tra rồi nha");
      setIsSignIn(true);
      doSignInWithGoogle().then((data) => {
        setIsSignIn(false);
        userService1
          .loginWithGoogle({ fullName: data.displayName, username: data.email })
          .then((data) => {
            
            localStorage.setItem("token", data.data);
            navigate("/", { state: { notificationCheck: true } });
          });
      });
    }
  };
  const onFacebookSignIn = (e) => {
    e.preventDefault();
    if (!isSignIn) {
      setIsSignIn(true);
      doSignInWithFaceBook().then((data) => {
        setIsSignIn(false);
        userService1
          .loginWithGoogle({ fullName: data.displayName, username: data.email })
          .then((data) => {
            setOpen(true);
            localStorage.setItem("token", data.data);
            navigate("/", { state: { notificationCheck: true } });
          });
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { auth } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const validateSchema = yup.object().shape({
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

  useEffect(() => {
    if (token) {
      dispatch(userService.currentUser(token)); // Gọi API lấy user info
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (auth.reqUser?.fullName) {
      console.log("không cần đăng ký vì đã có tài khảon");
      navigate("/");
    }
  }, [auth.reqUser, navigate]);
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const result = await dispatch(userService.login(data));
    if (!result.success) {
      if (result.data.username) {
        setError("username", {
          type: "manual",
          message: result.data.username, // Gán thông báo lỗi từ API
        });
      } else if (result.data.password) {
        setError("password", {
          type: "manual",
          message: result.data.password, // Gán thông báo lỗi từ API
        });
      } else {
        navigate("/", { state: { notificationCheck: true } });
      }
    }
    localStorage.setItem("token", result.data);
  };

  const handleRegister = () => {
    navigate("/signup")
  }
  return (
    <div>
      <div className="flex bg-[#9BE5D8]  items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 shadow-lg rounded-lg w-[600px]">
          <h2 className="text-2xl font-semibold text-center mb-4"></h2>

          {/* Social Login Buttons */}
          <div className="flex space-x-4 mb-6">
            <Button
              onClick={(e) => {
                onFacebookSignIn(e);
              }}
              disabled={isSignIn}
              fullWidth
              variant="contained"
              startIcon={<FaFacebook />}
              className="bg-blue-600 text-white capitalize"
            >
              Facebook
            </Button>
            <Button
              fullWidth
              onClick={(e) => {
                onGoogleSignIn(e);
              }}
              variant="outlined"
              startIcon={<FcGoogle />}
              className="capitalize"
            >
              Google
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {/* Username Input */}
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                className="mb-4 mt-5"
                {...register("username")}
              />
              {/* <p>hello</p> */}
              {errors.username && (
                <p className="text-red-800">{errors.username.message}</p>
              )}
            </div>

            {/* Password Input */}
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

            {/* Forgot Password */}
            <div className="text-right text-sm text-blue-600 mb-4 cursor-pointer">
              Forgot?
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              fullWidth
              variant="outlined"
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
              // onClick={() => navigate("/login")} // Điều hướng về trang đăng nhập
            >
              SIGN UP
            </Button>
          </form>
          {/* Signup Link */}
          <p className="text-center text-sm mt-4">
            Not a member?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={handleRegister}>Sign up now</span>
          </p>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={5000} // 👈 thời gian hiển thị: 5000ms = 5s
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Bạn đã đăng nhập thành công!
          </Alert>
        </Snackbar>

        
      </div>
    </div>
  );
};

export default Login;
