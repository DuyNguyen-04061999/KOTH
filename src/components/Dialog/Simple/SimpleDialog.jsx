import { Close } from "@mui/icons-material";
import { Box, Dialog, Grid } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAppType } from "../../../utils/helper";
import { images, sign } from "../../../utils/images";

import {
  clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
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

  const handleClose = () => {
    dispatch(toggleLoginDialog());
    dispatch(clickTab("login"));
  };

  return ReactDOM.createPortal(
    <>
      {width < 576 ? (
        <Dialog
          onClose={handleClose}
          open={isLoginDialog}
          fullScreen={true}
          sx={{
            backgroundColor: "#291e3b",
            height: "100%",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "row",
            maxWidth: "820px !important",
            zIndex: "1320",
          }}
        >
          <Box sx={{ height: "100vh" }}>
            <Box
              sx={{
                backgroundColor: "#291e3b",
                height: "100%",
                width: "auto",
                display: "flex",
                alignItems: "center",
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
                  }}
                  onClick={handleClose}
                />
              </Box>
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
            </Box>
          </Box>
        </Dialog>
      ) : (
        <Dialog
          onClose={handleClose}
          open={isLoginDialog}
          maxWidth={"md"}
          sx={{
            ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
              backgroundColor: "#291e3b",
              height: "auto",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "row",
              maxWidth: "820px !important",
              position: "relative",
            },
          }}
        >
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  backgroundColor: "#291e3b",
                  height: "100%",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
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
              </Box>
            </Grid>
            <Grid item md={6}>
              {width > 992 ? (
                <Box
                  sx={{
                    backgroundColor: "#19133e",
                    color: "white",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    src={
                      getAppType() === "promote"
                        ? sign.bannersignin
                        : images?.signInCrypto
                    }
                    alt="..."
                    width={"100%"}
                    height={"100%"}
                    style={{ backgroundColor: "#3a2b6d" }}
                  />
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
              ) : null}
            </Grid>
          </Grid>
        </Dialog>
      )}
    </>,
    document.body
  );
}
