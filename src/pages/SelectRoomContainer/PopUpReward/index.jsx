import React from "react";
import "./index.scss";
import { Box, Dialog, Typography } from "@mui/material";
import { images } from "../../../utils/images";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";
export default function PopUpReward({ open, handleOnCloseReward }) {
  const { width } = useWindowDimensions();
  const { reward, typeReward } = useSelector((state) => state.gameReducer);
  console.log("Reward: ", reward, typeReward);
  return (
    <>
      <Dialog
        sx={{
          "& .css-1hju3x6-MuiPaper-root-MuiDialog-paper": {
            borderRadius: "11px !important",
          },
          zIndex: "1320",
        }}
        maxWidth="2000px !important"
        onClose={handleOnCloseReward}
        open={open}
      >
        <Box
          sx={{
            width: width < 576 ? "259px" : "824px",
            height: width < 576 ? "350px" : "469px",
            backgroundImage: `url(${
              typeReward === "defeated"
                ? images.loseWardBG
                : images.backGroundWiningReward
            })`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px",
          }}
        >
          <Box
            sx={{ width: width < 576 ? "100px" : "129px" }}
            src={images.defeat}
            component={"img"}
          ></Box>
          <Box
            sx={{ width: width < 576 ? "100px" : "143px" }}
            src={
              typeReward === "defeated" ? images.loseMedal : images.winingMedal
            }
            component={"img"}
          ></Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: width < 576 ? "30px" : "42px",
                height: width < 576 ? "30px" : "42px",
              }}
              src={images.coinIcon}
              component={"img"}
            ></Box>
            <Typography
              sx={{ color: "#fff", fontSize: width < 576 ? "20px" : "50px" }}
            >
              {reward ? reward : "0"}
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
