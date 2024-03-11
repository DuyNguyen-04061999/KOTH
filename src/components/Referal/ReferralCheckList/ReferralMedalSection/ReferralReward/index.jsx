import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RewardContent from "./RewardContent";
import { medalSmallIcon } from "../../../../../utils/ReferralMedal";
import RewardRequest from "./RewardRequest";
import ReferralRewardButton from "./ReferralRewardButton";
import { useSelector } from "react-redux";

export default function ReferralReward({ name }) {
  const { tierList } = useSelector((state) => state.referralReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const [tierInfo, setTierInfo] = useState([]);
  const textStyle = {
    textAlign: "start",
    marginLeft: "0px !important",
  };
  useEffect(() => {
    if (tierList) {
      setTierInfo(
        tierList?.filter((n) => {
          return n.tierName === name;
        })[0]
      );
    } else {
      setTierInfo([]);
    }
  }, [name, tierList]);
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
        flexDirection: device === "Mobile" ? "column" : "",
      }}
    >
      <Box
        sx={{
          width: device === "Mobile" ? "70%" : "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: device === "Mobile" ? "100%" : "auto",
            height: device === "Mobile" ? "auto" : "350px",
          }}
          component={"img"}
          src={medalSmallIcon[name].bgSrc}
        ></Box>
      </Box>
      <Box
        sx={{
          width: device === "Mobile" ? "100%" : "45%",
          marginLeft: device === "Mobile" ? "" : "100px",
        }}
      >
        <Typography
          sx={{
            color: "#7848ED",
            fontSize: device === "Mobile" ? "16px" : "24px",
            fontWeight: "700",
            ...textStyle,
            textTransform: "uppercase",
            textAlign: device === "Mobile" ? "center" : "",
          }}
        >
          LEVEL {name}
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Typography sx={{ ...textStyle, color: "#fff", fontSize: "14px" }}>
            Request
          </Typography>
          <RewardRequest name={name} tierInfo={tierInfo} />
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
        <ReferralRewardButton tierInfo={tierInfo} />
      </Box>
    </Box>
  );
}
