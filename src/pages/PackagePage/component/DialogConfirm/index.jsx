import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimButton from "../../../../components/AnimButton";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { toggleDialogConfirm } from "../../../../redux-saga-middleware/reducers/authReducer";

export default function DialogConfirm() { 
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
            <AnimButton
              onClick={handleClose}
              sx={{
                color: "white",
                padding: " 5px 25px",
                background: "#251936",
              }}
              text="Cancel"
              type="ghost"
            />
            <Button
              onClick={() => {
                socket.emit("buyPackage", {
                  packageId : idPackage
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
