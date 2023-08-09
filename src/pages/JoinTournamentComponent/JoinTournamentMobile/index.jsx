import {
  Box,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import "./index.scss";
import moment from "moment";
import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
import { toggleBuyTicket } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
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
  const { width } = useWindowDimensions();
  const [detailTournament, setDetailTournament] = useState({});
  const [top3, setTop3] = useState([]);
  const [fetchT, setFetchT] = useState(true);
  const [socket, setSocket] = useState(null);
  const [currentResult, setCurrentResult] = useState(false);
  const [rewardPopup, setRewardPopup] = useState(false);
  const { id } = useParams();
  const { token, userName } = useSelector((state) => state.authReducer);
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
  useEffect(() => {
    setTop3(detailTournament?.tournamentResult?.slice(0, 3));
  }, [detailTournament]);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(toggleBuyTicket(true));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dialog
        sx={{ zIndex: "1310", fontFamily: "Cyntho !important" }}
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
              backgroundImage: `url(${images.DoubleDragonMobile})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "315px",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            {detailTournament?.checkInTournament && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0px 28px 0px 28px",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "lighter !important",
                      color: "#fff",
                      textAlign: "start",
                      marginTop: "5px",
                      fontSize: "12px",
                    }}
                  >
                    Max Plays
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "lighter !important",
                      color: "#fff",
                      textAlign: "start",
                      marginTop: "5px",
                      fontSize: "12px",
                    }}
                  >
                    Highest Point
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "lighter !important",
                      color: "#fff",
                      textAlign: "start",
                      marginTop: "5px",
                      fontSize: "12px",
                    }}
                  >
                    Ranking
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      textAlign: "end",
                      marginTop: "5px",
                      fontSize: "14px",
                    }}
                  >
                    2/3
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      textAlign: "end",
                      marginTop: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {detailTournament?.tournamentResult &&
                      detailTournament?.tournamentResult[0]?.score}{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      textAlign: "end",
                      marginTop: "4px",
                      fontSize: "14px",
                    }}
                  >
                    {detailTournament?.tournamentResult?.length}
                  </Typography>
                </Box>
              </Box>
            )}
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
                width: "35%",
                height: "40px",
                backgroundColor: "#473377",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "16px",
                  height: "16px",
                }}
                alt="..."
                src={images.IconRewardTour}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#ffff",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {detailTournament?.tournamentResult &&
                    detailTournament?.tournamentResult[0]?.score}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#757AE5",
                    fontWeight: "600 !important",
                    fontSize: "12px",
                    margin: "-5px",
                  }}
                >
                  Gadgame coin
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "30%",
                height: "40px",
                backgroundColor: "#473377",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <img
                style={{
                  width: "16px",
                  height: "16px",
                }}
                alt="..."
                src={images.calendarTour}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#ffff",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {moment(detailTournament?.tournamentStartAt).format(
                    "DD/MM/YYYY"
                  )}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#757AE5",
                    fontWeight: "600 !important",
                    fontSize: "12px",
                    margin: "-5px",
                  }}
                >
                  Time Start
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "30%",
                height: "40px",
                backgroundColor: "#473377",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <img
                style={{
                  width: "16px",
                  height: "16px",
                }}
                alt="..."
                src={images.endAtTour}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#ffff",
                    fontSize: "12px",
                    marginTop: "4px",
                  }}
                >
                  {moment(detailTournament?.tournamentEndAt).format(
                    "DD/MM/YYYY"
                  )}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#757AE5",
                    fontWeight: "600 !important",
                    fontSize: "12px",
                    margin: "-5px",
                  }}
                >
                  Time End
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: "28px 28px 0px 28px" }}>
            <button
              onClick={() => setRewardPopup(true)}
              style={{
                width: "100%",
                padding: "6px 0px",
                border: "1px solid #BFBEED",
                outline: "none",
                borderRadius: "5px",
                backgroundColor: "#211D28",
                color: "#BFBEED",
              }}
            >
              <Typography sx={{ fontWeight: "200 !important" }}>
                Reward
              </Typography>
            </button>
          </Box>
          <Box sx={{ padding: "28px 28px 0px 28px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "400 !important",
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
                }}
              >
                {detailTournament?.tournamentParticipants?.length}/
                {detailTournament?.tournamentQuantity}
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
                      zIndex: `${
                        detailTournament?.tournamentParticipants?.length - index
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
                        item?.userAccount.accountAvatar
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            item.userAccount.accountAvatar
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
                              item?.userAccount.accountAvatar
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
                            item?.userAccount.accountAvatar
                              ? process.env.REACT_APP_SOCKET_SERVER +
                                "/" +
                                item.userAccount.accountAvatar
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
              Information
            </Typography>
            <Typography
              sx={{
                color: "#BE48ED",
                fontWeight: "600 !important",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              View all
              <Box
                sx={{ marginLeft: "4px" }}
                component={"img"}
                src={images.viewAllButton}
              ></Box>
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
              {detailTournament?.tournamentInfors?.descriptions?.map(
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
                          fontWeight: "200 !important",
                          fontSize: "13px",
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
          <Box sx={{ padding: "28px 28px 0px 28px" }}>
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
            <Box>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#747EF3",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                Create
              </Typography>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#747EF3",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                Game
              </Typography>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#747EF3",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                Even by
              </Typography>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#747EF3",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                Prize
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  textAlign: "end",
                  color: "#9384B7",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {detailTournament?.tournamentInfors?.createdBy}
              </Typography>
              <Typography
                sx={{
                  textAlign: "end",
                  color: "#9384B7",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {detailTournament?.tournamentInfors?.game?.map(
                  (item, index) => {
                    return <span key={index}>{item?.gameName}</span>;
                  }
                )}
              </Typography>
              <Typography
                sx={{
                  textAlign: "end",
                  color: "#9384B7",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {detailTournament?.tournamentInfors?.evenBy !== ""
                  ? detailTournament?.tournamentInfors?.evenBy
                  : "VSMI, Michelle Ringer, Supper Man"}
              </Typography>
              <Typography
                sx={{
                  textAlign: "end",
                  color: "#9384B7",
                  fontWeight: "lighter !important",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {detailTournament?.tournamentInfors?.price}
              </Typography>
            </Box>
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
                  sx={{ marginLeft: "4px" }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              padding: "28px 28px 0px 28px",
              height: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: `${(width - 20 - 20) * 0.3}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {top3 && top3[1] && (
                <Typography
                  sx={{
                    color: "#D5F0DF",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                  }}
                >
                  2ND
                </Typography>
              )}

              {top3 && top3[1] && (
                <Box
                  sx={{
                    background:
                      "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                    width: "66px",
                    height: "66px",
                    marginTop: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className=""
                    component={"img"}
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                    }}
                    src={
                      top3[1]?.tUser?.userAccount.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[1]?.tUser?.userAccount.accountAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                </Box>
              )}
              <Typography
                sx={{
                  color: "#BFBEED",
                  textAlign: "center",
                  fontSize: "14px",
                  fontStyle: "normal",
                  marginTop: "10px",
                }}
              >
                {top3 && top3[1] && top3[1]?.userNickName}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(191, 190, 237, 0.60)",
                  textAlign: "center",
                  fontSize: "10px",
                  fontStyle: "normal",
                }}
              >
                {top3 &&
                  top3[1] &&
                  moment(top3[1]?.updatedAt).format("DD/MM/YYYY")}
              </Typography>
              <Typography
                className="textReward"
                sx={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontStyle: "normal",
                  marginTop: "10px",
                  color:
                    "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
                }}
              >
                {top3 && top3[1] && top3[1]?.score}
              </Typography>
            </Box>
            <Box
              sx={{
                width: `${(width - 20 - 20) * 0.4}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              {top3 && top3[0] && (
                <Typography
                  sx={{
                    color: "#FFCD00",
                    textAlign: "center",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "700",
                    marginLeft: "-2px !important",
                  }}
                >
                  1ST
                </Typography>
              )}
              {top3 && top3[0] && (
                <Box
                  sx={{
                    background:
                      "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                    width: "106px",
                    height: "106px",
                    marginTop: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className=""
                    component={"img"}
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    src={
                      top3[0]?.tUser?.userAccount.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[0]?.tUser?.userAccount.accountAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                </Box>
              )}
              <Typography
                sx={{
                  color: "#BFBEED",
                  textAlign: "center",
                  fontSize: "28px",
                  fontStyle: "normal",
                  marginTop: "10px",
                }}
              >
                {top3 && top3[0] && top3[0]?.userNickName}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(191, 190, 237, 0.60)",
                  textAlign: "center",
                  fontSize: "12px",
                  fontStyle: "normal",
                }}
              >
                {top3 &&
                  top3[0] &&
                  moment(top3[0]?.updatedAt).format("DD/MM/YYYY")}
              </Typography>
              <Typography
                className="textReward"
                sx={{
                  textAlign: "center",
                  fontSize: "25px",
                  fontStyle: "normal",
                  marginTop: "10px",
                  color:
                    "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
                }}
              >
                {top3 && top3[0] && top3[0]?.score}
              </Typography>
            </Box>
            <Box
              sx={{
                width: `${(width - 20 - 20) * 0.3}px`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {top3 && top3[2] && (
                <Typography
                  sx={{
                    color: "#CD8952",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "700",
                  }}
                >
                  3RD
                </Typography>
              )}
              {top3 && top3[2] && (
                <Box
                  sx={{
                    background:
                      "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                    width: "66px",
                    height: "66px",
                    marginTop: "10px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className=""
                    component={"img"}
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                    }}
                    src={
                      top3[2]?.tUser?.userAccount.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[2]?.tUser?.userAccount.accountAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                </Box>
              )}
              <Typography
                sx={{
                  color: "#BFBEED",
                  textAlign: "center",
                  fontSize: "14px",
                  fontStyle: "normal",
                  marginTop: "10px",
                }}
              >
                {top3 && top3[2] && top3[2]?.userNickName}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(191, 190, 237, 0.60)",
                  textAlign: "center",
                  fontSize: "10px",
                  fontStyle: "normal",
                }}
              >
                {top3 &&
                  top3[2] &&
                  moment(top3[2]?.updatedAt).format("DD/MM/YYYY")}{" "}
              </Typography>
              <Typography
                className="textReward"
                sx={{
                  textAlign: "center",
                  fontSize: "18px",
                  fontStyle: "normal",
                  marginTop: "10px",
                  color:
                    "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
                }}
              >
                {top3 && top3[2] && top3[2]?.score}
              </Typography>
            </Box>
          </Box>
          {/* Brief Leader Board */}
          <Box sx={{ padding: "28px 28px 60px 28px" }}>
            {detailTournament?.tournamentResult?.map((item, index) => {
              return (
                index <= 5 &&
                index > 2 && (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "28px",
                      paddingRight: "16px",
                      borderBottom:
                        index !== 5
                          ? "1px solid rgba(151, 151, 151, 0.40)"
                          : "none",
                      paddingBottom:
                        index !== detailTournament?.tournamentResult?.length - 1
                          ? "15px"
                          : "none",
                    }}
                  >
                    <Box sx={{ color: "#BFBEED", width: "10%" }}>
                      {index + 1}
                    </Box>
                    <Box sx={{ display: "flex", width: "70%" }}>
                      <Box
                        component={"img"}
                        src={
                          item?.tUser?.userAccount.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              item?.tUser?.userAccount.accountAvatar
                            : images.undefinedAvatar
                        }
                        sx={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                          marginRight: "5px",
                        }}
                      ></Box>
                      <Box>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "#BFBEED",
                            fontWeight: "lighter !important",
                          }}
                        >
                          {item?.userNickName}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "start",
                            color: "rgba(191, 190, 237, 0.60)",
                            fontSize: "12px",
                            fontWeight: "lighter !important",
                            marginTop: "-4px !important",
                          }}
                        >
                          {moment(item?.updatedAt).format("DD/MM/YYYY")}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        color: "#fff",
                        width: "20%",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      {item?.score}
                    </Box>
                  </Box>
                )
              );
            })}
          </Box>
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
                  socket?.emit("joinTournament", {
                    tournamentId: detailTournament?.id,
                  });
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
        <Dialog sx={{ zIndex: "1311" }} open={currentResult} fullScreen={true}>
          <Box
            sx={{ backgroundColor: "#211D28", width: "100%", height: "100%" }}
          >
            <Box
              sx={{
                width: "100%",
                height: "44px",
                backgroundColor: "#42285B",
                display: "flex",
                alignItems: "center",
                boxSizing: "border-box",
                padding: "0px 12px",
              }}
            >
              <Box
                component={"img"}
                sx={{ width: width / 30 }}
                src={images.BackButtonLobby}
                onClick={() => {
                  setCurrentResult(false);
                }}
              ></Box>
              <Typography
                onClick={() => {
                  setCurrentResult(false);
                }}
                sx={{ textAlign: "start", color: "#ffff", fontSize: "14px" }}
              >
                Current Result
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "28px 28px 0px 28px",
                height: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: `${(width - 20 - 20) * 0.3}px`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {top3 && top3[1] && (
                  <Typography
                    sx={{
                      color: "#D5F0DF",
                      textAlign: "center",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "700",
                    }}
                  >
                    2ND
                  </Typography>
                )}

                {top3 && top3[1] && (
                  <Box
                    sx={{
                      background:
                        "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                      width: "66px",
                      height: "66px",
                      marginTop: "10px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className=""
                      component={"img"}
                      sx={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
                      src={
                        top3[1]?.tUser?.userAccount.accountAvatar
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            top3[1]?.tUser?.userAccount.accountAvatar
                          : images.undefinedAvatar
                      }
                    ></Box>
                  </Box>
                )}
                <Typography
                  sx={{
                    color: "#BFBEED",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    marginTop: "10px",
                  }}
                >
                  {top3 && top3[1] && top3[1]?.userNickName}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(191, 190, 237, 0.60)",
                    textAlign: "center",
                    fontSize: "10px",
                    fontStyle: "normal",
                  }}
                >
                  {top3 &&
                    top3[1] &&
                    moment(top3[1]?.updatedAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography
                  className="textReward"
                  sx={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontStyle: "normal",
                    marginTop: "10px",
                    color:
                      "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
                  }}
                >
                  {top3 && top3[1] && top3[1]?.score}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: `${(width - 20 - 20) * 0.4}px`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {" "}
                {top3 && top3[0] && (
                  <Typography
                    sx={{
                      color: "#FFCD00",
                      textAlign: "center",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      marginLeft: "-2px !important",
                    }}
                  >
                    1ST
                  </Typography>
                )}
                {top3 && top3[0] && (
                  <Box
                    sx={{
                      background:
                        "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                      width: "106px",
                      height: "106px",
                      marginTop: "10px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className=""
                      component={"img"}
                      sx={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                      src={
                        top3[0]?.tUser?.userAccount.accountAvatar
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            top3[0]?.tUser?.userAccount.accountAvatar
                          : images.undefinedAvatar
                      }
                    ></Box>
                  </Box>
                )}
                <Typography
                  sx={{
                    color: "#BFBEED",
                    textAlign: "center",
                    fontSize: "28px",
                    fontStyle: "normal",
                    marginTop: "10px",
                  }}
                >
                  {top3 && top3[0] && top3[0]?.userNickName}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(191, 190, 237, 0.60)",
                    textAlign: "center",
                    fontSize: "12px",
                    fontStyle: "normal",
                  }}
                >
                  {top3 &&
                    top3[0] &&
                    moment(top3[0]?.updatedAt).format("DD/MM/YYYY")}
                </Typography>
                <Typography
                  className="textReward"
                  sx={{
                    textAlign: "center",
                    fontSize: "25px",
                    fontStyle: "normal",
                    marginTop: "10px",
                    color:
                      "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
                  }}
                >
                  {top3 && top3[0] && top3[0]?.score}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: `${(width - 20 - 20) * 0.3}px`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {top3 && top3[2] && (
                  <Typography
                    sx={{
                      color: "#CD8952",
                      textAlign: "center",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: "700",
                    }}
                  >
                    3RD
                  </Typography>
                )}
                {top3 && top3[2] && (
                  <Box
                    sx={{
                      background:
                        "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                      width: "66px",
                      height: "66px",
                      marginTop: "10px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      className=""
                      component={"img"}
                      sx={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
                      src={
                        top3[2]?.tUser?.userAccount.accountAvatar
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            top3[2]?.tUser?.userAccount.accountAvatar
                          : images.undefinedAvatar
                      }
                    ></Box>
                  </Box>
                )}
                <Typography
                  sx={{
                    color: "#BFBEED",
                    textAlign: "center",
                    fontSize: "14px",
                    fontStyle: "normal",
                    marginTop: "10px",
                  }}
                >
                  {top3 && top3[2] && top3[2]?.userNickName}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(191, 190, 237, 0.60)",
                    textAlign: "center",
                    fontSize: "10px",
                    fontStyle: "normal",
                  }}
                >
                  {top3 &&
                    top3[2] &&
                    moment(top3[2]?.updatedAt).format("DD/MM/YYYY")}{" "}
                </Typography>
                <Typography
                  className="textReward"
                  sx={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontStyle: "normal",
                    marginTop: "10px",
                    color:
                      "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
                  }}
                >
                  {top3 && top3[2] && top3[2]?.score}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ padding: "28px 28px 60px 28px" }}>
              {detailTournament?.tournamentResult?.map((item, index) => {
                return (
                  item?.userNickName !== userName &&
                  index > 2 && (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "28px",
                        paddingRight: "16px",
                        borderBottom:
                          index !==
                          detailTournament?.tournamentResult?.length - 1
                            ? "1px solid rgba(151, 151, 151, 0.40)"
                            : "none",
                        paddingBottom:
                          index !==
                          detailTournament?.tournamentResult?.length - 1
                            ? "15px"
                            : "none",
                      }}
                    >
                      <Box sx={{ color: "#BFBEED", width: "10%" }}>
                        {index + 1}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          width: "70%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Box
                          component={"img"}
                          src={
                            item?.tUser?.userAccount.accountAvatar
                              ? process.env.REACT_APP_SOCKET_SERVER +
                                "/" +
                                item?.tUser?.userAccount.accountAvatar
                              : images.undefinedAvatar
                          }
                          sx={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            marginRight: "5px",
                          }}
                        ></Box>
                        <Box>
                          <Typography
                            sx={{
                              textAlign: "start",
                              color: "#BFBEED",
                              fontWeight: "lighter !important",
                            }}
                          >
                            {item?.userNickName}
                          </Typography>
                          <Typography
                            sx={{
                              textAlign: "start",
                              color: "rgba(191, 190, 237, 0.60)",
                              fontSize: "12px",
                              fontWeight: "lighter !important",
                              marginTop: "-4px !important",
                            }}
                          >
                            {moment(item?.updatedAt).format("DD/MM/YYYY")}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          color: "#fff",
                          width: "20%",
                          boxSizing: "border-box",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {item?.score}
                      </Box>
                    </Box>
                  )
                );
              })}
            </Box>
            <Box
              sx={{
                position: "fixed",
                bottom: "0px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {detailTournament?.tournamentResult
                ?.filter((n) => {
                  return n?.userNickName === userName;
                })
                .map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#68399E",
                        padding: "16px 44px 16px 28px",
                      }}
                    >
                      <Box sx={{ color: "#ffff", width: "10%" }}>4</Box>
                      <Box
                        sx={{
                          display: "flex",
                          width: "70%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Box
                          component={"img"}
                          src={
                            item?.tUser?.userAccount.accountAvatar
                              ? process.env.REACT_APP_SOCKET_SERVER +
                                "/" +
                                item?.tUser?.userAccount.accountAvatar
                              : images.undefinedAvatar
                          }
                          sx={{
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            marginRight: "5px",
                          }}
                        ></Box>
                        <Box>
                          <Typography
                            sx={{
                              textAlign: "start",
                              color: "#ffff",
                              fontWeight: "lighter !important",
                            }}
                          >
                            {item?.userNickName}
                          </Typography>
                          <Typography
                            sx={{
                              textAlign: "start",
                              color: "#ffff",
                              fontSize: "12px",
                              fontWeight: "lighter !important",
                              marginTop: "-4px !important",
                            }}
                          >
                            {moment(item?.updatedAt).format("DD/MM/YYYY")}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          color: "#fff",
                          width: "20%",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {item?.score}
                      </Box>
                    </Box>
                  );
                })}

              <Box
                sx={{
                  width: "100%",
                  padding: "30px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "#251F41",
                }}
              >
                <button
                  style={{
                    background:
                      "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
                    display: "flex",
                    alignItems: "center",
                    border: "none",
                    outline: "none",
                    padding: "8px 15px",
                    borderRadius: "7px",
                  }}
                >
                  <Box
                    sx={{ width: "14px" }}
                    component={"img"}
                    src={images.BackButtonLobby}
                  ></Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: "#fff",
                      fontWeight: "lighter !important",
                    }}
                  >
                    Back
                  </Typography>
                </button>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: "20px",
                      padding: "8px 12px",
                      boxSizing: "border-box",
                      backgroundColor: "#1E1832",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "lighter !important",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    >
                      20
                    </Typography>
                    <Box
                      sx={{ width: "12px" }}
                      component={"img"}
                      src={images.NextButtonPagination}
                    ></Box>
                  </Box>
                  <button
                    style={{
                      background:
                        "linear-gradient(180deg, #8A3AF1 0%, #7648ED 100%)",
                      display: "flex",
                      alignItems: "center",
                      border: "none",
                      outline: "none",
                      padding: "8px 15px",
                      borderRadius: "7px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#fff",
                        fontWeight: "lighter !important",
                        marginRight: "6px !important",
                      }}
                    >
                      Next
                    </Typography>{" "}
                    <Box
                      sx={{ width: "14px" }}
                      component={"img"}
                      src={images.NextButton}
                    ></Box>
                  </button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Dialog>
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
      </Dialog>
      <BuyTicket id={id} />
    </ThemeProvider>
  );
}
