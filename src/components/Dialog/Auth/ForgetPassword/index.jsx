import { Box, FormControl, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import {
  forgetPasswordReady,
  updateVerifyOTPType,
} from "../../../../redux-saga-middleware/reducers/userReducer";
import { sign } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { validatePhoneNumber } from "../../../../utils/validatePhoneNumber";
import { validateEmail } from "../../../../utils/validationEmail";
import AnimButton from "../../../AnimButton";

export default function ForgetPassword() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { isForgetPassword } = useSelector((state) => state.userReducer);
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [optionEmail, setOptionEmail] = useState(true);
  const [focusInput, setFocusInput] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (optionEmail) {
      setPhoneNumber("");
    } else {
      setEmail("");
    }
  }, [optionEmail]);

  useEffect(() => {
    dispatch(
      updateVerifyOTPType(optionEmail ? "forget_email" : "forget_phone")
    );
  }, [optionEmail, dispatch]);

  const handleSubmit = () => {
    if (validateEmail(username)) {
      dispatch(
        forgetPasswordReady({
          email: username,
        })
      );
    } else if (validatePhoneNumber(username)) {
      dispatch(
        forgetPasswordReady({
          phone: username,
        })
      );
    }
  };

  // useEffect(() => {
  //   if (email) {
  //     if (!validateEmail(email)) {
  //       setEmailError("Please enter a valid email");
  //     } else {
  //       setEmailError("");
  //     }
  //   } else {
  //     setEmailError("");
  //   }
  // }, [email]);

  // useEffect(() => {
  //   if (phoneNumber !== "") {
  //     if (phoneNumber.length < 10 || phoneNumber.length > 12) {
  //       setPhoneNumberError("Please enter a valid phone number");
  //     } else {
  //       setPhoneNumberError("");
  //     }
  //   } else {
  //     setPhoneNumberError("");
  //   }
  // }, [phoneNumber]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#271C39",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: device === "Mobile" ? "0px 20px 0px 20px" : "0px 24px",
        boxSizing: "border-box",
        width: "100%",
        position: device === "Desktop" ? "relative" : "none",
      }}
      component={"form"}
      onSubmit={handleSubmit}
    >
      <Box sx={{ boxSizing: "border-box" }}>
        <Typography
          sx={{
            color: "#ffff",
            fontSize: width < 992 ? `20px` : "28px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          sx={{
            color: "#979797",
            textAlign: "center",
            fontSize: width < 992 ? `14px` : "16px",
            marginTop: device === "Desktop" ? "12px" : "8px",
          }}
        >
          Please enter the email/phone number that associated with your account.
          We will send you a verification code.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "36px 0px 36px 0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
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
              src={sign.up03}
            />
          </Box>
          <FormControl
            sx={{
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
          >
            <input
              style={{
                backgroundColor: "#181223",
                outline: "none",
                border: "none",
                color: "white",
              }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Email/Phone number"
              type="text"
            />
          </FormControl>
        </Box>
        {/* {optionEmail ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              marginTop: "20px",
              flexDirection: "column",
              backgroundColor: "#181223",
              padding: "0px 12px",
              borderRadius: "5px 0px 0px 5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "18px", height: "18px" }}
                alt="..."
                src={sign.up03}
              />
              <FormControl
                sx={{
                  width: "100%",
                  backgroundColor: "#181223",
                  outline: "none",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  padding: "10px 12px 10px 0px",
                  fontFamily: "Cyntho Next",
                  borderRadius: "0px 5px 5px 0px",
                  marginLeft: "12px",
                }}
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  style={{
                    width: "100%",
                    backgroundColor: "#181223",
                    outline: "none",
                    border: "none",
                    color: "white",
                  }}
                  type="email"
                />
              </FormControl>
            </Box>
            {emailError && (
              <Typography
                sx={{ textAlign: "start", color: "#F05153", fontSize: "13px" }}
              >
                {emailError}
              </Typography>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              marginTop: "20px",
              flexDirection: "column",
              backgroundColor: "#181223",
              padding: "4px 12px",
              borderRadius: "5px 0px 0px 5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <img
                style={{ width: "18px", height: "18px" }}
                alt="..."
                src={sign.up04}
              />
              <Typography
                sx={{
                  position: "absolute",
                  top: "8px",
                  left: width < 576 ? "12px" : "16px",
                  color: "#979797",
                  fontWeight: "600",
                  display:
                    focusInput || phoneNumber.length > 0 ? "block" : "none",
                }}
              >
                (+1){" "}
              </Typography>
              <input
                onFocus={() => setFocusInput(true)}
                onBlur={() => setFocusInput(false)}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
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
                  marginLeft: "12px",
                  paddingLeft:
                    focusInput || phoneNumber.length > 0 ? "24px" : "",
                }}
                type="number"
              />
            </Box>
            {phoneNumberError && (
              <Typography
                sx={{ textAlign: "start", color: "#F05153", fontSize: "13px" }}
              >
                {phoneNumberError}
              </Typography>
            )}
          </Box>
        )} */}
        {/* <Box
          sx={{
            marginTop: "16px",
            display: "flex",
            alignItems: width < 992 && width > 576 ? "flex-end" :  "center",
            justifyContent: "flex-end",
            flexDirection: width < 992 && width > 576 ? "column" : "row",
          }}
        >
          <Typography
            sx={{ fontSize: width < 576 ? "12px" : "14px", color: "white" }}
          >
            {optionEmail
              ? "Don't want to use email?"
              : "Don't want to use phone number?"}
          </Typography>
          <Typography
            onClick={() => setOptionEmail((prevState) => !prevState)}
            sx={{
              cursor: "pointer",
              fontSize: width < 576 ? "12px" : "14px",
              fontWeight: "600",
              color: "#FF9F38",
            }}
          >
            Reset by {optionEmail ? "phone" : "email"}{" "}
          </Typography>
        </Box> */}
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "48%" }}>
          <AnimButton
            type="ghost"
            text="BACK"
            onClick={() => dispatch(clickTab("login"))}
          >
            Back
          </AnimButton>
        </Box>
        <Box sx={{ width: "48%" }}>
          {/* {!(
            (optionEmail && username && email && !emailError) ||
            (!optionEmail && username && phoneNumber && !phoneNumberError)
          ) ? ( */}
          {!username ? (
            <AnimButton type="disable" text="NEXT" />
          ) : isForgetPassword ? (
            <AnimButton type="loading" text="NEXT" isSubmitBtn />
          ) : (
            <AnimButton
              type="primary"
              text="NEXT"
              onClick={() => handleSubmit()}
              isSubmitBtn
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          alignItems: width < 992 && width > 576 ? "flex-end" : "center",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <Typography
          sx={{ fontSize: width < 576 ? "12px" : "14px", color: "white" }}
        >
          Already have an account?
        </Typography>
        <Typography
          onClick={() => dispatch(clickTab("login"))}
          sx={{
            cursor: "pointer",
            fontSize: width < 576 ? "12px" : "14px",
            fontWeight: "600",
            color: "#FF9F38",
          }}
        >
          Sign in
        </Typography>
      </Box>
    </Box>
  );
}
