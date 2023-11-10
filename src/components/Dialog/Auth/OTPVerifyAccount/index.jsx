import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoginDialog
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
  const { user, registerUsername, typeVerifyOTP, resenOTPSuccess } = useSelector((state) => state.userReducer);
  
  const { width } = useWindowDimensions();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(60);

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
    switch(typeVerifyOTP) {
        case "register": dispatch(
          sendOtpReady({
            otp: otp,
            type: "register",
            username: registerUsername,
          })
        );break
        case "reVerify": dispatch(
          sendOtpReady({
            otp: otp,
            type: "register",
            username: user?.userName,
          })
        );break
        case "forget_email": dispatch(
          sendOtpReady({
            otp: otp,
            type: "password",
            username: createAccInfo?.username,
            phone: createAccInfo?.phone,
          })
        );break
        case "forget_phone": dispatch(
          sendOtpReady({
            otp: otp,
            type: "password",
            username: createAccInfo?.username,
            phone: createAccInfo?.phone,
          })
        );break
        default: return false
    }
    
  };

  useEffect(() => {
    if(resenOTPSuccess) {
      setTimeLeft(60);
    }

  }, [resenOTPSuccess])

  const handleResendOTP = () => {
    switch(typeVerifyOTP) {
        case "register": dispatch(
          resendOtpReady({
            username: registerUsername,
            type: "register",
          })
        );break
        case "reVerify": dispatch(
          resendOtpReady({
            username: user?.userName,
            type: "register",
          })
        );break
        case "forget_email": dispatch(
          resendOtpReady({
            username: createAccInfo?.username,
            email: createAccInfo?.email,
            type: "password",
          })
        );break
        case "forget_phone": dispatch(
          resendOtpReady({
            username: createAccInfo?.username,
            phone: createAccInfo?.phone,
            type: "password",
          })
        );break
        default: return false
    }
    
  };
console.log(createAccInfo);
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
          {typeVerifyOTP === "register" || typeVerifyOTP === "reVerify" ? ` Please enter the 6-digit verification code that was sent to your device to verify your account`
           :  typeVerifyOTP === "forget_phone" ? `Please enter the 6-digit verification code that was sent to ${createAccInfo?.phone} to verify your account` : typeVerifyOTP === "forget_email" 
           ? `Please enter the 6-digit verification code that was sent to ${createAccInfo?.email} to verify your account` : ``}
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
                outline: "none",
                textAlign: "center",
                fontSize: width < 576 ? "12px" : "20px",
                color: "white",
                border:"2px solid white",
                borderRadius:"4px"
              }}
              type="number"
              inputMode="numeric"
              maxLength={1}
            />
          )}
        />
      </Box>
      {timeLeft > 0 ? (
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
            onClick={() => handleVerifyOTP()}
          >
            Next
          </AnimButton>
        </Box>
      </Box>
    </Box>
  );
}
