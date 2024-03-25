import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MyLevelReferral from "./MyLevelReferral";
import ReferralMedalSection from "./ReferralMedalSection";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function ReferralCheckList() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { width } = useWindowDimensions();
  const mobileCondition =
    device === "Mobile" ||
    (device === "Tablet" && orientation === "portrait") ||
    width < 1200;
  return (
    <Box sx={{ marginTop: "32px" }}>
      <Typography
        sx={{
          textAlign: "start",
          color: "#fff",
          marginLeft: "0px !important",
          fontSize: mobileCondition ? "20px" : "24px",
          fontWeight: "700",
        }}
      >
        Referral Checklist Log
      </Typography>
      <Box
        sx={{
          border: device === "Mobile" ? "none" : "1px solid #374151",
          marginTop: "24px",
          boxSizing: "border-box",
          padding: device === "Mobile" ? "none" : "24px",
          borderRadius: device === "Mobile" ? "none" : "16px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: device === "Mobile" ? "column-reverse" : "row",
        }}
      >
        <MyLevelReferral />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Typography
            sx={{
              fontSize: mobileCondition ? "12px" : "16px",
              color: "#7C81F2",
              fontWeight: "600",
              marginBottom: "12px !important",
            }}
          >
            Share and refer your friends to get more
          </Typography>
          <Typography
            sx={{
              fontSize: mobileCondition ? "10px" : "14px",
              color: "#9CA3AF",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            Only applies to new users who have registered under your special
            link and subscribed
          </Typography>
          <Typography
            sx={{
              fontSize: mobileCondition ? "10px" : "14px",
              color: "#9CA3AF",
              fontWeight: "500",
              marginBottom: "12px",
            }}
          >
            Level up and get more exciting bonuses as you reach higher tiers in
            our referral program
          </Typography>
        </Box>
      </Box>
      <ReferralMedalSection />
    </Box>
  );
}
