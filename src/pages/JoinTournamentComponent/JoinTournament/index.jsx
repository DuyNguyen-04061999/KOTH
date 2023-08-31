import {
  Box,
  Container,
  CssBaseline,
  Dialog,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import {
  getFontSizeDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../../utils/config";
import { images, video } from "../../../utils/images";
import {
  // useNavigate,
  useParams,
} from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { Fragment } from "react";
import UnityGameComponent from "../../../components/GameManager/UnityGameComponent";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import {
  toggleBuyTicket,
  toggleOpenResultEndGame,
} from "../../../redux-saga-middleware/reducers/tournamentReducer";
import JoinTournamentMobile from "../JoinTournamentMobile";
import InspirationTTF from "../../../assets/font/CynthoNextExtraLight.otf";
import LeaderBoard from "../LeaderBoard";
import DetailVoucher from "../DetailVoucher";
import "./index.scss";
import GameInTournament from "../GameInTournament";
import BgEndGame from "../BgEndTour";
import ResultEndGame from "../../../components/Dialog/ResultEndGame";
import InfinityIcon from "@mui/icons-material/AllInclusive";
import { isJson, sliceString } from "../../../utils/helper";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { toast } from "react-toastify";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";

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

export default function JoinTournament() {
  const [socket, setSocket] = useState(null);
  const [fetchT, setFetchT] = useState(true);
  const [detailTournament, setDetailTournament] = useState({});
  const [startGame, setStartGame] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [expand, setExpand] = useState(false);
  const { id } = useParams();

  const { token } = useSelector((state) => state.authReducer);
  const [continueGame, setContinueGame] = useState(false);
  const [previousOri, setPreviousOri] = useState("");
  const { orientation } = useSelector((state) => state.gameReducer);
  const { deviceType } = useSelector((state) => state.deviceReducer);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoGame, setVideoGame] = useState(false);
  const [checkMobile, setCheckMobile] = useState(false);
  const { width, height } = useWindowDimensions();
  const [openVoucher, setOpenVoucher] = useState(false);
  const [currentResult, setCurrentResult] = useState(false);
  const [second, setSeconds] = useState(7);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(toggleBuyTicket(true));
  };
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
    if (orientation === "landscape" && width > 576 && width < 1200) {
      setIsFullScreen(true);
    }

    if (
      orientation === "portrait" ||
      (width > 576 && orientation === "portrait")
    ) {
      setIsFullScreen(false);
    }
  }, [orientation, width, previousOri]);

  useEffect(() => {
    if (isFullScreen === true && checkMobile === true) {
      setCheckMobile(false);
    }
  }, [isFullScreen, checkMobile]);
  const screen = useFullScreenHandle();
  const [minLength, setMinLength] = useState(0);
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

  useEffect(() => {
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (
      ((token && fetchT) || (!token && fetchT)) &&
      id &&
      id !== undefined &&
      id !== "undefined" &&
      (typeof id === "string" || typeof id === "number")
    ) {
      socket?.emit("detailTournament", {
        tournamentId: id,
      });
    }
  });
  useEffect(() => {
    if (orientation === "landscape") {
      setPreviousOri(orientation);
    } else {
      setPreviousOri("");
    }
  }, [orientation]);
  useEffect(() => {
    socket?.on("detailTournamentSuccess", (data) => {
      setDetailTournament(data);
      setFetchT(false);
    });
    socket?.on("joinTournamentSuccess", (data) => {
      // socket?.emit("detailTournament", {
      //   tournamentId: data?.id,
      // });
      toast.success("Join Tournament Successfully", {
        icon: ({ theme, type }) => (
          <img
            style={{ width: "20px", marginRight: "10px" }}
            alt="..."
            src={images.successIcon}
          />
        ),
        position: "top-center",
        className: "success-background",
      });
      setTimeout(() => {
        socket?.emit("detailTournament", {
          tournamentId: data?.id,
        });
      }, 1000);
    });
    socket?.on("startGameInTournamentSuccess", (data) => {
      dispatch(toggleStartGame(true));
      setStartGame(true);
      setVideoGame(true);
      setCheckMobile(true);
      setExpand(true);
      if (
        (width < 576 &&
          !detailTournament?.tournamentInfors?.skin?.skinGame?.gameScreenType &&
          startGame) ||
        (width > 576 &&
          width < 1200 &&
          detailTournament?.tournamentInfors?.skin?.skinGame?.gameScreenType &&
          startGame)
      ) {
        setExpand(true);
        screen.enter();
        setIsFullScreen(true);
      }
    });

    // socket?.on("buyTicketTournamentSuccess", (data) => {
    //   setTimeout(() => {
    //     socket?.emit("detailTournament", {
    //       tournamentId: data?.id,
    //     });
    //   }, 1000)
    // })

    return () => {
      socket?.off("joinTournamentSuccess");
      // socket?.off("buyTicketTournamentSuccess");
    };
  }, [
    socket,
    orientation,
    detailTournament?.tournamentInfors?.skin?.skinGame?.gameScreenType,
    width,
    screen,
    startGame,
    dispatch,
  ]);
  useEffect(() => {
    if (width > 1200) {
      if (
        detailTournament?.tournamentParticipants?.length > 1 &&
        detailTournament?.tournamentParticipants?.length < 3
      ) {
        setMinLength(detailTournament?.tournamentParticipants?.length - 0.5);
      } else if (detailTournament?.tournamentParticipants?.length === 3) {
        setMinLength(detailTournament?.tournamentParticipants?.length - 0.8);
      } else if (detailTournament?.tournamentParticipants?.length === 4) {
        setMinLength(2.8);
      } else if (detailTournament?.tournamentParticipants?.length >= 5) {
        setMinLength(3.3);
      } else {
        setMinLength(1);
      }
    } else if (width > 576 && width < 1200) {
      if (
        detailTournament?.tournamentParticipants?.length > 1 &&
        detailTournament?.tournamentParticipants?.length < 3
      ) {
        setMinLength(detailTournament?.tournamentParticipants?.length + 0.5);
      } else if (detailTournament?.tournamentParticipants?.length === 3) {
        setMinLength(detailTournament?.tournamentParticipants?.length + 0.5);
      } else if (detailTournament?.tournamentParticipants?.length === 4) {
        setMinLength(4.5);
      } else if (detailTournament?.tournamentParticipants?.length >= 5) {
        setMinLength(6);
      } else {
        setMinLength(1);
      }
    }
  }, [detailTournament, width]);
  const handleEndGame = (score) => {
    setTimeout(() => {
      setStartGame(false);
    }, 1000);
    setTimeout(() => {
      dispatch(toggleOpenResultEndGame(score || 0));
    }, 1500);
  };

  const [pauseGame, setPauseGame] = useState(false);
  const [unPauseGame, setUnPauseGame] = useState(false);
  useEffect(() => {
    if (
      startGame &&
      ((width < 576 &&
        detailTournament?.tournamentInfors?.game?.gameScreenType === 1 &&
        orientation === "portrait") ||
        (width > 576 &&
          width < 1200 &&
          !detailTournament?.tournamentInfors?.game?.gameScreenType &&
          orientation === "landscape"))
    ) {
      setPauseGame(true);
      setUnPauseGame(false);
    } else {
      setPauseGame(false);
      setUnPauseGame(true);
    }
  }, [orientation, width, detailTournament, startGame]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> <ResultEndGame />
      {!startGame ? (
        width > 576 ? (
          <Container
            maxWidth="lg"
            sx={{
              paddingTop: 576 < width && width < 1200 ? "32px" : "50px",
              maxWidth: 576 < width && width < 1200 ? width * 0.9 : "none",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                width: "100%",
                height: "auto",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "340px",
                  boxSizing: "border-box",
                  padding: `${parseFloat(width / 51.9)}px`,
                  backgroundImage: `url("${
                    detailTournament?.tournamentBackground
                      ? process.env.REACT_APP_SOCKET_SERVER +
                        "/" +
                        detailTournament?.tournamentBackground
                      : images.TournamentBG
                  }")`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                {detailTournament?.tournamentStatus === 2 && <BgEndGame />}

                {!detailTournament?.checkInTournament && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {/* <Typography
                      sx={{
                        fontSize: getFontSizeTitleDependOnWidth(width),
                        color: "#9384B7",
                      }}
                    >
                      Welcome to the
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: getFontSizeBigTitleDependOnWidth(width),
                        fontWeight: "bolder",
                        color: "#9384B7",
                      }}
                    >
                      {detailTournament?.tournamentName}
                    </Typography> */}
                  </Box>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    alignItems: "flex-end",
                  }}
                >
                  {!detailTournament?.checkInTournament ? (
                    <button
                      onClick={() => {
                        if (token) {
                          socket?.emit("joinTournament", {
                            tournamentId: detailTournament?.id,
                          });
                        } else {
                          dispatch(toggleLoginDialog());
                        }
                      }}
                      style={{
                        padding: `0px ${
                          576 < width && width < 1200
                            ? "70"
                            : parseFloat(width / 28)
                        }px`,
                        height: "40px",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        background: "linear-gradient(#7440E9,#A345FB)",
                        color: "white",
                        fontSize: `${
                          576 < width && width < 1200 ? "15px" : "18px"
                        }`,
                      }}
                    >
                      Join
                    </button>
                  ) : (
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => {
                          socket?.emit("startGameInTournament", {
                            tournamentId: id,
                          });
                        }}
                        style={{
                          padding: `0px ${parseFloat(width / 28)}px`,
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          height: "40px",
                          background: "linear-gradient(#7440E9,#A345FB)",
                          color: "white",
                          marginRight: `${width / 128}px`,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Play
                      </button>
                      <button
                        onClick={handleClickOpen}
                        style={{
                          padding: `0px ${parseFloat(width / 45)}px`,
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          height: "40px",
                          backgroundColor: "#69389E",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Buy Ticket
                      </button>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "80px",
                    padding: "2px 5px",
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#8A3AF1",
                    borderRadius: "6px",
                    backdropFilter: " blur(12.5px)",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ffff",
                      marginRight: "2px",
                      marginTop: "5px",
                    }}
                  >
                    {detailTournament?.turnCountLeft || 0}
                  </Typography>
                  <Box
                    component={"img"}
                    src={images.ticketIconTournament}
                  ></Box>
                </Box>
              </Box>
              {/* Partipants */}
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#1D1329",
                  height: parseFloat(width / 18.8),
                  boxSizing: parseFloat(width / 43.63),
                  //66 43.6
                  padding: "27px 32px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography
                        sx={{
                          color: "#ffff",
                          textAlign: "start",
                          fontSize:
                            576 < width && width < 1200
                              ? `${width / 62.5}px`
                              : `18px`,
                          letterSpacing: "0.7px",
                          marginLeft: "0px !important",
                        }}
                      >
                        Start
                      </Typography>
                      <Typography
                        sx={{
                          color: "#fff",
                          textAlign: "start",
                          fontSize:
                            576 < width && width < 1200
                              ? `${width / 76}px`
                              : "14px",
                          fontWeight: "lighter !important",
                          fontFamily: "Cyntho Next",
                          marginLeft: "0px !important",
                        }}
                      >
                        {moment(detailTournament?.tournamentStartAt).format(
                          "DD/MM/YYYY"
                        )}{" "}
                        -{" "}
                        {moment(detailTournament?.tournamentStartAt).format(
                          "hh:mm a"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "1px",
                      height: "100%",
                      background: "rgba(151, 151, 151, 0.40)",
                      margin: "0px 32px",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography
                        sx={{
                          color: "#ffff",
                          textAlign: "start",
                          fontSize:
                            576 < width && width < 1200
                              ? `${width / 62.5}px`
                              : "18px",
                          letterSpacing: "0.7px",
                          marginLeft: "0px !important",
                        }}
                      >
                        Finish
                      </Typography>
                      <Typography
                        sx={{
                          color: "#fff",
                          textAlign: "start",
                          fontSize:
                            576 < width && width < 1200
                              ? `${width / 76}px`
                              : "14px",
                          fontWeight: "500 !important",
                          fontFamily: "Cyntho Next",
                          marginLeft: "0px !important",
                        }}
                      >
                        {moment(detailTournament?.tournamentEndAt).format(
                          "DD/MM/YYYY"
                        )}{" "}
                        -{" "}
                        {moment(detailTournament?.tournamentEndAt).format(
                          "hh:mm a"
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ marginRight: `${parseFloat(width / 75)}px` }}>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize:
                          576 < width && width < 1200
                            ? `${width / 62.5}px`
                            : "18px",
                      }}
                    >
                      Participants
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontSize:
                          576 < width && width < 1200
                            ? `${width / 76}px`
                            : "14px",
                      }}
                    >
                      {detailTournament?.tournamentParticipants?.length}/
                      {detailTournament?.tournamentQuantity > 0 ? (
                        detailTournament?.tournamentQuantity
                      ) : (
                        <InfinityIcon
                          sx={{
                            width: 15,
                            height: 15,
                          }}
                        />
                      )}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      minWidth: `${
                        (parseFloat(width / 42.67) + parseFloat(width / 384)) *
                        minLength
                      }px`,
                      height:
                        parseFloat(width / 42.67) + parseFloat(width / 384),
                    }}
                  >
                    {detailTournament?.tournamentParticipants?.map(
                      (item, index) => {
                        return detailTournament?.tournamentParticipants
                          ?.length > 5 ? (
                          index < 5 &&
                            (index === 0 ? (
                              <Box
                                key={index}
                                sx={{
                                  width:
                                    576 < width && width < 1200
                                      ? "36px"
                                      : parseFloat(width / 42.67) +
                                        parseFloat(width / 384),
                                  height:
                                    576 < width && width < 1200
                                      ? "36px"
                                      : parseFloat(width / 42.67) +
                                        parseFloat(width / 384),
                                  backgroundColor: "#1D1329",
                                  borderRadius: "50%",
                                  boxSizing: "border-box",
                                  padding:
                                    576 < width && width < 1200
                                      ? "3px"
                                      : `${parseFloat(width / 384)}px`,
                                  position: "absolute",
                                  right: "0px",
                                  top: "0px",
                                  zIndex: `${
                                    detailTournament?.tournamentParticipants
                                      ?.length - index
                                  }`,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    position: "relative",
                                    backgroundImage: `url(${
                                      item?.userAccount?.accountAvatar
                                        ? process.env.REACT_APP_SOCKET_SERVER +
                                          "/" +
                                          item?.userAccount?.accountAvatar
                                        : images.undefinedAvatar
                                    })`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      position: "absolute",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "100%",
                                      height: "100%",
                                      borderRadius: "50%",
                                      backgroundColor: "rgba(7,7,7,0.5)",
                                      color:
                                        detailTournament?.tournamentParticipants
                                          .length > 5
                                          ? "white"
                                          : "none",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {detailTournament?.tournamentParticipants
                                      ?.length > 5 &&
                                      `+ ${
                                        detailTournament?.tournamentParticipants
                                          ?.length - 5
                                      }`}
                                  </Box>
                                </Box>
                              </Box>
                            ) : (
                              <Box
                                key={index}
                                sx={{
                                  width:
                                    576 < width && width < 1200
                                      ? "36px"
                                      : parseFloat(width / 42.67) +
                                        parseFloat(width / 384),
                                  height:
                                    576 < width && width < 1200
                                      ? "36px"
                                      : parseFloat(width / 42.67) +
                                        parseFloat(width / 384),
                                  backgroundColor: "#1D1329",
                                  borderRadius: "50%",
                                  boxSizing: "border-box",
                                  padding: `${parseFloat(width / 384)}px`,
                                  position: "absolute",
                                  right:
                                    576 < width && width < 1200
                                      ? `${index * 25}px`
                                      : `${
                                          (parseFloat(width / 42.67) +
                                            parseFloat(width / 384)) *
                                            index -
                                          index * (10 + index * 1.5)
                                        }px`,
                                  top: "0px",
                                  zIndex: `${
                                    detailTournament?.tournamentParticipants
                                      ?.length - index
                                  }`,
                                }}
                              >
                                <Box
                                  component={"img"}
                                  src={
                                    item?.userAccount?.accountAvatar
                                      ? process.env.REACT_APP_SOCKET_SERVER +
                                        "/" +
                                        item?.userAccount?.accountAvatar
                                      : images.undefinedAvatar
                                  }
                                  sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                  }}
                                ></Box>
                              </Box>
                            ))
                        ) : (
                          <Box
                            key={index}
                            sx={{
                              width:
                                576 < width && width < 1200
                                  ? "36px"
                                  : parseFloat(width / 42.67) +
                                    parseFloat(width / 384),
                              height:
                                576 < width && width < 1200
                                  ? "36px"
                                  : parseFloat(width / 42.67) +
                                    parseFloat(width / 384),
                              backgroundColor: "#1D1329",
                              borderRadius: "50%",
                              boxSizing: "border-box",
                              padding: `${parseFloat(width / 384)}px`,
                              position: "absolute",
                              right:
                                576 < width && width < 1200
                                  ? `${index * 25}px`
                                  : `${
                                      (parseFloat(width / 42.67) +
                                        parseFloat(width / 384)) *
                                        index -
                                      index * (10 + index * 1.5)
                                    }px`,
                              top: "0px",
                              zIndex: `${
                                detailTournament?.tournamentParticipants
                                  ?.length - index
                              }`,
                            }}
                          >
                            <Box
                              component={"img"}
                              src={
                                item?.userAccount?.accountAvatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    item?.userAccount?.accountAvatar
                                  : images.undefinedAvatar
                              }
                              sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                              }}
                            ></Box>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                </Box>
              </Box>
              {/* Information Reward */}
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
                    width: 576 < width && width < 1200 ? "55%" : "495px",
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
                    <Box className="d-flex" sx={{ marginTop: "16px" }}>
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
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{ borderRadius: "14px" }}
                              src={
                                detailTournament?.tournamentInfors?.rewardInfors
                                  ?.rewardAvatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    detailTournament?.tournamentInfors
                                      ?.rewardInfors?.rewardAvatar
                                  : images.GameTournament
                              }
                              alt="..."
                              width={"95%"}
                              height={"90%"}
                            />
                          </Box>
                        </div>
                      </div>
                    </Box>

                    {/* --------------------------  */}
                  </Box>
                  <Typography
                    sx={{
                      textAlign: "start",
                      color: "#fff",
                      marginLeft: "0px !important",
                      fontSize:
                        576 < width && width < 1200
                          ? `${width / 42}px`
                          : "18px",
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
                        detailTournament?.tournamentInfors?.skin?.skinGame ||
                        null
                      }
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    flexGrow: 576 < width && width < 1200 ? "none" : "1",
                    padding:
                      576 < width && width < 1200
                        ? `0px 0px ${parseFloat(width / 43.6)}px 20px`
                        : `0px 0px ${parseFloat(width / 43.6)}px 60px`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: 576 < width && width < 1200 ? "45%" : "auto",
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: `${parseFloat(width / 70)}px`,
                      color: "white",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "start",
                        fontWeight: "lighter !important",
                        fontSize:
                          576 < width && width < 1200
                            ? `${width / 42}px`
                            : "28px",
                      }}
                    >
                      Current Result
                    </Typography>
                    <Typography
                      onClick={() => {
                        setCurrentResult(true);
                      }}
                      sx={{
                        textAlign: "start",
                        fontWeight: "lighter !important",
                        fontSize:
                          576 < width && width < 1200
                            ? `${width / 71}px`
                            : "18px",
                        color: "#BE48ED",
                        cursor: "pointer",
                      }}
                    >
                      View All
                    </Typography>
                  </Box>
                  <LeaderBoard
                    open={currentResult}
                    handleOnClose={() => {
                      setCurrentResult(false);
                    }}
                    detailTournament={detailTournament}
                  />
                </Box>
              </Box>
            </Box>
            <BuyTicket
              tournamentId={detailTournament?.id}
              bought={detailTournament?.bought}
              id={id}
            />
            <DetailVoucher
              open={openVoucher}
              handleOnClose={() => {
                setOpenVoucher(false);
              }}
              detail={detailTournament}
            />
            <Box
              component={"div"}
              sx={{
                backgroundColor: "#1d1329",
                padding: "16px",
                boxSizing: "border-box",
                marginTop: `36px`,
                marginBottom: `36px`,
              }}
            >
              <Box
                sx={{
                  textAlign: "start",
                  fontWeight: "lighter",
                  marginBottom: `${parseFloat(width / 74)}px`,
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Informations
              </Box>
              {detailTournament &&
                detailTournament?.tournamentInformations &&
                isJson(detailTournament?.tournamentInformations) &&
                JSON.parse(detailTournament?.tournamentInformations) &&
                JSON.parse(detailTournament?.tournamentInformations)?.length >
                  0 &&
                JSON.parse(detailTournament?.tournamentInformations)?.map(
                  (item, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          fontSize: getFontSizeDependOnWidth(width),
                          textAlign: "start",
                          color: "#9384B7",
                          marginTop: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "start",
                            fontWeight: "500 !important",
                            marginLeft: "0px !important",
                            fontFamily: "Cyntho Next",
                            fontSize:
                              576 < width && width < 1200
                                ? `${width / 71}px`
                                : "16px",
                          }}
                        >
                          {item
                            ? item
                            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam semper dolor nunc, quis eleifend erat accumsan id. Nulla cursus urna urna, aliquam congue justo luctus vel. Praesent convallis facilisis mauris, id interdum diam condimentum ut. Ut vitae magna fringilla, fringilla diam at, consectetur risus. Nullam ex est, aliquet eu consequat in, laoreet non tellus. Vestibulum eget rutrum mi. Etiam placerat lectus eu finibus sagittis."}
                        </Typography>
                      </Box>
                    );
                  }
                )}
            </Box>
          </Container>
        ) : (
          <>
            <JoinTournamentMobile
              handleOnClickStartGame={() => {
                socket?.emit("startGameInTournament", {
                  tournamentId: id,
                });
              }}
            />
            <BuyTicket
              tournamentId={detailTournament?.id}
              bought={detailTournament?.bought}
              id={id}
            />
          </>
        )
      ) : (
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
                  isFullScreen && startGame
                    ? "100%"
                    : width < 576
                    ? "100%"
                    : "80%",
                height: isFullScreen && startGame ? "100%" : "auto",
                paddingBottom: width < 576 ? "60px" : "none",
                position: isFullScreen && startGame ? "fixed" : "none",
                backgroundColor: isFullScreen && startGame ? "black" : "none",
                top: isFullScreen && startGame ? "0px" : "none",
                left: isFullScreen && startGame ? "0px" : "none",
                zIndex: isFullScreen && startGame ? "5005" : "none",
              }}
            >
              {detailTournament &&
                detailTournament?.tournamentInfors?.game &&
                detailTournament?.tournamentInfors?.game?.GameFiles &&
                detailTournament?.tournamentInfors?.game?.GameFiles.length >=
                  4 && (
                  <FullScreen
                    className={`${
                      deviceType === "iOS" ? "fullscreen_IOS" : ""
                    }`}
                    handle={screen}
                    onChange={reportChange}
                  >
                    {videoGame ? (
                      <Fragment>
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
                              if (
                                width < 576 &&
                                !detailTournament?.tournamentInfors?.skin
                                  ?.skinGame?.gameScreenType &&
                                startGame
                              ) {
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
                                if (
                                  width < 576 &&
                                  !detailTournament?.tournamentInfors?.skin
                                    ?.skinGame?.gameScreenType &&
                                  startGame
                                ) {
                                  setExpand(true);
                                  screen.enter();
                                  setIsFullScreen(true);
                                }
                              }
                            }}
                            sx={{
                              position:
                                detailTournament?.tournamentInfors?.game
                                  ?.gameScreenType === 0 ||
                                !detailTournament?.tournamentInfors?.game
                                  ?.gameScreenType
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
                                fontSize:
                                  width < 576 ? "10px !important" : "14px",
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
                      </Fragment>
                    ) : (
                      <Fragment>
                        <UnityGameComponent
                          fmod={
                            detailTournament?.tournamentInfors?.game?.gameFmod
                          }
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
                            detailTournament?.tournamentInfors?.skin
                              ?.skinName || ""
                          }
                          skinId={
                            detailTournament?.tournamentInfors?.skin?.id || ""
                          }
                          type="tournament"
                          handleEndGame={handleEndGame}
                          gameName={
                            detailTournament?.tournamentInfors?.game
                              ?.gameName || ""
                          }
                          pauseGame={pauseGame}
                          unPauseGame={unPauseGame}
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
                                <img
                                  alt="..."
                                  width="30px"
                                  src={images.eyeIcon}
                                />
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
                                  background:
                                    "linear-gradient(#873CF0,#7946EE)",
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
                        )}
                      </Fragment>
                    )}
                  </FullScreen>
                )}
              {startGame && expand === false && width > 576 && !videoGame && (
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
          </Box>
          {/* Landscape  */}
          {(width < 576 || (!previousOri && orientation === "portrait")) &&
            startGame &&
            detailTournament?.tournamentInfors?.game?.gameScreenType === 1 && (
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
          {/* Portrait */}
          {width < 1200 &&
            width > 576 &&
            previousOri === "landscape" &&
            orientation === "landscape" &&
            startGame &&
            (detailTournament?.tournamentInfors?.game?.gameScreenType === 0 ||
              !detailTournament?.tournamentInfors?.game?.gameScreenType) && (
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
      )}
    </ThemeProvider>
  );
}
