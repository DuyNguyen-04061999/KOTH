import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleForgetPass } from "../../../redux-saga-middleware/reducers/authReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useEffect } from "react";
export default function ForgetPassword() {
  const { forgetPassDialog } = useSelector((state) => state.authReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTab, setIsTab] = useState(true);
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const checkButton = () => {
    if (username !== "" && phoneNumber !== "" && phoneNumber?.length <= 16) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    setPhoneNumber("");
    setUsername("");
    setOtp("");
  }, [isTab]);
  useEffect(() => {
    setIsTab(true);
  }, [forgetPassDialog]);
  console.log("OTP: ", isTab);
  return (
    <Dialog
      onClose={() => {
        dispatch(toggleForgetPass(false));
      }}
      open={forgetPassDialog}
      fullScreen={device === "Mobile" ? true : false}
    >
      {isTab ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#271C39",
            height: device === "Mobile" ? "100%" : "700px",
            justifyContent: "center",
            padding: device === "Mobile" ? "0px 20px 0px 20px" : "0px 30px",
            boxSizing: "border-box",
            width: device === "Desktop" ? "480px" : "none",
            position: device === "Desktop" ? "relative" : "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: device === "Mobile" ? "fixed" : "absolute",
              top: "0px",
              padding: "10px",
              display: device === "Desktop" ? "flex" : "",
              justifyContent: device === "Desktop" ? "flex-end" : "none",
            }}
          >
            {device === "Mobile" ? (
              <Box
                onClick={() => {
                  dispatch(toggleForgetPass(false));
                }}
                component={"img"}
                src={images.BackButtonLobby}
                sx={{ width: "13px" }}
              ></Box>
            ) : (
              <Box
                onClick={() => {
                  dispatch(toggleForgetPass(false));
                }}
                component={"img"}
                src={images.closeVoucher}
                sx={{ width: "13px" }}
              ></Box>
            )}
          </Box>
          <Box sx={{ padding: "0px 30px", boxSizing: "border-box" }}>
            <Typography
              sx={{
                color: "#ffff",
                fontSize: device === "Mobile" ? `${width / 14}px` : "32px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Password Reset
            </Typography>
            <Typography
              sx={{
                color: "#979797",
                textAlign: "center",
                fontSize: device === "Mobile" ? `${width / 27}px` : "16px",
                marginTop: device === "Desktop" ? "20px" : "0px",
              }}
            >
              A code will be sent to your number to verify that it belongs to
              you.
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
                  src={images.userIcon}
                />
              </Box>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="User Name"
                style={{
                  width: "100%",
                  backgroundColor: "#181223",
                  outline: "none",
                  border: "none",
                  color: "#9A9A9A",
                  fontSize: "14px",
                  padding: "10px 12px 10px 0px",
                  borderRadius: "0px 5px 5px 0px",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                marginTop: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#181223",
                  padding: "10px 12px",
                  borderRadius:
                    phoneNumber?.length > 16
                      ? "5px 0px 0px 0px"
                      : "5px 0px 0px 5px",
                }}
              >
                <img
                  style={{ width: "18px", height: "18px" }}
                  alt="..."
                  src={images.phoneIcon}
                />
              </Box>
              <input
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                placeholder="Phone number"
                style={{
                  width: "100%",
                  backgroundColor: "#181223",
                  outline: "none",
                  border: "none",
                  color: "#9A9A9A",
                  fontSize: "14px",
                  padding: "10px 12px 10px 0px",
                  borderRadius:
                    phoneNumber?.length > 16
                      ? "0px 5px 0px 0px"
                      : "0px 5px 5px 0px",
                }}
              />
            </Box>
            {phoneNumber?.length > 16 && (
              <Box
                sx={{
                  backgroundColor: "#181223",
                  borderRadius: "0px 0px 5px 5px",
                  padding: "5px 12px",
                }}
              >
                <Typography sx={{ fontSize: "14px", color: "#F05153" }}>
                  Phone number maximum 16 characters
                </Typography>
              </Box>
            )}
          </Box>
          <button
            onClick={() => {
              setIsTab(false);
            }}
            style={{
              width: "100%",
              border: "none",
              padding: "8px 0px 6px 0px",
              borderRadius: "5px",
              backgroundColor: checkButton() === true ? "#7848ED" : "#979797",
              color: "#fff",
              fontWeight: "700",
              fontSize: device === "Mobile" ? `${width / 21}px` : "",
              marginTop: device === "Desktop" ? "120px" : "none",
            }}
          >
            Next
          </button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#271C39",
            height: device === "Mobile" ? "100%" : "700px",
            justifyContent: "center",
            padding: device === "Mobile" ? "0px 20px 0px 20px" : "0px 30px",
            boxSizing: "border-box",
            width: device === "Desktop" ? "480px" : "none",
            position: device === "Desktop" ? "relative" : "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              position: device === "Mobile" ? "fixed" : "absolute",
              top: "0px",
              padding: "10px",
              display: device === "Desktop" ? "flex" : "none",
              justifyContent: device === "Desktop" ? "flex-end" : "none",
            }}
          >
            {device === "Mobile" ? (
              <Box
                onClick={() => {
                  setIsTab(true);
                }}
                component={"img"}
                src={images.BackButtonLobby}
                sx={{ width: "13px" }}
              ></Box>
            ) : (
              <Box
                onClick={() => {
                  setIsTab(true);
                }}
                component={"img"}
                src={images.closeVoucher}
                sx={{ width: "13px" }}
              ></Box>
            )}
          </Box>
          <Box>
            <Typography
              sx={{
                color: "#ffff",
                fontSize: device === "Mobile" ? `${width / 14}px` : "32px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Password Reset
            </Typography>
            <Typography
              sx={{
                color: "#979797",
                textAlign: "center",
                fontSize: device === "Mobile" ? `${width / 27}px` : "",
                marginTop: device === "Desktop" ? "20px" : "10px",
              }}
            >
              Type in the 6-digit code sent to the number +123456789
            </Typography>
          </Box>{" "}
          <Box sx={{ margin: "30px 0px 30px 0px" }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<Box sx={{ width: "16px" }}></Box>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    width: "32px",
                    height: "38px",
                    border: "none",
                    backgroundColor: "#271C39",
                    outline: "none",
                    borderBottom: "2px solid white",
                    color: "#ffff",
                    textAlign: "center",
                  }}
                />
              )}
            />
          </Box>{" "}
          <Box>
            <Typography
              sx={{
                color: "#979797",
                textAlign: "center",
                fontSize: device === "Mobile" ? `${width / 27}px` : "",
              }}
            >
              Resend OTP in 30 secconds
            </Typography>
          </Box>
          <button
            onClick={() => {
              if (otp.toString().length === 6) {
                console.log(otp);
              }
            }}
            style={{
              width: "100%",
              border: "none",
              padding: "8px 0px 6px 0px",
              borderRadius: "5px",
              backgroundColor:
                otp.toString().length === 6 ? "#7848ED" : "#979797",
              color: "#fff",
              fontWeight: "700",
              fontSize: device === "Mobile" ? `${width / 21}px` : "",
              marginTop: device === "Desktop" ? "140px" : "30px",
            }}
          >
            Next
          </button>
        </Box>
      )}
    </Dialog>
  );
}
