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
  const { orientation } = useSelector((state) => state.gameReducer);
  const mobileCondition =
    device === "Mobile" || (device === "Tablet" && orientation === "portrait");
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
        flexDirection: mobileCondition ? "column" : "",
      }}
    >
      <Box
        sx={{
          width: mobileCondition ? "70%" : "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: mobileCondition ? "100%" : "auto",
            height: mobileCondition ? "auto" : "350px",
          }}
          component={"img"}
          src={medalSmallIcon[name].bgSrc}
        ></Box>
      </Box>
      <Box
        sx={{
          width: mobileCondition ? "100%" : "45%",
          marginLeft: mobileCondition ? "" : "100px",
        }}
      >
        <Typography
          sx={{
            color: "#7848ED",
            fontSize: mobileCondition ? "16px" : "24px",
            fontWeight: "700",
            ...textStyle,
            textTransform: "uppercase",
            textAlign: mobileCondition ? "center" : "",
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
