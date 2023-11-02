import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, FormControl, Input, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import { images, sign } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

const Login = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  useEffect(() => {
    socket?.on("loginError", (data) => {});
  }, [socket, dispatch]);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSetPassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const sendLogin = () => {
    if (!username || !password) {
      toast.error("Login Failed! Enter username and password!", {
        icon: ({ theme, type }) => (
          <img
            style={{ width: "20px", marginRight: "10px" }}
            alt="..."
            src={images.closeButtonToast}
          />
        ),
        position: "top-center",
        className: width < 576 ? "error-background-small" : "error-background",
      });
    } else if (username && password) {
      socket?.emit("login", {
        username: username?.toLowerCase(),
        password: password,
      });
   
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5" className="text-center text-white mt-4 mb-4">
          Sign In
        </Typography>
      </Box>
      <Box
        component={"form"}
        className="p-2 ps-2 pe-3"
        noValidate
        onSubmit={handleSubmit}
      >
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1f1733",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <img
            src={sign.up01}
            alt="..."
            width={17}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "11px" : "13px",
            }}
          />
          <Input
            id="login_username"
            type="text"
            value={username}
            placeholder="Username"
            autoComplete="username"
            onChange={handleChangeUsername}
            sx={{
              "&:before": {
                borderBottom: " 0px solid !important ",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              "& .MuiInputBase-root": {
                padding: "0px 0px 0px 25px !important",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 25px !important",
            }}
          />
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1f1733",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <img
            src={sign.up02}
            alt="..."
            width={15}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "10px" : "15px",
            }}
          />
          <Input
            id="login_password"
            placeholder="Password"
            type={displayPassword === false ? "password" : "text"}
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={handleChangePassword}
            sx={{
              "&:before": {
                borderBottom: "0px solid !important",
                "&:hover": {
                  borderBottom: "0px solid !important",
                },
              },
              "&:after": {
                borderBottom: "0px solid !important",
              },
              "&:hover": {
                border: "none",
              },
              "& .MuiInputBase-root": {
                padding: "0px 0px 0px 25px !important",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 25px !important",
            }}
          />
          <Box onClick={handleSetPassword}>
            {displayPassword === false ? (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "12px" : "14px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "12px" : "10px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                }}
              />
            )}
          </Box>
        </FormControl>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-end", marginTop:"16px", cursor:"pointer"}} onClick={() => dispatch(clickTab("forgetPass"))}>
            <Typography sx={{ color:"#7848ED",fontSize:"14px", fontWeight:"700",textAlign:"center"}}>Forgot Password?</Typography>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-end", marginTop:"16px", cursor:"pointer"}} onClick={() => dispatch(clickTab("createPass"))}>
            <Typography sx={{ color:"#7848ED",fontSize:"14px", fontWeight:"700",textAlign:"center"}}>Create Password?</Typography>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-end", marginTop:"16px", cursor:"pointer"}} onClick={() => dispatch(clickTab("otpVerifyAccount"))}>
            <Typography sx={{ color:"#7848ED",fontSize:"14px", fontWeight:"700",textAlign:"center"}}>OTP Verify Account?</Typography>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"flex-end", marginTop:"16px", cursor:"pointer"}} onClick={() => dispatch(clickTab("otpResetPassword"))}>
            <Typography sx={{ color:"#7848ED",fontSize:"14px", fontWeight:"700",textAlign:"center"}}>OTP Reset Password?</Typography>
        </Box>
        <Box className="d-flex justify-content-center">
          <button
            type="submit"
            className="mt-5 btn-submit"
            style={{
              background:
                "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
              borderRadius: 4,
              border: "none",
              padding: "8px 35px",
            }}
            onClick={sendLogin}
          >
            <span
              style={{
                color: "#faecf1",
                fontWeight: "700",
              }}
            >
              SIGN IN
            </span>
          </button>
        </Box>
        <Box className="d-flex justify-content-center mt-4">
          <Box
            className="d-flex"
            sx={{
              color: "#7671ba",
              fontWeight: "500",
            }}
          >
            New User?
            <Typography
              onClick={() => {
                dispatch(clickTab("signup"));
              }}
              sx={{ color: "#ffb600", cursor: "pointer" }}
            >
              Create Account
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
