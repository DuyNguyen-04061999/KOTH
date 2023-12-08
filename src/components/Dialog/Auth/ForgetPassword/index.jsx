import { Box, FormControl, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
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
  const [optionEmail, setOptionEmail] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation("auth");
  useEffect(() => {
    dispatch(
      updateVerifyOTPType(optionEmail ? "forget_email" : "forget_phone")
    );
  }, [optionEmail, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (validateEmail(username)) {
    //   setOptionEmail(true);
    //   dispatch(
    //     forgetPasswordReady({
    //       email: username,
    //     })
    //   );
    // } else 
    if (validatePhoneNumber(username)) {
      setOptionEmail(false);
      dispatch(
        forgetPasswordReady({
          phone: username,
        })
      );
    } else {
      dispatch(showToastNotification({
        type: "warning",
        message: "Phone number invalid!"
      }))
    }
  };

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
          {t("Forgot Password")}?
        </Typography>
        <Typography
          sx={{
            color: "#979797",
            textAlign: "center",
            fontSize: width < 992 ? `14px` : "16px",
            marginTop: device === "Desktop" ? "12px" : "8px",
          }}
        >
          {t(
            "Please enter the phone number that associated with your account. We will send you a verification code."
          )}
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
              placeholder={t("Phone number")}
              // placeholder={t("Email") + "/" + t("Phone number")}
              type="text"
            />
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "48%" }}>
          <AnimButton
            type="ghost"
            text={t("BACK")}
            onClick={() => dispatch(clickTab("login"))}
          ></AnimButton>
        </Box>
        <Box sx={{ width: "48%" }}>
          {/* {!(
            (optionEmail && username && email && !emailError) ||
            (!optionEmail && username && phoneNumber && !phoneNumberError)
          ) ? ( */}
          {!validateEmail(username) && !validatePhoneNumber(username) ? (
            <AnimButton type="disable" text={t("NEXT")} />
          ) : isForgetPassword ? (
            <AnimButton type="loading" text={t("NEXT")} isSubmitBtn />
          ) : (
            <AnimButton
              type="primary"
              text={t("NEXT")}
              onClick={handleSubmit}
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
          {t("Already have an account?")}
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
          {t("Sign in")}
        </Typography>
      </Box>
    </Box>
  );
}
