import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { sliceString } from "../../../utils/helper";
import { imageDesktop, images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import GameInTournament from "../GameInTournament";
import VideoComponent from "./VideoComponent";

export default function PlayGame(props) {
  const iframeRef = useRef(null);
  const screen = useFullScreenHandle();
  const { detailTournament, setStartGame, videoGame, setVideoGame } = props;
  const { device } = useSelector((state) => state.deviceReducer);
  const { tokenUser } = useSelector((state) => state.userReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { startGameCheck } = useSelector((state) => state.appReducer);
  const { isBuyPackageGameSuccess } = useSelector((state) => state.appReducer);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const dispatch = useDispatch();

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const buyP = localStorage.getItem("buyPackage");
  useEffect(() => {}, [buyP, isBuyPackageGameSuccess]);

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
        } else if (type === "paypal_modal") {
          window.open(process.env.REACT_APP_PAYPAL_PACKAGE_URL, "_blank");
        }
      }
    };

    window.addEventListener("message", handler);

    // clean up
    return () => window.removeEventListener("message", handler);
  }, [setStartGame, dispatch, id, tokenUser]);

  // const checkLockScreen = () => {
  //   if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
  //     if (device === "Tablet" && orientation === "portrait") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
  //     if (device === "Tablet" && orientation === "landscape") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
  // };

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
    if (startGameCheck && !videoGame) {
      setLoading(true);
      if (
        device &&
        device === "Mobile" &&
        os &&
        os === "Android" &&
        detailTournament?.tournamentInfors?.game?.gameScreenType
      ) {
        screen.enter();
      }
    }
  }, [startGameCheck, videoGame, screen, device, os, detailTournament]);

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

  const linkCocosDev = `${
    // process.env.REACT_APP_PROMOTION_URL +
    // "/" +
    detailTournament?.tournamentInfors?.game?.gameHost
  }?token=${tokenUser || localStorage.getItem("token")}&tournamentId=${
    detailTournament?.id
  }&skinId=${detailTournament?.tournamentInfors?.skin?.id}&env=${
    process.env.REACT_APP_ENV
  }&maxScore=${detailTournament?.maxScore}&currentScore=${
    detailTournament?.currentScore
  }&numberTicket=${detailTournament?.numberTicket}&mileStone=${JSON.stringify(
    detailTournament?.tournamentInfors?.game?.gameCategory?.mileStones
  )}`;
  const linkCocosPro = `${
    detailTournament?.tournamentInfors?.game?.gameHost
  }?token=${tokenUser || localStorage.getItem("token")}&tournamentId=${
    detailTournament?.id
  }&skinId=${detailTournament?.tournamentInfors?.skin?.id}&env=${
    process.env.REACT_APP_ENV
  }&maxScore=${detailTournament?.maxScore}&currentScore=${
    detailTournament?.currentScore
  }&numberTicket=${detailTournament?.numberTicket}&mileStone=${JSON.stringify(
    detailTournament?.tournamentInfors?.game?.gameCategory?.mileStones
  )}`;

  const [isBoughtPackage, setIsBoughtPackage] = useState(false);

  useEffect(() => {
    // Function to be executed at each interval
    if (
      detailTournament?.tournamentInfors?.game?.gameEngine === "cocos" &&
      iframeRef
    ) {
      const incrementCount = () => {
        const buyP = localStorage.getItem("buyPackage");
        const newNumberTicket = localStorage.getItem("newNumberTicket");
        if (buyP && newNumberTicket) {
          if (!isBoughtPackage) {
            const iframe = document.querySelector("iframe");
            iframe.contentWindow.postMessage(
              JSON.stringify({
                type: "newTicket",
                value: newNumberTicket,
              }),
              "*"
            );
            setIsBoughtPackage(true);
          }
        }
      };

      // Set up the interval (in milliseconds)
      const intervalId = setInterval(incrementCount, 1000); // Execute every 1000 milliseconds (1 second)

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }

    // Dependency array is empty, meaning this effect runs once on mount
  }, [detailTournament, isBoughtPackage]);

  const [expand, setExpand] = useState(false);

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
  return (
    <Box
      sx={
        !videoGame && (device === "Mobile" || device === "Tablet")
          ? detailTournament?.tournamentInfors?.game?.gameScreenType
            ? loading && orientation === "portrait"
              ? {
                  transform: "rotate(-90deg)",
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
                transform: "rotate(-90deg)",
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
      {device === "Desktop" ? (
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
                height: "600px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom:
                  detailTournament?.tournamentInfors?.game?.gameEngine ===
                  "cocos"
                    ? "50px"
                    : "unset",
              }}
            >
              {detailTournament?.tournamentInfors?.game?.gameEngine ===
                "cocos" && (
                <Box
                  sx={{
                    position: "absolute",
                    width: "1031px",
                    bottom: width > 1368 ? "-45px" : "-35px",
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      boxSizing: "border-box",
                      padding: "15px 20px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      backgroundColor: "#2e2844",
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        width: "40px",
                        position: "absolute",
                        left: "20px",
                      }}
                      alt="..."
                      src={imageDesktop.LogoCongTy}
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
                </Box>
              )}
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
              <>
                {detailTournament?.tournamentInfors?.game?.gameEngine ===
                  "cocos" && loading ? (
                  <FullScreen
                    className="fullscreen_desktop"
                    handle={screen}
                    onChange={reportChange}
                  >
                    {" "}
                    <iframe
                      data-hj-allow-iframe=""
                      ref={iframeRef}
                      allow="fullscreen"
                      style={{
                        width: "100%",
                        height: expand ? "100%" : videoGame ? "700px" : "580px",
                        background: "black",
                        display: videoGame ? "none" : "block",
                        aspectRatio: !videoGame ? "16/9" : "none",
                      }}
                      title="Playgame"
                      src={
                        process.env.REACT_APP_ENV === "development"
                          ? linkCocosDev
                          : linkCocosPro
                      }
                    ></iframe>
                  </FullScreen>
                ) : loading ? (
                  <iframe
                    data-hj-allow-iframe=""
                    ref={iframeRef}
                    allow="fullscreen"
                    style={{
                      width: "1031px",
                      height: videoGame ? "700px" : "580px",
                      background: "black",
                      display: videoGame ? "none" : "block",
                      aspectRatio: !videoGame ? "16/9" : "none",
                    }}
                    title="Playgame"
                    src={
                      process.env.REACT_APP_ENV === "development"
                        ? `${process.env.REACT_APP_UNITY_GAME_URL}/play-game-tournament/${id}/${detailTournament?.tournamentInfors?.skin?.id}`
                        : window.location.origin +
                          "/play-game-tournament/" +
                          id +
                          "/" +
                          detailTournament?.tournamentInfors?.skin?.id
                    }
                  ></iframe>
                ) : (
                  <></>
                )}
              </>
            </Box>
          </Box>
          {device === "Desktop" && (
            <Box
              sx={{
                display: "flex",
                width: "1031px",
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
                        wordBreak: "break-all",
                        textAlign: "left",
                      }}
                    >
                      {detailTournament?.tournamentName?.length > 50
                        ? detailTournament?.tournamentName.slice(0, 50) + " ..."
                        : detailTournament?.tournamentName}
                    </Typography>
                  </>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "480px",
                  }}
                >
                  {" "}
                  <Box
                    sx={{
                      textAlign: "start",
                      fontWeight: "lighter",
                      color: "#fff",
                      fontSize:
                        576 < width && width < 1200
                          ? `${width / 55}px`
                          : "18px",
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
                    maxWidth: "480px",
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
                          fontSize:
                            576 < width && width < 1200 ? "18px" : "16px",
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
                          bgcolor: "#211d28",
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
                          bgcolor: "#211d28",
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
              <Box
                sx={{
                  marginTop: videoGame ? "75px" : "unset",
                  marginBottom: videoGame ? "20px" : "unset",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#fff",
                    marginLeft: "0px !important",
                    fontSize:
                      576 < width && width < 1200 ? `${width / 42}px` : "18px",
                  }}
                >
                  Game for promotion
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
      ) : (
        <>
          <Box sx={{ position: "absolute" }}>
            {detailTournament?.tournamentVideo && videoGame && (
              <VideoComponent
                detailTournament={detailTournament}
                setVideoGame={(data) => {
                  setVideoGame(data);
                }}
              />
            )}
          </Box>
          {os && os === "Android" ? (
            <DeviceOrientation lockOrientation={"landscape"}>
              <Orientation orientation="landscape">
                <FullScreen handle={screen}>
                  {detailTournament?.tournamentInfors?.game?.gameEngine ===
                    "cocos" && loading ? (
                    <iframe
                      data-hj-allow-iframe=""
                      ref={iframeRef}
                      allow={
                        detailTournament?.tournamentInfors?.game?.gameScreenType
                          ? "fullscreen"
                          : "unset"
                      }
                      style={{
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
                        paddingLeft:
                          device === "Mobile" &&
                          os === "iOS" &&
                          detailTournament?.tournamentInfors?.game
                            ?.gameScreenType &&
                          orientation !== "landscape"
                            ? "50px"
                            : "0px",
                      }}
                      title="Playgame"
                      src={
                        process.env.REACT_APP_ENV === "development"
                          ? linkCocosDev
                          : linkCocosPro
                      }
                    ></iframe>
                  ) : loading ? (
                    <iframe
                      data-hj-allow-iframe=""
                      ref={iframeRef}
                      allow="fullscreen"
                      style={{
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
                        paddingLeft:
                          device === "Mobile" &&
                          os === "iOS" &&
                          detailTournament?.tournamentInfors?.game
                            ?.gameScreenType &&
                          orientation !== "landscape"
                            ? "50px"
                            : "0px",
                      }}
                      title="Playgame"
                      src={
                        process.env.REACT_APP_ENV === "development"
                          ? `${process.env.REACT_APP_UNITY_GAME_URL}/play-game-tournament/${id}/${detailTournament?.tournamentInfors?.skin?.id}`
                          : window.location.origin +
                            "/play-game-tournament/" +
                            id +
                            "/" +
                            detailTournament?.tournamentInfors?.skin?.id
                      }
                    ></iframe>
                  ) : (
                    <></>
                  )}
                </FullScreen>
              </Orientation>
            </DeviceOrientation>
          ) : (
            <>
              {detailTournament?.tournamentInfors?.game?.gameEngine ===
                "cocos" && loading ? (
                <iframe
                  data-hj-allow-iframe=""
                  ref={iframeRef}
                  allow="fullscreen"
                  style={{
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
                    paddingLeft:
                      device === "Mobile" &&
                      os === "iOS" &&
                      detailTournament?.tournamentInfors?.game
                        ?.gameScreenType &&
                      orientation !== "landscape"
                        ? "50px"
                        : "0px",
                  }}
                  title="Playgame"
                  src={
                    process.env.REACT_APP_ENV === "development"
                      ? linkCocosDev
                      : linkCocosPro
                  }
                ></iframe>
              ) : loading ? (
                <iframe
                  data-hj-allow-iframe=""
                  ref={iframeRef}
                  allow="fullscreen"
                  style={{
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
                    paddingLeft:
                      device === "Mobile" &&
                      os === "iOS" &&
                      detailTournament?.tournamentInfors?.game
                        ?.gameScreenType &&
                      orientation !== "landscape"
                        ? "50px"
                        : "0px",
                  }}
                  title="Playgame"
                  src={
                    process.env.REACT_APP_ENV === "development"
                      ? `${process.env.REACT_APP_UNITY_GAME_URL}/play-game-tournament/${id}/${detailTournament?.tournamentInfors?.skin?.id}`
                      : window.location.origin +
                        "/play-game-tournament/" +
                        id +
                        "/" +
                        detailTournament?.tournamentInfors?.skin?.id
                  }
                ></iframe>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}
