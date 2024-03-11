import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../../utils/imagesReferral";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

export default function PlayerLinearProgress({
  type,
  currentNumber,
  condition,
  nextTierName,
}) {
  const { device } = useSelector((state) => state.deviceReducer);
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 5,
    borderRadius: 5,
    margin: "4px 0px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#443565",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: type === "subscribe" ? "#6C5DD3" : "#3F8CFF",
    },
  }));
  return (
    <Box
      sx={{
        padding: device === "Mobile" ? "5px" : "10px",
        backgroundColor: "#412968",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#6D55A3",
          borderRadius: "50%",
          padding: device === "Mobile" ? "8px" : "10px",
          marginRight: "14px",
        }}
      >
        <Box
          sx={device === "Mobile" && { width: "10px", height: "10px" }}
          component={"img"}
          src={
            type === "subscribe"
              ? imagesReferral.subscriberIcon
              : imagesReferral.registerIcon
          }
        ></Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#fff",
              marginLeft: "0px !important",
              fontSize: device === "Mobile" ? "10px" : "14px",
            }}
          >
            {type === "subscribe" ? "Players Subscribed" : "Players Registered"}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              marginLeft: "0px !important",
              fontSize: device === "Mobile" ? "10px" : "14px",
            }}
          >
            {currentNumber || 0}/{condition || 0}
          </Typography>
        </Box>
        <BorderLinearProgress
          variant="determinate"
          value={
            condition && currentNumber && condition !== 0 && currentNumber !== 0
              ? (currentNumber / condition) * 100 >= 100
                ? 100
                : (currentNumber / condition) * 100
              : 0
          }
        />
        <Typography
          sx={{
            color: "#9384B7",
            marginLeft: "0px !important",
            fontSize: "10px",
            textAlign: "start",
          }}
        >
          {condition - currentNumber >= 0 ? condition - currentNumber : "0"}{" "}
          {type === "subscribe" ? "subscribers" : "registers"} until{" "}
          {nextTierName}
        </Typography>
      </Box>
    </Box>
  );
}
