import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Box, Typography } from "@mui/material";
import { CalculateDistance } from "../../../components/CountDownTimer/utils/CalculateDistance";
import moment from "moment";
export default function CountDownTournament({
  expiryTime = "8/16/2023 07:00:00",
}) {
  const { width } = useWindowDimensions();
  const [hours, setHour] = useState(null);
  const [minutes, setMinute] = useState(null);
  const [seconds, setSecond] = useState(null);
  useEffect(() => {
    let timeInterval = setInterval(() => {
      if (new Date(expiryTime) - new Date() < 0) {
        let countdownDate = new Date(
          moment(expiryTime).add(1, "hour")
        ).getTime();
        let timeNow = new Date().getTime();
        setHour(CalculateDistance(countdownDate, timeNow).hours);
        setMinute(CalculateDistance(countdownDate, timeNow).minutes);
        setSecond(CalculateDistance(countdownDate, timeNow).seconds);
      } else {
        let countdownDate = new Date(expiryTime).getTime();
        let timeNow = new Date().getTime();
        setHour(CalculateDistance(countdownDate, timeNow).hours);
        setMinute(CalculateDistance(countdownDate, timeNow).minutes);
        setSecond(CalculateDistance(countdownDate, timeNow).seconds);
      }
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [expiryTime]);
  const typographyStyle = {
    textAlign: "start",
    fontSize: width < 576 ? "12px" : "14px",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Typography
        sx={{
          ...typographyStyle,
          color: "rgba(255, 255, 255, 0.50)",
        }}
      >
        {new Date(expiryTime) - new Date() < 0 ? "End on" : "Start on"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "25px",
            height: "25px",
            backgroundColor: "#68399E",
            borderRadius: "5px",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ ...typographyStyle }}>{hours}</Typography>
        </Box>
        <Typography
          sx={{
            ...typographyStyle,
            marginLeft: "6px",
            marginRight: "6px",
          }}
        >
          :
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "25px",
            height: "25px",
            backgroundColor: "#68399E",
            borderRadius: "5px",
            justifyContent: "center",
          }}
        >
          {" "}
          <Typography sx={{ ...typographyStyle }}>{minutes}</Typography>
        </Box>
        <Typography
          sx={{
            ...typographyStyle,
            margin: "2px",
            marginLeft: "6px",
            marginRight: "6px",
          }}
        >
          :
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "25px",
            height: "25px",
            backgroundColor: "#68399E",
            borderRadius: "5px",
            justifyContent: "center",
          }}
        >
          {" "}
          <Typography sx={{ ...typographyStyle }}>{seconds}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
