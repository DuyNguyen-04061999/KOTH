import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import UnityGameComponent from "../../../components/GameManager/UnityGameComponent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { images, video } from "../../../utils/images";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { getFontSizeTitleDependOnWidth } from "../../../utils/config";
import _socket from "../../../redux-saga-middleware/config/socket";

export default function PlayGame(props) {
  const { startGame, detailTournament, setStartGame, videoGame, setVideoGame } =
    props;
  const { deviceType, device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const screen = useFullScreenHandle();
  const [expand, setExpand] = useState(false);
  const [second, setSeconds] = useState(7);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [pauseGame, setPauseGame] = useState(false);
  const [unPauseGame, setUnPauseGame] = useState(false);
  const [continueGame, setContinueGame] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [mouseEnter, setMouseEnter] = useState(false);
  const [socket, setSocket] = useState(null);

  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen) {
        if (state === false && expand === true) {
          setExpand(false);
        }
      }
    },
    [screen, expand]
  );
  const handleEndGame = (score) => {
    setTimeout(() => {
      setStartGame(false);
    }, 1000);
    setTimeout(() => {
      dispatch(toggleOpenResultEndGame(score || 0));
    }, 1500);
  };

  const checkLockScreen = () => {
    if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
      if (device === "Mobile" && orientation === "portrait") {
        return true;
      } else {
        return false;
      }
    } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
      if (device === "Mobile" && orientation === "landscape") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  useEffect(() => {
    setSocket(_socket);
  }, []);
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
  useEffect(() => {
    setSeconds(7);
  }, [videoGame, id]);
  useEffect(() => {
    const checkLockScreen = () => {
      if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
        if (device === "Mobile" && orientation === "portrait") {
          return true;
        } else {
          return false;
        }
      } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
        if (device === "Mobile" && orientation === "landscape") {
          return true;
        } else {
          return false;
        }
      }
      return false;
    };
    if (startGame && checkLockScreen()) {
      setPauseGame(true);
      setUnPauseGame(false);
    } else {
      setPauseGame(false);
      setUnPauseGame(true);
    }
  }, [orientation, width, detailTournament, startGame, device]);

  useEffect(() => {
    if (orientation === "landscape" && width > 576 && width < 1200) {
      setIsFullScreen(true);
    }

    if (
      orientation === "portrait" ||
      (width > 576 && orientation === "portrait")
    ) {
      setIsFullScreen(false);
    }
  }, [orientation, width]);

  console.log(
    "Detail Tournament: ",
    startGame,
    detailTournament,
    setStartGame,
    videoGame
  );
  useEffect(() => {
    const checkFullMobileScreen = () => {
      if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
        if (device === "Mobile" && orientation === "landscape") {
          return true;
        } else {
          return false;
        }
      } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
        if (device === "Mobile" && orientation === "portrait") {
          return true;
        } else {
          return false;
        }
      }
      return false;
    };
    socket?.on("startGameInTournamentSuccess", (data) => {
      setExpand(true);
      if (checkFullMobileScreen()) {
        setExpand(true);
        screen.enter();
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
    screen,
    startGame,
    dispatch,
    device,
  ]);
  return (
    <>
      <Box
        sx={{
          width: startGame ? "100%" : "0px",
          height: startGame ? "800px" : "0px",
          display: "flex",
          paddingTop: startGame ? "50px" : "0px",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width:
              isFullScreen && startGame ? "100%" : width < 576 ? "100%" : "80%",
            height: isFullScreen && startGame ? "100%" : "auto",
            paddingBottom: width < 576 ? "60px" : "none",
            position: isFullScreen && startGame ? "fixed" : "relative",
            backgroundColor: isFullScreen && startGame ? "black" : "none",
            top: isFullScreen && startGame ? "0px" : "none",
            left: isFullScreen && startGame ? "0px" : "none",
            zIndex: isFullScreen && startGame ? "5005" : "none",
          }}
        >
          {detailTournament && (
            <FullScreen
              className={device === "Mobile" ? "fullscreen_IOS" : ""}
              handle={screen}
              onChange={reportChange}
            >
              {detailTournament?.tournamentVideo && videoGame && (
                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    {" "}
                    <video
                      className={
                        isFullScreen && startGame ? "fullscreenVideo" : ""
                      }
                      width={"100%"}
                      playsInline
                      autoPlay
                      muted
                      onEnded={() => {
                        setVideoGame(false);
                        if (device === "Mobile") {
                          setExpand(true);
                          screen.enter();
                          setIsFullScreen(true);
                        }
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
                    </video>{" "}
                    <Box
                      onClick={() => {
                        if (second === 0) {
                          setVideoGame(false);
                          if (device === "Mobile") {
                            setExpand(true);
                            screen.enter();
                            setIsFullScreen(true);
                          }
                        }
                      }}
                      sx={{
                        position:
                          device === "Desktop" ||
                          (device === "Mobile" && orientation === "portrait")
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
                        {second !== 0
                          ? `You can skip Ads after ${second}s`
                          : "Skip Ads"}
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
                  </Box>
                </Box>
              )}
              {detailTournament?.tournamentInfors?.game &&
                detailTournament?.tournamentInfors?.game?.GameFiles &&
                detailTournament?.tournamentInfors?.game?.GameFiles.length >=
                  4 && (
                  <Box
                    sx={{
                      visibility: videoGame ? "hidden" : "visible",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <UnityGameComponent
                      setIsLoaded={(data) => {
                        setIsLoaded(data);
                      }}
                      fmod={detailTournament?.tournamentInfors?.game?.gameFmod}
                      GameFiles={
                        detailTournament?.tournamentInfors?.game?.GameFiles
                      }
                      width="100%"
                      height="800px"
                      cwidth="100%"
                      cheight="100%"
                      tournamentId={id}
                      isFullScreen={isFullScreen}
                      fullScreen={expand}
                      gameId={
                        detailTournament?.tournamentInfors?.game?.id || ""
                      }
                      skinName={
                        detailTournament?.tournamentInfors?.skin?.skinName || ""
                      }
                      skinId={
                        detailTournament?.tournamentInfors?.skin?.id || ""
                      }
                      type="tournament"
                      handleEndGame={handleEndGame}
                      gameName={
                        detailTournament?.tournamentInfors?.game?.gameName || ""
                      }
                      pauseGame={pauseGame}
                      unPauseGame={unPauseGame}
                      videoGame={videoGame}
                    />
                    {startGame && expand === true && width > 576 && (
                      <>
                        <Box
                          className={
                            mouseEnter === false
                              ? "showButtonFullScreen"
                              : "showButtonFullScreenDis"
                          }
                          sx={{
                            width: "100%",
                            height: "60px",
                            boxSizing: "border-box",
                            position: "absolute",
                            display: "flex",
                            bottom: "0px",
                            justifyContent: "center",
                            alignItems: "flex-end",
                          }}
                        >
                          <button
                            style={{
                              width: "70px",
                              height: "50px",
                              border: "none",
                              outline: "none",
                              borderRadius: "40px 40px 0px 0px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            onClick={() => setMouseEnter(true)}
                          >
                            <img alt="..." width="30px" src={images.eyeIcon} />
                          </button>
                        </Box>
                        <Box
                          className={
                            mouseEnter === true
                              ? "navBarFullScreen"
                              : "navBarFullScreenDis"
                          }
                          sx={{
                            width: "100%",
                            height: "auto",
                            boxSizing: "border-box",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            backgroundColor: "rgb(46, 40, 68)",
                          }}
                        >
                          <img
                            style={{
                              position: "absolute",
                              left: "50px",
                            }}
                            width="150px"
                            alt="..."
                            src={images.Logo_Text}
                          />
                          <button
                            onClick={() => setMouseEnter(false)}
                            style={{
                              border: "none",
                              outline: "none",
                              position: "absolute",
                              padding: "6px 50px",
                              borderRadius: "10px",
                              left: "45%",
                              background: "linear-gradient(#873CF0,#7946EE)",
                              color: "white",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              width="25px"
                              alt="..."
                              src={images.closeEyefullscreen}
                              style={{ marginRight: "5px" }}
                            />
                            Hide this bar
                          </button>
                          {expand === false ? (
                            <img
                              alt=".."
                              width={width < 576 ? width / 20 : width / 68}
                              style={{
                                marginLeft: width < 576 ? "20px" : "30px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setExpand(true);
                              }}
                              src={images.expandIcon}
                            />
                          ) : (
                            <img
                              alt="..."
                              width={width < 576 ? width / 20 : width / 68}
                              style={{
                                marginLeft: width < 576 ? "20px" : "30px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setExpand(false);
                                screen.exit();
                              }}
                              src={images.ZoomInIcon}
                            />
                          )}
                        </Box>
                      </>
                    )}{" "}
                    {startGame &&
                      expand === false &&
                      width > 576 &&
                      !videoGame &&
                      isLoaded && (
                        <Box
                          sx={{
                            width: "100%",
                            height: "auto",
                            boxSizing: "border-box",
                            padding: "10px 20px",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            backgroundColor: "#2e2844",
                            position: "relative",
                          }}
                        >
                          <img
                            style={{
                              width: "120px",
                              position: "absolute",
                              left: "20px",
                            }}
                            alt="..."
                            src={images.Logo_Text}
                          />
                          {expand === false ? (
                            <img
                              alt=".."
                              width={width < 576 ? width / 20 : width / 68}
                              style={{
                                marginLeft: width < 576 ? "20px" : "30px",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setExpand(true);
                                screen.enter();
                              }}
                              src={images.expandIcon}
                            />
                          ) : (
                            <img
                              alt=".."
                              width={width < 576 ? width / 20 : width / 68}
                              style={{
                                marginLeft: width < 576 ? "20px" : "30px",
                                cursor: "pointer",
                              }}
                              onClick={() => setExpand(false)}
                              src={images.ZoomInIcon}
                            />
                          )}
                        </Box>
                      )}
                  </Box>
                )}
            </FullScreen>
          )}
        </Box>
      </Box>

      {checkLockScreen() && startGame && (
        <Dialog sx={{ zIndex: "100000" }} fullScreen={true} open={true}>
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
                    <Typography sx={{ color: "white" }}>Continue</Typography>
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
                width: startGame ? "100%" : "0px",
                height: startGame ? "100%" : "0px",
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
                    width: startGame ? "100%" : "0px",
                    height: startGame ? "100%" : "0px",
                    backgroundColor: "#423965",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Box>
              </Box>
              <Box
                onClick={() => {
                  setContinueGame(true);
                }}
                sx={{
                  position: "fixed",
                  top: "40%",
                  display: "flex",
                  padding: "10px",
                  backgroundImage: "linear-gradient(#6844de,#8c39ff)",
                  borderRadius: "0px 50px 50px 0px",
                }}
              >
                <Box
                  sx={{ width: "20px" }}
                  component={"img"}
                  src={images.BackButtonLobby}
                ></Box>
                <Typography sx={{ color: "white" }}>Lobby</Typography>
              </Box>
              <Box sx={{ position: "fixed", top: "40%", left: "33%" }}>
                <Box
                  sx={{ width: width / 3, height: width / 3 }}
                  component={"img"}
                  src={images.RotateScreen}
                ></Box>
                <Typography sx={{ color: "white" }}>
                  Rotate Your Screen
                </Typography>
              </Box>
            </Box>
          )}
        </Dialog>
      )}
    </>
  );
}
