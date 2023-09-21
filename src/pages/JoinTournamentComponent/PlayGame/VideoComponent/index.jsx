import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { video } from "../../../../utils/images";
import { Typography } from "@mui/material";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

export default function VideoComponent(props) {
  const { detailTournament, setVideoGame } = props;
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { width } = useWindowDimensions();

  const [second, setSeconds] = useState(null);
  useEffect(() => {
    let timeInterval = setInterval(() => {
      if (second > 0) {
        setSeconds(second - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [second]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: device === "Desktop" ? "relative" : "fixed",
          top: "0px",
          left: "0px",
        }}
      >
        {" "}
        <video
          autoPlay={true}
          width={"100%"}
          playsInline
          muted
          onPlay={() => {
            setSeconds(7);
          }}
          onEnded={() => {
            setVideoGame(false);
          }}
        >
          <source
            src={
              detailTournament?.tournamentVideo
                ? process.env.REACT_APP_SOCKET_SERVER +
                  "/" +
                  detailTournament?.tournamentVideo
                : video.LogoAnim
            }
            type="video/mp4"
          />
        </video>
        {second !== null && (
          <Box
            onClick={() => {
              if (second === 0) {
                setVideoGame(false);

                setSeconds(null);
              }
            }}
            sx={{
              position:
                device === "Desktop" ||
                ((device === "Mobile" || device === "Tablet") &&
                  orientation === "portrait")
                  ? "absolute"
                  : "fixed",
              top: width < 576 ? "70%" : "80%",
              right: "20px",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "#000",
              border: "2px solid #ffff",
              cursor: "pointer",
              zIndex: "1000000000000",
            }}
          >
            <Typography
              sx={{
                color: "white",
                marginRight: "4px",
                fontSize: width < 576 ? "10px !important" : "14px",
              }}
            >
              {second !== 0 ? `You can skip Ads after ${second}s` : "Skip Ads"}
            </Typography>
            <i
              style={{
                color: "#ffff",
                marginTop: "2px",
                fontSize: width < 576 ? "10px" : "14px",
              }}
              className="fa-solid fa-angle-right"
            ></i>
          </Box>
        )}
      </Box>
    </Box>
  );
}