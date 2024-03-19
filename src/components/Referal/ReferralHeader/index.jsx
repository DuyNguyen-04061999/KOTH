import { Box } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../utils/imagesReferral";
import TotalComponent from "./TotalComponent";
import ShareLink from "./ShareLink";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function ReferralHeader() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { width } = useWindowDimensions();
  const { orientation } = useSelector((state) => state.gameReducer);
  const mobileCondition =
    device === "Mobile" ||
    (device === "Tablet" && orientation === "portrait") ||
    width < 1200;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: mobileCondition ? "column" : "row",
        marginTop: "24px",
      }}
    >
      <Box
        sx={{
          width: mobileCondition
            ? "100%"
            : device === "Tablet"
            ? "50%"
            : "none",
        }}
        component={"img"}
        src={imagesReferral.referralBanner}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          boxSizing: "border-box",
          padding: mobileCondition ? "10px 0px" : "20px 25px",
          backgroundColor: mobileCondition ? "none" : "#271C39",
          justifyContent: "space-between",
        }}
      >
        <TotalComponent />
        <ShareLink />
      </Box>
    </Box>
  );
}
