import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { sign } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import AnimButton from "../../../AnimButton";

export default function CreatePassword() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { forgotPassInfo, nameReset } = useSelector((state) => state.authReducer);
  console.log(nameReset, forgotPassInfo);
  const { width } = useWindowDimensions();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [inputError, setInputError] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayRePassword, setDisplayRePassword] = useState(false);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const handleSetPassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const handleSetRePassword = () => {
    setDisplayRePassword(!displayRePassword);
  };

  
  const handleCreatePass = () => {
    socket?.emit("updateNewPassword", {
      username: nameReset || forgotPassInfo.username,
      password: password,
    });
  };

  useEffect(() => {
    socket?.on("updateNewPasswordSuccess", (user) => {
      socket?.emit("login", {
        username: user.username,
        password: user.password,
      });
      // dispatch(clearForgetPassInfo());
    });
  }, [socket, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#271C39",
        height: "100%",
        justifyContent: "center",
        padding: device === "Mobile" ? "0px 20px 0px 20px" : "0px 30px",
        boxSizing: "border-box",
        width: "100%",
        position: device === "Desktop" ? "relative" : "none",
      }}
    >
      <Box sx={{ boxSizing: "border-box" }}>
        <Typography
          sx={{
            color: "#ffff",
            fontSize: device === "Mobile" ? `${width / 14}px` : "28px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Reset Password
        </Typography>
        <Typography
          sx={{
            color: "#979797",
            textAlign: "center",
            fontSize: device === "Mobile" ? `${width / 27}px` : "14px",
            marginTop: device === "Desktop" ? "12px" : "0px",
          }}
        >
          Password must be at least 6 characters long and contain at lease one
          non letter, one digit and one upper case.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "30px 0px 30px 0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#181223",
              padding: "10px 12px",
              borderRadius: "5px 0px 0px 5px",
            }}
          >
            <img
              style={{ width: "18px", height: "18px" }}
              alt="..."
              src={sign.up02}
            />
          </Box>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={displayPassword ? "text" : "password"}
            placeholder="Password"
            style={{
              width: "100%",
              backgroundColor: "#181223",
              outline: "none",
              border: "none",
              color: "white",
              fontSize: "14px",
              padding: "10px 12px 10px 0px",
              borderRadius: "0px 5px 5px 0px",
              fontFamily: "Cyntho Next",
            }}
          />
          <Box
            onClick={handleSetPassword}
            sx={{ display: password.length > 0 ? "block" : "none" }}
          >
            {displayPassword === false ? (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "#7C81F2",
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "#7C81F2",
                }}
              />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            marginTop: "20px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#181223",
              padding: "10px 12px",
              borderRadius: "5px 0px 0px 5px",
            }}
          >
            <img
              style={{ width: "18px", height: "18px" }}
              alt="..."
              src={sign.up02}
            />
          </Box>
          <input
            onChange={(e) => {
              setRePassword(e.target.value);
            }}
            type={displayRePassword ? "text" : "password"}
            placeholder="Confirm password"
            style={{
              width: "100%",
              backgroundColor: "#181223",
              outline: "none",
              border: "none",
              color: "white",
              fontSize: "14px",
              padding: "10px 12px 10px 0px",
              fontFamily: "Cyntho Next",
              borderRadius: "0px 5px 5px 0px",
            }}
          />
          <Box
            onClick={handleSetRePassword}
            sx={{ display: password.length > 0 ? "block" : "none" }}
          >
            {displayRePassword === false ? (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "#7C81F2",
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  color: "#7C81F2",
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "100%" }}>
          <AnimButton
            type={"primary"}
            text={"NEXT"}
            // style={{
            //   width: "100%",
            //   border: "none",
            //   padding: "8px 0px 6px 0px",
            //   borderRadius: "5px",
            //   backgroundColor: checkButton() === true ? "#7848ED" : "#979797",
            //   color: "#fff",
            //   fontWeight: "700",
            //   fontSize: device === "Mobile" ? `${width / 21}px` : "",
            //   marginTop: device === "Desktop" ? "120px" : "none",
            // }}
            onClick={() => handleCreatePass()}
          >
            Next
          </AnimButton>
        </Box>
      </Box>
    </Box>
  );
}
