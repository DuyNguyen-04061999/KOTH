import InfinityIcon from "@mui/icons-material/AllInclusive";
import {
  Box,
  Container,
  Dialog,
  // Grid,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AnimButton from "../../../components/AnimButton";
import NotificationExtra from "../../../components/Dialog/NotificationExtra";
import ResultEndGame from "../../../components/Dialog/ResultEndGame";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import ParagraphLoading from "../../../components/LoadingComponent/ParagraphLoading";
import {
  updateFromRouter
} from "../../../redux-saga-middleware/reducers/appReducer";
import {
  openSubscribeDialog,
  toggleLoginDialog,
  toggleShareTour,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { updateDetailTour } from "../../../redux-saga-middleware/reducers/playgameReducer";
import {
  finishGame,
  finishVideo,
  getRefactorDetailAuthPromotion,
  getRefactorDetailPromotion,
  startGameInPromotion,
  startGameInPromotionFail,
} from "../../../redux-saga-middleware/reducers/promotionReducer";
import {
  saveBoughtTournament,
  saveIdTournament,
  toggleExtra,
  toggleTournamentShow,
} from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { isJson, sliceString } from "../../../utils/helper";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NewFooter from "../../NewFooter";
import DetailVoucher from "../DetailVoucher";
import GameInTournament from "../GameInTournament";
import GamePreview from "../JoinTournamentMobile/GamePreview";
import LeaderBoard from "../LeaderBoard";
import PlayGame from "../PlayGame";
import "./index.scss";

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
  },
})(Tooltip);

const typographyStyle = {
  textAlign: "start",
  fontWeight: "lighter !important",
  marginLeft: "0px !important",
  color: "#fff",
};

