import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { imageDesktop, images, video } from "../../../utils/images";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import _socket from "../../../redux-saga-middleware/config/socket";
import GameInTournament from "../GameInTournament";
import moment from "moment";
import { sliceString } from "../../../utils/helper";
import VideoComponent from "./VideoComponent";

export default function PlayGame(props) {
  const { detailTournament, setStartGame, videoGame, setVideoGame } = props;
  const { device, deviceType } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const [second, setSeconds] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(_socket);
  }, []);

  useEffect(() => {
    const handler = (res) => {
      setTimeout(() => {
        setStartGame(false);
      }, 1000);
      setTimeout(() => {
        dispatch(toggleOpenResultEndGame(JSON?.parse(res?.data)?.score || 0));
      }, 1500);
    };

    window.addEventListener("message", handler);

    // clean up
    return () => window.removeEventListener("message", handler);
  }, [setStartGame, dispatch]);
  useEffect(() => {
    const checkFullMobileScreen = () => {
      if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
        if (
          (device === "Mobile" || device === "Tablet") &&
          orientation === "landscape"
        ) {
          return true;
        } else {
          return false;
        }
      } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
        if (
          (device === "Mobile" || device === "Tablet") &&
          orientation === "portrait"
        ) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    };
    socket?.on("startGameInTournamentSuccess", (data) => {
      if (checkFullMobileScreen()) {
        setIsFullScreen(true);
      }
    });

    return () => {
      socket?.off("joinTournamentSuccess");
    };
  }, [
    socket,
    orientation,
    detailTournament?.tournamentInfors?.game?.gameScreenType,
    width,
    dispatch,
    device,
  ]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          paddingTop: "50px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: isFullScreen
              ? "100%"
              : device === "Mobile" || device === "Tablet"
              ? "100%"
              : "80%",
            height: isFullScreen ? "100%" : "auto",
            position: isFullScreen ? "fixed" : "relative",
            backgroundColor: isFullScreen ? "black" : "none",
            top: isFullScreen ? "0px" : "none",
            left: isFullScreen ? "0px" : "none",
            zIndex: isFullScreen ? "5005" : "none",
          }}
        >
          {detailTournament?.tournamentVideo && videoGame ? (
            <VideoComponent
              detailTournament={detailTournament}
              setVideoGame={(data) => {
                setVideoGame(data);
              }}
            />
          ) : (
            <Box>
              <iframe
                allow="fullscreen"
                style={{
                  width: "100%",
                  height:
                    device === "Mobile" || device === "Tablet"
                      ? "100vh"
                      : "800px",
                }}
                title="Playgame"
                src={
                  process.env.REACT_APP_IFRAME_URL +
                  "/play-game-tournament/" +
                  id
                }
              ></iframe>
            </Box>
          )}
        </Box>
        {device === "Desktop" && (
          <Box
            sx={{
              display: "flex",
              width: "80%",
              marginTop: "30px",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  color: "white",
                  marginBottom: "30px",
                }}
              >
                <>
                  <Typography
                    sx={{
                      margin: "0px !important",
                      fontSize:
                        576 < width && width < 1200
                          ? `${width / 42}px`
                          : "28px",
                    }}
                  >
                    {detailTournament?.tournamentName?.length > 30
                      ? detailTournament?.tournamentName.slice(0, 30) + " ..."
                      : detailTournament?.tournamentName}
                  </Typography>
                  <Typography
                    sx={{
                      margin: "0px !important",
                      fontSize: 576 < width && width < 1200 ? "12px" : "14px",
                      fontWeight: "lighter !important",
                    }}
                  >
                    {detailTournament?.tournamentTimeType === "hourly"
                      ? "Hourly Tournament"
                      : detailTournament?.tournamentTimeType === "daily"
                      ? "Daily Tournament"
                      : "Weeklong Tournament"}
                  </Typography>
                </>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {" "}
                <Box
                  sx={{
                    textAlign: "start",
                    fontWeight: "lighter",
                    color: "#fff",
                    fontSize:
                      576 < width && width < 1200 ? `${width / 55}px` : "18px",
                  }}
                >
                  Reward
                </Box>
                <Box
                  sx={{
                    textAlign: "start",
                    fontWeight: "lighter !important",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  Play game to get this voucher
                </Box>
              </Box>
              <Box
                sx={{
                  bgcolor: "white",
                  width: "100%",
                  height: "147px",
                  marginTop: "24px",
                  position: "relative",
                  display: "flex",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    width: "65%",
                    height: "100%",
                    borderRadius: "1px 0px 0px 8px",
                    padding: "16px 14px",
                  }}
                >
                  <Box>
                    <h5
                      style={{
                        color: "#BE48ED",
                        fontSize: 576 < width && width < 1200 ? "18px" : "16px",
                        maxHeight: "24px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {" "}
                      {detailTournament?.tournamentInfors?.rewardInfors
                        ?.rewardTitle || "SS Z-Flip 5 free voucher"}
                    </h5>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "space-between",
                      marginTop: "15.2px",
                    }}
                  >
                    <Box>
                      <Box>
                        {" "}
                        <h6
                          style={{
                            fontSize: "10px",
                            marginBottom: "0px !important",
                            color: "#525252",
                          }}
                        >
                          Recipient
                        </h6>
                        <span
                          style={{
                            fontSize:
                              576 < width && width < 1200 ? "12px" : "14px",
                          }}
                        >
                          {sliceString(
                            detailTournament?.tournamentInfors?.rewardInfors
                              ?.rewardRecipient
                          ) || "Recipient"}
                        </span>
                      </Box>
                      <Box sx={{ marginTop: "7.6px" }}>
                        {" "}
                        <h6
                          style={{
                            fontSize: "10px",
                            marginBottom: "0px !important",
                            color: "#525252",
                          }}
                        >
                          Sponsor by
                        </h6>
                        <span
                          style={{
                            fontSize:
                              576 < width && width < 1200 ? "12px" : "14px",
                          }}
                        >
                          {detailTournament?.tournamentInfors?.owner
                            ?.brandName || "Samsung"}
                        </span>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        marginLeft: width < 1024 ? "10px" : "60px",
                      }}
                    >
                      {" "}
                      <Box>
                        {" "}
                        <h6
                          style={{
                            fontSize: "10px",
                            marginBottom: "0px !important",
                            color: "#525252",
                          }}
                        >
                          Validity date
                        </h6>
                        <span
                          style={{
                            fontSize:
                              576 < width && width < 1200 ? "12px" : "14px",
                          }}
                        >
                          {moment(
                            detailTournament?.tournamentInfors?.rewardInfors
                              ?.rewardValidityDate
                          )?.format("MMM-DD-YYYY") || "Nov-10-2023"}
                        </span>
                      </Box>
                      <Box sx={{ marginTop: "7.6px" }}>
                        {" "}
                        <h6
                          style={{
                            fontSize: "10px",
                            marginBottom: "0px !important",
                            color: "#525252",
                          }}
                        >
                          Conditions
                        </h6>
                        <span
                          href="#"
                          style={{
                            color: "#0096FF",
                            fontSize:
                              576 < width && width < 1024 ? "12px" : "14px",
                          }}
                        >
                          See more
                        </span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "35%",
                    height: "100%",
                    borderLeft: "dashed 1px #0D0804",
                    borderRadius: "0px 8px 8px 0px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      borderRadius: "8px",
                    }}
                  >
                    <Box
                      sx={{
                        height: "20px",
                        width: "20px",
                        bgcolor: "#1a151e",
                        position: "absolute",
                        borderRadius: "50%",
                        top: "-10px",
                        left: "-10px",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        height: "20px",
                        width: "20px",
                        bgcolor: "#1a151e",
                        position: "absolute",
                        borderRadius: "50%",
                        bottom: "-10px",
                        left: "-10px",
                      }}
                    ></Box>
                    <img
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                      src={
                        detailTournament?.tournamentInfors?.rewardInfors
                          ?.rewardAvatar
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            detailTournament?.tournamentInfors?.rewardInfors
                              ?.rewardAvatar
                          : images.GameTournament
                      }
                      alt="..."
                      width={"95%"}
                      height={"90%"}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#fff",
                  marginLeft: "0px !important",
                  fontSize:
                    576 < width && width < 1200 ? `${width / 42}px` : "18px",
                }}
              >
                Game for tournament
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginTop: "16px",
                }}
              >
                <GameInTournament
                  game={
                    detailTournament?.tournamentInfors?.skin?.skinGame || null
                  }
                />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
