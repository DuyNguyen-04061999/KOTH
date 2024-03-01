import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../../utils/imagesReferral";
import PlayerLinearProgress from "../PlayerLinearProgress";

export default function MyLevelReferral() {
  return (
    <Box
      sx={{
        backgroundColor: "#271C39",
        border: "1px solid #374151",
        borderRadius: "16px",
        boxSizing: "border-box",
        padding: "10px",
        marginRight: "22px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {" "}
        <Box component={"img"} src={imagesReferral.BronzeIconSmall}></Box>
        <Box>
          <p style={{ color: "#9CA3AF", fontSize: "12px" }}>Your level</p>
          <p style={{ color: "#fff", fontSize: "14px", fontWeight: "700" }}>
            BRONZE
          </p>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <PlayerLinearProgress type="subscribe" />
        <Typography
          sx={{ color: "#9384B7", fontSize: "14px", textAlign: "start" }}
        >
          Or
        </Typography>
        <PlayerLinearProgress type="register" />
      </Box>
    </Box>
  );
}
