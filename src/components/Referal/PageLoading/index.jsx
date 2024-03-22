import { CircularProgress, Dialog } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function PageLoading() {
  const { isFetchingUpLevel } = useSelector((state) => state.referralReducer);
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "5px !important",
          backgroundColor: "transparent !important",
          margin: "20px",
        },
        zIndex: "1322",
        borderRadius: "5px !important",
        backgroundColor: "transparent !important",
      }}
      open={isFetchingUpLevel}
    >
      <CircularProgress color="secondary" />
    </Dialog>
  );
}
