import { Box, Dialog, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { images } from "../../../utils/images";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function LeaderBoard({ detailTournament, open, handleOnClose }) {
  const [top3, setTop3] = useState([]);
  const { width } = useWindowDimensions();
  const { userName } = useSelector((state) => state.authReducer);

  useEffect(() => {
    setTop3(detailTournament?.tournamentResult?.slice(0, 3));
  }, [detailTournament]);

  return (
    <Box>
      {width > 576 ? (
        <Box sx={{ backgroundColor: "#1D1329", borderRadius: "5px" }}>
          <Box
            sx={{
              padding: "28px 62px 0px 62px",
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
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
                    fontSize: "20px",
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
                      top3 && top3?.length >= 3 && top3[1]?.tUser?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[1]?.tUser?.userAccount?.accountAvatar
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
                    fontSize: "20px",
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
                      top3 && top3?.length >= 3 && top3[0]?.tUser?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[0]?.tUser?.userAccount?.accountAvatar
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
                    fontSize: "20px",
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
                      top3 && top3?.length >= 3 && top3[2]?.tUser?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[2]?.tUser?.userAccount?.accountAvatar
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
          <Box sx={{ padding: "28px 28px 0px 28px" }}>
            {detailTournament?.tournamentResult?.map((item, index) => {
              return (
                index <= 4 &&
                index > 2 && (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      paddingRight: "16px",
                      paddingBottom:
                        index !== detailTournament?.tournamentResult?.length - 1
                          ? "15px"
                          : "16px",
                      paddingTop:
                        index !== detailTournament?.tournamentResult?.length - 1
                          ? "15px"
                          : "16px",
                      backgroundColor: "#2E233D",
                      borderRadius: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        color: "#BFBEED",
                        width: "10%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box sx={{ display: "flex", width: "70%" }}>
                      <Box
                        component={"img"}
                        src={
                          item?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              item?.tUser?.userAccount?.accountAvatar
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
          <Dialog onClose={handleOnClose} sx={{ zIndex: "1311" }} open={open}>
            <Box
              sx={{
                backgroundColor: "#211D28",
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
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
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{ textAlign: "start", color: "#ffff", fontSize: "14px" }}
                >
                  Current Result
                </Typography>
                <Box
                  onClick={handleOnClose}
                  component={"img"}
                  src={images.closeVoucher}
                  sx={{ cursor: "pointer" }}
                ></Box>
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
                    width: `200px`,
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
                          top3 && top3?.length >= 3 && top3[1]?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              top3[1]?.tUser?.userAccount?.accountAvatar
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
                    width: `200px`,
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
                          top3 && top3?.length >= 3 && top3[0]?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              top3[0]?.tUser?.userAccount?.accountAvatar
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
                    width: `200px`,
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
                          top3 && top3?.length >= 3 && top3[2]?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              top3[2]?.tUser?.userAccount?.accountAvatar
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
              <Box
                sx={{
                  padding: "28px 28px 0px 28px",
                  overflow: "auto",
                  height: "500px",
                }}
              >
                {detailTournament?.tournamentResult?.map((item, index) => {
                  return (
                    index > 2 &&
                    index < 7 && (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                          paddingRight: "16px",
                          borderBottom:
                            index !==
                            detailTournament?.tournamentResult?.length - 1
                              ? "1px solid rgba(151, 151, 151, 0.40)"
                              : "none",
                          paddingBottom:
                            index !==
                            detailTournament?.tournamentResult?.length - 1
                              ? "20px"
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
                              item?.tUser?.userAccount?.accountAvatar
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  item?.tUser?.userAccount?.accountAvatar
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
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  bottom: "0px",
                }}
              >
                {detailTournament?.tournamentResult
                  ?.filter((n) => {
                    return n?.userNickName === userName;
                  })
                  .map((item, index) => {
                    return (
                      index === 0 && (
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
                                item?.tUser?.userAccount?.accountAvatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    item?.tUser?.userAccount?.accountAvatar
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
                      )
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
        </Box>
      ) : (
        <Box>
          {" "}
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
                      top3 && top3?.length >= 3 && top3[1]?.tUser?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[1]?.tUser?.userAccount?.accountAvatar
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
                      top3 && top3?.length >= 3 && top3[0]?.tUser?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[0]?.tUser?.userAccount?.accountAvatar
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
                      top3 && top3?.length >= 3 && top3[2]?.tUser?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          top3[2]?.tUser?.userAccount?.accountAvatar
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
                          item?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              item?.tUser?.userAccount?.accountAvatar
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
          <Dialog sx={{ zIndex: "1311" }} open={open} fullScreen={true}>
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
                  onClick={handleOnClose}
                ></Box>
                <Typography
                  onClick={handleOnClose}
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
                          top3 && top3?.length >= 3 && top3[1]?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              top3[1]?.tUser?.userAccount?.accountAvatar
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
                          top3 && top3?.length >= 3 && top3[0]?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              top3[0]?.tUser?.userAccount?.accountAvatar
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
                          top3 && top3?.length >= 3 && top3[2]?.tUser?.userAccount?.accountAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              top3[2]?.tUser?.userAccount?.accountAvatar
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
                    index > 2 &&
                    index < 7 && (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                          paddingRight: "16px",
                          borderBottom:
                            index !==
                            detailTournament?.tournamentResult?.length - 1
                              ? "1px solid rgba(151, 151, 151, 0.40)"
                              : "none",
                          paddingBottom:
                            index !==
                            detailTournament?.tournamentResult?.length - 1
                              ? "20px"
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
                              item?.tUser?.userAccount?.accountAvatar
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  item?.tUser?.userAccount?.accountAvatar
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
                              item?.tUser?.userAccount?.accountAvatar
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  item?.tUser?.userAccount?.accountAvatar
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
        </Box>
      )}
    </Box>
  );
}