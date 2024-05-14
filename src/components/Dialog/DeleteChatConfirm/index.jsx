import { Box, CircularProgress, Dialog, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clostDeleteChatConfirmPopup,
  deleteChatReady,
} from "../../../redux-saga-middleware/reducers/chatReducer";

export default function DeleteChatConfirm() {
  const { isOpenConfirmDelete, isDeleteChatReady, currContacter } = useSelector(
    (state) => state.chatReducer
  );
  const dispatch = useDispatch();
  return (
    <Dialog
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
      open={isOpenConfirmDelete}
    >
      {" "}
      <Box
        sx={{
          padding: "20px",
          width: "auto",
          backgroundColor: "#181223",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <svg
            onClick={() => {
              !isDeleteChatReady && dispatch(clostDeleteChatConfirmPopup());
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
        </Box>{" "}
        <Typography
          sx={{
            textAlign: "center",
            color: "#FFF",
            fontSize: "25px",
            fontWeight: "700",
          }}
        >
          Confirm Chat Deletion
        </Typography>
        <Typography
          sx={{
            margin: "20px 0px",
            textAlign: "center",
            color: "#9384B7",
            fontWeight: "700",
          }}
        >
          Are you sure want to delete this chat?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => {
              !isDeleteChatReady &&
                dispatch(deleteChatReady(currContacter?.id));
            }}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #7848ED",
              backgroundColor: "#7848ED",
              color: "#fff",
              fontWeight: "700",
            }}
          >
            {isDeleteChatReady ? <CircularProgress size={20} /> : "Confirm"}
          </button>
          <button
            onClick={() => {
              dispatch(clostDeleteChatConfirmPopup());
            }}
            style={{
              width: "48%",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #7848ED",
              backgroundColor: "transparent",
              color: "#7848ED",
              fontWeight: "700",
              marginTop: "12px",
            }}
          >
            Cancel
          </button>
        </Box>
      </Box>
    </Dialog>
  );
}
