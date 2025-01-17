import { Box, Typography } from "@mui/material";
import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

export default function DetailRewardRequest({
  barColor,
  title,
  width,
  currentNumber,
  condition,
}) {
  const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 7,
    borderRadius: 5,
    margin: "4px 0px",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#443565",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: barColor,
    },
  }));
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: width }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            color: "#808191",
            marginLeft: "0px !important",
            fontSize: "14px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "#fff",
            marginLeft: "0px !important",
            fontSize: "14px",
          }}
        >
          {currentNumber || 0}/{condition || 0}
        </Typography>
      </Box>
      <BorderLinearProgress
        variant="determinate"
        value={
          condition !== 0
            ? (currentNumber / condition) * 100 >= 100
              ? 100
              : (currentNumber / condition) * 100
            : 0
        }
      />
    </Box>
  );
}
