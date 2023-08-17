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
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import "./index.scss";
import moment from "moment";
import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
import { toggleBuyTicket } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import BuyTicket from "../../../components/Dialog/Tourament/buyTicket";
import LeaderBoard from "../LeaderBoard/index";
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
              justifyContent: "space-between",
              padding: "0px 28px",
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
          <Box sx={{ padding: "28px 28px 0px 28px" }}>
            <Box
              onClick={() => setOpenVoucher(true)}
              component={"img"}
              src={images.Discount10}
            ></Box>
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
                sx={{ marginLeft: "4px", width: "12px", heigth: "12px" }}
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
        />
      </Dialog>
      <BuyTicket id={id} />
    </ThemeProvider>
  );
}
