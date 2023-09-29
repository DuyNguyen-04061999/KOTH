import {
  Box,
  Container,
  CssBaseline,
  // Grid,
  Skeleton,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { getFontSizeDependOnWidth } from "../../../utils/config";
import { images } from "../../../utils/images";
import {
  // useNavigate,
  // useNavigate,
  useParams,
} from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import { toggleBuyTicket } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import JoinTournamentMobile from "../JoinTournamentMobile";
import LeaderBoard from "../LeaderBoard";
import DetailVoucher from "../DetailVoucher";
import "./index.scss";
import GameInTournament from "../GameInTournament";
import BgEndGame from "../BgEndTour";
import ResultEndGame from "../../../components/Dialog/ResultEndGame";
import InfinityIcon from "@mui/icons-material/AllInclusive";
import {
  formatTimeMothDateYear,
  isJson,
  sliceString,
} from "../../../utils/helper";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { toast } from "react-toastify";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";
import PlayGame from "../PlayGame";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import ParagraphLoading from "../../../components/LoadingComponent/ParagraphLoading";
import { updateDetailTour } from "../../../redux-saga-middleware/reducers/playgameReducer";

const theme = createTheme({
  typography: {},
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // "@font-face": {
        //   fontFamily: "Cyntho Next",
        //   src: `url(${InspirationTTF}) format("truetype")`,
        // },
      },
    },
  },
});

