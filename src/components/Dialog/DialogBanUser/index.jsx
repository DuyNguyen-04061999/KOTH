import React from "react";
import { Box, Dialog, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeReasonDialogFunction } from "../../../redux-saga-middleware/reducers/userReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
export default function DialogBanUser() {
  const { openReasonDialog, currentGoingToBanUser } = useSelector(
    (state) => state.userReducer
  );
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  return (
    <Dialog
      onClose={() => {
        dispatch(closeReasonDialogFunction());
      }}
      open={openReasonDialog}
      sx={{
        "& .css-hz1bth-MuiDialog-container": {
          width: "100%",
        },
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          width: "100%",
          borderRadius: 0,
        },
        "& .MuiDialog-paper": {
          backgroundColor: "transparent",
          maxWidth: "490px",
        },
      }}
    >
      <Box sx={{ padding: "20px", width: "auto", backgroundColor: "#181223" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <svg
            onClick={() => {
              dispatch(closeReasonDialogFunction());
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ cursor: "pointer" }}
          >
            <path
              d="M16 2.00001L2 16L9.11394e-07 14L14 7.62833e-06L16 2.00001Z"
              fill="white"
            />
            <path d="M14 16L0 2L2 9.11394e-07L16 14L14 16Z" fill="white" />
          </svg>
        </Box>
        <Typography
          sx={{ textAlign: "center", color: "#FFF", fontSize: "25px" }}
        >
          Alert
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "#FFF",
            fontWeight: "500",
            marginTop: "20px",
          }}
        >
          You are going to ban <span style={{ color: "#7C81F2" }}>Yakult</span>
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "#FFF",
            fontWeight: "500",
            marginTop: "20px",
          }}
        >
          Please fill out the ban reason to proceed.
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {" "}
          <textarea
            placeholder="Banned reason"
            style={{
              width: "90%",
              resize: "none",
              height: width < 576 ? "50px" : "100px",
              backgroundColor: "#271C39",
              border: "none",
              outline: "none",
              fontSize: width < 576 ? "14px" : "16px",
              fontFamily: "Cyntho Next",
              color: "#fff",
              borderRadius: "4px",
              padding: "12px",
            }}
          ></textarea>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            marginTop: "40px",
          }}
        >
          <button
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #7848ED",
              backgroundColor: "transparent",
              color: "#7848ED",
              fontWeight: "700",
            }}
          >
            Cancel
          </button>
          <button
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "#979797",
              color: "#fff",
              border: "none",
              outline: "none",
              fontWeight: "700",
            }}
          >
            Confirm
          </button>
        </Box>
      </Box>
    </Dialog>
  );
}
