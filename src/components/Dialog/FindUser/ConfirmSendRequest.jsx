import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useSelector } from "react-redux";

export default function ConfirmSendRequest(props) {
  const { username, open, onClose } = props;
  const [socket, setSocket] = useState("");
  const { device } = useSelector((state) => state.deviceReducer);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const handleOnClickConfirm = () => {
    socket.emit("addFriend", {
      username: username,
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: "#181223",
          width: device === "Desktop" ? "430px" : "300px",
          height: "160px",
          boxSizing: "border-box",
          padding: "20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            onClick={onClose}
            sx={{
              width: device === "Desktop" ? "22px" : "10px",
              height: device === "Desktop" ? "22px" : "10px",
              cursor: "pointer",
            }}
            component={"img"}
            src={images.closeButtonInvite}
          ></Box>
        </Box>
        <Typography sx={{ color: "#fff" }}>
          Send a friend request to{" "}
          <span style={{ color: "#7C81F2" }}>
            {username?.length > 11 ? username.slice(0, 11) + " ..." : username}
          </span>{" "}
          ?
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <Box
            onClick={onClose}
            sx={{
              width: "46%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              borderRadius: "5px",
              border: "2px solid #7848ED",
              color: "#7848ED",
              cursor: "pointer",
              fontSize: device === "Desktop" ? "14px" : "12px",
            }}
          >
            CANCEL
          </Box>
          <Box
            onClick={handleOnClickConfirm}
            sx={{
              width: "46%",
              backgroundColor: "#7848ED",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              borderRadius: "5px",
              color: "#fff",
              cursor: "pointer",
              fontSize: device === "Desktop" ? "14px" : "12px",
            }}
          >
            CONFIRM
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
