import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MyLevelReferral from "./MyLevelReferral";
import ReferralMedalSection from "./ReferralMedalSection";

export default function ReferralCheckList() {
  const { device } = useSelector((state) => state.deviceReducer);
  return (
    <Box sx={{ marginTop: "32px" }}>
      <Typography
        sx={{
          textAlign: "start",
          color: "#fff",
          marginLeft: "0px !important",
          fontSize: device === "Mobile" ? "15px" : "24px",
        }}
      >
        Referral Checklist Log
      </Typography>
      <Box
        sx={{
          border: "1px solid #374151",
          marginTop: "24px",
          boxSizing: "border-box",
          padding: "24px",
          borderRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <MyLevelReferral />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "#7C81F2",
              fontWeight: "600",
              marginBottom: "12px !important",
            }}
          >
            Share and refer your friends to get more
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
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
              fontSize: "14px",
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
