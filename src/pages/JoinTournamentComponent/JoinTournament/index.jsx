import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import {
  getFontSizeBigTitleDependOnWidth,
  getFontSizeDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../../utils/config";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { images280423_l } from "../../../utils/images280423_l";
export default function JoinTournament() {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#1f1933",
      width: width,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#291e42",
      width: width,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#251f41",
      color: "#7c81f3",
      fontWeight: "bolder",
      fontSize: 13,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
      padding: "10px 0px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
    },
  }));
  const { width } = useWindowDimensions();
  const [minLength, setMinLength] = useState(0);
  const numberofRoom = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const numberofRoom = [1, 2, 3, 4, 5, 6];

    if (numberofRoom.length > 1 && numberofRoom.length < 3) {
      setMinLength(numberofRoom.length - 0.5);
    } else if (numberofRoom.length === 3) {
      setMinLength(numberofRoom.length - 0.8);
    } else if (numberofRoom.length === 4) {
      setMinLength(2.8);
    } else if (numberofRoom.length >= 5) {
      setMinLength(3.3);
    } else {
      setMinLength(1);
    }
  }, []);
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "50px" }}>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: width / 7,
            boxSizing: "border-box",
            padding: `${parseFloat(width / 51.9)}px`,
            backgroundColor: "lightgray",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              width: width / 7 - parseFloat(width / 51.9),
              height: "100%",
              backgroundColor: "black",
            }}
          >
            {parseFloat(width / 51.9)}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontSize: getFontSizeTitleDependOnWidth(width) }}>
              Welcome to the
            </Typography>
            <Typography
              sx={{
                fontSize: getFontSizeBigTitleDependOnWidth(width),
                fontWeight: "bolder",
              }}
            >
              LEADER CUP #8
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <button
              style={{
                padding: `${parseFloat(width / 106.67)}px ${parseFloat(
                  width / 27.4
                )}px`,
                borderRadius: "5px",
                border: "none",
                outline: "none",
                backgroundColor: "black",
                color: "white",
              }}
            >
              Join
            </button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#C7C7C7",
            height: parseFloat(width / 18.8),
            boxSizing: parseFloat(width / 43.63),
            //66 43.6
            padding: `${parseFloat(width / 66)}px ${parseFloat(
              width / 43.6
            )}px`,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: parseFloat(width / 11, 7),
                height: "100%",
                backgroundColor: "#929292",
                marginRight: `${width / 96}px`,
                borderRadius: "5px",
              }}
            ></Box>
            <Box
              sx={{
                width: parseFloat(width / 11, 7),
                height: "100%",
                backgroundColor: "#929292",
                marginRight: `${width / 96}px`,
                borderRadius: "5px",
              }}
            ></Box>
            <Box
              sx={{
                width: parseFloat(width / 11, 7),
                height: "100%",
                backgroundColor: "#929292",
                borderRadius: "5px",
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: `${parseFloat(width / 87.27)}px` }}>
              <Typography>Participants</Typography>
              <Typography>29/60</Typography>
            </Box>
            <Box
              sx={{
                position: "relative",
                minWidth: `${
                  (parseFloat(width / 42.67) + parseFloat(width / 384)) *
                  minLength
                }px`,
                height: parseFloat(width / 42.67) + parseFloat(width / 384),
              }}
            >
              {numberofRoom?.map((item, index) => {
                return (
                  index < 5 &&
                  (index === 0 ? (
                    <Box
                      sx={{
                        width:
                          parseFloat(width / 42.67) + parseFloat(width / 384),
                        height:
                          parseFloat(width / 42.67) + parseFloat(width / 384),
                        backgroundColor: "#C7C7C7",
                        borderRadius: "50%",
                        boxSizing: "border-box",
                        padding: `${parseFloat(width / 384)}px`,
                        position: "absolute",
                        right: "0px",
                        top: "0px",
                        zIndex: `${numberofRoom?.length - index}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          backgroundColor:
                            numberofRoom.length > 5 ? "#6C6C6C" : "#929292",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: numberofRoom.length > 5 ? "white" : "none",
                          fontSize: "12px",
                        }}
                      >
                        {numberofRoom.length > 5 &&
                          `+ ${numberofRoom.length - 5}`}
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width:
                          parseFloat(width / 42.67) + parseFloat(width / 384),
                        height:
                          parseFloat(width / 42.67) + parseFloat(width / 384),
                        backgroundColor: "#C7C7C7",
                        borderRadius: "50%",
                        boxSizing: "border-box",
                        padding: `${parseFloat(width / 384)}px`,
                        position: "absolute",
                        right: `${
                          (parseFloat(width / 42.67) +
                            parseFloat(width / 384)) *
                            index -
                          index * (10 + index * 1.5)
                        }px`,
                        top: "0px",
                        zIndex: `${numberofRoom?.length - index}`,
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          backgroundColor: "#929292",
                        }}
                      ></Box>
                    </Box>
                  ))
                );
              })}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              padding: `${parseFloat(width / 66)}px ${parseFloat(
                width / 43.6
              )}px`,
              width: "51.67%",
            }}
          >
            <Box>
              <Box
                sx={{
                  fontSize: getFontSizeTitleDependOnWidth(width),
                  textAlign: "start",
                  fontWeight: "lighter",
                  marginBottom: `${parseFloat(width / 70)}px`,
                }}
              >
                Information
              </Box>
              <Box
                sx={{
                  fontSize: getFontSizeDependOnWidth(width),
                  textAlign: "start",
                }}
              >
                The prize will be credited to your USDT accountBecome a fierce
                battles player. Place your bets and move up the leaderboard. The
                more bets, the higher the reward
              </Box>
              <Box
                sx={{
                  fontSize: getFontSizeDependOnWidth(width),
                  textAlign: "start",
                  marginTop: "8px",
                }}
              >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur earum perspiciatis eaque amet, deserunt, laboriosam
                animi nihil accusantium quis hic delectus vitae perferendis
                excepturi, minima quod officiis similique eos porro.
              </Box>
              <Box sx={{ display: "flex", marginTop: "30px" }}>
                <Box
                  sx={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                    color: "#585858",
                  }}
                >
                  <span style={{ marginTop: "10px" }}>Create</span>
                  <span style={{ marginTop: "10px" }}>Game</span>
                  <span style={{ marginTop: "10px" }}>Even by</span>
                  <span style={{ marginTop: "10px" }}>Prize</span>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span style={{ marginTop: "10px" }}>VSMI Name 123456</span>
                  <span style={{ marginTop: "10px" }}>VSMI Game</span>
                  <span style={{ marginTop: "10px" }}>
                    VSMI, Michelle Ringer, Supper Man
                  </span>
                  <span style={{ marginTop: "10px" }}>Gadcoin</span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: "1",
              padding: `${parseFloat(width / 66)}px ${parseFloat(
                width / 43.6
              )}px ${parseFloat(width / 43.6)}px 0px`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                fontSize: getFontSizeTitleDependOnWidth(width),
                marginBottom: `${parseFloat(width / 70)}px`,
              }}
            >
              Reward
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#C7C7C7",
                borderRadius: "5px",
                boxSizing: "border-box",
                padding: `${width / 192}px ${width / 160}px`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "47%", boxSizing: "border-box" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "5px",
                    backgroundColor: "#9E9E9E",
                    padding: `${parseFloat(width / 160)}px`,
                  }}
                >
                  <span>Place</span>
                  <span>Reward</span>
                </Box>
                {[1, 1, 1, 1, 1, 1].map((item, index) => {
                  return (
                    <Box
                      sx={{
                        padding: `${parseFloat(width / 230)}px ${parseFloat(
                          width / 160
                        )}px`,
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: index % 2 === 1 ? "#E4E3E3" : "none",
                        borderRadius: "5px",
                      }}
                    >
                      <span>1</span>
                      <span>5000 GC</span>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={{ width: "47%", boxSizing: "border-box" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "5px",
                    backgroundColor: "#9E9E9E",
                    padding: `${parseFloat(width / 160)}px`,
                  }}
                >
                  <span>Place</span>
                  <span>Reward</span>
                </Box>
                {[1, 1, 1, 1, 1, 1].map((item, index) => {
                  return (
                    <Box
                      sx={{
                        padding: `${parseFloat(width / 230)}px ${parseFloat(
                          width / 160
                        )}px`,
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: index % 2 === 1 ? "#E4E3E3" : "none",
                        borderRadius: "5px",
                      }}
                    >
                      <span>1</span>
                      <span>5000 GC</span>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* Current Result */}
        <Box
          sx={{
            width: "100%",
            height: "auto",
            padding: `${parseFloat(width / 66)}px ${parseFloat(
              width / 43.6
            )}px`,
          }}
        >
          <Typography
            sx={{
              textAlign: "start",
              fontWeight: "bolder !important",
              color: "#585858",
            }}
          >
            <b>CURRENT RESULT</b>
          </Typography>
          <TableContainer
            sx={{
              borderRadius: 0,
              boxShadow: "unset",
              border: "none",
            }}
            component={Paper}
            className="mt-3"
          >
            <Table aria-label="customized table">
              <TableHead sx={{ borderRadius: "5px" }}>
                <TableRow>
                  <StyledTableCell
                    style={{ borderRadius: "5px 0px 0px 0px" }}
                    align="center"
                  >
                    Ranking
                  </StyledTableCell>
                  <StyledTableCell align="center">Player </StyledTableCell>
                  <StyledTableCell align="center">Time</StyledTableCell>
                  <StyledTableCell
                    style={{ borderRadius: "0px 5px 0px 0px" }}
                    align="center"
                  >
                    Point
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[1, 2, 3, 4, 5, 7, 8].map((item) => {
                  return (
                    <StyledTableRow onClick={() => {}}>
                      <StyledTableCell
                        align="center"
                        component="td"
                        scope="row"
                      >
                        <Box
                          component={"span"}
                          sx={{
                            color: "#7a7fee",
                          }}
                        >
                          1
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box
                          component={"span"}
                          sx={{
                            color: "#fff",
                            fontSize: getFontSizeDependOnWidth(width),
                          }}
                        >
                          VSMI Name 1234
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box
                          component={"span"}
                          sx={{
                            color: "#fff",
                            fontSize: getFontSizeDependOnWidth(width),
                          }}
                        >
                          11 nov 18:00
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Box
                          component={"span"}
                          sx={{
                            color: "#fff",
                            fontSize: getFontSizeDependOnWidth(width),
                          }}
                        >
                          4000
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            className=" d-flex justify-content-between p-2"
            sx={{
              bottom: 0,
              width: "100%",
              background: "#2f2851",
              borderRadius: "0px 0px 5px 5px",
            }}
          >
            <Box
              className="text-white p-2 d-flex align-items-center"
              sx={{
                background: "#1f1933",
                borderRadius: 1,
              }}
            >
              <img
                src={images280423_l.coin}
                alt="..."
                width={25}
                className="img-fluid"
              />
              <span
                className="ms-2"
                style={{
                  color: "white",
                }}
              >
                Dogegold
              </span>
              <ArrowForwardIos
                sx={{
                  color: "#676ac7",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                className="ms-1"
              />
            </Box>
            <Box className="d-flex align-items-center">
              <Box
                className="text-white p-2 d-flex align-items-center"
                sx={{
                  background: "#1f1933",
                  borderRadius: 1,
                }}
              >
                <span
                  className=""
                  style={{
                    color: "white",
                  }}
                >
                  20
                </span>
                <ArrowForwardIos
                  sx={{
                    color: "#676ac7",
                    fontSize: 14,
                  }}
                  className="ms-1"
                />
              </Box>
              <Box
                sx={{
                  color: "#676ac7",
                }}
                className="mx-2"
              >
                Total: 1
              </Box>
              <Box
                className="text-white mx-1 p-2 d-flex align-items-content"
                sx={{
                  background: "#1f1933",
                  borderRadius: 1,
                }}
              >
                <span
                  className=""
                  style={{
                    color: "white",
                  }}
                >
                  1
                </span>
              </Box>
              <Box className="ms-2">
                <ArrowBackIos
                  sx={{
                    color: "#676ac7",
                    fontSize: 14,
                  }}
                />
                <ArrowForwardIos
                  sx={{
                    color: "#676ac7",
                    fontSize: 14,
                  }}
                  className="ms-1"
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
