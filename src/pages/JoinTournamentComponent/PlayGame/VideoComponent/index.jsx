import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { video } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import "./index.scss";

const WarningIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        fill="#F3D886"
        d="M6.01 11.367c1.374 0 2.749.004 4.125 0 .977-.005 1.678-.58 1.841-1.505.078-.437-.043-.835-.25-1.217-.907-1.665-1.81-3.331-2.709-5-.473-.875-.953-1.747-1.419-2.625C7.251.366 6.723-.005 5.985 0c-.729.005-1.244.377-1.59 1.021C3.019 3.572 1.64 6.121.259 8.668c-.446.825-.307 1.685.348 2.264.365.324.801.436 1.278.436 1.375-.002 2.75-.002 4.124 0zM5.294 5.37V3.674c0-.48.284-.79.711-.786.415.004.693.311.694.779.002 1.122.002 2.245 0 3.366 0 .471-.295.798-.71.792-.409-.006-.692-.323-.695-.785-.003-.556 0-1.113 0-1.671zm0 3.866a.708.708 0 01.708-.65.702.702 0 01.695.662.708.708 0 01-.707.65.702.702 0 01-.696-.661v-.001z"
      ></path>
    </svg>
  )
}

export default function VideoComponent(props) {
  const { detailTournament, setVideoGame } = props;
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { width } = useWindowDimensions();
  const [second, setSeconds] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      var supposedCurrentTime = 0;
      videoRef?.current?.addEventListener("timeupdate", () => {
        setSeconds(7 - Math.round(videoRef.current?.currentTime));

        if (!videoRef.current?.seeking) {
          supposedCurrentTime = videoRef.current?.currentTime;
        }
      });
      videoRef?.current?.addEventListener("seeking", function () {
        if (videoRef.current?.seeking) {
          var delta = videoRef.current?.currentTime - supposedCurrentTime;
          if (Math.abs(delta) > 0.01) {
            videoRef.current.currentTime = supposedCurrentTime;
          }
        }
      });
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: device === "Desktop" ? "relative" : "fixed",
          top: "0px",
          left: "0px",
        }}
      >
        <video
          autoPlay={true}
          width={"100%"}
          ref={videoRef}
          playsInline={true}
          controls={true}
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
              if (second <= 0) {
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
              top: width < 576 ? "35%" : "80%",
              right: "20px",
              display: "flex",
              alignItems: "center",
              padding: "10px",
              backgroundColor: second > 0 ? "rgba(0,0,0,30%)" : "#000",
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
              {second > 0 ? `You can skip Ads after ${second}s` : "Skip Ads"}
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
        <Box component={"div"} className="mt-3 p-2">
            <Box component={"div"} className="d-flex align-items-center">
              <WarningIcon/>
              <Typography sx={{
                color: "#F3D886",
                fontWeight: "600"
              }} className="ms-2">
                Causion
              </Typography>
            </Box>
            <Box className="text-center">
              <Typography sx={{
                color: "#F3D886",
                textAlign: "left",
                marginLeft: "0px !important",
                fontSize: "12px"
              }}>
                If you are using an iPhone with the iOS 16 operating system or higher, there may be instances where you cannot access the game. If an error notification appear when you are loading the game and cannot access it, please close the browser and reopen it. 
                Your extras will not be lost when you close the browser. 
                We apologize for any inconvenience
              </Typography>
            </Box>
        </Box>
      </Box>
      
    </Box>
  );
}
