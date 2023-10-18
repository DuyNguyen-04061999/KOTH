import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { images } from "../../../utils/images";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import _socket from "../../../redux-saga-middleware/config/socket";
import GameInTournament from "../GameInTournament";
import moment from "moment";
import { sliceString } from "../../../utils/helper";
import VideoComponent from "./VideoComponent";
import { getFontSizeTitleDependOnWidth } from "../../../utils/config";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";

export default function PlayGame(props) {
  const { detailTournament, setStartGame, videoGame, setVideoGame } = props;
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { chatPopup } = useSelector((state) => state.chatReducer);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [continueGame, setContinueGame] = useState(false);
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    setSocket(_socket);
  }, []);

  useEffect(() => {
    const handler = (res) => {
      if (res && res?.data && isJson(res?.data)) {
        const mD = JSON?.parse(res?.data);
        const { type, score } = mD;
        if (type && type === "game_tournament") {
          setTimeout(() => {
            setStartGame(false);
          }, 1000);
          setTimeout(() => {
            dispatch(toggleOpenResultEndGame(score || 0));
            dispatch(toggleStartGame(false));
          }, 1500);
        }
      }
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
  const checkLockScreen = () => {
    if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
      if (
        (device === "Mobile" || device === "Tablet") &&
        orientation === "portrait"
      ) {
        return true;
      } else {
        return false;
      }
    } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
      if (
        (device === "Mobile" || device === "Tablet") &&
        orientation === "landscape"
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
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
          <Box
            sx={{
              position: "relative",
              height: videoGame ? (chatPopup ? "600px" : "700px") : "800px",
            }}
          >
            {" "}
            <Box sx={{ position: "absolute" }}>
              {" "}
              {detailTournament?.tournamentVideo && videoGame && (
                <VideoComponent
                  detailTournament={detailTournament}
                  setVideoGame={(data) => {
                    setVideoGame(data);
                  }}
                />
              )}
            </Box>
            <iframe
              allow="fullscreen"
              style={
                device === "Desktop"
                  ? {
                      width: "100%",
                      height: videoGame ? "700px" : "800px",
                      background: "black",
                      display: videoGame ? "none" : "block",
                    }
                  : {
                      position: "fixed",
                      top: "0",
                      left: "0",
                      bottom: "0",
                      right: "0",
                      width: "100%",
                      height: "100%",
                      border: "none",
                      margin: "0",
                      padding: "0",
                      overflow: "hidden",
                      zIndex: "999999",
                      display: videoGame ? "none" : "block",
                    }
              }
              title="Playgame"
              src={
                process.env.REACT_APP_ENV === "development"
                  ? "http://localhost:3000/play-game-tournament/87/4"
                  : window.location.origin +
                    "/play-game-tournament/" +
                    id +
                    "/" +
                    detailTournament?.tournamentInfors?.skin?.id
              }
            ></iframe>
            {checkLockScreen() && !videoGame && (
              <Dialog
                sx={{ zIndex: "100000000" }}
                fullScreen={true}
                open={true}
              >
                {continueGame === true ? (
                  <Box
                    sx={{
                      backgroundColor: "#1c191e",
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#37285c",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "56px",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "10px",
                        color: "white",
                      }}
                    >
                      <img
                        style={{
                          width: getFontSizeTitleDependOnWidth(width),
                          height: getFontSizeTitleDependOnWidth(width),
                        }}
                        alt="..."
                        src={images.BackButtonLobby}
                      />
                      <Typography>Tournament</Typography>
                    </Box>
                    <Box sx={{ padding: "10px", boxSizing: "border-box" }}>
                      <Box
                        onClick={() => {
                          setContinueGame(false);
                        }}
                        sx={{
                          width: "100%",
                          height: "280px",
                          backgroundColor: "#423965",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${parseFloat(width / 2.6)}px`,
                            height: "40px",
                            background: "linear-gradient(#9c39f1,#c049ed)",
                            borderRadius: "25px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0px 10px 0px 5px",
                          }}
                        >
                          <Typography sx={{ color: "white" }}>
                            Continue
                          </Typography>
                          <img
                            width={width / 18}
                            src={images.conitnuePlayButton}
                            alt="..."
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#423965",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <Box sx={{}}>
                          <Box
                            sx={{ width: "200px", height: "200px" }}
                            component={"img"}
                            src={images.RotateScreen}
                          ></Box>
                          <Typography
                            sx={{ color: "white", marginTop: "20px" }}
                          >
                            Rotate Your Screen
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      onClick={() => {
                        setContinueGame(true);
                      }}
                      sx={{
                        position: "fixed",
                        top: "40%",
                        width: "90px",
                        height: "40px",
                        display: "flex",
                        padding: "10px",
                        alignItems: "center",
                        backgroundImage: "linear-gradient(#6844de,#8c39ff)",
                        borderRadius: "0px 50px 50px 0px",
                      }}
                    >
                      <Box
                        sx={{ width: "20px", height: "20px" }}
                        component={"img"}
                        src={images.BackButtonLobby}
                      ></Box>
                      <Typography sx={{ color: "white" }}>Lobby</Typography>
                    </Box>
                  </Box>
                )}
              </Dialog>
            )}
          </Box>
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
                      width: "480px",
                      wordBreak: "break-all",
                    }}
                  >
                    {detailTournament?.tournamentName?.length > 50
                      ? detailTournament?.tournamentName.slice(0, 50) + " ..."
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
                      ? "Hourly Promotion"
                      : detailTournament?.tournamentTimeType === "daily"
                      ? "Daily Promotion"
                      : "Weeklong Promotion"}
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
                          Sponsored by
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
                          Valid by
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
                          className="cursor-pointer"
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
        )}{" "}
      </Box>
    </>
  );
}
