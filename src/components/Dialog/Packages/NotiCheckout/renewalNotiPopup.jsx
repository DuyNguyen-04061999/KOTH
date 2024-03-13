import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AnimButton from "../../../AnimButton";
import {
  closeRenewalNotiPopup,
  openRenewalNotiPopup,
  toggleCheckWallet,
} from "../../../../redux-saga-middleware/reducers/walletReducer";

export default function RenewalNotiPopup(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCheckRenewalNoti, typeWallet, goldCombo, totalExtra } = useSelector(
    (state) => state.walletReducer
  );
  const { uPack } = useSelector((state) => state.userReducer);
  const Remain = uPack?.remain
  const handleClose = () => {
    dispatch(closeRenewalNotiPopup());
  };

  const location = useLocation();

  const handleConfrim = () => {
    dispatch(
      toggleCheckWallet({
        type: typeWallet,
        gold: goldCombo,
        total: totalExtra,
      })
    );
    dispatch(closeRenewalNotiPopup());
  };

  return (
    <>
      <Dialog
        open={isCheckRenewalNoti}
        onClose={handleClose}
        sx={{
          "& .css-hz1bth-MuiDialog-container": {
            width: "100%",
          },
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "100%",
            borderRadius: 0,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "#271C39",
            maxWidth: "490px",
            padding: "15px",
            borderRadius: 2
          },
        }}
      >
        <Box
          sx={{
            padding: "25px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "18px",
                marginBottom: "20px !important",
                fontWeight: "400 !important",
                color: "#9384B7",
              }}
              className="text-center"
            >
              You have {`${Remain?.slice(0,-1)}`} days left on your current subscription. Adding this
              pack will extend your total subscription to 50 day left on your
              current. Confirm purchase?"
            </Typography>
          </Box>
          <Box display={"flex"}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <AnimButton type="ghost" text="Cancel" onClick={handleClose} />
            </Box>
            <Box
              sx={{
                width: "100%",
                marginLeft: "20px",
              }}
            >
              <AnimButton
                type="primary"
                text="Confirm"
                onClick={handleConfrim}
              />
            </Box>
          </Box>
        </Box>
        {/* <Package /> */}
      </Dialog>
    </>
  );
}
