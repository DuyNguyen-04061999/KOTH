import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function LoadingPopup() {
  return (
    <Box
      className="position-absolute p-3"
      sx={{
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100%",
          height: "100%",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    </Box>
  );
}
