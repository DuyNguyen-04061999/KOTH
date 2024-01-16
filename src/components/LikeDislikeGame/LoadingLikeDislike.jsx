import { CircularProgress, Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function LoadingLikeDislike(props) {
  const { isReady } = useSelector((state) => state.likeDislikeReducer);
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      open={isReady}
    >
      <CircularProgress color="secondary" />
    </Dialog>
  );
}
