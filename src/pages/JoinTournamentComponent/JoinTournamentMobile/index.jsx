import {
  Box,
  // CssBaseline,
  Dialog,
  // Grid,
  // ThemeProvider,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { images } from "../../../utils/images";
import "./index.scss";
// import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
import InfinityIcon from "@mui/icons-material/AllInclusive";
import { toast } from "react-toastify";
import AnimButton from "../../../components/AnimButton";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import PageLoading from "../../../components/LoadingComponent/PageLoading/PageLoading";
import {
  toggleLoginDialog,
  toggleShareTour,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleBuyTicket } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import {
  isJson,
  sliceString
} from "../../../utils/helper";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import DetailVoucher from "../DetailVoucher";
import GameInTournament from "../GameInTournament";
import LeaderBoard from "../LeaderBoard/index";
// import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function JoinTournamentMobile({ handleOnClickStartGame }) {
  const [detailTournament, setDetailTournament] = useState({});
  const { biggestEndTour } = useSelector((state) => state.tournamentReducer);
  const [fetchT, setFetchT] = useState(true);
  const [socket, setSocket] = useState(null);
  const [currentResult, setCurrentResult] = useState(false);
  const [rewardPopup, setRewardPopup] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const { id } = useParams();
  const { width } = useWindowDimensions();
  const { token } = useSelector((state) => state.authReducer);
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "lighter !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  useEffect(() => {
    setSocket(_socket);
  }, []);
  
  useEffect(() => {
    socket?.emit("detailTournament", {
      tournamentId: id,
    });
  }, [socket, id]);

  useEffect(() => {
    if(token) {
      socket?.emit("detailTournament", {
        tournamentId: id,
      });
    }
  }, [socket, id, token]);

  const handlePlayTour = () => {
    socket?.emit("startGameInTournament", {
      tournamentId: id,
    });
  };

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
      // setTimeout(() => {
      //   socket?.emit("detailTournament", {
      //     tournamentId: data?.id,
      //   });
      // }, 1000);
      // window.location.reload();
      if (token) {
        socket?.emit("detailTournament", {
          tournamentId: id,
        });
      }
    });
    return () => {
      socket?.off("joinTournamentSuccess");
    };
  }, [socket, token, id]);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(toggleBuyTicket(true));
  };
  const navigate = useNavigate();
  let anchorSelector = 'a[href^="#"]';

  // Collect all such anchor links
  let anchorList = document.querySelectorAll(anchorSelector);

  // Iterate through each of the links
  anchorList.forEach((link) => {
    link.onclick = function (e) {
      // Prevent scrolling if the
      // hash value is blank
      e.preventDefault();

      // Get the destination to scroll to
      // using the hash property
      let destination = document.querySelector(this.hash);

      // Scroll to the destination using
      // scrollIntoView method
      destination.scrollIntoView({
        behavior: "smooth",
      });
    };
  });
  return (
    <>
      {fetchT ? (
        <PageLoading />
      ) : (
        <>
          <Dialog sx={{ zIndex: "1310" }} open={true} fullScreen={true}>
            <Box
              sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "#211D28",
              }}
            >
              <Box
                onClick={() => navigate("/home")}
                sx={{
                  height: "40px",
                  backgroundColor: "#42285B",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  boxSizing: "border-box",
                  padding: "0px 12px",
                }}
              >
                <Box
                  component={"img"}
                  sx={{ width: "13px", height: "13px" }}
                  src={images.BackButtonLobby}
                ></Box>
                <Typography
                  sx={{
                    color: "#ffff",
                    textAlign: "start",
                    fontSize: "14px",
                  }}
                >
                  Tournament
                </Typography>
              </Box>
              {/* BackgroundMobile */}
              {detailTournament?.tournamentStatus === 2 ? (
                // <BannerWinMobile
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
                    backgroundImage: `url("${
                      detailTournament?.tournamentBackgroundMobile
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          detailTournament?.tournamentBackgroundMobile
                        : images.DoubleDragonMobile
                    }")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: "250px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    padding: "0px 28px",
                  }}
                >
                  {/* {detailTournament?.tournamentStatus === 2 && <BgEndGame />} */}
                  <Box
                    component={"div"}
                    className="position-absolute d-flex ps-2 pe-2 pt-2 pb-2 rounded text-white"
                    sx={{
                      color: "#fff",
                      right: 10,
                      top: 50,
                      background: "#8A3AF1",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="18"
                      fill="none"
                      viewBox="0 0 20 18"
                      onClick={() => {
                        dispatch(toggleShareTour());
                      }}
                    >
                      <g fill="#fff">
                        <path d="M12.609 3.375c.056-.843.088-1.649.177-2.449.032-.269.146-.52.328-.72.226-.234.542-.171.815.004a18.216 18.216 0 015.336 5.264.7.7 0 01-.006.634c-1.413 2.1-3.165 3.867-5.304 5.234-.583.372-1.125.088-1.177-.618a72.832 72.832 0 01-.15-2.512c-.012-.285-.12-.373-.387-.405-2.22-.265-4.186.72-5.3 2.674-.265.46-.499.938-.795 1.373a.662.662 0 01-.537.243c-.136-.02-.341-.285-.334-.433.055-1.247.005-2.523.265-3.729.576-2.623 2.973-4.477 5.653-4.56.46-.012.916 0 1.416 0z"></path>
                        <path d="M.678 8.994c0-1.702.058-3.438.25-5.148C1.133 2.03 2.705.52 4.532.396c2.084-.14 4.173-.193 6.26-.265.559-.02.6.05.573.618 0 .089-.015.177-.01.265.02.388-.134.541-.546.542-1.457.005-2.914.035-4.37.088a18.08 18.08 0 00-1.89.177c-1.226.163-2.126 1.16-2.277 2.51a41.821 41.821 0 000 9.383c.165 1.457 1.086 2.394 2.544 2.552 3.106.337 6.24.337 9.345 0 1.46-.157 2.385-1.085 2.556-2.539.093-.789.154-1.582.192-2.375.016-.335.103-.588.37-.801.24-.192.44-.429.676-.633.092-.06.192-.11.297-.145.045.114.132.231.127.342a130.22 130.22 0 01-.177 2.996 9.28 9.28 0 01-.177 1.355c-.39 1.75-1.752 2.976-3.669 3.196a41.42 41.42 0 01-9.778-.01C2.436 17.389 1.08 15.93.854 13.756c-.073-.706-.15-1.406-.176-2.11C.648 10.76.67 9.877.67 8.994h.007z"></path>
                      </g>
                    </svg>
                  </Box>
                </Box>
              )}
              <Box
                component={"div"}
                className="mb-2 text-center text-white"
                sx={{ marginTop: "20px" }}
              >
                <Typography sx={{ fontSize: "20px" }}>
                  {detailTournament?.tournamentName?.length > 30
                    ? detailTournament?.tournamentName
                    : detailTournament?.tournamentName}
                </Typography>
              </Box>
              {detailTournament?.tournamentStatus === 2 ? (
                <Box
                  sx={{
                    fontWeight: "500 !important",
                    fontSize: "12px",
                    color: "#7C81F2",
                    fontWeight: "700",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${images.bannerendmobile})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      width: "100%",
                      height: "250px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box
                      className="text-center"
                      sx={{
                        wordWrap: "break-word",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        textShadow: "#F25957 2px 4px 5px",
                        paddingBottom: "10px",
                      }}
                    >
                      THIS PROMOTION HAS ENDED! CONGRATS WINNER:{" "}
                      <span
                        style={{
                          color: "#FFDF4A",
                          fontWeight: "700",
                          fontSize: "22px",
                        }}
                      >
                        {biggestEndTour?.bestUser?.userNickName || "super_"}
                      </span>
                    </Box>
                  </Box>
                </Box>
              ) : (
                ""
              )}
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginTop: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "35%",
                  }}
                >
                  <Typography
                    sx={{
                      ...typographyStyle,
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Start
                  </Typography>
                  <Typography sx={{ ...typographyStyle, fontSize: "12px" }}>
                  {moment(
                      detailTournament?.tournamentStartAt ||
                        new Date()
                    )?.format("MM/DD/YYYY")}
                  </Typography>
                  <Typography sx={{ ...typographyStyle, fontSize: "12px" }}>
                    {moment(
                      detailTournament?.tournamentStartAt ||
                        new Date()
                    )?.format("HH:mm a")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "rgba(151, 151, 151, 0.40)",
                  }}
                ></Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "35%",
                  }}
                  className="ps-3"

                >
                  <Typography
                    sx={{
                      ...typographyStyle,
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    End
                  </Typography>
                  <Typography sx={{ ...typographyStyle, fontSize: "12px" }}>
                  {moment(
                      detailTournament?.tournamentEndAt ||
                        new Date()
                    )?.format("MM/DD/YYYY")}
                  </Typography>
                  <Typography sx={{ ...typographyStyle, fontSize: "12px" }}>
                  {moment(
                      detailTournament?.tournamentEndAt ||
                        new Date()
                    )?.format("HH:mm a")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "rgba(151, 151, 151, 0.40)",
                  }}
                ></Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "20%",
                  }}
                  className="ps-3"
                >
                  <Typography
                    sx={{
                      ...typographyStyle,
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    Played
                  </Typography>
                  <Typography sx={{ ...typographyStyle, fontSize: "12px" }}>
                    {detailTournament?.currentPlayed || 0}
                  </Typography>
                  <Typography
                      sx={{
                        fontSize: "12px",
                        marginLeft: "0px !important",
                        textAlign: "left"
                      }}
                      className="text-white"
                    >
                      {"-"}
                    </Typography>
                </Box>
              </Box>
              <Box
                component={"div"}
                className="d-flex flex-column"
                sx={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  marginTop: "32px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      marginLeft: "0px !important",
                      fontWeight: "700",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    Maximum Extra
                  </Typography>
                  {!detailTournament?.checkInTournament ? (
                    ""
                  ) : (
                    <Typography sx={{ marginLeft: "0px !important", color:"white" }}>
                      : {detailTournament?.boughtToday}/
                      {detailTournament?.maxPlay}
                    </Typography>
                  )}
                </Box>
                <Box color={"white"}>
                  {!detailTournament?.checkInTournament ? (
                    <Typography
                      sx={{ marginLeft: "0px !important", fontSize: "12px" }}
                    >
                      The highest number of available Extras in the current
                      Promotion.
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
                        <Typography>Extra: </Typography>
                        <Typography>
                          {detailTournament?.extras?.normal}
                        </Typography>
                      </Box>
                      <Box display={"flex"} alignItems={"center"}>
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
                            d="M3.796.6a2.787 2.787 0 01-.248.2c-.149.1-.316.169-.492.204a2.853 2.853 0 01-.316.034c-.4.032-.601.048-.768.107a1.357 1.357 0 00-.828.827c-.059.167-.075.368-.107.768a2.851 2.851 0 01-.034.316A1.36 1.36 0 01.8 3.55a2.787 2.787 0 01-.2.247c-.26.306-.39.46-.467.62-.176.37-.176.8 0 1.17.077.16.207.312.468.618.104.122.156.183.2.248.1.149.168.316.203.492.015.077.022.157.034.316.032.4.048.601.107.768a1.356 1.356 0 00.828.828c.167.059.367.075.768.107.16.012.24.019.316.034.176.035.343.104.492.204.065.043.126.095.248.2.306.26.459.39.619.467.37.176.8.176 1.17 0 .16-.077.313-.207.619-.468.122-.104.183-.156.248-.2.149-.1.316-.168.492-.203.077-.015.157-.022.316-.034.4-.032.601-.048.768-.107a1.356 1.356 0 00.828-.828c.059-.167.075-.367.107-.768.012-.16.019-.24.034-.316.035-.176.104-.343.204-.492.043-.065.095-.126.2-.248.26-.306.39-.459.467-.619.176-.37.176-.8 0-1.17-.077-.16-.207-.313-.468-.619a2.785 2.785 0 01-.2-.247c-.1-.15-.169-.317-.203-.493a2.861 2.861 0 01-.034-.316c-.032-.4-.048-.6-.107-.768a1.356 1.356 0 00-.828-.827c-.167-.06-.367-.075-.768-.107a2.851 2.851 0 01-.316-.034A1.356 1.356 0 016.452.8a2.866 2.866 0 01-.248-.2C5.898.34 5.745.21 5.585.133a1.357 1.357 0 00-1.17 0c-.16.076-.313.207-.619.467zm3.39 3.332a.407.407 0 00-.574-.575L4.186 5.782l-.798-.798a.407.407 0 00-.575.575l1.085 1.085a.407.407 0 00.575 0l2.714-2.712z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <Typography>Promotion Extra: </Typography>
                        <Typography>
                          {detailTournament?.extras?.promo}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box className="d-flex p-2 ps-3 pe-3" sx={{ marginTop: "16px" }}>
                <Box
                  sx={{
                    bgcolor: "white",
                    width: "100%",
                    height: "116px",
                    marginTop: "16px",
                    display: "flex",
                    borderRadius: "8px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Box
                    sx={{
                      width: "64.8%",
                      height: "100%",
                      borderRadius: "1px 0px 0px 8px",
                      padding: "12px 10px",
                    }}
                  >
                    <Box>
                      <Typography variant="h5"
                        style={{
                          color: "#BE48ED",
                          fontSize: "16px",
                          maxHeight: "24px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          fontWeight:"700"
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
                        justifyContent: "space-between",
                        marginTop: "4px",
                      }}
                    >
                      <Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          {" "}
                          <Typography
                            style={{
                              fontSize: "10px",
                              marginBottom: "0px !important",
                              color: "#525252",
                            }}
                          >
                            Recipient
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {sliceString(
                              detailTournament?.tournamentInfors?.rewardInfors
                                ?.rewardRecipient
                            ) || "Recipient"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "6px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {" "}
                          <Typography
                            style={{
                              fontSize: "10px",
                              marginBottom: "0px !important",
                              color: "#525252",
                            }}
                          >
                            Sponsored by
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {detailTournament?.tournamentInfors?.owner
                              ?.brandName || "Samsung"}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        {" "}
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          {" "}
                          <Typography
                            style={{
                              fontSize: "10px",
                              marginBottom: "0px !important",
                              color: "#525252",
                            }}
                          >
                            Valid by
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            {moment(
                              detailTournament?.tournamentInfors?.rewardInfors
                                ?.rewardValidityDate
                            )?.format("MMM-DD-YYYY") || "Nov-10-2023"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "6px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {" "}
                          <Typography
                            style={{
                              fontSize: "10px",
                              marginBottom: "0px !important",
                              color: "#525252",
                            }}
                          >
                            Conditions
                          </Typography>
                          <Typography
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenVoucher(true);
                            }}
                            style={{
                              color: "#0096FF",
                              fontSize: "12px",
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
                      width: "35.2%",
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
                        borderRadius: "8px",
                        position: "relative",
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
                          borderRadius: "10px",
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
              <Box sx={{ marginTop: "32px" }}>
                <GameInTournament
                  game={
                    detailTournament?.tournamentInfors?.skin?.skinGame || null
                  }
                />
              </Box>
              <Box sx={{ padding: "28px 28px 0px 28px" }}>
                <a
                  href="#GamePreview"
                  style={{
                    width: "100%",
                    padding: "8px 0px",
                    backgroundColor: "#AB3FEF",
                    fontSize: `${width / 26}px`,
                    borderRadius: "8px",
                    color: "#ffff",
                    border: "none",
                    outline: "none",
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Game Tutorial
                </a>
              </Box>
              <Box sx={{ padding: "28px 28px 0px 28px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    sx={{
                      textAlign: "start",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500 !important",
                    }}
                  >
                    Participants
                  </Typography>
                  <Typography
                    sx={{
                      color: "#BE48ED",
                      fontWeight: "600 !important",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#2E233D",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {detailTournament?.tournamentParticipants?.length}/
                    {detailTournament?.tournamentQuantity > 0 ? (
                      detailTournament?.tournamentQuantity
                    ) : (
                      <InfinityIcon
                        sx={{
                          width: 12,
                          height: 12,
                        }}
                      />
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="17"
                      fill="none"
                      viewBox="0 0 16 17"
                    >
                      <g>
                        <path
                          fill="#BE48ED"
                          d="M8 1.583A3.17 3.17 0 004.833 4.75c0 1.713 1.34 3.1 3.087 3.16a.538.538 0 01.147 0h.046a3.159 3.159 0 003.054-3.16A3.17 3.17 0 008 1.583zm3.387 8.1c-1.86-1.24-4.894-1.24-6.767 0-.847.566-1.313 1.333-1.313 2.153 0 .82.466 1.58 1.306 2.14.934.626 2.16.94 3.387.94 1.227 0 2.453-.314 3.387-.94.84-.567 1.306-1.327 1.306-2.154-.006-.82-.466-1.58-1.306-2.14z"
                        ></path>
                      </g>
                    </svg>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "36px",
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                    marginTop: "5px",
                  }}
                >
                  {detailTournament?.tournamentParticipants?.map(
                    (item, index) => {
                      return detailTournament?.tournamentParticipants?.length <=
                        5 ? (
                        <Box
                          key={index}
                          sx={{
                            padding: "3px",
                            backgroundColor: "#211D28",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            position: "absolute",
                            top: "0px",
                            left: `${index * 25}px`,
                            // zIndex: `${
                            //   detailTournament?.tournamentParticipants?.length - index
                            // }`,
                            zIndex: 0,
                          }}
                        >
                          <Box
                            component={"img"}
                            sx={{
                              borderRadius: "50%",
                              width: "100%",
                              height: "100%",
                            }}
                            src={
                              item?.userAccount?.accountAvatar
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  item?.userAccount?.accountAvatar
                                : images.undefinedAvatar
                            }
                          ></Box>
                        </Box>
                      ) : (
                        index < 5 &&
                          (index === 0 ? (
                            <Box
                              key={index}
                              sx={{
                                width: "36px",
                                height: "36px",
                                backgroundColor: "#211D28",
                                borderRadius: "50%",
                                boxSizing: "border-box",
                                padding: "3px",
                                position: "absolute",
                                left: `${index * 25}px`,
                                top: "0px",
                                // zIndex: `${
                                //   detailTournament?.tournamentParticipants?.length -
                                //   index
                                // }`,
                                zIndex: 0,
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
                                    zIndex: 0,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      textAlign: "start",
                                      color: "#fff",
                                      fontSize: "12px",
                                      fontWeight: "200 !important",
                                      marginLeft: "1px !important",
                                    }}
                                  >
                                    {detailTournament?.tournamentParticipants
                                      ?.length > 5 &&
                                      `+${
                                        detailTournament?.tournamentParticipants
                                          ?.length - 5
                                      }`}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              key={index}
                              sx={{
                                padding: "3px",
                                backgroundColor: "#211D28",
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                position: "absolute",
                                top: "0px",
                                left: `${index * 25}px`,
                                // zIndex: `${
                                //   detailTournament?.tournamentParticipants?.length -
                                //   index
                                // }`,
                                zIndex: 0,
                              }}
                            >
                              <Box
                                component={"img"}
                                sx={{
                                  borderRadius: "50%",
                                  width: "100%",
                                  height: "100%",
                                }}
                                src={
                                  item?.userAccount?.accountAvatar
                                    ? process.env.REACT_APP_SOCKET_SERVER +
                                      "/" +
                                      item?.userAccount?.accountAvatar
                                    : images.undefinedAvatar
                                }
                              ></Box>
                            </Box>
                          ))
                      );
                    }
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  padding: "28px 28px 0px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "rgba(151, 151, 151, 0.40)",
                    width: "100%",
                  }}
                ></Box>
              </Box>
              <Box
                sx={{
                  padding: "28px 28px 0px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: "600 !important",
                    fontSize: "14px",
                  }}
                >
                  Informations
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: "10px 28px 0px 28px",
                }}
              >
                <Box
                  sx={{
                    textAlign: "start",
                    color: "#9384B7",
                    fontWeight: "lighter !important",
                    fontSize: "11px",
                    height: readMore ? "fit-content" : "100px",
                    overflow: "hidden",
                    transition: "height 0.5s ease",
                  }}
                >
                  {detailTournament &&
                    detailTournament?.tournamentInformations &&
                    isJson(detailTournament?.tournamentInformations) &&
                    JSON.parse(detailTournament?.tournamentInformations) &&
                    JSON.parse(detailTournament?.tournamentInformations)
                      ?.length > 0 &&
                    JSON.parse(detailTournament?.tournamentInformations)?.map(
                      (item, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              textAlign: "start",
                              color: "#9384B7",
                              marginTop: "10px",
                            }}
                          >
                            <Typography
                              sx={{
                                textAlign: "start",
                                fontWeight: "500 !important",
                                fontSize: "13px",
                              }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                </Box>
              </Box>
              <Box
                onClick={() => setReadMore(!readMore)}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {detailTournament &&
                  detailTournament?.tournamentInformations &&
                  isJson(detailTournament?.tournamentInformations) &&
                  JSON.parse(detailTournament?.tournamentInformations) &&
                  JSON.parse(detailTournament?.tournamentInformations)?.length >
                    3 && (
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "500 !important",
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        marginRight: "28px",
                        marginTop: "10px",
                      }}
                    >
                      {readMore ? "Read less" : "Read more"}
                    </Typography>
                  )}
              </Box>
              <Box sx={{ padding: "28px 28px 0px 28px" }}>
                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "rgba(151, 151, 151, 0.40)",
                    width: "100%",
                  }}
                ></Box>
              </Box>
              {/* <Box id="GamePreview">
                <GamePreview />
              </Box> */}
              <Box sx={{ padding: "28px 28px 0px 28px" }}>
                <Box
                  sx={{
                    height: "1px",
                    backgroundColor: "rgba(151, 151, 151, 0.40)",
                    width: "100%",
                  }}
                ></Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    padding: "28px 28px 0px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: "600 !important",
                      fontSize: "14px",
                    }}
                  >
                    Current Result
                  </Typography>
                  <Typography
                    sx={{
                      color: "#BE48ED",
                      fontWeight: "600 !important",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setCurrentResult(true);
                    }}
                  >
                    View all
                    <Box
                      sx={{ marginLeft: "4px", width: "12px", heigth: "12px" }}
                      component={"img"}
                      src={images.viewAllButton}
                    ></Box>
                  </Typography>
                </Box>
              </Box>
              <LeaderBoard
                open={currentResult}
                detailTournament={detailTournament}
                handleOnClose={() => setCurrentResult(false)}
              />
              <Box
                sx={{
                  position: "fixed",
                  bottom: "0px",
                  padding: "28px 28px 28px 28px",
                  width: "100%",
                  background: detailTournament?.tournamentStatus === 2 ? "" : "rgba(37, 37, 37, 0.20)",
                  backdropFilter: detailTournament?.tournamentStatus === 2 ? "" : "blur(2px)",
                  zIndex: "28",
                }}
              >
                {!detailTournament?.checkInTournament ? (
                  detailTournament?.tournamentStatus === 2 ? (
                    ""
                  ) : (
                    <AnimButton
                      onClick={handleJoinTour}
                      text={"Join"}
                      type={"primary"}
                    />
                  )
                ) : (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <AnimButton
                      onClick={handlePlayTour}
                      type={"highlight"}
                      text={"Play"}
                    />

                    <AnimButton
                      onClick={handleClickOpen}
                      text={"Buy Extra"}
                      type={"primary"}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Dialog
              onClose={() => {
                setRewardPopup(false);
              }}
              sx={{ zIndex: "1311" }}
              open={rewardPopup}
            >
              <Box
                sx={{
                  width: "259px",
                  boxSizing: "border-box",
                  backgroundColor: "#37285D",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "5px 5px 0px 0px",
                    background:
                      "linear-gradient(237deg, #8A3AF1 0%, #7648ED 100%)",
                    color: "#fff",
                    padding: "10.5px 7px 10.5px 7px",
                  }}
                >
                  <span>Place</span>
                  <span>Reward</span>
                </Box>
                {detailTournament?.tournamentInfors?.rewards.map(
                  (item, index) => {
                    return (
                      index < 6 && (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            backgroundColor:
                              index % 2 === 1 ? "#2E2151" : "none",
                            borderRadius: "5px",
                            color: "#BFBEED",
                            padding: "10.5px 7px 10.5px 7px",
                            boxSizing: "border-box",
                          }}
                        >
                          <Typography sx={{ fontSize: "12.5px" }}>
                            {item?.place}
                          </Typography>
                          <Typography sx={{ fontSize: "12.5px" }}>
                            {item?.reward}
                          </Typography>
                        </Box>
                      )
                    );
                  }
                )}
              </Box>
            </Dialog>
            <DetailVoucher
              open={openVoucher}
              handleOnClose={() => {
                setOpenVoucher(false);
              }}
              detail={detailTournament}
            />
          </Dialog>
          <BuyTicket id={id} />
        </>
      )}
    </>
  );
}
