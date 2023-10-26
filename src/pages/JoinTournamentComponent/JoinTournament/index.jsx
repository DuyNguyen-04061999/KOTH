import InfinityIcon from "@mui/icons-material/AllInclusive";
import {
  Box,
  Container,
  // Grid,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  // useNavigate,
  // useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import AnimButton from "../../../components/AnimButton";
import ResultEndGame from "../../../components/Dialog/ResultEndGame";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import ParagraphLoading from "../../../components/LoadingComponent/ParagraphLoading";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";
import {
  toggleLoginDialog,
  toggleShareTour,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { updateDetailTour } from "../../../redux-saga-middleware/reducers/playgameReducer";
import {
  saveBoughtTournament,
  saveIdTournament,
  toggleBuyTicket,
  toggleExtra,
  toggleTournamentShow,
} from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { getFontSizeDependOnWidth } from "../../../utils/config";
import { isJson, sliceString } from "../../../utils/helper";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DetailVoucher from "../DetailVoucher";
import GameInTournament from "../GameInTournament";
import JoinTournamentMobile from "../JoinTournamentMobile";
import LeaderBoard from "../LeaderBoard";
import PlayGame from "../PlayGame";
import "./index.scss";
import { toggleCheckWallet } from "../../../redux-saga-middleware/reducers/walletReducer";
import NotificationExtra from "../../../components/Dialog/NotificationExtra";

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
  },
})(Tooltip);

