import { Box, Dialog } from "@mui/material";
import React from "react";
import { imageHome, images } from "../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { closeNewYearPopup } from "../../../redux-saga-middleware/reducers/appReducer";

export default function HappyNewYearPopup() {
  const { showPopupBewYear } = useSelector((state) => state.appReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();
  return (
    <Dialog
      open={showPopupBewYear}
      onClose={() => {
        dispatch(closeNewYearPopup(new Date()));
      }}
    ></Dialog>
  );
}
