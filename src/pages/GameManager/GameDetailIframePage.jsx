import { Box } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

export default function GameDetailIframePage(props) {
  const { id } = useParams();
  const [fetchGame, setFetchGame] = useState(true);
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (fetchGame)
      axios
        .get(process.env.REACT_APP_END_POINT + `/api/list/${id}`)
        .then((response) => {
          if (response?.status === 200) {
            setGame(response?.data);
            setFetchGame(false);
          } else {
            setFetchGame(false);
          }
        });
  });

  const screen = useFullScreenHandle();
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const getMobileOS = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return "iOS";
    }
    return "Window";
  };
  const os = getMobileOS();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  });

  useEffect(() => {
    if (game && !fetchGame) {
      setLoading(true);
      if (device && device === "Mobile" && os && os === "Android") {
        screen.enter();
      }
    }
  }, [screen, device, os, fetchGame, game]);

  useEffect(() => {
    const checkFullMobileScreen = () => {
      if (device === "Mobile") {
        return true;
      }
    };
    if (checkFullMobileScreen() && loading) {
      setIsFullScreen(true);
    }
  }, [loading, device]);

  return (
    <Fragment>
      {!fetchGame && game ? (
        <Box
          sx={
            device === "Mobile"
              ? game?.gameScreenType
                ? loading && orientation === "portrait"
                  ? {
                      transform: " rotate(-90deg)",
                      transformOrigin: "left top",
                      width: "100vh",
                      height: "100vw",
                      overflowX: "hidden",
                      position: "fixed",
                      top: "100vh",
                      left: "0px",
                    }
                  : {}
                : loading && orientation === "landscape"
                ? {
                    transform: " rotate(-90deg)",
                    transformOrigin: "left top",
                    width: "100vh",
                    height: "100vw",
                    overflowX: "hidden",
                    position: "fixed",
                    top: "100vh",
                    left: "0px",
                  }
                : {}
              : {}
          }
        >
          {device !== "Mobile" ? (
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
                    height: "800px",
                  }}
                >
                  {" "}
                  {device && os && device === "Mobile" && os === "Android" ? (
                    <DeviceOrientation lockOrientation={"landscape"}>
                      <Orientation orientation="landscape">
                        <FullScreen handle={screen}>
                          <iframe
                            allow="fullscreen"
                            style={
                              device === "Desktop"
                                ? {
                                    width: "100%",
                                    height: "800px",
                                    background: "black",
                                    display: "block",
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
                                    display: "block",
                                    paddingLeft:
                                      device === "Mobile" &&
                                      os === "iOS" &&
                                      game?.gameScreenType
                                        ? "50px"
                                        : "0px",
                                  }
                            }
                            title="Playgame"
                            src={
                              process.env.REACT_APP_ENV === "development"
                                ? `https://play4promote.com/game/43`
                                : `${window.location.origin}/game/${id}`
                            }
                          ></iframe>
                        </FullScreen>
                      </Orientation>
                    </DeviceOrientation>
                  ) : (
                    <iframe
                      allow="fullscreen"
                      style={
                        device === "Desktop"
                          ? {
                              width: "100%",
                              height: "800px",
                              background: "black",
                              display: "block",
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
                              display: "block",
                              paddingLeft:
                                device === "Mobile" &&
                                os === "iOS" &&
                                game?.gameScreenType
                                  ? "50px"
                                  : "0px",
                            }
                      }
                      title="Playgame"
                      src={`${window.location.origin}/game/${id}`}
                    ></iframe>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <>
              {device && os && device === "Mobile" && os === "Android" ? (
                <DeviceOrientation lockOrientation={"landscape"}>
                  <Orientation orientation="landscape">
                    <FullScreen handle={screen}>
                      <iframe
                        allow="fullscreen"
                        style={
                          device === "Desktop"
                            ? {
                                width: "100%",
                                height: "800px",
                                background: "black",
                                display: "block",
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
                                display: "block",
                                paddingLeft:
                                  device === "Mobile" &&
                                  os === "iOS" &&
                                  game?.gameScreenType
                                    ? "50px"
                                    : "0px",
                              }
                        }
                        title="Playgame"
                        src={
                          process.env.REACT_APP_ENV === "development"
                            ? `https://play4promote.com/game/43`
                            : `${window.location.origin}/game/${id}`
                        }
                      ></iframe>
                    </FullScreen>
                  </Orientation>
                </DeviceOrientation>
              ) : (
                <iframe
                  allow="fullscreen"
                  style={
                    device === "Desktop"
                      ? {
                          width: "100%",
                          height: "800px",
                          background: "black",
                          display: "block",
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
                          display: "block",
                          paddingLeft:
                            device === "Mobile" &&
                            os === "iOS" &&
                            game?.gameScreenType
                              ? "50px"
                              : "0px",
                        }
                  }
                  title="Playgame"
                  src={`${window.location.origin}/game/${id}`}
                ></iframe>
              )}
            </>
          )}
        </Box>
      ) : (
        <>Loading</>
      )}
    </Fragment>
  );
}
