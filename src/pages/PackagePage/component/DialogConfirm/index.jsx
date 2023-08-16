import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialogConfirm } from "../../../../redux-saga-middleware/reducers/authReducer";
import { useState } from "react";
import { useEffect } from "react";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { Box } from "@mui/material";

export default function DialogConfirm() { 
  // const [open, setOpen] = React.useState(false);
  const { isDialogConfirm, idPackage } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  const handleClose = () => {
    dispatch(toggleDialogConfirm());
  };

  return (
    <div>
      <Dialog
        open={isDialogConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{
            background: "#37285C",
            width:"250px"
          }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{
                color: "white",
              }}
            >
              Do you agree to buy this package ?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "Center",
              paddingBottom:"20px"
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                color: "white",
                padding: " 5px 25px",
                background: "#251936",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                socket.emit("buyPackage", {
                  idPackage,
                });
                dispatch(toggleDialogConfirm());
              }}
              autoFocus
              sx={{
                background: "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                color: "white",
                padding: " 5px 40px",
              }}
            >
              Buy
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
