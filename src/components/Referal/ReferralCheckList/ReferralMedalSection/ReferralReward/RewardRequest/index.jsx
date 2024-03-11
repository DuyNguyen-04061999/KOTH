import { Box, Typography } from "@mui/material";
import React from "react";
import DetailRewardRequest from "../DetailRewardRequest";
import { useSelector } from "react-redux";

export default function RewardRequest({ name, tierInfo }) {
  const { registerList } = useSelector((state) => state.referralReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const textStyle = {
    textAlign: "start",
    marginLeft: "0px !important",
    color: "#9384B7",
    fontSize: "12px",
    marginTop: "10px",
    marginBottom: "10px !important",
  };
  switch (name) {
    case "Bronze":
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: device === "Mobile" ? "column" : "",
            alignItems: device === "Mobile" ? "flex-start" : "flex-end",
          }}
        >
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width={device === "Mobile" ? "100%" : "45%"}
            currentNumber={
              registerList?.filter((n) => {
                return n.hasBuySubscription === true;
              })?.length || 0
            }
            condition={tierInfo?.subcribersCondition || 0}
          />
          <Typography sx={{ ...textStyle }}>Or</Typography>
          <DetailRewardRequest
            barColor="#3F8CFF"
            title="Players Registered"
            width={device === "Mobile" ? "100%" : "48%"}
            currentNumber={registerList?.length || 0}
            condition={tierInfo?.signUpCondition || 0}
          />
        </Box>
      );
    case "Silver":
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: device === "Mobile" ? "column" : "",
            alignItems: device === "Mobile" ? "flex-start" : "flex-end",
          }}
        >
          <DetailRewardRequest
            barColor="#6C5DD3"
            title="Players Subscribed"
            width={device === "Mobile" ? "100%" : "45%"}
            currentNumber={
              registerList?.filter((n) => {
                return n.hasBuySubscription === true;
              })?.length || 0
            }
            condition={tierInfo?.subcribersCondition || 0}
          />{" "}
          <Typography sx={{ ...textStyle }}>Or</Typography>{" "}
          <DetailRewardRequest
            barColor="#3F8CFF"
            title="Players Registered"
            width={device === "Mobile" ? "100%" : "48%"}
            currentNumber={registerList?.length || 0}
            condition={tierInfo?.signUpCondition || 0}
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
            currentNumber={
              registerList?.filter((n) => {
                return n.hasBuySubscription === true;
              })?.length || 0
            }
            condition={tierInfo?.subcribersCondition || 0}
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
            currentNumber={
              registerList?.filter((n) => {
                return n.hasBuySubscription === true;
              })?.length || 0
            }
            condition={tierInfo?.subcribersCondition || 0}
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
            currentNumber={
              registerList?.filter((n) => {
                return n.hasBuySubscription === true;
              })?.length || 0
            }
            condition={tierInfo?.subcribersCondition || 0}
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
            currentNumber={
              registerList?.filter((n) => {
                return n.hasBuySubscription === true;
              })?.length || 0
            }
            condition={tierInfo?.subcribersCondition || 0}
          />
        </Box>
      );
    default:
      return <></>;
  }
}
