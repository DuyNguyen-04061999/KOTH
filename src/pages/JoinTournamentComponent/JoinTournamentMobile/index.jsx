import {
  Box,
  CssBaseline,
  Dialog,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import "./index.scss";
import moment from "moment";
import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
import { toggleBuyTicket } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import LeaderBoard from "../LeaderBoard/index";
import DetailVoucher from "../DetailVoucher";
import GameInTournament from "../GameInTournament";
import BgEndGame from "../BgEndTour";
import InfinityIcon from "@mui/icons-material/AllInclusive"
import { isJson, sliceString } from "../../../utils/helper";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";

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
export default function JoinTournamentMobile({ handleOnClickStartGame }) {
  const [detailTournament, setDetailTournament] = useState({});
  const [fetchT, setFetchT] = useState(true);
  const [socket, setSocket] = useState(null);
  const [currentResult, setCurrentResult] = useState(false);
  const [rewardPopup, setRewardPopup] = useState(false);
  const [openVoucher, setOpenVoucher] = useState(false);
  const { id } = useParams();
  const { token } = useSelector((state) => state.authReducer);
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
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
    return () => {
      socket?.off("detailTournamentSuccess");
    };
  }, [socket]);

  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(toggleBuyTicket(true));
  };
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog
        sx={{ zIndex: "1310", fontFamily: "Cyntho Next !important" }}
        open={true}
        fullScreen={true}
      >
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
          <Box
            sx={{
              backgroundImage: `url("${
                detailTournament?.tournamentBackground
                  ? process.env.REACT_APP_SOCKET_SERVER +
                    "/" +
                    detailTournament?.tournamentBackground
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
          </Box>
          <Box component={"div"} className="mb-2 text-center text-white">
            <Typography
              className="fs-4"
              sx={{ fontFamily: "Cyntho Next", fontWeight: "500 !important" }}
            >
              {detailTournament?.tournamentInfors?.game &&
                detailTournament?.tournamentInfors?.game?.gameName}
            </Typography>
            <Typography
              sx={{ fontFamily: "Cyntho Next", fontWeight: "500 !important" }}
            >
              {detailTournament?.tournamentTimeType === "hourly"
                ? "Hourly Tournament"
                : detailTournament?.tournamentTimeType === "daily"
                ? "Daily Tournament"
                : "Weekly Tournament"}
            </Typography>
          </Box>
          <Box
            component={"div"}
            className="d-flex justify-content-between "
            sx={{
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ ...typographyStyle, fontSize: "14px" }}>
                Start
              </Typography>
              <Typography sx={{ ...typographyStyle, fontSize: "12px" }}>
                {moment(detailTournament?.tournamentStartAt).format(
                  "DD/MM/YYYY"
                )}
                -{moment(detailTournament?.tournamentStartAt).format("hh:mm a")}
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
                Finish
              </Typography>
              <Typography sx={{ ...typographyStyle, fontSize: "12px" }}>
                {moment(detailTournament?.tournamentEndAt).format("DD/MM/YYYY")}
                -{moment(detailTournament?.tournamentEndAt).format("hh:mm a")}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ padding: "28px 27px 0px 27px" }}>
            <Box>
              <Typography
                variant="h6"
                className="text-white"
                sx={{ marginLeft: "0px !important", fontFamily: "Cyntho Next !important", fontWeight:"500 !important" }}
              >
                Reward
              </Typography>
              <p
                className="text-white text-start f-500"
                style={{
                  fontFamily: "Cyntho Next !important",
                  fontWeight: "500 !improtant",
                  fontSize: "14px",
                }}
              >
                Play game to get this voucher
              </p>
            </Box>
            {/* ----------------------- */}
            <div className="cardWrapMB justify-content-center">
              <div className="cardMB cardLeftMB">
                <h5
                  style={{
                    color: "#BE48ED",
                    fontSize: "18px",
                    paddingTop: "5px",
                    paddingBottom: "12px",
                    fontFamily:"Cyntho Next !important",
                    fontWeight:"500 !important"
                  }}
                >
                  {detailTournament?.tournamentInfors?.rewardInfors
                    ?.rewardTitle && detailTournament?.tournamentInfors?.rewardInfors
                    ?.rewardTitle?.length > 10 ? String(detailTournament?.tournamentInfors?.rewardInfors
                      ?.rewardTitle)?.slice(0,10) : detailTournament?.tournamentInfors?.rewardInfors
                      ?.rewardTitle}
                </h5>
                <Grid container>
                  <Grid item xs={6}>
                    <div className="titleMB d-flex flex-column mb-2">
                      <h6
                        style={{
                          fontSize: "10px",
                          marginBottom: "0px !important",
                        }}
                      >
                        Recipient
                      </h6>
                      <h6
                        style={{
                          fontWeight: "100",
                          fontFamily: "Cyntho Next",
                          fontSize: "14px",
                        }}
                      >
                        {sliceString(detailTournament?.tournamentInfors?.rewardInfors
                          ?.rewardRecipient) || "Recipient"}
                      </h6>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="nameMB d-flex flex-column mb-2">
                      <h6
                        style={{
                          fontSize: "10px",
                          marginBottom: "0px !important",
                        }}
                      >
                        Validity date
                      </h6>
                      <h6
                        style={{
                          fontWeight: "100",
                          fontFamily: "Cyntho Next",
                          fontSize: "14px",
                        }}
                      >
                        {moment(
                          detailTournament?.tournamentInfors?.rewardInfors
                            ?.rewardValidityDate
                        )?.format("MMM-DD-YYYY") || "Nov-10-2023"}
                      </h6>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="seatMB d-flex flex-column">
                      <h2
                        style={{
                          fontSize: "10px",
                          marginBottom: "0px !important",
                        }}
                      >
                        Sponsor by
                      </h2>
                      <h6
                        style={{
                          fontWeight: "100",
                          fontFamily: "Cyntho Next",
                          fontSize: "14px",
                        }}
                      >
                        {detailTournament?.tournamentInfors?.owner?.brandName ||
                          "Samsung"}
                      </h6>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="timeMB d-flex flex-column">
                      <h2
                        style={{
                          fontSize: "10px",
                          marginBottom: "0px !important",
                        }}
                      >
                        Conditions
                      </h2>
                      <h6
                        onClick={() => setOpenVoucher(true)}
                        style={{ color: "#0096FF", fontSize: "14px" }}
                      >
                        See more
                      </h6>
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="cardMB cardRightMB">
                <div className="eyeMB"></div>
                <div className="numberMB">
                  <img
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
                    width={90}
                    height={95}
                    style={{ borderRadius: "8px" }}
                  />
                </div>
              </div>
            </div>
            {/* --------------------------  */}
          </Box>
          <GameInTournament
            game={detailTournament?.tournamentInfors?.skin?.skinGame || null}
          />
          <Box sx={{ padding: "28px 28px 0px 28px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "500 !important",
                  fontFamily: "Cyntho Next !important",
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
                {detailTournament?.tournamentQuantity > 0 ? detailTournament?.tournamentQuantity : <InfinityIcon sx={{
                        width: 12,
                        height: 12
                      }}/>}
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
              {detailTournament?.tournamentParticipants?.map((item, index) => {
                return detailTournament?.tournamentParticipants?.length <= 5 ? (
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
                          zIndex: `${
                            detailTournament?.tournamentParticipants?.length -
                            index
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
                          zIndex: `${
                            detailTournament?.tournamentParticipants?.length -
                            index
                          }`,
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
              })}
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
              }}
            >
              {detailTournament && detailTournament?.tournamentInformations && isJson(detailTournament?.tournamentInformations) && JSON.parse(detailTournament?.tournamentInformations)
              && JSON.parse(detailTournament?.tournamentInformations)?.length > 0 && JSON.parse(detailTournament?.tournamentInformations)?.map(
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
                          fontFamily: "Cyntho Next !important",
                        }}
                      >
                        {item?.length > 200 ? item.slice(0, 200) + "..." : item}
                      </Typography>
                    </Box>
                  );
                }
              )}
            </Box>
          </Box>
          <Box sx={{
            display:"flex",
            justifyContent:"flex-end"
          }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "500 !important",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                marginRight:"28px",
                marginTop:"10px"
              }}
            >
              Read more
            </Typography>
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
              padding: "28px",
              width: "100%",
              background: "rgba(37, 37, 37, 0.20)",
              backdropFilter: "blur(2px)",
            }}
          >
            {!detailTournament?.checkInTournament ? (
              <button
                onClick={() => {
                  if(token) {
                    socket?.emit("joinTournament", {
                      tournamentId: detailTournament?.id,
                    });
                  } else {
                    dispatch(toggleLoginDialog())
                  }
                }}
                style={{
                  padding: "8px 0px",
                  width: "100%",
                  borderRadius: "6px",
                  background:
                    "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                  color: "#ffff",
                  fontWeight: "lighter !important",
                  border: "none",
                  outline: "none",
                }}
              >
                Join
              </button>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  onClick={handleOnClickStartGame}
                  style={{
                    padding: "8px 0px",
                    borderRadius: "5px",
                    border: "none",
                    outline: "none",
                    width: "45%",
                    background: "linear-gradient(#7440E9,#A345FB)",
                    color: "white",
                  }}
                >
                  Play
                </button>
                <button
                  onClick={handleClickOpen}
                  style={{
                    borderRadius: "5px",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#69389E",
                    color: "white",
                    padding: "8px 0px",
                    width: "45%",
                  }}
                >
                  Buy Ticket
                </button>
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
                background: "linear-gradient(237deg, #8A3AF1 0%, #7648ED 100%)",
                color: "#fff",
                padding: "10.5px 7px 10.5px 7px",
              }}
            >
              <span>Place</span>
              <span>Reward</span>
            </Box>
            {detailTournament?.tournamentInfors?.rewards.map((item, index) => {
              return (
                index < 6 && (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: index % 2 === 1 ? "#2E2151" : "none",
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
            })}
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
  );
}
