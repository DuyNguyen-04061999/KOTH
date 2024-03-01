import { Box, Typography } from "@mui/material";
import React from "react";
import { imagesReferral } from "../../../../utils/imagesReferral";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

export default function PlayerLinearProgress({ type }) {
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
        padding: "10px",
        backgroundColor: "#412968",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#6D55A3",
          borderRadius: "50%",
          padding: "10px",
          marginRight: "14px",
        }}
      >
        <Box
          component={"img"}
          src={
            type === "subscribe"
              ? imagesReferral.subscriberIcon
              : imagesReferral.registerIcon
          }
        ></Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", width: "260px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#fff",
              marginLeft: "0px !important",
              fontSize: "14px",
            }}
          >
            {type === "subscribe" ? "Players Subscribed" : "Players Registered"}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              marginLeft: "0px !important",
              fontSize: "14px",
            }}
          >
            5/10
          </Typography>
        </Box>
        <BorderLinearProgress variant="determinate" value={50} />
        <Typography
          sx={{
            color: "#9384B7",
            marginLeft: "0px !important",
            fontSize: "10px",
            textAlign: "start",
          }}
        >
          5 subscribers until Silver
        </Typography>
      </Box>
    </Box>
  );
}
