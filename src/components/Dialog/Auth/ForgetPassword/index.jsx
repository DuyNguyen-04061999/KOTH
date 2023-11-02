import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import { images, sign } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import AnimButton from "../../../AnimButton";

export default function ForgetPassword() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { width } = useWindowDimensions();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  // return ReactDOM.createPortal(
  //   <Dialog
  //     onClose={() => {
  //       dispatch(toggleForgetPass(false));
  //     }}
  //     open={forgetPassDialog}
  //     fullScreen={device === "Mobile" ? true : false}
  //   >
  //   </Dialog>, document.body
  // );

  const handleSubmit = () => {
    socket?.emit("forgetPassword", {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      type:"password"
    });
    // dispatch(clickTab("createPass"));
  };

  useEffect(() => {
    if(socket){
      socket?.on("forgetPasswordSuccess",() => {
        dispatch(clickTab("createPass"))
      })
    }
    return () => {
      socket?.off("forgetPasswordSuccess")
    }
  }, [socket])
  

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
          Forgot Password
        </Typography>
        <Typography
          sx={{
            color: "#979797",
            textAlign: "center",
            fontSize: device === "Mobile" ? `${width / 27}px` : "14px",
            marginTop: device === "Desktop" ? "12px" : "0px",
          }}
        >
          Please enter the username and phone number that associated with your
          account. We will send you a verification code.
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
            placeholder="Username"
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
            type="text"
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
              src={sign.up03}
            />
          </Box>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            style={{
              width: "100%",
              backgroundColor: "#181223",
              outline: "none",
              border: "none",
              color: "white",
              fontSize: "14px",
              padding: "10px 12px 10px 0px",
              fontFamily: "Cyntho Next",
              borderRadius:
                phoneNumber?.length > 16
                  ? "0px 5px 0px 0px"
                  : "0px 5px 5px 0px",
            }}
            type="text"
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
              color: "white",
              fontSize: "14px",
              padding: "10px 12px 10px 0px",
              fontFamily: "Cyntho Next",
              borderRadius:
                phoneNumber?.length > 16
                  ? "0px 5px 0px 0px"
                  : "0px 5px 5px 0px",
            }}
            type="number"
          />
        </Box>
      </Box>
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
            onClick={() => dispatch(clickTab("login"))}
          >
            Back
          </AnimButton>
        </Box>
        <Box sx={{ width: "48%" }}>
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
            onClick={() => handleSubmit()}
          >
            Next
          </AnimButton>
        </Box>
      </Box>
    </Box>
  );
}