export default function JoinTournament() {
  const { id } = useParams();
  const {
    tokenUser: token,
    uPack,
    countTicket,
    listJoinedTour,
  } = useSelector((state) => state.userReducer);
  const { width } = useWindowDimensions();
  const [openVoucher, setOpenVoucher] = useState(false);
  const [currentResult, setCurrentResult] = useState(false);
  const dispatch = useDispatch();
  const { device } = useSelector((state) => state.deviceReducer);
  const { detailTournament } = useSelector((state) => state.playgameReducer);
  const {
    isStartGameInPromotion,
    startGamePromotion,
    startVideoPromotion,
    isGetDetailPromotion,
    isGetDetailAuthPromotion,
  } = useSelector((state) => state.promotionReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const [readMore, setReadMore] = useState(false);
  const [rewardPopup, setRewardPopup] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  const handleClickOpen = () => {
    navigate("/packages");
    dispatch(updateFromRouter(location.pathname));
  };

  const [minLength, setMinLength] = useState(0);
  useEffect(() => {
    dispatch(updateDetailTour(detailTournament));
  }, [detailTournament, dispatch]);

  useEffect(() => {
    dispatch(getRefactorDetailPromotion(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getRefactorDetailAuthPromotion(id));
    }
  }, [id, token, dispatch]);

  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      dispatch(getRefactorDetailAuthPromotion(id));
    } else {
      dispatch(getRefactorDetailPromotion(id));
    }
  }, [token, dispatch, id]);

  const handlePlayTour = () => {
    if (detailTournament?.extra === 0 && countTicket === 0) {
      dispatch(toggleExtra());
      return;
    } else {
      // if (countTicket > 0 && detailTournament?.extra <= 0) {
      //   dispatch(updateCountExtraAfterPlayGame(1));
      // }

      // if (countTicket <= 0 && detailTournament?.extra > 0) {
      //   dispatch(updateDetailTourAfterPlayGame());
      // }

      dispatch(
        startGameInPromotion({
          tournamentId: id,
        })
      );
    }
  };

  const handleJoinTour = () => {
    if (token) {
      if (
        (detailTournament?.tournamentVip !== 0 && uPack === null) ||
        (detailTournament?.tournamentVip !== 0 &&
          uPack &&
          uPack?.remain === "Expired")
      ) {
        dispatch(toggleTournamentShow());
      } else {
        dispatch(openSubscribeDialog());
      }
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

  useEffect(() => {
    const updateOrientation = (event) => {
      if (!startGamePromotion) {
        window.location.reload();
      }
    };

    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [startGamePromotion]);
  useEffect(() => {
    dispatch(startGameInPromotionFail());
  }, [dispatch]);
  return (
    <>
      <ResultEndGame />
      <NotificationExtra />
      {!startGamePromotion ? (
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
                width: "100%",
                height: "auto",
              }}
            >
              {isGetDetailPromotion || isGetDetailAuthPromotion ? (
                <BannerLoading width={"100%"} height={"340px"} />
              ) : detailTournament?.tournamentStatus === 2 ? (
                <>
                  <Box
                    sx={{
                      backgroundImage: `url(${images.bannerendtour})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      width: "100%",
                      borderRadius: "5px",
                      // marginTop: "34px",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // flexDirection: "column",
                      padding: "30px",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        wordWrap: "break-word",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          textTransform: "uppercase",
                          color: "white",
                          fontSize: `calc(100vw / 32)`,
                        }}
                      >
                        THIS PROMOTION HAS ENDED!
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: `calc(100vw / 60)`,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          color: "#FFE36C",
                          marginBottom: "20px !important",
                        }}
                      >
                        WINNER ANNOUNCEMENT
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          // width: "365px",
                          marginLeft: "60px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: `calc(100vw / 90)`,
                            fontWeight: "800",
                            color: "white",
                            marginBottom: "10px !important",
                          }}
                        >
                          REWARD SPONSORED BY:{" "}
                          {detailTournament?.tournamentInfors?.owner?.brandName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize:
                              width < 1500 ? `calc(100vw / 40)` : "50px",
                            fontWeight: "800",
                            letterSpacing: 0,
                            textTransform: "uppercase",
                            color: "white",
                            marginBottom: "10px !important",
                          }}
                        >
                          {detailTournament?.tournamentName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: "#FFC56F",
                            fontWeight: "800",
                          }}
                        >
                          CELEBRATING OUR LUCKY CHAMPION!
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: `calc(100vw/ 5)`,
                          height: `calc(100vw/ 6)`,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundImage: `url(${images.layerend})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                        }}
                      >
                        <img
                          src={
                            detailTournament?.bestUser.avatar
                              ? process.env.REACT_APP_SOCKET_SERVER +
                                "/" +
                                detailTournament?.bestUser.avatar
                              : images.bannerWin_Desktop
                          }
                          alt="..."
                          style={{
                            width: width < 1500 ? "80px" : "150px",
                            height: width < 1500 ? "80px" : "150px",
                            borderRadius: "12px",
                            border: " 1px solid #FFBB33",
                          }}
                        />
                        <Box
                          sx={{
                            background: "rgba(71, 55, 152, 0.80)",
                            padding: "10px",
                            borderRadius: "5px",
                            marginTop: "10px",
                            width: width < 1500 ? "80px" : "150px",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#FFF8B7",
                              fontSize: `calc(100vw / 95)`,
                              marginLeft: "0px !important",
                            }}
                          >
                            {detailTournament?.bestUser.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <Box>
                    <img
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      src={
                        detailTournament?.tournamentBackground
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            detailTournament?.tournamentBackground
                          : images.TournamentBG
                      }
                      alt="..."
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                      alignItems: "flex-end",
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                    }}
                    className="btn-conteiner"
                  >
                    {!listJoinedTour?.includes(id) ? (
                      <Box sx={{ width: "150px" }}>
                        <AnimButton
                          onClick={handleJoinTour}
                          text="Join"
                          type="highlight"
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                        className="btn-conteiner"
                      >
                        <Box sx={{ width: "150px", marginRight: "12px" }}>
                          {" "}
                          {isStartGameInPromotion ? (
                            <AnimButton
                              onClick={handlePlayTour}
                              type="loading"
                              text="Play"
                            />
                          ) : (
                            <AnimButton
                              onClick={handlePlayTour}
                              type="highlight"
                              text="Play"
                            />
                          )}
                        </Box>
                        <Box sx={{ width: "150px" }}>
                          <AnimButton
                            onClick={handleClickOpen}
                            text="Buy Extra"
                            type="primary"
                          />
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Box
                    onClick={() => {
                      dispatch(toggleShareTour());
                    }}
                    className="cursor-pointer"
                    sx={{
                      padding: "5px 10px",
                      position: "absolute",
                      right: "10px",
                      top: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="23"
                      fill="none"
                      viewBox="0 0 22 21"
                    >
                      <g fill="#7848ED">
                        <path d="M13.932 3.732c.063-.947.1-1.852.199-2.752.035-.301.165-.584.369-.81.254-.261.608-.19.915.006A20.467 20.467 0 0121.41 6.09a.787.787 0 01-.006.711c-1.587 2.36-3.557 4.345-5.96 5.882-.654.418-1.264.099-1.321-.695a81.86 81.86 0 01-.17-2.823c-.013-.32-.134-.418-.435-.454-2.493-.298-4.702.81-5.955 3.004-.297.517-.56 1.054-.893 1.542a.744.744 0 01-.602.274c-.153-.024-.384-.32-.376-.487.062-1.4.006-2.835.297-4.19.647-2.947 3.341-5.03 6.352-5.123.517-.013 1.03 0 1.591 0z"></path>
                        <path d="M.525 10.046c0-1.913.066-3.864.281-5.784.23-2.04 1.997-3.738 4.05-3.877C7.195.227 9.543.17 11.888.087c.628-.022.675.056.644.695 0 .1-.017.199-.012.298.023.436-.15.607-.613.608a148.15 148.15 0 00-4.91.1c-.71.028-1.42.095-2.123.198-1.377.184-2.389 1.304-2.558 2.82a46.99 46.99 0 000 10.543c.184 1.637 1.22 2.69 2.858 2.867 3.49.379 7.01.379 10.5 0 1.639-.177 2.679-1.219 2.872-2.853a38.74 38.74 0 00.215-2.668c.018-.376.116-.661.415-.9.27-.216.496-.482.76-.711.104-.069.216-.124.333-.164.051.13.15.26.143.385a147.126 147.126 0 01-.198 3.367c-.029.511-.095 1.02-.199 1.522-.44 1.965-1.969 3.343-4.122 3.59-3.65.43-7.338.427-10.987-.01-2.406-.298-3.928-1.936-4.183-4.379-.083-.794-.17-1.58-.199-2.372-.034-.992-.008-1.985-.008-2.977h.008z"></path>
                      </g>
                    </svg>
                  </Box>
                </Box>
              )}
              {/* Partipants */}
              {detailTournament?.tournamentStatus === 2 ? (
                ""
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
                          </Box>
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
                              {detailTournament?.tournamentStatus !== 2
                                ? detailTournament?.extra
                                : 0}
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
                            }}
                          >
                            {isGetDetailPromotion ||
                            isGetDetailAuthPromotion ? (
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
                                  )?.format("hh:mm a")}
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
                      <Box
                        sx={{ display: "flex" }}
                        className="d-flex align-items-center"
                      >
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
                            {isGetDetailPromotion ||
                            isGetDetailAuthPromotion ? (
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
                                  )?.format("hh:mm a")}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {width > 1200 && (
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
              {detailTournament?.tournamentStatus === 2 ? (
                ""
              ) : (
                <Box>
                  {width < 1200 && (
                    <Box sx={{ marginTop: "15px" }}>
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "700 !important",
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
                            return detailTournament?.tournamentParticipants
                              ?.length <= 5 ? (
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
                                          justifyContent: "left",
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
                                          zIndex: 0,
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            textAlign: "start",
                                            color: "#fff",
                                            fontSize: "10px",
                                            fontWeight: "200 !important",
                                            marginLeft: "1px !important",
                                          }}
                                        >
                                          {detailTournament
                                            ?.tournamentParticipants?.length >
                                            5 &&
                                            `+${
                                              detailTournament
                                                ?.tournamentParticipants
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
                                          ? process.env
                                              .REACT_APP_SOCKET_SERVER +
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
                  )}
                </Box>
              )}
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
                  {isGetDetailPromotion || isGetDetailAuthPromotion ? (
                    <ParagraphLoading lines={1} width={"100%"} height={36} />
                  ) : (
                    <>
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
                    </>
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
                      {isGetDetailPromotion || isGetDetailAuthPromotion ? (
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
                    {isGetDetailPromotion || isGetDetailAuthPromotion ? (
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
                              <Box
                                sx={{ marginTop: "7.6px", minHeight: "42px" }}
                              >
                                {" "}
                                <Typography
                                  style={{
                                    fontSize: "10px",
                                    marginBottom: "0px !important",
                                    color: "#525252",
                                    textAlign: "start",
                                  }}
                                >
                                  {/* Conditions */}
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
                                  {/* See more */}
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
                    Game for Promotion
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginTop: "16px",
                    }}
                  >
                    {isGetDetailPromotion || isGetDetailAuthPromotion ? (
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
                        Final Result
                      </Typography>
                      {detailTournament?.tournamentStatus === 2 ? (
                        ""
                      ) : (
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
                      )}
                    </Box>
                    {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                      <BannerLoading width={"100%"} height={"380px"} />
                    ) : (
                      <LeaderBoard
                        open={currentResult}
                        handleOnClose={() => {
                          setCurrentResult(false);
                        }}
                        detailTournament={detailTournament}
                        isFetching={
                          isGetDetailPromotion || isGetDetailAuthPromotion
                        }
                      />
                    )}
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
              }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  fontWeight: "800",
                  color: "white",
                  fontSize: "24px",
                }}
              >
                Information
              </Typography>
              {isGetDetailPromotion || isGetDetailAuthPromotion ? (
                <ParagraphLoading />
              ) : (
                <Box
                  sx={{
                    marginTop: "24px",
                    maxHeight: "60vh",
                    padding: "0px 24px",
                    overflow: "scroll",
                    overscrollBehavior: "contain",
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
                              fontSize: "24px",
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
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {item ? item : ""}
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                </Box>
              )}
            </Box>
            <GamePreview />
            <NewFooter />
          </Container>
        ) : (
          <>
            <Box>
              <Container
                sx={{
                  width: "100%",
                  height: "auto",
                  // backgroundColor: "#211D28",
                  marginTop: "20px",
                }}
              >
                {isGetDetailPromotion || isGetDetailAuthPromotion ? (
                  <BannerLoading width={"100%"} height={"180px"} />
                ) : detailTournament?.tournamentStatus === 2 ? (
                  <>
                    <Box
                      sx={{
                        fontWeight: "500 !important",
                        fontSize: "12px",
                        color: "#7C81F2",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundImage: `url(${images.bannerendmobile})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          width: "100%",
                          marginBottom: "20px",
                          padding: "10px 10px 10px 10px",
                        }}
                      >
                        <Box
                          sx={{
                            wordWrap: "break-word",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 800,
                              textTransform: "uppercase",
                              color: "white",
                              fontSize: "20px",
                            }}
                          >
                            THIS PROMOTION HAS ENDED!
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "14px",
                              fontWeight: 800,
                              textTransform: "uppercase",
                              color: "#FFE36C",
                              marginBottom: "10px !important",
                            }}
                          >
                            WINNER ANNOUNCEMENT
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              width: "50%",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: "800",
                                color: "white",
                              }}
                            >
                              REWARD SPONSOR BY:{" "}
                              {
                                detailTournament?.tournamentInfors?.owner
                                  ?.brandName
                              }
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "800",
                                letterSpacing: "0px",
                                textTransform: "uppercase",
                                color: "white",
                                marginBottom: "10px !important",
                                marginTop: "5px !important",
                              }}
                            >
                              {detailTournament?.tournamentName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "8px",
                                color: "#FFC56F",
                                fontWeight: "800",
                                textTransform: "uppercase",
                              }}
                            >
                              Celebrating Our Lucky Champion!
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "50%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundImage: `url(${images.layerend})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                            }}
                          >
                            <img
                              src={
                                detailTournament?.bestUser.avatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    detailTournament?.bestUser.avatar
                                  : images.bannerWin_Desktop
                              }
                              alt="..."
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "8px",
                                border: " 1px solid #FFBB33",
                              }}
                            />
                            <Box
                              sx={{
                                background: "rgba(71, 55, 152, 0.80)",
                                padding: "4px",
                                borderRadius: "5px",
                                marginTop: "10px",
                                width: "50px",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#FFF8B7",
                                  marginLeft: "0px !important",
                                  fontSize: "8px",
                                }}
                              >
                                {detailTournament?.bestUser.name}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                    }}
                  >
                    {/* {detailTournament?.tournamentStatus === 2 && <BgEndGame />} */}
                    <img
                      className="w-100 pt-3"
                      src={
                        detailTournament?.tournamentBackgroundMobile
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            detailTournament?.tournamentBackgroundMobile
                          : images.DoubleDragonMobile
                      }
                      alt="..."
                    />
                  </Box>
                )}
                <Box
                  component={"div"}
                  className="mb-2 text-white"
                  sx={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                    <Skeleton
                      variant="text"
                      sx={{
                        width: "100%",
                        height: "30px",
                        bgcolor: "rgba(255,255,255,0.5)",
                      }}
                    />
                  ) : (
                    <>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          fontWeight: "500 !important",
                          marginLeft: "0px !important",
                        }}
                      >
                        {detailTournament?.tournamentName?.length > 30
                          ? detailTournament?.tournamentName
                          : detailTournament?.tournamentName}
                      </Typography>
                      {detailTournament?.tournamentStatus === 2 ? (
                        ""
                      ) : (
                        <Box
                          component={"div"}
                          className="d-flex ps-2 pe-2 pt-2 pb-2 rounded text-white"
                          onClick={() => {
                            dispatch(toggleShareTour());
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="19"
                            fill="none"
                            viewBox="0 0 22 21"
                          >
                            <g fill="#7848ED">
                              <path d="M13.932 3.732c.063-.947.1-1.852.199-2.752.035-.301.165-.584.369-.81.254-.261.608-.19.915.006A20.467 20.467 0 0121.41 6.09a.787.787 0 01-.006.711c-1.587 2.36-3.557 4.345-5.96 5.882-.654.418-1.264.099-1.321-.695a81.86 81.86 0 01-.17-2.823c-.013-.32-.134-.418-.435-.454-2.493-.298-4.702.81-5.955 3.004-.297.517-.56 1.054-.893 1.542a.744.744 0 01-.602.274c-.153-.024-.384-.32-.376-.487.062-1.4.006-2.835.297-4.19.647-2.947 3.341-5.03 6.352-5.123.517-.013 1.03 0 1.591 0z"></path>
                              <path d="M.525 10.046c0-1.913.066-3.864.281-5.784.23-2.04 1.997-3.738 4.05-3.877C7.195.227 9.543.17 11.888.087c.628-.022.675.056.644.695 0 .1-.017.199-.012.298.023.436-.15.607-.613.608a148.15 148.15 0 00-4.91.1c-.71.028-1.42.095-2.123.198-1.377.184-2.389 1.304-2.558 2.82a46.99 46.99 0 000 10.543c.184 1.637 1.22 2.69 2.858 2.867 3.49.379 7.01.379 10.5 0 1.639-.177 2.679-1.219 2.872-2.853a38.74 38.74 0 00.215-2.668c.018-.376.116-.661.415-.9.27-.216.496-.482.76-.711.104-.069.216-.124.333-.164.051.13.15.26.143.385a147.126 147.126 0 01-.198 3.367c-.029.511-.095 1.02-.199 1.522-.44 1.965-1.969 3.343-4.122 3.59-3.65.43-7.338.427-10.987-.01-2.406-.298-3.928-1.936-4.183-4.379-.083-.794-.17-1.58-.199-2.372-.034-.992-.008-1.985-.008-2.977h.008z"></path>
                            </g>
                          </svg>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
                {detailTournament?.tournamentStatus === 2 ? (
                  ""
                ) : (
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                      <Skeleton
                        variant="text"
                        sx={{
                          width: "100%",
                          height: "30px",
                          bgcolor: "rgba(255,255,255,0.5)",
                        }}
                      />
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box display={"flex"} alignItems={"center"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="none"
                              viewBox="0 0 22 22"
                            >
                              <g>
                                <g fill="#BE48ED">
                                  <path d="M21.967 6.713v11.119c0 2.462-1.39 3.868-3.822 3.872-4.772.005-9.545.005-14.317 0-2.407-.003-3.812-1.4-3.82-3.811C0 14.374.007 10.856.009 7.338c0-.198.02-.396.032-.625h21.927zM7.609 18.12c-.035.386.215.566.64.352a41.08 41.08 0 002.196-1.159c.375-.215.688-.233 1.068-.012.68.394 1.382.755 2.088 1.098.176.087.468.159.587.072.12-.087.147-.39.122-.584-.113-.783-.256-1.56-.398-2.339-.076-.407 0-.732.331-1.025.548-.48 1.066-.998 1.566-1.529.176-.187.26-.46.386-.694-.25-.102-.492-.244-.752-.294-.753-.138-1.52-.212-2.268-.367a1.031 1.031 0 01-.62-.452c-.402-.725-.735-1.49-1.12-2.225-.094-.18-.285-.42-.439-.426-.154-.006-.352.233-.445.41-.377.718-.692 1.465-1.092 2.17-.158.26-.407.45-.699.532-.786.17-1.594.236-2.388.38-.212.037-.47.164-.572.333-.057.094.13.394.27.54.517.54 1.043 1.08 1.61 1.567.392.34.465.712.37 1.188-.158.795-.286 1.597-.441 2.464z"></path>
                                  <path d="M.032 5.982C.017 4.503-.222 3.024.88 1.792 1.558 1.036 2.508.603 3.55.708c-.148.408-.213.823-.409 1.153-.594 1.032-.43 2.264.472 3.032a2.297 2.297 0 003-.056c.83-.738.971-2.022.385-3.006-.189-.317-.235-.72-.383-1.204h2.801c-.133.469-.173.887-.363 1.22-.6 1.055-.44 2.265.46 3.034a2.267 2.267 0 002.949 0c.88-.758 1.052-1.952.478-2.981-.19-.344-.26-.76-.413-1.23h2.79c-.12.42-.157.84-.35 1.166-.58.977-.441 2.269.389 3.005a2.298 2.298 0 003 .054c.896-.766 1.068-2.008.466-3.033-.19-.325-.264-.719-.395-1.098 2.268-.554 4.058 2.251 3.453 5.216l-21.85.003z"></path>
                                  <path d="M4.944 4.303c-.987-.007-1.638-1.096-1.09-1.938.292-.444.308-.87.322-1.346.02-.698.576-1.127 1.088-.807.217.136.394.475.432.745.07.499.043.953.368 1.429.559.819-.134 1.924-1.12 1.917z"></path>
                                  <path d="M10.942 4.303c-.988-.007-1.638-1.096-1.09-1.938.293-.444.307-.87.322-1.346.02-.698.576-1.127 1.088-.807.217.136.395.475.432.745.07.499.044.953.368 1.429.559.819-.134 1.924-1.12 1.917z"></path>
                                  <path d="M16.944 4.303c-.987-.007-1.638-1.096-1.09-1.938.292-.444.308-.87.322-1.346.021-.698.576-1.127 1.089-.807.216.136.389.475.432.745.069.499.042.953.367 1.429.558.819-.134 1.924-1.12 1.917z"></path>
                                </g>
                              </g>
                            </svg>
                            <Typography
                              sx={{
                                ...typographyStyle,
                                fontSize: "12px",
                                fontWeight: "500",
                                marginLeft: "5px !important",
                              }}
                            >
                              Start
                            </Typography>
                          </Box>
                          <Box
                            display={"flex"}
                            width={"100%"}
                            alignItems={"baseline"}
                          >
                            <Typography
                              sx={{ ...typographyStyle, fontSize: "12px" }}
                            >
                              {moment(
                                detailTournament?.tournamentStartAt ||
                                  new Date()
                              )?.format("MM/DD/YYYY")}
                            </Typography>
                            <Typography className="text-white">-</Typography>
                            <Typography
                              sx={{
                                ...typographyStyle,
                                fontSize: "12px",
                                marginLeft: "5px !important",
                              }}
                            >
                              {moment(
                                detailTournament?.tournamentStartAt ||
                                  new Date()
                              )?.format("hh:mm a")}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                          className="ps-3"
                        >
                          <Box display={"flex"} alignItems={"center"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="15"
                              fill="none"
                              viewBox="0 0 22 23"
                            >
                              <g fill="#BE48ED">
                                <path d="M.032 5.91C.017 4.473-.222 3.035.88 1.838 1.558 1.1 2.508.68 3.55.782c-.148.397-.213.8-.409 1.121-.594 1.004-.43 2.2.472 2.948.425.343.96.525 1.51.515a2.335 2.335 0 001.49-.57c.83-.717.971-1.965.385-2.921-.189-.309-.235-.7-.383-1.171h2.801c-.133.455-.173.862-.364 1.186-.599 1.025-.439 2.202.46 2.95.412.342.935.53 1.475.53s1.063-.188 1.475-.53c.88-.738 1.052-1.899.478-2.9-.19-.334-.26-.737-.413-1.194h2.79c-.12.407-.157.815-.35 1.133-.581.95-.441 2.206.388 2.92a2.338 2.338 0 003 .052c.897-.743 1.068-1.95.467-2.947-.19-.315-.264-.699-.395-1.068 2.268-.538 4.057 2.19 3.453 5.07L.031 5.91z"></path>
                                <path d="M5.162 4.608c-.98-.007-1.625-1.19-1.08-2.103.289-.481.304-.944.319-1.46.02-.758.571-1.223 1.079-.876.215.147.39.515.428.808.069.541.043 1.035.365 1.55.554.889-.133 2.089-1.11 2.081z"></path>
                                <path d="M10.986 4.608c-.98-.007-1.625-1.19-1.08-2.103.29-.481.304-.944.318-1.46.02-.758.572-1.223 1.08-.876.215.147.392.515.428.808.07.541.044 1.035.366 1.55.554.889-.134 2.089-1.112 2.081z"></path>
                                <path d="M16.81 4.608c-.98-.007-1.627-1.19-1.082-2.103.29-.481.305-.944.318-1.46.022-.758.572-1.223 1.08-.876.216.147.387.515.43.808.068.541.042 1.035.364 1.55.553.889-.133 2.089-1.11 2.081z"></path>
                                <path
                                  fillRule="evenodd"
                                  d="M22 6.56v11.583c0 2.566-1.392 4.03-3.828 4.034-4.78.005-9.56.005-14.341 0-2.411-.003-3.819-1.458-3.826-3.97-.007-2.7-.005-5.402-.003-8.102L.004 7.21c0-.135.009-.271.018-.416a15.2 15.2 0 00.015-.234H22zM3.235 11.138c0-1.09.883-1.974 1.973-1.974h11.746a1.973 1.973 0 110 3.947H5.208a1.973 1.973 0 01-1.973-1.973zm1.973 3.945a1.973 1.973 0 000 3.947h11.746a1.973 1.973 0 000-3.947H5.208z"
                                  clipRule="evenodd"
                                ></path>
                              </g>
                            </svg>
                            <Typography
                              sx={{
                                ...typographyStyle,
                                fontSize: "12px",
                                fontWeight: "500",
                                marginLeft: "5px !important",
                              }}
                            >
                              End
                            </Typography>
                          </Box>
                          <Box
                            display={"flex"}
                            width={"100%"}
                            alignItems={"baseline"}
                          >
                            <Typography
                              sx={{ ...typographyStyle, fontSize: "12px" }}
                            >
                              {moment(
                                detailTournament?.tournamentEndAt || new Date()
                              )?.format("MM/DD/YYYY")}
                            </Typography>
                            <Typography className="text-white">-</Typography>
                            <Typography
                              sx={{
                                ...typographyStyle,
                                fontSize: "12px",
                                marginLeft: "5px !important",
                              }}
                            >
                              {moment(
                                detailTournament?.tournamentEndAt || new Date()
                              )?.format("hh:mm a")}
                            </Typography>
                          </Box>
                        </Box>
                      </>
                    )}
                  </Box>
                )}
                {detailTournament?.tournamentStatus === 2 ? (
                  ""
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                      <Skeleton
                        variant="text"
                        sx={{
                          width: "100%",
                          height: "30px",
                          bgcolor: "rgba(255,255,255,0.5)",
                        }}
                      />
                    ) : (
                      <>
                        <Box display={"flex"} alignItems={"center"}>
                          <Typography
                            sx={{
                              color: "#ffff",
                              textAlign: "start",
                              fontSize:
                                576 < width && width < 1200
                                  ? `${width / 62.5}px`
                                  : `14px`,
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
                          <Box
                            display={"flex"}
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                          >
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "white",
                                fontWeight: "700",
                              }}
                            >
                              {detailTournament?.tournamentStatus !== 2
                                ? detailTournament?.extra
                                : 0}
                            </Typography>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="none"
                              viewBox="0 0 10 10"
                              className="ms-1"
                            >
                              <path
                                fill="#BE48ED"
                                fillRule="evenodd"
                                d="M3.796.6a2.787 2.787 0 01-.248.2c-.149.1-.316.169-.492.204a2.853 2.853 0 01-.316.034c-.4.032-.601.048-.768.107a1.357 1.357 0 00-.828.827c-.059.167-.075.368-.107.768a2.851 2.851 0 01-.034.316A1.36 1.36 0 01.8 3.55a2.787 2.787 0 01-.2.247c-.26.306-.39.46-.467.62-.176.37-.176.8 0 1.17.077.16.207.312.468.618.104.122.156.183.2.248.1.149.168.316.203.492.015.077.022.157.034.316.032.4.048.601.107.768a1.356 1.356 0 00.828.828c.167.059.367.075.768.107.16.012.24.019.316.034.176.035.343.104.492.204.065.043.126.095.248.2.306.26.459.39.619.467.37.176.8.176 1.17 0 .16-.077.313-.207.619-.468.122-.104.183-.156.248-.2.149-.1.316-.168.492-.203.077-.015.157-.022.316-.034.4-.032.601-.048.768-.107a1.356 1.356 0 00.828-.828c.059-.167.075-.367.107-.768.012-.16.019-.24.034-.316.035-.176.104-.343.204-.492.043-.065.095-.126.2-.248.26-.306.39-.459.467-.619.176-.37.176-.8 0-1.17-.077-.16-.207-.313-.468-.619a2.785 2.785 0 01-.2-.247c-.1-.15-.169-.317-.203-.493a2.861 2.861 0 01-.034-.316c-.032-.4-.048-.6-.107-.768a1.356 1.356 0 00-.828-.827c-.167-.06-.367-.075-.768-.107a2.851 2.851 0 01-.316-.034A1.356 1.356 0 016.452.8a2.866 2.866 0 01-.248-.2C5.898.34 5.745.21 5.585.133a1.357 1.357 0 00-1.17 0c-.16.076-.313.207-.619.467zm3.39 3.332a.407.407 0 00-.574-.575L4.186 5.782l-.798-.798a.407.407 0 00-.575.575l1.085 1.085a.407.407 0 00.575 0l2.714-2.712z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Box>
                        </Box>
                        <BgWithTooltip
                          title="Free Extra will be reset at 23:59 per day, so make sure to use them all."
                          placement="right"
                          enterTouchDelay={0}
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
                      </>
                    )}
                  </Box>
                )}
                {/* Button Playgame */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:
                      detailTournament?.tournamentStatus === 2
                        ? "column-reverse"
                        : "column",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection:
                        detailTournament?.tournamentStatus === 2
                          ? "column"
                          : "column",
                    }}
                  >
                    {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                      <BannerLoading width={"100%"} height={"200px"} />
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
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
                        <Box className="d-flex p-2 ps-3 pe-3">
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
                                <Typography
                                  variant="h5"
                                  style={{
                                    color: "#BE48ED",
                                    fontSize: "16px",
                                    maxHeight: "24px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontWeight: "700",
                                  }}
                                >
                                  {" "}
                                  {detailTournament?.tournamentInfors
                                    ?.rewardInfors?.rewardTitle ||
                                    "SS Z-Flip 5 free voucher"}
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
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                    }}
                                  >
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
                                        fontSize: "12px",
                                        textAlign: "start",
                                      }}
                                    >
                                      {sliceString(
                                        detailTournament?.tournamentInfors
                                          ?.rewardInfors?.rewardRecipient
                                      ) || "Recipient"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      marginTop: "6px",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                    }}
                                  >
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
                                        fontSize: "12px",
                                        textAlign: "start",
                                      }}
                                    >
                                      {detailTournament?.tournamentInfors?.owner
                                        ?.brandName || "Samsung"}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box>
                                  {" "}
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                    }}
                                  >
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
                                        fontSize: "12px",
                                        textAlign: "start",
                                      }}
                                    >
                                      {moment(
                                        detailTournament?.tournamentInfors
                                          ?.rewardInfors?.rewardValidityDate
                                      )?.format("MMM-DD-YYYY") || "Nov-10-2023"}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      marginTop: "6px",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      minHeight: "33px",
                                    }}
                                  >
                                    {" "}
                                    <Typography
                                      style={{
                                        fontSize: "10px",
                                        marginBottom: "0px !important",
                                        color: "#525252",
                                        textAlign: "start",
                                      }}
                                    >
                                      {/* Conditions */}
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
                                        textAlign: "start",
                                      }}
                                    >
                                      {/* See more */}
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
                                    detailTournament?.tournamentInfors
                                      ?.rewardInfors?.rewardAvatar
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
                        </Box>
                      </>
                    )}
                    <Box sx={{ marginTop: "5px" }}>
                      <GameInTournament
                        game={
                          detailTournament?.tournamentInfors?.skin?.skinGame ||
                          null
                        }
                      />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        marginTop: "15px",
                      }}
                    >
                      {!listJoinedTour?.includes(id) ? (
                        detailTournament?.tournamentStatus === 2 ? (
                          ""
                        ) : (
                          <AnimButton
                            onClick={handleJoinTour}
                            text="Join"
                            type="highlight"
                          />
                        )
                      ) : (
                        <Box
                          sx={{
                            display:
                              detailTournament?.tournamentStatus === 2
                                ? "none"
                                : "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {" "}
                          (
                          <AnimButton
                            onClick={handlePlayTour}
                            type="highlight"
                            text="Play"
                          />
                          )
                          <AnimButton
                            onClick={handleClickOpen}
                            text="Buy Extra"
                            type="primary"
                          />
                        </Box>
                      )}
                    </Box>
                    {detailTournament?.tournamentStatus === 2 ? (
                      ""
                    ) : (
                      <Box sx={{ marginTop: "15px" }}>
                        {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                          <Skeleton
                            variant="text"
                            sx={{
                              width: "100%",
                              height: "30px",
                              bgcolor: "rgba(255,255,255,0.5)",
                            }}
                          />
                        ) : (
                          <>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                sx={{
                                  textAlign: "start",
                                  color: "#fff",
                                  fontSize: "14px",
                                  fontWeight: "700 !important",
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
                                {
                                  detailTournament?.tournamentParticipants
                                    ?.length
                                }
                                /
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
                                  return detailTournament
                                    ?.tournamentParticipants?.length <= 5 ? (
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
                                            ? process.env
                                                .REACT_APP_SOCKET_SERVER +
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
                                                  ? process.env
                                                      .REACT_APP_SOCKET_SERVER +
                                                    "/" +
                                                    item?.userAccount
                                                      ?.accountAvatar
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
                                                backgroundColor:
                                                  "rgba(7,7,7,0.5)",
                                                color:
                                                  detailTournament
                                                    ?.tournamentParticipants
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
                                                {detailTournament
                                                  ?.tournamentParticipants
                                                  ?.length > 5 &&
                                                  `+${
                                                    detailTournament
                                                      ?.tournamentParticipants
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
                                                ? process.env
                                                    .REACT_APP_SOCKET_SERVER +
                                                  "/" +
                                                  item?.userAccount
                                                    ?.accountAvatar
                                                : images.undefinedAvatar
                                            }
                                          ></Box>
                                        </Box>
                                      ))
                                  );
                                }
                              )}
                            </Box>
                          </>
                        )}
                      </Box>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                        marginBottom: "15px",
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
                    <Box className="imformations">
                      {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                        <Skeleton
                          variant="text"
                          sx={{
                            width: "30%",
                            height: "30px",
                            bgcolor: "rgba(255,255,255,0.5)",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "15px",
                          }}
                        >
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: "700 !important",
                              fontSize: "14px",
                            }}
                          >
                            Information
                          </Typography>
                        </Box>
                      )}
                      {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                        <Skeleton
                          variant="text"
                          sx={{
                            width: "100%",
                            height: "30px",
                            bgcolor: "rgba(255,255,255,0.5)",
                          }}
                        />
                      ) : (
                        <Box sx={{ position: "relative" }}>
                          <Box
                            sx={{
                              textAlign: "start",
                              color: "#9384B7",
                              fontWeight: "lighter !important",
                              fontSize: "11px",
                              height: readMore ? "fit-content" : "140px",
                              overflow: "hidden",
                              transition: "height 0.5s ease",
                              padding: "0 6px",
                            }}
                          >
                            {detailTournament &&
                              detailTournament?.tournamentInformations &&
                              isJson(
                                detailTournament?.tournamentInformations
                              ) &&
                              JSON.parse(
                                detailTournament?.tournamentInformations
                              ) &&
                              JSON.parse(
                                detailTournament?.tournamentInformations
                              )?.length > 0 &&
                              JSON.parse(
                                detailTournament?.tournamentInformations
                              )?.map((item, index) => {
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
                              })}
                          </Box>
                          {!readMore ? (
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: "0px",
                                width: "100%",
                                height: "20px",
                                backdropFilter: "blur(1px)",
                              }}
                            />
                          ) : (
                            <></>
                          )}
                        </Box>
                      )}
                      {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                        <Skeleton
                          variant="text"
                          sx={{
                            width: "100%",
                            height: "30px",
                            bgcolor: "rgba(255,255,255,0.5)",
                          }}
                        />
                      ) : (
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
                            JSON.parse(
                              detailTournament?.tournamentInformations
                            ) &&
                            JSON.parse(detailTournament?.tournamentInformations)
                              ?.length > 3 && (
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
                                {readMore ? "Show less" : "Show more"}
                              </Typography>
                            )}
                        </Box>
                      )}
                    </Box>
                    <Box sx={{ marginBottom: "15px", marginTop: "15px" }}>
                      <Box
                        sx={{
                          height: "1px",
                          backgroundColor: "rgba(151, 151, 151, 0.40)",
                          width: "100%",
                        }}
                      ></Box>
                    </Box>
                  </Box>
                  <Box className="final-result">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: "600 !important",
                          fontSize: "14px",
                        }}
                      >
                        Final Result
                      </Typography>
                      {detailTournament?.tournamentStatus === 2 ? (
                        ""
                      ) : (
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
                            sx={{
                              marginLeft: "4px",
                              width: "12px",
                              heigth: "12px",
                            }}
                            component={"img"}
                            src={images.viewAllButton}
                          ></Box>
                        </Typography>
                      )}
                    </Box>
                    {isGetDetailAuthPromotion || isGetDetailPromotion ? (
                      <BannerLoading width={"100%"} height={"380px"} />
                    ) : (
                      <LeaderBoard
                        open={currentResult}
                        detailTournament={detailTournament}
                        handleOnClose={() => setCurrentResult(false)}
                      />
                    )}
                  </Box>
                </Box>
                <GamePreview />
                <NewFooter />
                <Box sx={{
                  marginBottom: "75px"
                }}>

                </Box>
              </Container>
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
            </Box>
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
          startGame={startGamePromotion}
          detailTournament={detailTournament}
          setStartGame={() => {
            dispatch(finishGame());
          }}
          videoGame={startVideoPromotion}
          setVideoGame={(data) => {
            dispatch(finishVideo(data));
          }}
        />
      )}
    </>
  );
}