export default function JoinTournament() {
  const [socket, setSocket] = useState(null);
  const [fetchT, setFetchT] = useState(true);
  const [detailTournament, setDetailTournament] = useState({});

  const [startGame, setStartGame] = useState(false);
  const { id } = useParams();
  const [videoGame, setVideoGame] = useState(false || true);
  const { token, uPack } = useSelector((state) => state.authReducer);
  const { width } = useWindowDimensions();
  const [openVoucher, setOpenVoucher] = useState(false);
  const [currentResult, setCurrentResult] = useState(false);
  const dispatch = useDispatch();
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const handleClickOpen = () => {
    dispatch(toggleCheckWallet({ type: "buyTicket" }));
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
    socket?.emit("detailTournament", {
      tournamentId: id,
    });
  }, [id, socket]);

  useEffect(() => {
    if (token) {
      socket?.emit("detailTournament", {
        tournamentId: id,
      });
    }
  }, [id, socket, token]);

  useEffect(() => {
    socket?.on("detailTournamentSuccess", (data) => {
      setDetailTournament(data);
      setFetchT(false);
    });
    socket?.on("buyTicketTournamentSuccess", () => {
      // window.location.reload();
      if (token) {
        socket?.emit("detailTournament", {
          tournamentId: id,
        });
      }
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
      if (token) {
        socket?.emit("detailTournament", {
          tournamentId: id,
        });
      }
    });
    socket?.on("startGameInTournamentSuccess", (data) => {
      if (device === "Mobile" || device === "Tablet") {
        dispatch(toggleStartGame(true));
      }
      setStartGame(true);
      setVideoGame(true);
    });

    return () => {
      socket?.off("joinTournamentSuccess");
      socket?.off("buyTicketTournamentSuccess");
    };
  }, [
    socket,
    detailTournament?.tournamentInfors?.skin?.skinGame?.gameScreenType,
    width,
    screen,
    startGame,
    dispatch,
    id,
    token,
    device,
  ]);

  const handlePlayTour = () => {
    if (detailTournament?.extras?.normal === 0) {
      dispatch(toggleExtra())
      return;
    } else {
      socket?.emit("startGameInTournament", {
        tournamentId: id,
      });
    } 
  };

  const handleJoinTour = () => {
    if (detailTournament?.tournamentVip !== 0 && uPack === null) {
      dispatch(toggleTournamentShow());
    } else if (token) {
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
  }, [detailTournament, dispatch]);

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
  useEffect(() => {
    dispatch({
      type: "CALL_BIGGEST_END_TOUR",
    });
    dispatch({
      type: "GET_BIGGEST_TOUR",
    });
  }, [dispatch]);

  useEffect(() => {
    const updateOrientation = (event) => {
      if (!startGame) {
        window.location.reload();
      }
    };

    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [startGame]);

  return (
    <>
      <ResultEndGame />
      <NotificationExtra />
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
                // backgroundColor: "white",
                width: "100%",
                height: "auto",
              }}
            >
              {fetchT ? (
                <BannerLoading width={"100%"} height={"340px"} />
              ) : detailTournament?.tournamentStatus === 2 ? (
                // <BannerWin
                //   userName={biggestEndTour?.bestUser?.userNickName || "super_"}
                //   userAvatar={
                //     biggestEndTour?.bestUser?.tUser?.userAccount?.accountAvatar
                //       ? process.env.REACT_APP_SOCKET_SERVER +
                //         "/" +
                //         biggestEndTour?.bestUser?.tUser?.userAccount
                //           ?.accountAvatar
                //       : imageHome.BannerWinAva
                //   }
                //   sponsorName={
                //     biggestEndTour && biggestEndTour?.endTour
                //       ? biggestEndTour?.endTour?.tournamentBrand?.brandName
                //       : "Samsung"
                //   }
                //   tournamentName={
                //     biggestEndTour && biggestEndTour?.endTour
                //       ? biggestEndTour?.endTour?.tournamentName
                //       : "Galaxy Z-flip 5"
                //   }
                // />
                <></>
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
                  {/* {detailTournament?.tournamentStatus === 2 && <BgEndGame />} */}

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
                          text={"Buy Extra"}
                          type={"loadding"}
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
              {detailTournament?.tournamentStatus === 2 ? (
                <Box
                  sx={{
                    backgroundImage: `url(${images.bannerendtour})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "100%",
                    height: "130px",
                    borderRadius: "5px",
                    marginTop: "34px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      width: "500px",
                      wordWrap: "break-word",
                      color: "white",
                      fontSize: "30px",
                      fontWeight: "700",
                      textShadow: "#F25957 2px 4px 5px",
                    }}
                  >
                    THIS PROMOTION HAS ENDED! CONGRATS WINNER:{" "}
                    <span
                      style={{
                        color: "#FFDF4A",
                        fontWeight: "700",
                        fontSize: "32px",
                      }}
                    >
                      {detailTournament?.bestUser || ""}
                    </span>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#1D1329",
                    boxSizing: parseFloat(width / 43.63),
                    padding: "10px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 5,
                  }}
                >
                  {width && (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              width: "150px",
                            }}
                          >
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
                                minWidth:
                                  device === "Desktop" ||
                                  orientation === "landscape"
                                    ? "none"
                                    : "none",
                                fontWeight: "700",
                              }}
                            >
                              Free Extra:
                            </Typography>
                            <BgWithTooltip
                              title="Free Extra will be reset at 23:59 per day, so make sure to use them all."
                              placement="right"
                              sx={{
                                backgroundColor: "white",
                                color: "red",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                                viewBox="0 0 20 20"
                                className="ms-1"
                              >
                                <g>
                                  <path
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    d="M10.001 18.335a8.333 8.333 0 100-16.667 8.333 8.333 0 000 16.667z"
                                  ></path>
                                  <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeWidth="1.5"
                                    d="M10 14.168v-5"
                                  ></path>
                                  <path
                                    fill="#fff"
                                    d="M10.001 5.833a.833.833 0 110 1.667.833.833 0 010-1.667z"
                                  ></path>
                                </g>
                              </svg>
                            </BgWithTooltip>
                            {/* {!detailTournament?.checkInTournament ? (
                              <BgWithTooltip
                                title="Extra: A player can participate in a promotion up to 5 times. Share the promotion with friends to earn an extra play for each new sign-up through your link."
                                placement="right"
                                sx={{
                                  backgroundColor: "white",
                                  color: "red",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="none"
                                  viewBox="0 0 20 20"
                                  className="ms-1"
                                >
                                  <g>
                                    <path
                                      stroke="#fff"
                                      strokeWidth="1.5"
                                      d="M10.001 18.335a8.333 8.333 0 100-16.667 8.333 8.333 0 000 16.667z"
                                    ></path>
                                    <path
                                      stroke="#fff"
                                      strokeLinecap="round"
                                      strokeWidth="1.5"
                                      d="M10 14.168v-5"
                                    ></path>
                                    <path
                                      fill="#fff"
                                      d="M10.001 5.833a.833.833 0 110 1.667.833.833 0 010-1.667z"
                                    ></path>
                                  </g>
                                </svg>
                              </BgWithTooltip>
                            ) : (
                              <Typography
                                sx={{
                                  marginLeft: "0px !important",
                                  color: "white",
                                }}
                              >
                                : {detailTournament?.boughtToday}/
                                {detailTournament?.maxPlay}
                              </Typography>
                            )} */}
                          </Box>
                          {/* <Box
                            sx={{
                              color: "#fff",
                              textAlign: "start",
                              fontSize:
                                576 < width && width < 1200
                                  ? `${width / 76}px`
                                  : "14px",
                              fontWeight: "lighter !important",
                              marginLeft: "0px !important",
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
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 10 10"
                                >
                                  <path
                                    fill="#BE48ED"
                                    fillRule="evenodd"
                                    d="M3.796.6a2.787 2.787 0 01-.248.2c-.149.1-.316.169-.492.204a2.853 2.853 0 01-.316.034c-.4.032-.601.048-.768.107a1.357 1.357 0 00-.828.827c-.059.167-.075.368-.107.768a2.851 2.851 0 01-.034.316A1.36 1.36 0 01.8 3.55a2.787 2.787 0 01-.2.247c-.26.306-.39.46-.467.62-.176.37-.176.8 0 1.17.077.16.207.312.468.618.104.122.156.183.2.248.1.149.168.316.203.492.015.077.022.157.034.316.032.4.048.601.107.768a1.356 1.356 0 00.828.828c.167.059.367.075.768.107.16.012.24.019.316.034.176.035.343.104.492.204.065.043.126.095.248.2.306.26.459.39.619.467.37.176.8.176 1.17 0 .16-.077.313-.207.619-.468.122-.104.183-.156.248-.2.149-.1.316-.168.492-.203.077-.015.157-.022.316-.034.4-.032.601-.048.768-.107a1.356 1.356 0 00.828-.828c.059-.167.075-.367.107-.768.012-.16.019-.24.034-.316.035-.176.104-.343.204-.492.043-.065.095-.126.2-.248.26-.306.39-.459.467-.619.176-.37.176-.8 0-1.17-.077-.16-.207-.313-.468-.619a2.785 2.785 0 01-.2-.247c-.1-.15-.169-.317-.203-.493a2.861 2.861 0 01-.034-.316c-.032-.4-.048-.6-.107-.768a1.356 1.356 0 00-.828-.827c-.167-.06-.367-.075-.768-.107a2.851 2.851 0 01-.316-.034A1.356 1.356 0 016.452.8a2.866 2.866 0 01-.248-.2C5.898.34 5.745.21 5.585.133a1.357 1.357 0 00-1.17 0c-.16.076-.313.207-.619.467zm3.12 2.485a.407.407 0 010 .575L3.66 6.916a.407.407 0 11-.575-.575L6.34 3.086a.407.407 0 01.575 0zm-.017 3.272a.543.543 0 11-1.085 0 .543.543 0 011.085 0zm-3.255-2.17a.542.542 0 100-1.085.542.542 0 000 1.085z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                <Typography
                                  sx={{
                                    color: "#ffff",
                                    textAlign: "start",
                                    fontSize:
                                      576 < width && width < 1200
                                        ? `${width / 62.5}px`
                                        : `18px`,
                                    letterSpacing: "0.7px",
                                    // marginLeft: "0px !important",
                                    minWidth:
                                      device === "Desktop" ||
                                      orientation === "landscape"
                                        ? "100px"
                                        : "none",
                                    fontWeight: "700",
                                  }}
                                >
                                  Free Extra:
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "16px",
                                    color: "white",
                                    fontWeight: "700",
                                  }}
                                >
                                  {detailTournament?.extras?.promo}
                                </Typography>
                                {!detailTournament?.checkInTournament ? (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      marginLeft: "0px !important",
                                      maxWidth: "250px",
                                      color: "#979797",
                                      fontSize: "12px",
                                      textAlign: "left"
                                    }}
                                  >
                                    The highest number of available Extras in the
                                    current Promotion.
                                  </Typography>
                                ) : (
                                  <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    color={"white "}
                                  >
                                    <Box display={"flex"} alignItems={"center"}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="10"
                                        fill="none"
                                        viewBox="0 0 10 10"
                                      >
                                        <path
                                          fill="#BE48ED"
                                          fillRule="evenodd"
                                          d="M3.796.6a2.787 2.787 0 01-.248.2c-.149.1-.316.169-.492.204a2.853 2.853 0 01-.316.034c-.4.032-.601.048-.768.107a1.357 1.357 0 00-.828.827c-.059.167-.075.368-.107.768a2.851 2.851 0 01-.034.316A1.36 1.36 0 01.8 3.55a2.787 2.787 0 01-.2.247c-.26.306-.39.46-.467.62-.176.37-.176.8 0 1.17.077.16.207.312.468.618.104.122.156.183.2.248.1.149.168.316.203.492.015.077.022.157.034.316.032.4.048.601.107.768a1.356 1.356 0 00.828.828c.167.059.367.075.768.107.16.012.24.019.316.034.176.035.343.104.492.204.065.043.126.095.248.2.306.26.459.39.619.467.37.176.8.176 1.17 0 .16-.077.313-.207.619-.468.122-.104.183-.156.248-.2.149-.1.316-.168.492-.203.077-.015.157-.022.316-.034.4-.032.601-.048.768-.107a1.356 1.356 0 00.828-.828c.059-.167.075-.367.107-.768.012-.16.019-.24.034-.316.035-.176.104-.343.204-.492.043-.065.095-.126.2-.248.26-.306.39-.459.467-.619.176-.37.176-.8 0-1.17-.077-.16-.207-.313-.468-.619a2.785 2.785 0 01-.2-.247c-.1-.15-.169-.317-.203-.493a2.861 2.861 0 01-.034-.316c-.032-.4-.048-.6-.107-.768a1.356 1.356 0 00-.828-.827c-.167-.06-.367-.075-.768-.107a2.851 2.851 0 01-.316-.034A1.356 1.356 0 016.452.8a2.866 2.866 0 01-.248-.2C5.898.34 5.745.21 5.585.133a1.357 1.357 0 00-1.17 0c-.16.076-.313.207-.619.467zm3.12 2.485a.407.407 0 010 .575L3.66 6.916a.407.407 0 11-.575-.575L6.34 3.086a.407.407 0 01.575 0zm-.017 3.272a.543.543 0 11-1.085 0 .543.543 0 011.085 0zm-3.255-2.17a.542.542 0 100-1.085.542.542 0 000 1.085z"
                                          clipRule="evenodd"
                                        ></path>
                                      </svg>
                                      <Typography sx={{ fontSize: "12px" }}>
                                        Extra:{" "}
                                      </Typography>
                                      <Typography sx={{ fontSize: "12px" }}>
                                        {detailTournament?.extras?.normal}
                                      </Typography>
                                    </Box>
                                    <Box display={"flex"} alignItems={"center"}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        height="10"
                                        fill="none"
                                        viewBox="0 0 10 10"
                                      >
                                        <path
                                          fill="#BE48ED"
                                          fillRule="evenodd"
                                          d="M3.796.6a2.787 2.787 0 01-.248.2c-.149.1-.316.169-.492.204a2.853 2.853 0 01-.316.034c-.4.032-.601.048-.768.107a1.357 1.357 0 00-.828.827c-.059.167-.075.368-.107.768a2.851 2.851 0 01-.034.316A1.36 1.36 0 01.8 3.55a2.787 2.787 0 01-.2.247c-.26.306-.39.46-.467.62-.176.37-.176.8 0 1.17.077.16.207.312.468.618.104.122.156.183.2.248.1.149.168.316.203.492.015.077.022.157.034.316.032.4.048.601.107.768a1.356 1.356 0 00.828.828c.167.059.367.075.768.107.16.012.24.019.316.034.176.035.343.104.492.204.065.043.126.095.248.2.306.26.459.39.619.467.37.176.8.176 1.17 0 .16-.077.313-.207.619-.468.122-.104.183-.156.248-.2.149-.1.316-.168.492-.203.077-.015.157-.022.316-.034.4-.032.601-.048.768-.107a1.356 1.356 0 00.828-.828c.059-.167.075-.367.107-.768.012-.16.019-.24.034-.316.035-.176.104-.343.204-.492.043-.065.095-.126.2-.248.26-.306.39-.459.467-.619.176-.37.176-.8 0-1.17-.077-.16-.207-.313-.468-.619a2.785 2.785 0 01-.2-.247c-.1-.15-.169-.317-.203-.493a2.861 2.861 0 01-.034-.316c-.032-.4-.048-.6-.107-.768a1.356 1.356 0 00-.828-.827c-.167-.06-.367-.075-.768-.107a2.851 2.851 0 01-.316-.034A1.356 1.356 0 016.452.8a2.866 2.866 0 01-.248-.2C5.898.34 5.745.21 5.585.133a1.357 1.357 0 00-1.17 0c-.16.076-.313.207-.619.467zm3.39 3.332a.407.407 0 00-.574-.575L4.186 5.782l-.798-.798a.407.407 0 00-.575.575l1.085 1.085a.407.407 0 00.575 0l2.714-2.712z"
                                          clipRule="evenodd"
                                        ></path>
                                      </svg>
                                      <Typography sx={{ fontSize: "12px" }}>
                                        Promotion Extra:{" "}
                                      </Typography>
                                      <Typography sx={{ fontSize: "12px" }}>
                                        {detailTournament?.extras?.promo}
                                      </Typography>
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Box> */}
                          <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="none"
                              viewBox="0 0 10 10"
                            >
                              <path
                                fill="#BE48ED"
                                fillRule="evenodd"
                                d="M3.796.6a2.787 2.787 0 01-.248.2c-.149.1-.316.169-.492.204a2.853 2.853 0 01-.316.034c-.4.032-.601.048-.768.107a1.357 1.357 0 00-.828.827c-.059.167-.075.368-.107.768a2.851 2.851 0 01-.034.316A1.36 1.36 0 01.8 3.55a2.787 2.787 0 01-.2.247c-.26.306-.39.46-.467.62-.176.37-.176.8 0 1.17.077.16.207.312.468.618.104.122.156.183.2.248.1.149.168.316.203.492.015.077.022.157.034.316.032.4.048.601.107.768a1.356 1.356 0 00.828.828c.167.059.367.075.768.107.16.012.24.019.316.034.176.035.343.104.492.204.065.043.126.095.248.2.306.26.459.39.619.467.37.176.8.176 1.17 0 .16-.077.313-.207.619-.468.122-.104.183-.156.248-.2.149-.1.316-.168.492-.203.077-.015.157-.022.316-.034.4-.032.601-.048.768-.107a1.356 1.356 0 00.828-.828c.059-.167.075-.367.107-.768.012-.16.019-.24.034-.316.035-.176.104-.343.204-.492.043-.065.095-.126.2-.248.26-.306.39-.459.467-.619.176-.37.176-.8 0-1.17-.077-.16-.207-.313-.468-.619a2.785 2.785 0 01-.2-.247c-.1-.15-.169-.317-.203-.493a2.861 2.861 0 01-.034-.316c-.032-.4-.048-.6-.107-.768a1.356 1.356 0 00-.828-.827c-.167-.06-.367-.075-.768-.107a2.851 2.851 0 01-.316-.034A1.356 1.356 0 016.452.8a2.866 2.866 0 01-.248-.2C5.898.34 5.745.21 5.585.133a1.357 1.357 0 00-1.17 0c-.16.076-.313.207-.619.467zm3.39 3.332a.407.407 0 00-.574-.575L4.186 5.782l-.798-.798a.407.407 0 00-.575.575l1.085 1.085a.407.407 0 00.575 0l2.714-2.712z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <Typography
                              sx={{
                                fontSize: "18px",
                                color: "white",
                                fontWeight: "700",
                              }}
                            >
                              {detailTournament?.extras?.normal}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {width && (
                    <Box display={"flex"}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          sx={{
                            width: "1px",
                            height: "100%",
                            background: "rgba(151, 151, 151, 0.40)",
                            margin: "0px 25px",
                          }}
                        ></Box>
                        <Box>
                          <Box display={"flex"} alignItems={"center"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="22"
                              fill="none"
                              viewBox="0 0 23 22"
                            >
                              <g>
                                <g fill="#BE48ED">
                                  <path d="M22.842 6.608v11.119c0 2.463-1.39 3.869-3.822 3.872-4.772.005-9.544.005-14.316 0-2.408-.002-3.812-1.4-3.82-3.81-.01-3.52-.002-7.038-.001-10.556 0-.197.02-.395.033-.625h21.926zM8.484 18.015c-.035.387.215.566.64.353a40.96 40.96 0 002.197-1.16c.375-.214.688-.233 1.068-.012.68.394 1.381.756 2.088 1.099.175.086.468.158.587.072.119-.087.147-.39.121-.585-.113-.782-.256-1.56-.398-2.338-.075-.408 0-.732.331-1.025.549-.481 1.067-.998 1.567-1.53.176-.186.26-.46.386-.694-.25-.101-.493-.244-.753-.294-.753-.138-1.519-.211-2.267-.366a1.031 1.031 0 01-.62-.453c-.403-.725-.736-1.489-1.12-2.224-.095-.18-.285-.42-.44-.426-.153-.006-.351.233-.445.41-.377.717-.691 1.464-1.092 2.17-.157.26-.407.45-.698.532-.787.17-1.595.235-2.388.38-.212.037-.47.164-.573.332-.057.094.13.394.27.54.518.54 1.043 1.08 1.61 1.568.393.34.465.711.37 1.187-.158.796-.286 1.598-.44 2.464z"></path>
                                  <path d="M.907 5.878c-.015-1.48-.254-2.958.849-4.19C2.433.93 3.383.498 4.426.602c-.148.409-.213.824-.409 1.153-.594 1.033-.43 2.264.472 3.033a2.297 2.297 0 003-.056c.83-.739.971-2.022.385-3.006-.189-.317-.235-.72-.383-1.205h2.802c-.134.47-.174.888-.364 1.22-.6 1.055-.44 2.266.46 3.035a2.267 2.267 0 002.949 0c.88-.758 1.052-1.953.478-2.982-.19-.344-.26-.759-.413-1.229h2.79c-.12.419-.157.839-.35 1.166-.58.976-.441 2.269.389 3.004a2.298 2.298 0 003 .054c.896-.765 1.068-2.007.466-3.032-.19-.325-.264-.72-.395-1.099 2.268-.554 4.058 2.252 3.453 5.216l-21.85.004z"></path>
                                  <path d="M5.82 4.199c-.988-.007-1.64-1.097-1.09-1.938.291-.444.307-.87.322-1.347.02-.697.576-1.126 1.087-.806.217.135.395.474.432.745.07.498.043.953.368 1.428.559.82-.134 1.925-1.12 1.918z"></path>
                                  <path d="M11.817 4.199c-.988-.007-1.638-1.097-1.089-1.938.292-.444.307-.87.322-1.347.02-.697.576-1.126 1.088-.806.217.135.395.474.432.745.069.498.044.953.368 1.428.558.82-.135 1.925-1.12 1.918z"></path>
                                  <path d="M17.819 4.199c-.988-.007-1.64-1.097-1.09-1.938.292-.444.307-.87.32-1.347.022-.697.577-1.126 1.09-.806.217.135.389.474.432.745.069.498.043.953.368 1.428.557.82-.135 1.925-1.12 1.918z"></path>
                                </g>
                              </g>
                            </svg>
                            <Typography
                              sx={{
                                color: "#ffff",
                                textAlign: "start",
                                fontSize:
                                  576 < width && width < 1200
                                    ? `${width / 62.5}px`
                                    : `20px`,
                                letterSpacing: "0.7px",
                                // marginLeft: "0px !important",
                                fontWeight: "700",
                              }}
                            >
                              Start
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              color: "#fff",
                              textAlign: "start",
                              // fontSize:
                              //   576 < width && width < 1200
                              //     ? `${width / 76}px`
                              //     : "14px",
                              // fontWeight: "500 !important",
                              // marginLeft: "0px !important",
                            }}
                          >
                            {fetchT ? (
                              <Skeleton
                                variant="text"
                                sx={{ bgcolor: "rgba(255,255,255,0.5)" }}
                              />
                            ) : (
                              <Box display={"flex"} alignItems={"baseline"}>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    marginLeft: "0px !important",
                                    textAlign: "left",
                                  }}
                                >
                                  {moment(
                                    detailTournament?.tournamentStartAt ||
                                      new Date()
                                  )?.format("MM/DD/YYYY")}
                                </Typography>
                                <Typography>-</Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    // marginLeft: "0px !important",
                                    textAlign: "left",
                                  }}
                                >
                                  {moment(
                                    detailTournament?.tournamentStartAt ||
                                      new Date()
                                  )?.format("HH:mm")}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {width && (
                    <Box display={"flex"}>
                      <Box sx={{ display: "flex" }}>
                        <Box
                          sx={{
                            width: "1px",
                            height: "100%",
                            background: "rgba(151, 151, 151, 0.40)",
                            margin: "0px 25px",
                          }}
                        ></Box>
                        <Box>
                          <Box display={"flex"} alignItems={"center"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="23"
                              fill="none"
                              viewBox="0 0 23 23"
                            >
                              <g fill="#BE48ED">
                                <path d="M.72 5.858C.704 4.42.465 2.982 1.567 1.785 2.245 1.05 3.195.628 4.238.73c-.147.397-.213.8-.408 1.12-.595 1.004-.43 2.201.472 2.949.424.342.96.525 1.51.515a2.335 2.335 0 001.49-.57c.829-.718.97-1.966.385-2.922-.19-.308-.235-.7-.383-1.17h2.8c-.133.455-.173.862-.363 1.186-.6 1.025-.44 2.201.46 2.949.411.342.934.53 1.474.53.541 0 1.064-.188 1.475-.53.881-.737 1.052-1.898.478-2.898-.19-.335-.26-.738-.412-1.195h2.79c-.121.407-.158.815-.35 1.133-.582.95-.442 2.205.388 2.92a2.338 2.338 0 003 .052c.897-.743 1.068-1.95.466-2.947-.19-.316-.263-.699-.394-1.068 2.268-.538 4.057 2.189 3.453 5.07l-21.85.004z"></path>
                                <path d="M5.85 4.556c-.98-.008-1.625-1.19-1.081-2.103.29-.482.305-.945.32-1.46.02-.758.57-1.223 1.079-.876.215.147.39.515.428.808.069.541.043 1.034.365 1.55.554.889-.133 2.088-1.111 2.08z"></path>
                                <path d="M11.674 4.556c-.98-.008-1.625-1.19-1.08-2.103.29-.482.304-.945.318-1.46.02-.758.572-1.223 1.08-.876.215.147.391.515.428.808.069.541.044 1.034.365 1.55.554.889-.133 2.088-1.111 2.08z"></path>
                                <path d="M17.497 4.556c-.98-.008-1.626-1.19-1.081-2.103.29-.482.305-.945.319-1.46.02-.758.571-1.223 1.08-.876.215.147.386.515.428.808.069.541.043 1.034.365 1.55.553.889-.133 2.088-1.11 2.08z"></path>
                                <path
                                  fillRule="evenodd"
                                  d="M22.687 6.508v11.583c0 2.565-1.391 4.03-3.828 4.034-4.78.005-9.56.005-14.34 0-2.412-.003-3.82-1.459-3.827-3.97-.007-2.701-.005-5.402-.003-8.102l.002-2.894c0-.136.01-.271.019-.416l.014-.235h21.963zM3.922 11.084c0-1.09.883-1.973 1.973-1.973h11.747a1.973 1.973 0 010 3.946H5.895a1.973 1.973 0 01-1.973-1.973zm1.973 3.946a1.973 1.973 0 000 3.946h11.747a1.973 1.973 0 000-3.946H5.895z"
                                  clipRule="evenodd"
                                ></path>
                              </g>
                            </svg>
                            <Typography
                              sx={{
                                color: "#ffff",
                                textAlign: "start",
                                fontSize:
                                  576 < width && width < 1200
                                    ? `${width / 62.5}px`
                                    : "18px",
                                letterSpacing: "0.7px",
                                // marginLeft: "0px !important",
                                fontWeight: "700",
                              }}
                            >
                              End
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              color: "#fff",
                              textAlign: "start",
                              fontSize:
                                576 < width && width < 1200
                                  ? `${width / 76}px`
                                  : "14px",
                              fontWeight: "500 !important",
                              marginLeft: "0px !important",
                            }}
                          >
                            {fetchT ? (
                              <Skeleton
                                variant="text"
                                sx={{ bgcolor: "rgba(255,255,255,0.5)" }}
                              />
                            ) : (
                              <Box display={"flex"} alignItems={"baseline"}>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    marginLeft: "0px !important",
                                    textAlign: "left",
                                  }}
                                >
                                  {moment(
                                    detailTournament?.tournamentEndAt ||
                                      new Date()
                                  )?.format("MM/DD/YYYY")}
                                </Typography>
                                <Typography>-</Typography>
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    // marginLeft: "0px !important",
                                    textAlign: "left",
                                  }}
                                >
                                  {moment(
                                    detailTournament?.tournamentEndAt ||
                                      new Date()
                                  )?.format("HH:mm")}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {width && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: width < 1200 ? "column" : "",
                      }}
                    >
                      <Box
                        sx={{
                          width: "1px",
                          height: "100%",
                          background: "rgba(151, 151, 151, 0.40)",
                          margin: "0px 25px",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          marginRight: `${
                            device === "Desktop" || orientation === "landscape"
                              ? parseFloat(width / 75)
                              : parseFloat(width / 20)
                          }px`,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize:
                              576 < width && width < 1200
                                ? `${width / 62.5}px`
                                : "18px",
                            letterSpacing: "0.7px",
                            // marginLeft: "0px !important",
                            fontWeight: "700",
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
                            (parseFloat(width / 42.67) +
                              parseFloat(width / 384)) *
                            minLength
                          }px`,
                          height: "34px",
                        }}
                      >
                        {detailTournament?.tournamentParticipants?.map(
                          (item, index) => {
                            return detailTournament?.tournamentParticipants
                              ?.length > 5 ? (
                              width > 1200 && index < 5 ? (
                                index === 0 ? (
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
                                            ? process.env
                                                .REACT_APP_SOCKET_SERVER +
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
                                            detailTournament
                                              ?.tournamentParticipants.length >
                                            5
                                              ? "white"
                                              : "none",
                                          fontSize: "10px",
                                        }}
                                      >
                                        {detailTournament
                                          ?.tournamentParticipants?.length >
                                          5 &&
                                          `+${
                                            detailTournament
                                              ?.tournamentParticipants?.length -
                                            5
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
                                          ? process.env
                                              .REACT_APP_SOCKET_SERVER +
                                            "/" +
                                            item?.userAccount?.accountAvatar
                                          : images.undefinedAvatar
                                      }
                                      sx={{
                                        width: "100%",
                                        height: "100%",
                                        flexDirection: "column",
                                        borderRadius: "50%",
                                      }}
                                    ></Box>
                                  </Box>
                                )
                              ) : (
                                width > 576 &&
                                index < 4 &&
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
                                            ? process.env
                                                .REACT_APP_SOCKET_SERVER +
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
                                            detailTournament
                                              ?.tournamentParticipants.length >
                                            5
                                              ? "white"
                                              : "none",
                                          fontSize: "10px",
                                        }}
                                      >
                                        {detailTournament
                                          ?.tournamentParticipants?.length >
                                          5 &&
                                          `+${
                                            detailTournament
                                              ?.tournamentParticipants?.length -
                                            5
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
                                          ? process.env
                                              .REACT_APP_SOCKET_SERVER +
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
                              )
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
                  )}
                </Box>
              )}
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
                  {detailTournament?.tournamentVip !== 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="19"
                        fill="none"
                        viewBox="0 0 28 19"
                      >
                        <path
                          fill="#FB3"
                          d="M8.008 9.056c.317-.533.608-1.014.892-1.5 1.31-2.225 2.616-4.452 3.92-6.68.26-.445.51-.883 1.143-.876.632.008.87.46 1.129.9 1.463 2.5 2.928 5.001 4.397 7.502.115.197.239.391.39.642.202-.083.396-.155.58-.241 1.77-.821 3.54-1.64 5.304-2.473.456-.216.9-.331 1.338-.011.47.342.444.81.327 1.304a9061.53 9061.53 0 00-2.41 10.264c-.205.875-.497 1.113-1.429 1.113H4.23c-.873 0-1.143-.195-1.338-1.035C2.089 14.479 1.28 10.993.518 7.502c-.075-.348.094-.836.326-1.126.306-.375.803-.29 1.25-.08 1.939.912 3.884 1.813 5.914 2.76z"
                        ></path>
                      </svg>
                      <Typography
                        sx={{
                          color: "#FFBB33",
                        }}
                      >
                        VIP Promotion
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
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
                              textAlign: "left",
                            }}
                          >
                            {detailTournament?.tournamentName?.length > 30
                              ? detailTournament?.tournamentName
                              : detailTournament?.tournamentName}
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
                        height={"auto"}
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
                          height: "auto",
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
                            <Typography
                              style={{
                                color: "#BE48ED",
                                fontSize: "20.27px",
                                // maxHeight: "24px",
                                // overflow: "hidden",
                                // textOverflow: "ellipsis",
                                // whiteSpace: "nowrap",
                                textAlign: "start",
                              }}
                            >
                              {" "}
                              {detailTournament?.tournamentInfors?.rewardInfors
                                ?.rewardTitle || "SS Z-Flip 5 free voucher"}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              // justifyContent: "space-between",
                              marginTop: "8px",
                            }}
                          >
                            <Box>
                              <Box>
                                {" "}
                                <Typography
                                  style={{
                                    fontSize: "10px",
                                    marginBottom: "0px !important",
                                    color: "#525252",
                                    textAlign: "start",
                                  }}
                                >
                                  Recipient
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize:
                                      576 < width && width < 1200
                                        ? "12px"
                                        : "14px",
                                    textAlign: "start",
                                  }}
                                >
                                  {sliceString(
                                    detailTournament?.tournamentInfors
                                      ?.rewardInfors?.rewardRecipient
                                  ) || "Recipient"}
                                </Typography>
                              </Box>
                              <Box sx={{ marginTop: "7.6px" }}>
                                {" "}
                                <Typography
                                  style={{
                                    fontSize: "10px",
                                    marginBottom: "0px !important",
                                    color: "#525252",
                                    textAlign: "start",
                                  }}
                                >
                                  Sponsored by
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize:
                                      576 < width && width < 1200
                                        ? "12px"
                                        : "14px",
                                    textAlign: "start",
                                  }}
                                >
                                  {detailTournament?.tournamentInfors?.owner
                                    ?.brandName || "Samsung"}
                                </Typography>
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
                                <Typography
                                  style={{
                                    fontSize: "10px",
                                    marginBottom: "0px !important",
                                    color: "#525252",
                                    textAlign: "start",
                                  }}
                                >
                                  Valid by
                                </Typography>
                                <Typography
                                  style={{
                                    fontSize:
                                      576 < width && width < 1200
                                        ? "12px"
                                        : "14px",
                                    textAlign: "start",
                                  }}
                                >
                                  {moment(
                                    detailTournament?.tournamentInfors
                                      ?.rewardInfors?.rewardValidityDate
                                  )?.format("MMM-DD-YYYY") || "Nov-10-2023"}
                                </Typography>
                              </Box>
                              <Box sx={{ marginTop: "7.6px" }}>
                                {" "}
                                <Typography
                                  style={{
                                    fontSize: "10px",
                                    marginBottom: "0px !important",
                                    color: "#525252",
                                    textAlign: "start",
                                  }}
                                >
                                  Conditions
                                </Typography>
                                <Typography
                                  className="cursor-pointer"
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
                                    textAlign: "start",
                                  }}
                                >
                                  See more
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: "35%",
                            height: "auto",
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
                    Game for promotion
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
                {width && (
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
                )}
              </Box>
            </Box>
            <BuyTicket
              tournamentId={detailTournament?.id}
              bought={detailTournament?.bought}
              id={id}
              dataTime={detailTournament?.tournamentEndAt}
              nameTour={detailTournament?.tournamentName}
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
            {/* <GamePreview /> */}
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
              nameTour={detailTournament?.tournamentName}
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
    </>
  );
}
