import { Box, Typography } from "@mui/material";
import React from "react";

export default function TotalReferralInfo() {
  return (
    <Box
      sx={{
        width: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontSize: "14px",
              marginLeft: "0px !important",
              color: "#9CA3AF",
            }}
          >
            Total Players Registered
          </Typography>
          <Typography sx={{ fontWeight: "700", color: "#fff" }}>150</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#9CA3AF",
              fontSize: "14px",
              marginLeft: "0px !important",
            }}
          >
            Total Bonuses
          </Typography>
          <Typography sx={{ fontWeight: "700", color: "#fff" }}>150</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#9CA3AF",
              fontSize: "14px",
              marginLeft: "0px !important",
            }}
          >
            Total Potential Bonuses
          </Typography>
          <Typography sx={{ fontWeight: "700", color: "#FB3" }}>150</Typography>
        </Box>
      </Box>
      <Box sx={{ border: "0.5px solid #374151", width: "100%" }}></Box>
      <button
        style={{
          width: "100%",
          color: "#fff",
          backgroundColor: "#FF9F38",
          padding: "8px",
          border: "none",
          outline: "none",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        Claim All
      </button>
    </Box>
  );
}