export default function JoinTournament() {
  const [socket, setSocket] = useState(null);
  const [fetchT, setFetchT] = useState(true);
  const [detailTournament, setDetailTournament] = useState({});
  const [startGame, setStartGame] = useState(false);
  const { id } = useParams();
  const [videoGame, setVideoGame] = useState(false);
  const { token } = useSelector((state) => state.authReducer);
  const { width } = useWindowDimensions();
  const [openVoucher, setOpenVoucher] = useState(false);
  const [currentResult, setCurrentResult] = useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(toggleBuyTicket(true));
  };
  const screen = useFullScreenHandle();
  const [minLength, setMinLength] = useState(0);
  useEffect(() => {
    dispatch(updateDetailTour(detailTournament));
  }, [detailTournament, dispatch]);
  const timeEnd =
    moment(detailTournament?.tournamentEndAt).format("DD/MM/YYYY") +
    " " +
    "- " +
    moment(detailTournament?.tournamentEndAt).format("hh:mm a");

  const timeStart =
    moment(detailTournament?.tournamentStartAt).format("DD/MM/YYYY") +
    " " +
    "- " +
    moment(detailTournament?.tournamentStartAt).format("hh:mm a");

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
    socket?.on("detailTournamentSuccess", (data) => {
      setDetailTournament(data);
      setFetchT(false);
    });
    socket?.on("buyTicketTournamentSuccess", () => {
      window.location.reload();
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
      window.location.reload();
    });
    socket?.on("startGameInTournamentSuccess", (data) => {
      dispatch(toggleStartGame(true));
      setStartGame(true);
      setVideoGame(true);
    });

    return () => {
      socket?.off("joinTournamentSuccess");
    };
  }, [
    socket,
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
  // useEffect(() => {
  //   if (!window.location.hash.includes("#reloaded")) {
  //     window.location.href += "#reloaded";
  //     window.location.reload();
  //   }
  // }, []);
  console.log("detailTournament: ", detailTournament);
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
              {fetchT ? (
                <BannerLoading width={"100%"} height={"340px"} />
              ) : (
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
                    className="btn-conteiner"
                  >
                    {!detailTournament?.checkInTournament ? (
                      <button
                        className="button-join-hover"
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
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        className="btn-conteiner"
                      >
                        <button
                          className="button-join-hover"
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
                          className="button-join-hover"
                          onClick={handleClickOpen}
                          style={{
                            padding: `0px ${parseFloat(width / 45)}px`,
                            borderRadius: "5px",
                            border: "none",
                            outline: "none",
                            height: "40px",
                            background:
                              "linear-gradient(180deg, #8A3AF1 0%, #7648ED 100%)",
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
              )}
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
                        Start date
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
                          marginLeft: "0px !important",
                          minWidth: "155px",
                        }}
                      >
                        {fetchT ? (
                          <Skeleton
                            variant="text"
                            sx={{ bgcolor: "rgba(255,255,255,0.5)" }}
                          />
                        ) : (
                          formatTimeMothDateYear(
                            detailTournament?.tournamentStartAt
                          )
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
                        End date
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
                          marginLeft: "0px !important",
                          minWidth: "155px",
                        }}
                      >
                        {fetchT ? (
                          <Skeleton
                            variant="text"
                            sx={{ bgcolor: "rgba(255,255,255,0.5)" }}
                          />
                        ) : (
                          formatTimeMothDateYear(
                            detailTournament?.tournamentEndAt
                          )
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
                      {fetchT ? (
                        <ParagraphLoading
                          lines={1}
                          width={"100%"}
                          height={36}
                        />
                      ) : (
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
                              ? detailTournament?.tournamentName
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
                              ? "Hourly tournaments"
                              : detailTournament?.tournamentTimeType === "daily"
                              ? "Daily tournaments"
                              : "Weeklong tournaments"}
                          </Typography>
                        </>
                      )}
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
                    {fetchT ? (
                      <Skeleton
                        width={"100%"}
                        height={"147px"}
                        variant="rounded"
                        sx={{
                          marginTop: "24px",
                          bgcolor: "rgba(255,255,255,0.5)",
                        }}
                      />
                    ) : (
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
                                      576 < width && width < 1200
                                        ? "12px"
                                        : "14px",
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
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setOpenVoucher(true);
                                  }}
                                  style={{
                                    color: "#0096FF",
                                    fontSize:
                                      576 < width && width < 1024
                                        ? "12px"
                                        : "14px",
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
                                    detailTournament?.tournamentInfors
                                      ?.rewardInfors?.rewardAvatar
                                  : images.GameTournament
                              }
                              alt="..."
                              width={"95%"}
                              height={"90%"}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
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
                    {fetchT ? (
                      <Box
                        sx={{
                          width: "100%",
                          backgroundColor: width > 576 ? "#1D1329" : "none",
                          display: "flex",
                          alignItems: "center",
                          padding: "20px",
                        }}
                      >
                        <Skeleton
                          width={120}
                          height={120}
                          variant="circular"
                          sx={{ bgcolor: "rgba(255,255,255,0.5)" }}
                        />
                        <Box sx={{ width: "65%" }}>
                          <Skeleton
                            width={"100%"}
                            height={36}
                            sx={{
                              marginLeft: "12px",
                              bgcolor: "rgba(255,255,255,0.5)",
                            }}
                          />{" "}
                          <Skeleton
                            width={"100%"}
                            height={36}
                            sx={{
                              marginLeft: "12px",
                              bgcolor: "rgba(255,255,255,0.5)",
                            }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <GameInTournament
                        game={
                          detailTournament?.tournamentInfors?.skin?.skinGame ||
                          null
                        }
                      />
                    )}
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
                    isFetching={fetchT}
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
              {fetchT ? (
                <ParagraphLoading />
              ) : (
                detailTournament &&
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
                            fontSize:
                              576 < width && width < 1200
                                ? `${width / 71}px`
                                : "16px",
                          }}
                        >
                          {item ? item : ""}
                        </Typography>
                      </Box>
                    );
                  }
                )
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
        <PlayGame
          startGame={startGame}
          detailTournament={detailTournament}
          setStartGame={() => {
            setStartGame(false);
          }}
          videoGame={videoGame}
          setVideoGame={(data) => {
            setVideoGame(data);
          }}
        />
      )}
    </ThemeProvider>
  );
}
