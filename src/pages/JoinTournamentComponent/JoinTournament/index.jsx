import {
  Box,
  Container,
  CssBaseline,
  Dialog,
  TableCell,
  TableRow,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import {
  getFontSizeBigTitleDependOnWidth,
  getFontSizeDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../../utils/config";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { images280423_l } from "../../../utils/images280423_l";
import { images, video } from "../../../utils/images";
import { useParams } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { Fragment } from "react";
import UnityGameComponent from "../../../components/GameManager/UnityGameComponent";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import { toggleBuyTicket } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import JoinTournamentMobile from "../JoinTournamentMobile";
import InspirationTTF from "../../../assets/font/CynthoNextMedium.otf";
import LeaderBoard from "../LeaderBoard";
import DetailVoucher from "../DetailVoucher";
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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoGame, setVideoGame] = useState(false);
  const [checkMobile, setCheckMobile] = useState(false);
  const { width } = useWindowDimensions();
  const [openVoucher, setOpenVoucher] = useState(true);
  const [currentResult, setCurrentResult] = useState(false);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(toggleBuyTicket(true));
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#1f1933",
      width: width,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#291e42",
      width: width,
    },
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  }));
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
      setVideoGame(true);
      setCheckMobile(false);
    }
  }, [isFullScreen, checkMobile]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#251f41",
      color: "#7c81f3",
      fontWeight: "bolder",
      fontSize: 13,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
      padding: "10px 0px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
    },
  }));
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
    if ((token && fetchT) || (!token && fetchT)) {
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
      socket?.emit("detailTournament", {
        tournamentId: data?.id,
      });
    });
    socket?.on("startGameInTournamentSuccess", (data) => {
      setStartGame(true);
      if (orientation === "landscape") {
        setVideoGame(true);
      }
      setCheckMobile(true);
    });
    return () => {
      socket?.off("detailTournamentSuccess");
    };
  }, [socket, orientation]);

  useEffect(() => {
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
  }, [detailTournament]);

  const handleEndGame = () => {
    setStartGame(false);
    window.location.reload();
  };
  console.log("detail Tournament: ", detailTournament);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!startGame ? (
        width > 576 ? (
          <Container maxWidth="lg" sx={{ paddingTop: "50px" }}>
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
                  height: width / 7,
                  boxSizing: "border-box",
                  padding: `${parseFloat(width / 51.9)}px`,
                  backgroundImage: `url(${images.TournamentBG})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    component={"img"}
                    src={
                      detailTournament?.tournamentInfors?.game &&
                      detailTournament?.tournamentInfors?.game[0]
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          detailTournament?.tournamentInfors?.game[0].gameAvatar
                        : images.undefinedAvatar
                    }
                    sx={{
                      width: width / 7 - parseFloat(width / 51.9) * 2,
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  ></Box>
                  {detailTournament?.checkInTournament && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "0px",
                        right: "-220px",
                        width: `${parseFloat(width / 9)}px`,
                        height: `${parseFloat(width / 12.5)}px`,
                        borderRadius: "5px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        boxSizing: "border-box",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          textAlign: "start",
                          textTransform: "uppercase",
                          fontSize: "30px",
                        }}
                      >
                        {detailTournament?.tournamentInfors?.game &&
                          detailTournament?.tournamentInfors?.game[0]?.gameName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          textAlign: "start",
                          fontSize: "16px",
                          fontWeight: "lighter !important",
                        }}
                      >
                        Tournament of hourly
                      </Typography>
                    </Box>
                  )}
                </Box>
                {!detailTournament?.checkInTournament && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
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
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  {!detailTournament?.checkInTournament ? (
                    <button
                      onClick={() => {
                        socket?.emit("joinTournament", {
                          tournamentId: detailTournament?.id,
                        });
                      }}
                      style={{
                        padding: `${parseFloat(width / 150)}px ${parseFloat(
                          width / 28
                        )}px`,
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        background: "linear-gradient(#7440E9,#A345FB)",
                        color: "white",
                      }}
                    >
                      Join
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          socket?.emit("startGameInTournament", {
                            tournamentId: id,
                          });
                        }}
                        style={{
                          padding: `${parseFloat(width / 150)}px ${parseFloat(
                            width / 28
                          )}px`,
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          background: "linear-gradient(#7440E9,#A345FB)",
                          color: "white",
                          marginRight: `${width / 128}px`,
                        }}
                      >
                        Play
                      </button>
                      <button
                        onClick={handleClickOpen}
                        style={{
                          padding: `${parseFloat(width / 150)}px ${parseFloat(
                            width / 45
                          )}px`,
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          backgroundColor: "#69389E",
                          color: "white",
                        }}
                      >
                        Buy Ticket
                      </button>
                    </>
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
                    10
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
                  padding: `${parseFloat(width / 66)}px ${parseFloat(
                    width / 43.6
                  )}px`,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: "22px",
                        height: "22px",
                        marginRight: "5px",
                      }}
                      component={"img"}
                      src={images.calendarTour}
                    ></Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "#ffff",
                          textAlign: "start",
                          fontSize: "12px",
                          letterSpacing: "0.7px",
                        }}
                      >
                        Tournament Start
                      </Typography>
                      <Typography
                        sx={{
                          color: "#7C81F2",
                          textAlign: "start",
                          fontSize: "15px",
                          fontWeight: "lighter !important",
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
                      width: "3px",
                      height: "100%",
                      background: "rgba(151, 151, 151, 0.40)",
                      margin: "0px 30px",
                    }}
                  ></Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: "22px",
                        height: "22px",
                        marginRight: "5px",
                      }}
                      component={"img"}
                      src={images.calendarTour}
                    ></Box>
                    <Box>
                      <Typography
                        sx={{
                          color: "#ffff",
                          textAlign: "start",
                          fontSize: "12px",
                          letterSpacing: "0.7px",
                        }}
                      >
                        Tournament End
                      </Typography>
                      <Typography
                        sx={{
                          color: "#7C81F2",
                          textAlign: "start",
                          fontSize: "15px",
                          fontWeight: "lighter !important",
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
                    <Typography sx={{ color: "#AA73DB" }}>
                      Participants
                    </Typography>
                    <Typography sx={{ color: "#FFFFFF" }}>
                      {detailTournament?.tournamentParticipants?.length}/
                      {detailTournament?.tournamentQuantity}
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
                                    parseFloat(width / 42.67) +
                                    parseFloat(width / 384),
                                  height:
                                    parseFloat(width / 42.67) +
                                    parseFloat(width / 384),
                                  backgroundColor: "#1D1329",
                                  borderRadius: "50%",
                                  boxSizing: "border-box",
                                  padding: `${parseFloat(width / 384)}px`,
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
                                      item.userAccount.accountAvatar
                                        ? process.env.REACT_APP_SOCKET_SERVER +
                                          "/" +
                                          item.userAccount.accountAvatar
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
                                    parseFloat(width / 42.67) +
                                    parseFloat(width / 384),
                                  height:
                                    parseFloat(width / 42.67) +
                                    parseFloat(width / 384),
                                  backgroundColor: "#1D1329",
                                  borderRadius: "50%",
                                  boxSizing: "border-box",
                                  padding: `${parseFloat(width / 384)}px`,
                                  position: "absolute",
                                  right: `${
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
                                    item.userAccount.accountAvatar
                                      ? process.env.REACT_APP_SOCKET_SERVER +
                                        "/" +
                                        item.userAccount.accountAvatar
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
                                parseFloat(width / 42.67) +
                                parseFloat(width / 384),
                              height:
                                parseFloat(width / 42.67) +
                                parseFloat(width / 384),
                              backgroundColor: "#1D1329",
                              borderRadius: "50%",
                              boxSizing: "border-box",
                              padding: `${parseFloat(width / 384)}px`,
                              position: "absolute",
                              right: `${
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
                                item.userAccount.accountAvatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    item.userAccount.accountAvatar
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
                }}
              >
                <Box
                  sx={{
                    padding: `${parseFloat(width / 66)}px ${parseFloat(
                      width / 43.6
                    )}px 0px 0px`,
                    width: "47%",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        textAlign: "start",
                        fontWeight: "lighter",
                        marginBottom: `${parseFloat(width / 74)}px`,
                        color: "white",
                      }}
                    >
                      REWARD
                    </Box>
                    <Box
                      component={"img"}
                      sx={{ width: "100%", height: "auto" }}
                      src={images.voucher_tour}
                    ></Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        textAlign: "start",
                        fontWeight: "lighter",
                        marginTop: `${parseFloat(width / 74)}px`,
                        marginBottom: `${parseFloat(width / 74)}px`,
                        color: "white",
                      }}
                    >
                      INFORMATION
                    </Box>
                    {detailTournament?.tournamentInfors?.descriptions?.map(
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
                                fontWeight: "200 !important",
                                marginLeft: "0px !important",
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
                </Box>
                <Box
                  sx={{
                    flexGrow: "1",
                    padding: `${parseFloat(width / 66)}px 0px ${parseFloat(
                      width / 43.6
                    )}px 0px`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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
                        fontSize: "20px",
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
                        fontSize: "14px",
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
            />
          </Container>
        ) : (
          <JoinTournamentMobile
            handleOnClickStartGame={() => {
              socket?.emit("startGameInTournament", {
                tournamentId: id,
              });
            }}
          />
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
                    ? "95%"
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
                detailTournament?.tournamentInfors?.game[0].GameFiles.length >=
                  4 && (
                  <FullScreen handle={screen} onChange={reportChange}>
                    {videoGame ? (
                      <Fragment>
                        (
                        <video
                          className={
                            isFullScreen && startGame ? "fullscreenVideo" : ""
                          }
                          width={"100%"}
                          playsInline
                          muted
                          autoPlay
                          onEnded={() => {
                            setVideoGame(false);
                          }}
                        >
                          <source src={video.LogoAnim} type="video/mp4" />
                        </video>
                        )
                      </Fragment>
                    ) : (
                      <Fragment>
                        <UnityGameComponent
                          GameFiles={
                            detailTournament?.tournamentInfors?.game[0]
                              .GameFiles
                          }
                          width="100%"
                          height="800px"
                          cwidth="100%"
                          cheight="100%"
                          tournamentId={id}
                          isFullScreen={isFullScreen}
                          fullScreen={expand}
                          gameId={
                            detailTournament?.tournamentInfors?.game[0]
                              ._gg_koth_game_tournaments?.gameId
                          }
                          type="tournament"
                          handleEndGame={handleEndGame}
                          gameName={
                            detailTournament?.tournamentInfors?.game[0]
                              ?.gameName
                          }
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
            detailTournament?.tournamentInfors?.game[0]?.gameScreenType ===
              1 && (
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
          {width > 576 &&
            width < 1024 &&
            previousOri === "landscape" &&
            orientation === "landscape" &&
            startGame &&
            (detailTournament?.tournamentInfors?.game[0]?.gameScreenType ===
              0 ||
              !detailTournament?.tournamentInfors?.game[0]?.gameScreenType) && (
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
