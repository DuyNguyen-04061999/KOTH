import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { images, video } from "../../../utils/images";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import _socket from "../../../redux-saga-middleware/config/socket";
import ReactPlayer from "react-player";
import GameInTournament from "../GameInTournament";
import moment from "moment";
import { sliceString } from "../../../utils/helper";
import ParagraphLoading from "../../../components/LoadingComponent/ParagraphLoading";

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

  // const handleEndGame = (score) => {
  //   setTimeout(() => {
  //     setStartGame(false);
  //   }, 1000);
  //   setTimeout(() => {
  //     dispatch(toggleOpenResultEndGame(score || 0));
  //   }, 1500);
  useEffect(() => {
    const handler = (res) => {
      // console.log("Hello World?????: ", JSON?.parse(res?.data)?.score);
      setTimeout(() => {
        setStartGame(false);
      }, 1000);
      setTimeout(() => {
        dispatch(toggleOpenResultEndGame(JSON?.parse(res?.data)?.score || 0));
      }, 2000);
    };

    window.addEventListener("message", handler);

    // clean up
    return () => window.removeEventListener("message", handler);
  }, [setStartGame, dispatch]);
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
  // useEffect(() => {
  //   return async () => {
  //     if (window.confirm("Do you want to quit the game ?")) {
  //       const element = document.getElementById("play-game-iframe");
  //       element.remove();
  //       console.log("Unloaded");
  //     }
  //     dispatch(toggleStartGame(false));
  //   };
  // }, [dispatch]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "800px",
          display: "flex",
          paddingTop: "50px",
          justifyContent: "center",
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
            <Box
              sx={{
                position: "absolute",
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
                {deviceType === "iOS" && device === "Mobile" ? (
                  <video
                    autoplay
                    className={isFullScreen ? "fullscreenVideo" : ""}
                    width={"100%"}
                    playsInline
                    // muted
                    controls={deviceType === "iOS" ? true : false}
                    onPlay={() => {
                      setSeconds(7);
                    }}
                    onEnded={() => {
                      setVideoGame(false);
                      if (device === "Mobile" || device === "Tablet") {
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
                  </video>
                ) : (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    playsInline={true}
                    controls={true}
                    onStart={() => {
                      setSeconds(7);
                    }}
                    onEnded={() => {
                      setVideoGame(false);
                      if (device === "Mobile" || device === "Tablet") {
                        setIsFullScreen(true);
                      }
                      setSeconds(null);
                    }}
                    config={{
                      file: {
                        attributes: {
                          controlsList: "nofullscreen",
                        },
                      },
                    }}
                    playing={true}
                    url={
                      detailTournament?.tournamentVideo
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          detailTournament?.tournamentVideo
                        : video.LogoAnim
                    }
                  />
                )}
                {second !== null && (
                  <Box
                    onClick={() => {
                      if (second === 0) {
                        setVideoGame(false);
                        if (device === "Mobile" || device === "Tablet") {
                          setIsFullScreen(true);
                        }
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
                )}
              </Box>
            </Box>
          ) : (
            <iframe
              style={{
                width: "100%",
                height:
                  device === "Mobile" || device === "Tablet" ? "100%" : "800px",
              }}
              title="Playgame"
              src={`http://localhost:3005/playgame/${id}`}
            ></iframe>
          )}
          {device === "Desktop" && (
            <Box
              sx={{
                display: "flex",
                backgroundColor: "#1A151E",
                marginBottom: `${parseFloat(width / 66)}px`,
                justifyContent: "space-between",
                paddingTop: "36px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: width < 1024 ? "320px" : "433px",
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
                          ? detailTournament?.tournamentName.slice(0, 30) +
                            " ..."
                          : detailTournament?.tournamentName}
                      </Typography>
                      <Typography
                        sx={{
                          margin: "0px !important",
                          fontSize:
                            576 < width && width < 1200 ? "12px" : "14px",
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
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
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

                  {/* ----------------------- */}
                  {/* <Box className="d-flex" sx={{ marginTop: "16px" }}>
                      <div className="cardWrap">
                        <div className="cardT cardLeft">
                          <h5
                            style={{
                              color: "#BE48ED",
                              marginTop: "15px",
                              fontSize:
                                576 < width && width < 1200 ? "18px" : "20px",
                            }}
                            className="mb-2"
                          >
                            {detailTournament?.tournamentInfors?.rewardInfors
                              ?.rewardTitle || "SS Z-Flip 5 free voucher"}
                          </h5>
                          <Grid container>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                boxSizing: "border-box",
                                paddingRight: "1rem",
                              }}
                            >
                              <Grid item sx={{ width: "60%" }}>
                                <div className="title d-flex flex-column mb-2">
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
                                        576 < width && width < 1200
                                          ? "12px"
                                          : "14px",
                                    }}
                                  >
                                    {sliceString(
                                      detailTournament?.tournamentInfors
                                        ?.rewardInfors?.rewardRecipient
                                    ) || "Recipient"}
                                  </span>
                                </div>
                              </Grid>
                              <Grid
                                item
                                sx={{
                                  width: "40%",
                                }}
                              >
                                <div className="name d-flex flex-column mb-2">
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
                                        576 < width && width < 1200
                                          ? "12px"
                                          : "14px",
                                    }}
                                  >
                                    {moment(
                                      detailTournament?.tournamentInfors
                                        ?.rewardInfors?.rewardValidityDate
                                    )?.format("MMM-DD-YYYY") || "Nov-10-2023"}
                                  </span>
                                </div>
                              </Grid>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                boxSizing: "border-box",
                                paddingRight: "1rem",
                              }}
                            >
                              {" "}
                              <Grid sx={{ width: "60%" }} item>
                                <div className="seat d-flex flex-column">
                                  <h2
                                    style={{
                                      fontSize: "10px",
                                      marginBottom: "0px !important",
                                    }}
                                  >
                                    Sponsor by
                                  </h2>
                                  <span
                                    style={{
                                      fontSize:
                                        576 < width && width < 1200
                                          ? "12px"
                                          : "14px",
                                    }}
                                  >
                                    {detailTournament?.tournamentInfors?.owner
                                      ?.brandName || "Samsung"}
                                  </span>
                                </div>
                              </Grid>
                              <Grid
                                sx={{
                                  width: "40%",
                                }}
                                item
                              >
                                <div className="time d-flex flex-column">
                                  <h2
                                    style={{
                                      fontSize: "10px",
                                      marginBottom: "0px !important",
                                    }}
                                  >
                                    Conditions
                                  </h2>
                                  <span
                                    onClick={() => setOpenVoucher(true)}
                                    style={{
                                      color: "#0096FF",
                                      fontSize:
                                        576 < width && width < 1200
                                          ? "12px"
                                          : "14px",
                                    }}
                                  >
                                    See more
                                  </span>
                                </div>
                              </Grid>
                            </Box>
                          </Grid>
                        </div>
                        <div className="cardT cardRight">

                        </div>
                      </div>
                    </Box> */}

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
                            <h6>See More</h6>
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
                  {/* --------------------------  */}
                </Box>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#fff",
                    marginLeft: "0px !important",
                    fontSize:
                      576 < width && width < 1200 ? `${width / 42}px` : "18px",
                    marginTop: "36px",
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
      </Box>
    </>
  );
}
