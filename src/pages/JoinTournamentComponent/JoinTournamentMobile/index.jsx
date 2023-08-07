import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import "./index.scss";
import moment from "moment";
export default function JoinTournamentMobile({ handleOnClickStartGame }) {
  const { width } = useWindowDimensions();
  const [detailTournament, setDetailTournament] = useState({});
  const [top3, setTop3] = useState([]);
  const [fetchT, setFetchT] = useState(true);
  const [socket, setSocket] = useState(null);
  const { id } = useParams();
  const { token } = useSelector((state) => state.authReducer);
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

  return (
    <Dialog sx={{ zIndex: "1310" }} open={true} fullScreen={true}>
      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: "#211D28",
        }}
      >
        <Box
          sx={{
            height: "35px",
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
            backgroundSize: "cover",
            width: "100%",
            height: "260px",
          }}
        ></Box>
        {/* Slider */}
        <Box></Box>
        <Box sx={{ padding: "20px 20px 0px 20px" }}>
          <button
            style={{
              width: "100%",
              padding: "6px 0px",
              border: "1px solid #BFBEED",
              outline: "none",
              borderRadius: "5px",
              backgroundColor: "#211D28",
              color: "#BFBEED",
              marginTop: "15px",
            }}
          >
            <Typography sx={{ fontWeight: "200 !important" }}>
              Reward
            </Typography>
          </button>
        </Box>
        <Box sx={{ padding: "20px 20px 0px 20px" }}>
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
                    sx={{ borderRadius: "50%", width: "100%", height: "100%" }}
                    src={images.Bitcoin}
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
                              detailTournament?.tournamentParticipants.length >
                              5
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
                            {detailTournament?.tournamentParticipants?.length >
                              5 &&
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
                        src={images.Bitcoin}
                      ></Box>
                    </Box>
                  ))
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            padding: "20px 20px 0px 20px",
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
            padding: "20px 20px 0px 20px",
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
            padding: "10px 20px 0px 20px",
          }}
        >
          <Typography
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
          </Typography>
        </Box>
        <Box sx={{ padding: "20px 20px 0px 20px" }}>
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
            padding: "20px 20px 0px 20px",
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
              {detailTournament?.tournamentInfors?.game?.map((item, index) => {
                return <span key={index}>{item?.gameName}</span>;
              })}
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
        <Box sx={{ padding: "20px 20px 0px 20px" }}>
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
              padding: "20px 20px 0px 20px",
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
            padding: "20px 20px 0px 20px",
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
                  }}
                  src={images.Bitcoin}
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
                  }}
                  src={images.Bitcoin}
                ></Box>
              </Box>
            )}
            <Typography
              sx={{
                color: "#BFBEED",
                textAlign: "center",
                fontSize: "20px",
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
                fontSize: "10px",
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
                  }}
                  src={images.Bitcoin}
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
        <Box sx={{ padding: "20px 20px 60px 20px" }}>
          {detailTournament?.tournamentResult?.map((item, index) => {
            return (
              index <= 2 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    borderBottom:
                      index !== detailTournament?.tournamentResult?.length - 1
                        ? "1px solid rgba(151, 151, 151, 0.40)"
                        : "none",
                    paddingBottom:
                      index !== detailTournament?.tournamentResult?.length - 1
                        ? "15px"
                        : "none",
                  }}
                >
                  <Box sx={{ color: "#BFBEED" }}>4</Box>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      component={"img"}
                      src={images.Bitcoin}
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
                  <Box sx={{ color: "#fff" }}>{item?.score}</Box>
                </Box>
              )
            );
          })}
          <Box
            sx={{
              padding: "0px 0px 10px 0px",
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
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: "0px",
            padding: "20px",
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
                background: "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
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
    </Dialog>
  );
}
