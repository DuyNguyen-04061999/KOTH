import { Close } from "@mui/icons-material";
import { Box, Dialog, Grid, Typography } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clickTab,
  closeLoginDialog,
  closeVerifyDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { logoutReady } from "../../../redux-saga-middleware/reducers/userReducer";
import { imageHome, sign } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import CreatePassword from "../Auth/CreatePassword";
import ForgetPassword from "../Auth/ForgetPassword";
import Login from "../Auth/Login";
import OTPResetPassword from "../Auth/OTPResetPassword";
import { default as OTPVerifyAccount } from "../Auth/OTPVerifyAccount";
import Signup from "../Auth/Signup";
import "./../Auth/Signin/index.scss";

export default function SimpleDialog(props) {
  const { currentTab, isLoginDialog } = useSelector(
    (state) => state.authReducer
  );

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const handleClose = () => {
    dispatch(closeLoginDialog());
    dispatch(closeVerifyDialog());
    setTimeout(() => {
      if (currentTab === "otpVerifyAccount") {
        dispatch(clickTab("login"));
        dispatch(logoutReady());
      } else {
        dispatch(clickTab("login"));
      }
    }, 500);
  };

  return ReactDOM.createPortal(
    <>
      {device === "Mobile" && width < 576 ? (
        <>
          <Dialog
            onClose={handleClose}
            open={isLoginDialog}
            fullScreen={true}
            sx={{
              backgroundColor: "#181223",
              height: "100%",
              width: "100%",
              zIndex: "1320",
              ".MuiPaper-root": {
                backgroundColor: "#181223",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#181223",
                // height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // overflowY: "auto",
                boxSizing: "border-box",
                padding: "10px",
              }}
              className="p-2"
            >
              <Box>
                <Close
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "gray",
                    fontSize: "30px",
                    zIndex: 1,
                  }}
                  onClick={handleClose}
                />
              </Box>
              {currentTab === "login" ? (
                <Login />
              ) : currentTab === "signup" ? (
                <Box>
                  <Signup />
                </Box>
              ) : currentTab === "forgetPass" ? (
                <ForgetPassword></ForgetPassword>
              ) : currentTab === "otpVerifyAccount" ? (
                <OTPVerifyAccount></OTPVerifyAccount>
              ) : currentTab === "otpResetPassword" ? (
                <OTPResetPassword></OTPResetPassword>
              ) : currentTab === "createPass" ? (
                <CreatePassword></CreatePassword>
              ) : (
                <Login></Login>
              )}
            </Box>{" "}
          </Dialog>
        </>
      ) : (
        <>
          <Dialog
            onClose={handleClose}
            open={isLoginDialog}
            maxWidth={"md"}
            fullScreen={
              device === "Mobile" || device === "Tablet" ? true : false
            }
            sx={{
              ".MuiPaper-root": {
                backgroundColor: "#181223",
                height: "100%",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "row",
                position: "relative",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#181223",
                height: "100%",
                width: device === "Desktop" ? "50%" : "100%",
                display: "flex",
                alignItems: "center",
                overflow: device === "Mobile" ? "visible" : "auto",
              }}
              className="p-2"
            >
              {currentTab === "login" ? (
                <Login />
              ) : currentTab === "signup" ? (
                <Signup />
              ) : currentTab === "forgetPass" ? (
                <ForgetPassword></ForgetPassword>
              ) : currentTab === "otpVerifyAccount" ? (
                <OTPVerifyAccount></OTPVerifyAccount>
              ) : currentTab === "otpResetPassword" ? (
                <OTPResetPassword></OTPResetPassword>
              ) : currentTab === "createPass" ? (
                <CreatePassword></CreatePassword>
              ) : (
                <Login></Login>
              )}
              <Box
                component={"img"}
                src={sign.btnBack}
                sx={{
                  width: "20px",
                  height: "20px",
                  position: "absolute",
                  zIndex: "100",
                  top: "20px",
                  right: "20px",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              ></Box>
            </Box>
            {device === "Desktop" ? (
              <Box
                sx={{
                  backgroundColor: "#181223",
                  color: "white",
                  height: "100%",
                  position: "relative",
                  width: "50%",
                  backgroundImage: `url(${imageHome.signInBgBanner})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height:
                      device === "Mobile" && orientation === "landscape"
                        ? "auto"
                        : "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "border-box",
                    padding: "0px 20px",
                  }}
                >
                  <Box component={"img"} src={imageHome.signInTitle}></Box>
                  <Box
                    sx={{ width: "100%" }}
                    component={"img"}
                    src={imageHome.imageSignIn}
                  ></Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: "800",
                        marginTop: "20px",
                        marginLeft: "0px !important",
                      }}
                    >
                      PLAY4PROMO
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#D4D4D4",
                        textAlign: "center",
                        marginTop: "20px",
                        marginLeft: "0px !important",
                      }}
                    >
                      Play4Promo is a marketing platform that offers
                      tournaments, where you can compete and have a fair chance
                      to win corporate sponsored prizes. Free to sign up and
                      join
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ) : (
              <></>
            )}
          </Dialog>
        </>
      )}
    </>,
    document.body
  );
}
