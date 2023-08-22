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
      <Box
        sx={{
          padding: "4px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(139, 31, 207, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            color: "#00CBEF",
            marginLeft: "0px !important",
          }}
        >
          {days && days}d
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "4.695px",
          color: "#00CBEF",
          margin: "0px 6px !important",
        }}
      >
        :
      </Typography>
      <Box
        sx={{
          padding: "4px",

          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(139, 31, 207, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            color: "#00CBEF",
            marginLeft: "0px !important",
          }}
        >
          {hours && hours}h
        </Typography>{" "}
      </Box>{" "}
      <Typography
        sx={{
          fontSize: "4.695px",
          color: "#00CBEF",
          margin: "0px 6px !important",
        }}
      >
        :
      </Typography>
      <Box
        sx={{
          padding: "4px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(139, 31, 207, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: "10px",
            color: "#00CBEF",
            marginLeft: "0px !important",
          }}
        >
          {minutes}m
        </Typography>{" "}
      </Box>{" "}
    </Box>
  ) : (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          padding: "10px 10px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(139, 31, 207, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: "20.052px",
            color: "#00CBEF",
            marginLeft: "0px !important",
          }}
        >
          {days && days}d
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: "14.037px",
          color: "#00CBEF",
          margin: "0px 20px !important",
        }}
      >
        :
      </Typography>
      <Box
        sx={{
          padding: "10px 10px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(139, 31, 207, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: "20.052px",
            color: "#00CBEF",
            marginLeft: "0px !important",
          }}
        >
          {hours && hours}h
        </Typography>{" "}
      </Box>{" "}
      <Typography
        sx={{
          fontSize: "14.037px",
          color: "#00CBEF",
          margin: "0px 20px !important",
        }}
      >
        :
      </Typography>
      <Box
        sx={{
          padding: "10px 10px",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(139, 31, 207, 0.3)",
        }}
      >
        <Typography
          sx={{
            fontSize: "20.052px",
            color: "#00CBEF",
            marginLeft: "0px !important",
          }}
        >
          {minutes && minutes}m
        </Typography>{" "}
      </Box>{" "}
    </Box>
  );
}
