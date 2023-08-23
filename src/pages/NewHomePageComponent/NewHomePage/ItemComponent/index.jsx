import { Box, Typography, createTheme } from "@mui/material";
import React from "react";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import InspirationTTF from "../../../../assets/font/CynthoNextMedium.otf";
import { imageHome } from "../../../../utils/images";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { CalculateDistance } from "../../../../components/CountDownTimer/utils/CalculateDistance";
import moment from "moment";
const theme = createTheme({
  typography: {
    fontFamily: "Cyntho Next",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Cyntho Next",
          src: `url(${InspirationTTF}) format("truetype")`,
        },
      },
    },
  },
});
export default function ItemComponent({ countdown, tourInfo }) {
  const { width } = useWindowDimensions();
  const [hours, setHour] = useState(null);
  const [minutes, setMinute] = useState(null);
  const [days, setDay] = useState(null);
  const [seconds, setSeconds] = useState(null);
  useEffect(() => {
    let timeInterval = setInterval(() => {
      let countdownDate = new Date(moment(tourInfo?.tournamentEndAt)).getTime();
      let timeNow = new Date().getTime();
      setHour(CalculateDistance(countdownDate, timeNow).hours);
      setMinute(CalculateDistance(countdownDate, timeNow).minutes);
      setDay(CalculateDistance(countdownDate, timeNow).days);
      setSeconds(CalculateDistance(countdownDate, timeNow).seconds);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [tourInfo]);
  const styleTypography = {
    textAlign: "start",
    fontSize: width < 576 ? "14px" : "16px",
    fontWeight: "700 !important",
    marginLeft: "0px !important",
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center !important",
      }}
    >
      {" "}
      <Box
        sx={{
          backgroundImage: `url(${imageHome.Voucher_tournament_mobile})`,
          width:
            width < 576
              ? `${parseFloat(width / 2.5)}px`
              : `${parseFloat(width / 10.43)}px`,
          height:
            width < 576
              ? `${parseFloat(width / 1.2)}px`
              : `${parseFloat(width / 5.3)}px`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: "8px",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{ width: "100%", borderRadius: "8px 8px 0px 0px" }}
          component={"img"}
          src={imageHome.brandImage}
        ></Box>
        <Box
          sx={{
            padding: "0px 8px",
            display: "flex",
            justifyContent: countdown ? "space-between" : "flex-end",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ ...styleTypography }}>
            {tourInfo?.tournamentName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "30px",
            }}
          >
            {countdown && (
              <Typography
                sx={{
                  ...styleTypography,
                  fontSize: width < 576 ? "13px" : "16px",
                  color: "#5747EA",
                  fontWeight: "700 !important",
                }}
              >
                {width < 576
                  ? `${days}d:${hours}h:${minutes}m:${seconds}s`
                  : `${days}d:${hours}h:${minutes}m`}
              </Typography>
            )}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{ width: "14px", height: "14px", marginRight: "5px" }}
                component={"img"}
                src={imageHome.iconMember}
              ></Box>
              <Typography
                sx={{
                  ...styleTypography,
                  fontSize: width < 576 ? "12px" : "16px",
                }}
              >
                {tourInfo?.tournamentQuantity}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "22px 8px 10px 10px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: width < 576 ? `${parseFloat(width / 9.75)}px` : "49px",
              height: width < 576 ? `${parseFloat(width / 9.75)}px` : "49px",
              borderRadius: "4px",
            }}
            component={"img"}
            src={imageHome.brandImage}
          ></Box>
          <Box>
            <Typography
              sx={{
                ...styleTypography,
                fontSize: width < 576 ? "12px" : "14px",
              }}
            >
              Ping Pong
            </Typography>
            <button
              onClick={() => navigate("/tournamentDetail/" + tourInfo?.id)}
              style={{
                border: "none",
                outline: "none",
                width: width < 576 ? `${parseFloat(width / 4.33)}px` : "104px",
                borderRadius: "5px",
                background: "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                color: "#ffff",
                fontSize: "12px",
              }}
            >
              See more
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
