import { Box } from "@mui/material";
import React from "react";
import TotalPlayerSubcribe from "./TotalPlayerSubcribe";
import TotalReferralInfo from "./TotalReferralInfo";

export default function TotalComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid #374151",
        borderRadius: "16px",
        height: "170px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "20px 25px",
      }}
    >
      <TotalPlayerSubcribe />
      <TotalReferralInfo />
    </Box>
  );
}
