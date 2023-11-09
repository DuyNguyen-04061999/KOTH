import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import {
    closeSubscribeDialog,
    toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { joinPromotion } from "../../../redux-saga-middleware/reducers/promotionReducer";
import { toggleTournamentShow } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import AnimButton from "../../AnimButton";

export default function DialogSubscribe() {
  const { isSubscribeDialog } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { detailTournament } = useSelector((state) => state.playgameReducer);
  const {
    tokenUser: token,
    uPack,
    countTicket,
    listJoinedTour,
  } = useSelector((state) => state.userReducer);

  const handleJoinTour = (sub) => {
    if (
      (detailTournament?.tournamentVip !== 0 && uPack === null) ||
      (detailTournament?.tournamentVip !== 0 &&
        uPack &&
        uPack?.remain === "Expired")
    ) {
      dispatch(toggleTournamentShow());
    } else if (token) {
      dispatch(
        joinPromotion({
          tournamentId: detailTournament?.id,
          sub: sub ? sub : null,
        })
      );
    } else {
      dispatch(toggleLoginDialog());
    }
  };

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  const handleClose = () => {
      handleJoinTour();
      dispatch(closeSubscribeDialog());
  };

  const handleConfirm = () => {
    handleJoinTour(true);
    dispatch(closeSubscribeDialog());

  };

  return ReactDOM.createPortal(
    <div>
      <Dialog
        open={isSubscribeDialog}
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
              Would you like to be notified by email and SMS when the promotion
              is about to start and end?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "Center",
              paddingBottom: "20px",
            }}
          >
            <AnimButton onClick={handleClose} type={"ghost"} text={"No"} />
            <AnimButton
              onClick={handleConfirm}
              type={"primary"}
              text={"Confirm"}
            />
          </DialogActions>
        </Box>
      </Dialog>
    </div>,
    document.body
  );
}
