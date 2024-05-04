import { Box, FormControl, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginDialog } from "../../../../redux-saga-middleware/reducers/authReducer";
import {
  getUserInfoReady,
  logoutReady,
  resendOtpReady,
  sendOtpReady,
} from "../../../../redux-saga-middleware/reducers/userReducer";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import AnimButton from "../../../AnimButton";
import { getUserGuest } from "../../../../redux-saga-middleware/reducers/appReducer";

export default function OTPVerifyAccount() {
  const { device } = useSelector((state) => state.deviceReducer);
  // const { createAccInfo } = useSelector((state) => state.authReducer);
  const {
    user,
    registerEmail,
    registerPhone,
    typeVerifyOTP,
    resenOTPSuccess,
    isVerifyOTP,
    phoneUpgrade
  } = useSelector((state) => state.userReducer);
  const { width } = useWindowDimensions();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(300);

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
    switch (typeVerifyOTP) {
      case "register":
        dispatch(
          sendOtpReady({
            otp: otp,
            type: "register",
            phone: registerPhone ,
          })
        );
        
        break;
      case "reVerify":
        dispatch(
          sendOtpReady({
            otp: otp,
            type: "register",
            // email: user?.userEmail,
            phone: user?.userPhone,
          })
        );
        break;
        case "upgrade":
          dispatch(
            sendOtpReady({
              otp: otp,
              type: "upgrade",
              phone:  phoneUpgrade,
            })
          );
          
          break;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (resenOTPSuccess) {
      setTimeLeft(300);
    }
  }, [resenOTPSuccess]);

  const handleResendOTP = () => {
    switch (typeVerifyOTP) {
      case "register":
        dispatch(
          resendOtpReady({
            // email: registerEmail,
            phone: registerPhone,
            type: "register",
          })
        );
        break;
      case "reVerify":
        dispatch(
          resendOtpReady({
            // email: user?.userEmail,
            phone: user?.userPhone,
            type: "register",
          })
        );
        break;
      default:
        return false;
    }
  };

  const checkIfNumber = (event) => {
    /**
     * Allowing: Integers | Backspace | Tab | Delete | Left & Right arrow keys
     **/

    const regex = new RegExp(
      /(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight|\(|\)|-)/
    );

    return !event.key.match(regex) && event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#181223",
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
          {` Please enter the 6-digit verification code that was sent to your phone number to verify your account`}
        </Typography>
      </Box>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ margin: "36px 0", marginRight: "-16px" }}
      >
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <FormControl>
              <input
                {...props}
                style={{
                  width: "32px",
                  height: "38px",
                  marginRight: "5px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                  fontSize: width < 576 ? "11.5px" : "20px",
                  color: "#000",
                  border: "none",
                  borderBottom: "2px solid white !important",
                  borderRadius: "4px",
                }}
                type="text"
                name="number"
                inputMode="numeric"
                maxLength={1}
                onKeyDown={checkIfNumber}
              />
            </FormControl>
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
            onClick={handleResendOTP}
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
            type="ghost"
            text="BACK"
            onClick={() => {
              dispatch(logoutReady());
              dispatch(closeLoginDialog());
              setTimeout(() => {
                dispatch(getUserInfoReady())
              },[2000])
            }}
          />
        </Box>
        <Box sx={{ width: "48%" }}>
          {otp?.length < 6 ? (
            <AnimButton type="disable" text="NEXT" />
          ) : isVerifyOTP ? (
            <AnimButton type="loading" text="NEXT" />
          ) : (
            <AnimButton
              type="primary"
              text="NEXT"
              onClick={handleVerifyOTP}
              isSubmitBtn
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
