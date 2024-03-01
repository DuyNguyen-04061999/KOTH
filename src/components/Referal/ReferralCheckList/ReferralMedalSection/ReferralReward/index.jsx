import { Box, Typography } from "@mui/material";
import React from "react";
import RewardContent from "./RewardContent";
import { medalSmallIcon } from "../../../../../utils/ReferralMedal";
import RewardRequest from "./RewardRequest";
import ReferralRewardButton from "./ReferralRewardButton";

export default function ReferralReward({ name }) {
  const textStyle = {
    textAlign: "start",
    marginLeft: "0px !important",
  };
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#0F041D",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Box
          sx={{
            width: "auto",
            height: "320px",
          }}
          component={"img"}
          src={medalSmallIcon[name].bgSrc}
        ></Box>
      </Box>
      <Box sx={{ width: "45%", marginLeft: "100px" }}>
        <Typography
          sx={{
            color: "#7848ED",
            fontSize: "24px",
            fontWeight: "700",
            ...textStyle,
            textTransform: "uppercase",
          }}
        >
          LEVEL {name}
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Typography sx={{ ...textStyle, color: "#fff", fontSize: "14px" }}>
            Request
          </Typography>
          <RewardRequest name={name} />
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <Typography sx={{ ...textStyle, color: "#fff", fontSize: "14px" }}>
            Rewards
          </Typography>
          <RewardContent
            content={medalSmallIcon[name].content}
            imgSrc={medalSmallIcon[name].imgSrc}
          />
        </Box>
        <ReferralRewardButton />
      </Box>
    </Box>
  );
}
