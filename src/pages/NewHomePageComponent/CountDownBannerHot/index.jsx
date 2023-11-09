import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Box, Typography } from "@mui/material";
import { CalculateDistance } from "../../../components/CountDownTimer/utils/CalculateDistance";

export default function CountDownBannerHot({
  expiryTime = "8/16/2023 07:00:00",
}) {
  const { width } = useWindowDimensions();
  const [hours, setHour] = useState(null);
  const [minutes, setMinute] = useState(null);
  const [days, setDay] = useState(null);
  useEffect(() => {
    let timeInterval = setInterval(() => {
      let countdownDate = new Date(expiryTime).getTime();
      let timeNow = new Date().getTime();
      setHour(CalculateDistance(countdownDate, timeNow).hours);
      setMinute(CalculateDistance(countdownDate, timeNow).minutes);
      setDay(CalculateDistance(countdownDate, timeNow).days);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [expiryTime]);
  return width < 576 ? (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontSize: "10px",
          color: "white",
          marginLeft: "0px !important",
        }}
      >
        {days && days}d
      </Typography>
      <Typography
        sx={{
          fontSize: "4.695px",
          color: "white",
          margin: "0px 4px !important",
        }}
      >
        :
      </Typography>
      <Typography
        sx={{
          fontSize: "10px",
          color: "white",
          marginLeft: "0px !important",
        }}
      >
        {hours && hours}h
      </Typography>{" "}
      <Typography
        sx={{
          fontSize: "4.695px",
          color: "white",
          margin: "0px 4px !important",
        }}
      >
        :
      </Typography>
      <Typography
        sx={{
          fontSize: "10px",
          color: "white",
          marginLeft: "0px !important",
        }}
      >
        {minutes}m
      </Typography>{" "}
    </Box>
  ) : (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          fontSize: "25.052px",
          color: "white",
          marginLeft: "0px !important",
          lineHeight:1.5
        }}
      >
        {days && days}d : {hours && hours}h : {minutes && minutes}m
        </Typography>
    </Box>
  );
}
