import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/useWindowDimensions";

const ExtraCountDown = ({ time }) => {
  const { width } = useWindowDimensions();
  const calculateTimeLeft = () => {
    const difference = new Date("2023-12-07T12:00:00") - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Box
      sx={{
        backgroundColor: "#68399E",
        borderRadius: "20px !important",
        marginRight: "16px",
        padding: "2px 16px",
        flexDirection: "column",
      }}
      className="d-flex align-items-center"
    >
      <Typography
        sx={{ fontSize: width < 576 ? "10px" : "12px", fontWeight: "600" }}
      >
        Standard extra pack
      </Typography>
      <Typography
        sx={{
          fontSize: width < 576 ? "10px" : "12px",
          color: "#FB3",
          fontWeight: "600",
        }}
      >
        {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </Typography>
    </Box>
  );
};

export default ExtraCountDown;
