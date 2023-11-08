import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { clickTab, closeVerifyDialog, openLoginDialog } from "../../../../redux-saga-middleware/reducers/authReducer";
import { logoutReady } from "../../../../redux-saga-middleware/reducers/userReducer";
import AnimButton from "../../../AnimButton";

export default function DialogVerify() {
  const { isVerifyDialog } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  const handleClose = () => {
    dispatch(closeVerifyDialog());
    dispatch(logoutReady());
  };

  const handleConfirm = () => {
    dispatch(closeVerifyDialog());
    dispatch(openLoginDialog());
    dispatch(clickTab("otpVerifyAccount"));
  }

  return ReactDOM.createPortal(
    <div>
      <Dialog
        open={isVerifyDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            background: "#181223",
            padding: "24px",
          }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                textAlign: "center",
                maxWidth: "320px",
              }}
            >
              Your account has not been verified. You must verify it to use our
              services.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "Center",
              paddingBottom: "20px",
            }}
          >
            <AnimButton onClick={handleClose} type={"ghost"} text={"Cancel"} />
            <AnimButton onClick={handleConfirm} type={"primary"} text={"Confirm"} />
          </DialogActions>
        </Box>
      </Dialog>
    </div>,
    document.body
  );
}
