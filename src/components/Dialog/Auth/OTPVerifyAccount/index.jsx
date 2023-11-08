import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import {
  clearCreateAccInfo,
  clickTab,
  closeLoginDialog,
  toggleLoginDialog,
} from "../../../../redux-saga-middleware/reducers/authReducer";
import {
  logoutReady,
  resendOtpReady,
  sendOtpReady,
} from "../../../../redux-saga-middleware/reducers/userReducer";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import AnimButton from "../../../AnimButton";

export default function OTPVerifyAccount() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { createAccInfo } = useSelector((state) => state.authReducer);
  const { user, registerUsername, tokenUser } = useSelector(
    (state) => state.userReducer
  );
  const { width } = useWindowDimensions();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(60);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerifyOTP = () => {
    dispatch(
      sendOtpReady({
        otp: otp,
        type: "register",
        username: registerUsername,
      })
    );
  };

  useEffect(() => {
    socket?.on("verifyOtpSuccess", () => {
      dispatch(toggleLoginDialog());
      dispatch(clickTab("login"));
      dispatch(clearCreateAccInfo());
    });

    return () => {
      socket?.off("verifyOtpSuccess");
    };
  }, [socket, dispatch]);

  const handleResendOTP = () => {
    dispatch(
      resendOtpReady({
        username: user?.userName,
        email: user?.email,
        type:"register"
      })
    );
  };

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
      <Box sx={{ padding: "0px 30px", boxSizing: "border-box" }}>
        <Typography
          sx={{
            color: "#ffff",
            fontSize: device === "Mobile" ? `${width / 14}px` : "32px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Verify your account
        </Typography>
        <Typography
          sx={{
            color: "#979797",
            textAlign: "center",
            fontSize: device === "Mobile" ? `${width / 27}px` : "16px",
            marginTop: device === "Desktop" ? "12px" : "0px",
          }}
        >
          Please enter the 6-digit verification code that was sent to{" "}
          {createAccInfo.phone} to verify your account
        </Typography>
      </Box>
      <Box sx={{ margin: "36px 0", marginRight: "-16px" }}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "32px",
                height: "38px",
                marginRight: "16px",
                backgroundColor: "#271C39",
                border: "none",
                outline: "none",
                borderBottom: "2px solid white",
                textAlign: "center",
                fontSize: "24px",
                color: "white",
              }}
              type="number"
              maxLength={1}
            />
          )}
        />
      </Box>
      {false ? (
        <Box sx={{ marginBottom: "36px" }}>
          <Typography
            sx={{ fontSize: "14px", fontWeight: 500, color: "#979797" }}
          >
            Resend OTP in {timeLeft} secconds
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{ marginBottom: "36px", display: "flex", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              color: "white",
            }}
          >
            Didn’t recieve a code?
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "rgba(255, 159, 56, 1)",
              cursor: "pointer",
            }}
            onClick={() => handleResendOTP()}
          >
            Resend OTP
          </Typography>
        </Box>
      )}

      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "48%" }}>
          <AnimButton
            type={"ghost"}
            text={"BACK"}
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
            onClick={() => {
              dispatch(logoutReady());
              dispatch(closeLoginDialog());
            }}
          >
            Back
          </AnimButton>
        </Box>
        <Box sx={{ width: "48%" }}>
          <AnimButton
            type={otp?.length < 6 ? "disabled" : "primary"}
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
            onClick={() => handleVerifyOTP()}
          >
            Next
          </AnimButton>
        </Box>
      </Box>
    </Box>
  );
}
