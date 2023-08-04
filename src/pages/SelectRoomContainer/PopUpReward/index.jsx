import React from "react";
import "./index.scss";
import { Box, Dialog, Typography } from "@mui/material";
import { images } from "../../../utils/images";
import { useEffect } from "react";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useState } from "react";
import { useDispatch } from "react-redux";
export default function PopUpReward({ open, handleOnCloseReward }) {
  const [socket, setSocket] = useState(null);
  const [type, setType] = useState("");
  const [reward, setReward] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [dispatch]);
  useEffect(() => {
    socket?.on("gameWin", ({ type, value }) => {
      setType(type);
      setReward(value);
    });
    socket?.on("gameDefeated", (data) => {
      setType(data.type);
      setReward(data.value);
    });
  }, [socket]);
  
  return (
    <>
      {/* <Dialog
        sx={{
          "& .css-1hju3x6-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "11px !important",
          },
        }}
        maxWidth="2000px !important"
        onClose={handleOnCloseReward}
        open={false}
      >
        <Box
          sx={{
            width: "825px",
            height: "470px",
            backgroundSize: "cover",
            backgroundImage: `url(${images.backGroundWiningReward})`,
            backgroundRepeat: "no-repeat",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "50px",
          }}
        >
          <Box
            sx={{ width: "129px" }}
            src={images.WINNER}
            component={"img"}
          ></Box>
          <Box
            sx={{ width: "283px" }}
            src={images.winingMedal}
            component={"img"}
          ></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{ width: "42px", height: "42px" }}
              src={images.coinIcon}
              component={"img"}
            ></Box>
            <Typography sx={{ color: "#fff", fontSize: "50px" }}>
              5000
            </Typography>
          </Box>
        </Box>
      </Dialog> */}
      <Dialog
        sx={{
          "& .css-1hju3x6-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "11px !important",
          },
        }}
        maxWidth="2000px !important"
        onClose={handleOnCloseReward}
        open={open}
      >
        <Box
          sx={{
            width: "824px",
            height: "469px",
            backgroundImage: `url(${images.loseWardBG})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "50px",
          }}
        >
          <Box
            sx={{ width: "129px" }}
            src={images.defeat}
            component={"img"}
          ></Box>
          <Box
            sx={{ width: "143px" }}
            src={images.loseMedal}
            component={"img"}
          ></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{ width: "42px", height: "42px" }}
              src={images.coinIcon}
              component={"img"}
            ></Box>
            <Typography sx={{ color: "#fff", fontSize: "50px" }}>
              {reward}
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
