import { Box } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../utils/imagesReferral";
import TotalComponent from "./TotalComponent";
import ShareLink from "./ShareLink";

export default function ReferralHeader() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component={"img"} src={imagesReferral.referralBanner}></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          boxSizing: "border-box",
          padding: "20px 25px",
          backgroundColor: "#271C39",
          justifyContent: "space-between",
        }}
      >
        <TotalComponent />
        <ShareLink />
      </Box>
    </Box>
  );
}
