import { Box } from "@mui/material";
import React from "react";

export default function ReferralRewardButton() {
  return (
    <Box
      sx={{
        marginTop: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <button
        style={{
          width: "112px",
          height: "36px",
          border: "none",
          outline: "none",
          borderRadius: "4px",
          backgroundColor: "#FF9F38",
          cursor: "pointer",
          color: "#fff",
          fontSize: "12px",
        }}
      >
        Claim
      </button>
    </Box>
  );
}
