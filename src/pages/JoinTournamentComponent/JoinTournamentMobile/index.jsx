import {
  Box,
  CssBaseline,
  Dialog,
  // Grid,
  ThemeProvider,
  Typography,
  createTheme,
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
  formatTimeMothDateYear,
  isJson,
  sliceString,
} from "../../../utils/helper";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import BgEndGame from "../BgEndTour";
import DetailVoucher from "../DetailVoucher";
import GameInTournament from "../GameInTournament";
import LeaderBoard from "../LeaderBoard/index";
import GamePreview from "./GamePreview";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";
// import useWindowDimensions from "../../../utils/useWindowDimensions";

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
export default function JoinTournamentMobile({ handleOnClickStartGame }) {
  const [detailTournament, setDetailTournament] = useState({});
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
    if (token && fetchT) {
      socket?.emit("detailTournament", {
        tournamentId: id,
      });
    }
  });
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
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
                {detailTournament?.tournamentStatus === 2 && <BgEndGame />}
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
              <Box
                component={"div"}
                className="mb-2 text-center text-white"
                sx={{ marginTop: "20px" }}
              >
                <Typography className="fs-4">
                  {detailTournament?.tournamentName?.length > 30
                    ? detailTournament?.tournamentName
                    : detailTournament?.tournamentName}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500 !important",
                    fontSize: "12px",
                  }}
                >
                  {detailTournament?.tournamentTimeType === "hourly"
                    ? "Hourly tournaments"
                    : detailTournament?.tournamentTimeType === "daily"
                    ? "Daily tournaments"
                    : "Week-long tournaments"}
                </Typography>
              </Box>
              <Box
                component={"div"}
                className="d-flex justify-content-between "
                sx={{
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  marginTop: "20px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ ...typographyStyle, fontSize: "14px" }}>
                    My Ticket
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="12"
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
                        fontSize: "12px",
                      }}
                    >
                      {detailTournament?.turnCountLeft || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "rgba(151, 151, 151, 0.40)",
                  }}
                ></Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ ...typographyStyle, fontSize: "14px" }}>
                    Start date
                  </Typography>
                  <Typography sx={{ ...typographyStyle, fontSize: "10px" }}>
                    {formatTimeMothDateYear(
                      detailTournament?.tournamentStartAt
                    )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "1px",
                    height: "40px",
                    backgroundColor: "rgba(151, 151, 151, 0.40)",
                  }}
                ></Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ ...typographyStyle, fontSize: "14px" }}>
                    End date
                  </Typography>
                  <Typography sx={{ ...typographyStyle, fontSize: "10px" }}>
                    {formatTimeMothDateYear(detailTournament?.tournamentEndAt)}
                  </Typography>
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
                      <h5
                        style={{
                          color: "#BE48ED",
                          fontSize: "16px",
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
                        justifyContent: "space-between",
                        marginTop: "10px",
                      }}
                    >
                      <Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                              fontSize: "12px",
                            }}
                          >
                            {sliceString(
                              detailTournament?.tournamentInfors?.rewardInfors
                                ?.rewardRecipient
                            ) || "Recipient"}
                          </span>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "6px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
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
                              fontSize: "12px",
                            }}
                          >
                            {detailTournament?.tournamentInfors?.owner
                              ?.brandName || "Samsung"}
                          </span>
                        </Box>
                      </Box>
                      <Box>
                        {" "}
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                              fontSize: "12px",
                            }}
                          >
                            {moment(
                              detailTournament?.tournamentInfors?.rewardInfors
                                ?.rewardValidityDate
                            )?.format("MMM-DD-YYYY") || "Nov-10-2023"}
                          </span>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "6px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
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
                          </span>
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
              <GameInTournament
                game={
                  detailTournament?.tournamentInfors?.skin?.skinGame || null
                }
              />
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
              <Box id="GamePreview">
                <GamePreview />
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
                  background: "rgba(37, 37, 37, 0.20)",
                  backdropFilter: "blur(2px)",
                  zIndex: "28",
                }}
              >
                {!detailTournament?.checkInTournament ? (
                  <AnimButton
                    onClick={handleJoinTour}
                    text={"Join"}
                    type={"primary"}
                  />
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
                      text={"Buy Ticket"}
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
        </ThemeProvider>
      )}
    </>
  );
}
