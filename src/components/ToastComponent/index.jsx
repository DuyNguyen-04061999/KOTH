import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { images } from "../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../redux-saga-middleware/reducers/toastReducer";

export default function ToastComponent() {
  const [show, setShow] = useState("");
  const dispatch = useDispatch();
  const { isShowToast, messageToast, typeToast } = useSelector(
    (state) => state.toastReducer
  );
  useEffect(() => {
    if (show === "showToast") {
      setTimeout(() => {
        setShow("closeToast");
      }, 3000);
      dispatch(hideToast());
    }
  }, [show, dispatch]);
  useEffect(() => {
    if (isShowToast === true) {
      setShow("showToast");
    }
  }, [isShowToast]);
  return (
    <Box
      className={`${show} snackbar`}
      sx={{
        width: "450px",
        height: "62px",
        position: "fixed",
        top: "60px",
        left: "38%",
        padding: "10px 20px",
        borderRadius: "5px",
        background:
          typeToast === "error"
            ? "#F05153"
            : typeToast === "warning"
            ? "#F3D886"
            : "#9ED458",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.50)",
        zIndex: "10005",
      }}
    >
      <Box
        component={"img"}
        src={
          typeToast === "error"
            ? images.closeButtonToast
            : typeToast === "warning"
            ? images.WarningIcon
            : images.successIcon
        }
      ></Box>
      <Box sx={{ padding: "0px 10px" }}>
        <Typography
          sx={{
            textAlign: "start",
            fontSize: "14px",
            fontWeight: "lighter !important",
            color: "#ffff",
            letterSpacing: "0.6px",
          }}
        >
          {messageToast}
        </Typography>
      </Box>
      <Box
        onClick={() => {
          setShow("closeToast");
          dispatch(hideToast());
        }}
        sx={{ width: "16px", height: "16px", cursor: "pointer" }}
        component={"img"}
        src={
          typeToast === "error"
            ? images.closeIconToast
            : typeToast === "warning"
            ? images.closeWarningButton
            : images.successCloseButton
        }
      ></Box>
    </Box>
  );
}
