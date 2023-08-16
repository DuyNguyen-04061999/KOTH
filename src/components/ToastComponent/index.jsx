import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { images } from "../../utils/images";
import { useDispatch} from "react-redux";
import { hideToast } from "../../redux-saga-middleware/reducers/toastReducer";

export default function ToastComponent({ onclose, showAlert, content, type }) {
  const [show, setShow] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (show === "showToast") {
      setTimeout(() => {
        setShow("closeToast");
      }, 3000);
      onclose();
    }
  }, [show, dispatch, onclose]);
  useEffect(() => {
    if (showAlert === true) {
      setShow("showToast");
    }
  }, [showAlert]);
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
          type === "error"
            ? "#F05153"
            : type === "warning"
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
          type === "error"
            ? images.closeButtonToast
            : type === "warning"
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
          {content}
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
          type === "error"
            ? images.closeIconToast
            : type === "warning"
            ? images.closeWarningButton
            : images.successCloseButton
        }
      ></Box>
    </Box>
  );
}
