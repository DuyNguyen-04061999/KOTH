import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, FormControl, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import { loginReady } from "../../../../redux-saga-middleware/reducers/userReducer";
import { sign } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import AnimButton from "../../../AnimButton";

const Login = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const { user, isLogin } = useSelector((state) => state.userReducer);

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

  const sendLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      dispatch(
        showToastNotification({
          type: "error",
          message: "Login Failed! Enter username and password!",
        })
      );
    } else {
      dispatch(
        loginReady({
          username: username,
          password: password,
        })
      );
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
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={sign.up01} alt="..." width={17} height={"auto"} />
          <Input
            type="text"
            value={username}
            placeholder="Username"
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
              color: "white",
              fontWeight: "500",
              marginLeft: "16px",
              width: "100%",
              backgroundColor: "transparent",
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
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={sign.up02} alt="..." width={15} height={"auto"} />
          <Input
            placeholder="Password"
            type={displayPassword === false ? "password" : "text"}
            name="password"
            value={password}
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
              color: "white",
              fontWeight: "500",
              marginLeft: "16px",
              width: "100%",
              backgroundColor: "transparent",
            }}
          />
          <Box onClick={handleSetPassword}>
            {displayPassword === false ? (
              <VisibilityOffIcon
                sx={{
                  color: "#7C81F2",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  color: "#7C81F2",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "16px 0",
          }}
        >
          <Typography
            sx={{
              color: "#FF9F38",
              fontSize: "14px",
              fontWeight: "700",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => dispatch(clickTab("forgetPass"))}
          >
            Forgot Password?
          </Typography>
        </Box>
        <Box className="d-flex justify-content-center">
          {isLogin ? (
            <AnimButton
              onClick={sendLogin}
              text={"Sign In"}
              type={"loading"}
              isHasIcon
            />
          ) : (
            <AnimButton
              onClick={sendLogin}
              text="Sign In"
              type="primary"
              isHasIcon
            />
          )}
        </Box>
        <Box className="d-flex justify-content-center mt-4">
          <Box className="d-flex" sx={{ alignItems: "center" }}>
            <Typography
              sx={{
                color: "white",
              }}
            >
              New User?
            </Typography>
            <Typography
              onClick={() => {
                dispatch(clickTab("signup"));
              }}
              sx={{ color: "#FF9F38", cursor: "pointer", fontWeight: "700" }}
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
