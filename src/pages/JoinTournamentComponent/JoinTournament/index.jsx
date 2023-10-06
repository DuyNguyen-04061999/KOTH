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
import {
  saveBoughtTournament,
  saveIdTournament,
  toggleBuyTicket,
} from "../../../redux-saga-middleware/reducers/tournamentReducer";
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
import {
  toggleLoginDialog,
  toggleShareTour,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { toast } from "react-toastify";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";
import PlayGame from "../PlayGame";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import ParagraphLoading from "../../../components/LoadingComponent/ParagraphLoading";
import { updateDetailTour } from "../../../redux-saga-middleware/reducers/playgameReducer";
import GamePreview from "../JoinTournamentMobile/GamePreview";
import AnimButton from "../../../components/AnimButton";

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
  // const timeEnd =
  //   moment(detailTournament?.tournamentEndAt).format("DD/MM/YYYY") +
  //   " " +
  //   "- " +
  //   moment(detailTournament?.tournamentEndAt).format("hh:mm a");

  // const timeStart =
  //   moment(detailTournament?.tournamentStartAt).format("DD/MM/YYYY") +
  //   " " +
  //   "- " +
  //   moment(detailTournament?.tournamentStartAt).format("hh:mm a");

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
    socket?.emit("detailTournament", {
      tournamentId: id,
    });
  }, [token, id, socket]);
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

  const handlePlayTour = () => {
    socket?.emit("startGameInTournament", {
      tournamentId: id,
    });
  };
  console.log(detailTournament);
  const handleJoinTour = () => {
    if (token) {
      socket?.emit("joinTournament", {
        tournamentId: detailTournament?.id,
      });
    } else {
      dispatch(toggleLoginDialog());
    }
  };

  useEffect(() => {
    dispatch(saveBoughtTournament(detailTournament?.bought));
    dispatch(saveIdTournament(detailTournament?.id));
  }, [detailTournament]);

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
                      <Box sx={{ width: "150px" }}>
                        <AnimButton
                          onClick={handleJoinTour}
                          text={"Join"}
                          type={"primary"}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        className="btn-conteiner"
                      >
                        <AnimButton
                          onClick={handlePlayTour}
                          type={"highlight"}
                          text={"Play"}
                        />

                        <AnimButton
                          onClick={handleClickOpen}
                          text={"Buy Ticket"}
                          type={"primary"}
                        />
                      </Box>
                    )}
                  </Box>
                  <Box
                    onClick={() => {
                      dispatch(toggleShareTour());
                    }}
                    className="cursor-pointer"
                    sx={{
                      width: "80px",
                      padding: "5px 10px",
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="13"
                      fill="none"
                      viewBox="0 0 15 13"
                    >
                      <g>
                        <g>
                          <path
                            fill="#fff"
                            d="M7.363 3.812c.056-.839.088-1.64.176-2.438.032-.267.146-.518.327-.717.225-.232.54-.17.81.004a18.133 18.133 0 015.313 5.24.699.699 0 01-.006.631c-1.407 2.091-3.151 3.85-5.28 5.21-.58.371-1.12.089-1.17-.615-.062-.832-.12-1.67-.151-2.5-.012-.283-.119-.371-.385-.403-2.21-.264-4.166.718-5.276 2.662-.264.458-.496.933-.791 1.366a.657.657 0 01-.534.243c-.135-.021-.34-.284-.333-.432.055-1.24.005-2.511.263-3.711.574-2.612 2.96-4.458 5.628-4.54.458-.012.912 0 1.41 0z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <Typography
                      className="text-white"
                      sx={{ fontWeight: "700", fontSize: "14px" }}
                    >
                      Share
                    </Typography>
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
                        My Ticket
                      </Typography>
                      <Box
                        sx={{
                          color: "#fff",
                          textAlign: "start",
                          fontSize:
                            576 < width && width < 1200
                              ? `${width / 76}px`
                              : "14px",
                          fontWeight: "lighter !important",
                          marginLeft: "0px !important",
                          minWidth: "100px",
                        }}
                      >
                        {fetchT ? (
                          <Skeleton
                            variant="text"
                            sx={{ bgcolor: "rgba(255,255,255,0.5)" }}
                          />
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="16"
                              fill="none"
                              viewBox="0 0 26 16"
                            >
                              <g>
                                <g>
                                  <path
                                    fill="#AB3FEF"
                                    d="M18.644 15.881H1.368c-.87 0-.95-.077-.95-.948 0-1.53.01-3.059-.008-4.586-.003-.555.119-.884.752-.943.775-.073 1.323-.772 1.334-1.535a1.542 1.542 0 00-.36-1.027 1.497 1.497 0 00-.944-.52C.555 6.237.396 5.927.407 5.33.437 3.8.424 2.272.414.744.414.224.627 0 1.146 0c5.715.007 11.43.01 17.144.006.097 0 .194.016.351.03 0 .808.006 1.588 0 2.366 0 .387.055.744.515.752.46.01.52-.371.519-.743V.014c1.788 0 3.511-.015 5.234.023.165 0 .46.332.464.516.037 1.714.024 3.43.023 5.145 0 .476-.344.532-.704.598-1.029.193-1.595 1.104-1.277 2.054.208.62.656 1.01 1.296 1.066.525.047.699.299.695.8a467.48 467.48 0 000 4.897c0 .415-.084.762-.58.764-1.686.008-3.372 0-5.149 0v-2.055c0-.185.059-.41-.022-.549-.122-.214-.343-.371-.52-.552-.163.2-.451.39-.465.6-.06.822-.026 1.648-.026 2.56zM7.339 11.077c.014.517.47.744.966.372.969-.719 1.878-.885 2.87-.053.186.157.643.229.803.106.16-.123.252-.574.174-.814-.401-1.232-.097-2.178.929-2.944a.87.87 0 00.26-.731c-.04-.169-.403-.372-.61-.372-1.322.05-2.028-.633-2.388-1.86-.066-.22-.385-.511-.575-.502-.19.008-.488.306-.561.533-.354 1.2-1.036 1.903-2.34 1.804a.542.542 0 00-.179.039c-.572.147-.708.546-.315.991.325.372.707.69 1.01 1.076.144.202.215.449.2.698-.042.559-.158 1.107-.245 1.657zm11.306-5.263c0 .351-.056.715.022 1.046.049.207.291.496.465.507.173.012.488-.275.502-.45.058-.72.058-1.441 0-2.16-.014-.182-.318-.477-.488-.475-.17.003-.432.284-.488.487-.07.33-.012.696-.013 1.045zm1.02 4.214c0-.35.06-.715-.023-1.043-.05-.2-.326-.477-.488-.471-.163.006-.462.301-.476.496a12.95 12.95 0 000 2.097c.016.19.304.358.467.535.177-.184.45-.344.508-.563.077-.328.012-.696.012-1.047v-.004z"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                            <Typography
                              sx={{
                                color: "#ffff",
                                fontSize: "14px",
                              }}
                            >
                              {detailTournament?.turnCountLeft || 0}
                            </Typography>
                          </Box>
                        )}
                      </Box>
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
              dataTime={detailTournament?.tournamentEndAt}
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
            <GamePreview />
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
              dataTime={detailTournament?.tournamentEndAt}
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
