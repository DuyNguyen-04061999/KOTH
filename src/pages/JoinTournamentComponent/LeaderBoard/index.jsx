import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { images } from "../../../utils/images";

export default function LeaderBoard({ detailTournament }) {
  const [top3, setTop3] = useState([]);
  useEffect(() => {
    setTop3(detailTournament?.tournamentResult?.slice(0, 3));
  }, [detailTournament]);
  return (
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
                background: "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
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
            {top3 && top3[1] && moment(top3[1]?.updatedAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            className="textReward"
            sx={{
              textAlign: "center",
              fontSize: "18px",
              fontStyle: "normal",
              marginTop: "10px",
              color: "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
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
                background: "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
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
            {top3 && top3[0] && moment(top3[0]?.updatedAt).format("DD/MM/YYYY")}
          </Typography>
          <Typography
            className="textReward"
            sx={{
              textAlign: "center",
              fontSize: "25px",
              fontStyle: "normal",
              marginTop: "10px",
              color: "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
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
                background: "linear-gradient(180deg, #9D39F1 0%, #BF48ED 100%)",
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
            {top3 && top3[2] && moment(top3[2]?.updatedAt).format("DD/MM/YYYY")}{" "}
          </Typography>
          <Typography
            className="textReward"
            sx={{
              textAlign: "center",
              fontSize: "18px",
              fontStyle: "normal",
              marginTop: "10px",
              color: "linear-gradient(180deg, #9D39F1 29.17%, #BF48ED 42.19%)",
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
            index <= 5 &&
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
                      : "none",
                  paddingTop:
                    index !== detailTournament?.tournamentResult?.length - 1
                      ? "15px"
                      : "none",
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
    </Box>
  );
}
