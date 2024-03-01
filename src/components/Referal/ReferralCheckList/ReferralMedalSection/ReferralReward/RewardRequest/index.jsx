import { Box } from "@mui/material";
import React from "react";
import DetailRewardRequest from "../DetailRewardRequest";

export default function RewardRequest({ name }) {
  switch (name) {
    case "Bronze":
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width="48%"
          />
          <DetailRewardRequest
            barColor="#3F8CFF"
            title="Players Registered"
            width="48%"
          />
        </Box>
      );
    case "Silver":
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width="48%"
          />
          <DetailRewardRequest
            barColor="#3F8CFF"
            title="Players Registered"
            width="48%"
          />
        </Box>
      );
    case "Gold":
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width="100%"
          />
        </Box>
      );
    case "Platinum":
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width="100%"
          />
        </Box>
      );
    case "Diamond":
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width="100%"
          />
        </Box>
      );
    case "Pinnacle":
      return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width="100%"
          />
        </Box>
      );
    default:
      return <></>;
  }
}
