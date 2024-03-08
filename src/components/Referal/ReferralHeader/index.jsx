import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../utils/imagesReferral";
import TotalComponent from "./TotalComponent";
import ShareLink from "./ShareLink";
import { useSelector } from "react-redux";

export default function ReferralHeader() {
  const { device } = useSelector((state) => state.deviceReducer);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: device === "Mobile" ? "column" : "row",
        marginTop: "24px",
      }}
    >
      <Box
        sx={{ width: device === "Mobile" ? "100%" : "none" }}
        component={"img"}
        src={imagesReferral.referralBanner}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          boxSizing: "border-box",
          padding: device === "Mobile" ? "10px 0px" : "20px 25px",
          backgroundColor: device === "Mobile" ? "none" : "#271C39",
          justifyContent: "space-between",
        }}
      >
        <TotalComponent />
        <ShareLink />
      </Box>
    </Box>
  );
}
