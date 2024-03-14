import { Box, Dialog, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AnimButton from "../../../AnimButton";
import {
  closeRenewalBadgePopup,
  deleteCurrentPackage,
} from "../../../../redux-saga-middleware/reducers/walletReducer";

export default function RenewalBadgePopup(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isChcekRenewalBadge } = useSelector((state) => state.walletReducer);
  const handleClose = () => {
    dispatch(closeRenewalBadgePopup());
  };
  const location = useLocation();

  const handleConfrim = () => {
    dispatch(
      deleteCurrentPackage()
    );
    dispatch(closeRenewalBadgePopup());
  };

  return (
    <>
      <Dialog
        open={isChcekRenewalBadge}
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
            borderRadius: 2,
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
              Do you agree to cancel the subscription pack renewal?
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
