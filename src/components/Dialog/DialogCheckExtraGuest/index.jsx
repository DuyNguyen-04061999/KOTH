import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { clickTab, closeDialogCheckExtraGuest, toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import AnimButton from "../../AnimButton";
import { Close } from "@mui/icons-material";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function DialogCheckExtraGuest() {
  const { isCheckExtraGuest } = useSelector((state) => state.authReducer);
  const {width} = useWindowDimensions()
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialogCheckExtraGuest());
  };

  const handleConfirm = () => {
    dispatch(toggleLoginDialog());
    dispatch(clickTab("signup"));
    dispatch(closeDialogCheckExtraGuest());
  };

  return ReactDOM.createPortal(
    <div>
      <Dialog
      fullScreen={width < 576 ? true : false}
        open={isCheckExtraGuest}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            background: "#181223 !important",
            backgroundColor: "#181223 !important",
            maxWidth: "480px !important",
          },
          "& .MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#181223 !important",
            maxWidth: "480px !important",
          },
        }}
      >
        <Box
          sx={{
            background: "#181223",
            padding: "24px",
          }}
        >
          <Box>
            <Close
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "white",
                fontSize: "30px",
                zIndex: 1,
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#fff",
                fontSize: "24px",
                fontStyle: "normal",
                fontWeight: "700",
                lineHeight: "130%",
                marginBottom: "20px !important",
                marginTop:"20px"
              }}
            >
              Guest Out of Extra
            </Typography>
            <Typography
              sx={{
                color: "#9384B7",
                textAlign: "center",
                textOverflow: "ellipsis",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "nomal",
              }}
            >
              You have run out of plays in this Promotion. Please join other
              promotions or register and purchase Extra to continue.
            </Typography>
            <Typography
              sx={{
                color: "#9384B7",
                textAlign: "center",
                textOverflow: "ellipsis",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "nomal",
                marginTop: "20px",
                marginBottom: "20px !important",
              }}
            >
              Would you like to register?
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "Center",
            }}
          >
            <Box
              sx={{
                minWidth: "200px",
                marginBottom: "20px",
              }}
            >
              <AnimButton
                onClick={handleConfirm}
                type="primary"
                text="Sign Up"
              />
            </Box>
            <Box
              sx={{
                minWidth: "200px",
                marginBottom: "20px",
              }}
            >
              <AnimButton onClick={handleClose} type="ghost" text="Cancel" />
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>,
    document.body
  );
}
