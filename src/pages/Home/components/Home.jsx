import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import SliderLayout from "../../../components/Slider/index";
import { images, images2, imagesV2, popup } from "../../../utils/images";
import "../scss/home.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import { images270423_l } from "../../../utils/images270423_l";
import Carousel from "../../../components/SlickReact";
import Slider from "react-slick";
import { images280423_l } from "../../../utils/images280423_l";
import SliderFree from "../../../components/SliderFree";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListGame } from "../../../redux-saga-middleware/reducers/gameReducer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import _socket from "../../../redux-saga-middleware/config/socket";
import { formatMoney } from "../../../utils/helper";
import {
  getFontSizeDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../../utils/config";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleWalletDialog } from "../../../redux-saga-middleware/reducers/walletReducer";
import moment from "moment";
import Package from "../../PackagePage/component/Packege";

export default function Home() {
  const { width } = useWindowDimensions();
  const { token, userRole, leaderBoard } = useSelector(
    (state) => state.authReducer
  );

  const { listGame } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [fetchT, setFetchT] = useState(true);
  const [tournaments, setTournaments] = useState([]);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  useEffect(() => {
    dispatch(getListGame());
    socket?.emit("getLeaderBoard", {
      type: "gold",
    });
  }, [dispatch, socket]);

  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <></>,
    prevArrow: <></>,
    // autoplay: true,
    autoplaySpeed: 4000,
  };
  function insertAndShift(arr, from, to) {
    let cutOut = arr.splice(from, 1)[0]; // cut the element at index 'from'
    arr.splice(to, 0, cutOut);
    return arr; // insert it at index 'to'
  }
  useEffect(() => {
    if (token && fetchT) {
      socket?.emit("getListTournament");
    }
  });

  useEffect(() => {
    socket?.on("getListTournamentSuccess", (data) => {
      setTournaments(data);
      setFetchT(false);
    });
    return () => {};
  }, [socket]);
  const renderTournamentList = tournaments?.map((item, index) => {
    return (
      index < 4 && (
        <Grid
          sx={{
            padding:
              index % 2 === 1 ? "20px 0px 20px 20px" : "20px 20px 20px 20px",
          }}
          item
          md={6}
          key={index}
        >
          <Box
            className="content"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#2E2151",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <img
                style={{ borderRadius: "5px 0px 0px 5px" }}
                src={
                  item?.games && item?.games[0]
                    ? process.env.REACT_APP_SOCKET_SERVER +
                      "/" +
                      item?.games[0]?.gameAvatar
                    : images.undefinedAvatar
                }
                alt="..."
                width={200}
                height="100%"
              />
              <Box
                sx={{
                  position: "absolute",
                  backgroundColor: "#f7941c",
                  cursor: "pointer",
                  padding: "10px 10px",
                  bottom: "15px",
                  borderRadius: "0px 50px 50px 0px",
                  display: "flex",
                  alignItems: "center",
                  boxShadow: "2px 8px 16px -8px rgba(0,0,0,0.71);",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px !important",
                    color: "#fff",
                    textAlign: "start",
                  }}
                >
                  <span style={{ fontSize: "12px" }}>Prize Pool:</span>{" "}
                  <span style={{ fontSize: "15px" }}>500</span>
                </Typography>
                <img
                  style={{ width: "18px", height: "18px", marginLeft: "5px" }}
                  alt="..."
                  src={images.goldIcon}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flexGrow: "1",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <Typography variant="h5" sx={{ color: "white" }}>
                  {item?.tournamentName}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "17px",
                    color: "#BEBDEC",
                  }}
                >
                  <Box
                    component={"img"}
                    sx={{ width: "15px", height: "15px" }}
                    src={images.personTour}
                  ></Box>
                  <Typography
                    style={{
                      fontSize: "12px",
                      marginLeft: "5px",
                      display: "block",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      letterSpacing: "1px",
                    }}
                  >
                    {item?.users?.length}/{item?.tournamentQuantity}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    color: "#BEBDEC",
                    marginTop: "17px",
                  }}
                >
                  <Box
                    component={"img"}
                    sx={{
                      width: "15px",
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    src={images.TimeTour}
                  ></Box>
                  <Typography
                    style={{
                      fontWeight: "700",
                      fontSize: "12px",
                      marginLeft: "5px",
                      display: "block",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      letterSpacing: "1px",
                    }}
                  >
                    {moment(item?.tournamentStartAt).format("DD/MM/YYYY")}-
                    {moment(item?.tournamentEndAt).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    color: "#BEBDEC",
                    marginTop: "10px",
                  }}
                >
                  <Box
                    component={"img"}
                    sx={{
                      width: "15px",
                      height: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    src={images.HouseIcon}
                  ></Box>{" "}
                  <Typography
                    style={{
                      fontWeight: "700",
                      fontSize: "12px",
                      marginLeft: "5px",
                      display: "block",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      letterSpacing: "1px",
                    }}
                  >
                    Tournament By: {item?.tournamentUser?.userName}
                  </Typography>
                </Box>
              </Box>
              <Box
                onClick={() => navigate("/tournamentDetail/" + item?.id)}
                sx={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  background: "linear-gradient(#7648ED,#8A3AF1)",
                  color: "white",
                  fontSize: getFontSizeDependOnWidth(width),
                  cursor: "pointer",
                  position: "relative",
                  borderRadius: "0px 0px 5px 0px",
                }}
              >
                <span>View</span>
                <i
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "32%",
                    fontSize: "18px",
                  }}
                  className="fa-solid fa-angle-right"
                ></i>
              </Box>
            </Box>
          </Box>
        </Grid>
      )
    );
  });
  return (
    <div className="home-page">
      {userRole && userRole === "admin" && (
        <div
          className="text-white p-2 ps-3"
          onClick={() => {
            if (token) {
              navigate("/list-game-manager");
            }
          }}
        >
          Game Manager
        </div>
      )}

      {width > 576 ? (
        <Box>
          <Container
            maxWidth={"lg"}
            sx={{
              paddingLeft: "90px !important",
              paddingRight: "90px !important",
            }}
          >
            <Box sx={{ position: "relative" }} className="video-desktop">
              <video
                width={"100%"}
                // height={"300px"}
                // className="img-fluid"
                autoPlay
                playsInline
                loop
                muted
                style={{
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  marginTop: "50px",
                }}
              >
                <source
                  src={images280423_l.bannerVideo}
                  type={width > 1024 ? "video/webm" : "video/mp4"}
                />
              </video>
              <div className="ad">
                <button
                  onClick={() => {
                    if (!token) {
                      dispatch(toggleLoginDialog());
                    } else {
                      dispatch(toggleWalletDialog());
                    }
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    background: "linear-gradient(#6844de,#8c39ff)",
                    color: "white",
                    borderRadius: "5px",
                    position: "absolute",
                    left: "68px",
                    bottom: "39px",
                    padding: "15px 30px",
                    display: width < 1455 ? "none" : "block",
                  }}
                >
                  Deposit & Play
                </button>
              </div>
            </Box>
            <Box className="banner-top">
              <Slider {...settings}>
                <div className="fa-div-focus">
                  <img
                    src={imagesV2.bn2}
                    alt="..."
                    className="cursor-pointer"
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "15px",
                    }}
                    onClick={() => {}}
                  />
                </div>
                <div className="fa-div-focus">
                  <img
                    src={imagesV2.bn3}
                    alt="..."
                    className="cursor-pointer"
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "15px",
                    }}
                    onClick={() => {}}
                  />
                </div>
                <div className="fa-div-focus">
                  <img
                    src={imagesV2.bn4}
                    alt="..."
                    className="cursor-pointer"
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "15px",
                    }}
                  />
                </div>
                <div className="fa-div-focus">
                  <img
                    src={imagesV2.bn1}
                    alt="..."
                    className="cursor-pointer"
                    style={{
                      height: "100%",
                      width: "100%",
                      padding: "15px",
                    }}
                  />
                </div>
              </Slider>
            </Box>
            <Box
              className="top-rated-game mb-5"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
            >
              <div className="group">
                <TitleHomeDesktopComponent
                  type="ratedGame"
                  title="PVP GAMES"
                  icon={images2.iconbattlegame}
                  overBg={images270423_l.overTop}
                  noBg={true}
                />
                <SliderLayout
                  cards={listGame?.filter((item) => item?.gameType === "PVP")}
                />
              </div>
              <div
                className="group"
                style={{
                  marginTop: "2.5rem",
                }}
              >
                <TitleHomeDesktopComponent
                  type="ratedGame"
                  title="FREE TO PLAY"
                  icon={images2.iconrecoment}
                  overBg={images270423_l.overTop}
                  noBg={true}
                />
                <div
                  style={{
                    paddingLeft: width > 576 ? 0 : 0,
                  }}
                >
                  <SliderFree
                    cards={listGame?.filter((item) => item?.gameFree === 1)}
                  />
                </div>
              </div>
            </Box>

            <Box className="crypto-info d-flex justify-content-center">
              <Box
                className="crypto-left"
                sx={{
                  // width: "600px",
                  // height: "100px",
                  backgroundColor: "#352658",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box className="DOGE-COIN">
                  <button
                    style={{
                      borderBottomRightRadius: "50px",
                      borderTopRightRadius: "50px",
                      fontWeight: "700",
                      backgroundColor: "#a58a1a",
                      color: "white",
                      border: "none",
                      padding: "5px 15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "1.75em" }}>DOGE COIN</p>
                    <img
                      src={popup.Doge2}
                      alt="..."
                      width={42}
                      height={42}
                      style={{ marginLeft: "17px" }}
                    />
                  </button>
                </Box>
                <Box
                  className="doge-number"
                  sx={{ paddingLeft: "40px", paddingRight: "20px" }}
                >
                  <Box className="number-top d-flex justify-content-between align-items-center">
                    <Typography variant="h5" sx={{ color: "white" }}>
                      $0.07142902
                    </Typography>
                    <Typography variant="body1" sx={{ color: "red" }}>
                      -1.82%
                    </Typography>
                  </Box>
                  <Box className="number-bot d-flex text-white">
                    <Typography variant="body2">$0.071126060</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        marginLeft: "20px !important",
                        marginRight: "20px",
                        color: "gray",
                      }}
                    >
                      24H
                    </Typography>
                    <Typography variant="body2">$0.071126060</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className="crypto-right d-flex justify-content-center align-items-center"
                sx={{
                  backgroundColor: "#2b2046",
                  padding: "20px 30px",
                }}
              >
                <button
                  style={{
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "4px",
                    background:
                      "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  <Typography variant="h6">Deposit</Typography>
                </button>
              </Box>
            </Box>
            <div
              className="group"
              style={{
                marginTop: "2.5rem",
                paddingLeft: "15px",
                paddingRight: "15px",
              }}
            >
              <TitleHomeDesktopComponent
                type="ratedGame"
                title="TOURNAMENTS"
                icon={images.CupTournament}
                overBg={images270423_l.overTop}
                noBg={true}
              />
              <div
                style={{
                  paddingLeft: width > 576 ? 0 : 0,
                  marginTop: "56px",
                }}
              >
                <Grid container rowSpacing={2} columnSpacing={2}>
                  {renderTournamentList}
                </Grid>
              </div>
            </div>
            <Box
              className="leaderboard"
              style={{ paddingLeft: "15px", paddingRight: "15px" }}
            >
              <TitleHomeDesktopComponent
                type="ratedGame"
                title="LEADERBOARD"
                icon={images2.iconleaderboard}
                overBg={images270423_l.overTop}
                noBg={true}
              />
              <Box className="board">
                <Box
                  className="board-top"
                  sx={{
                    width: "100%",
                    height: "500px",
                    backgroundImage: `url(${images2.brleaderboard})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box className="content-board">
                    {leaderBoard &&
                      leaderBoard?.length > 3 &&
                      insertAndShift(leaderBoard?.slice(0, 3), 1, 0)?.map(
                        (lb, i_lb) => (
                          <div
                            className={
                              i_lb === 0
                                ? "two-st"
                                : i_lb === 1
                                ? "one-st"
                                : "three-st"
                            }
                            key={i_lb}
                          >
                            <div
                              className={
                                i_lb === 0
                                  ? "br-two-st"
                                  : i_lb === 1
                                  ? "br-one-st"
                                  : "br-three-st"
                              }
                              style={{}}
                            >
                              <img
                                src={
                                  i_lb === 0
                                    ? images2.top2
                                    : i_lb === 1
                                    ? images2.top1
                                    : images2.top3
                                }
                                alt="..."
                                width={width < 1200 ? 150 : 200}
                                height={
                                  i_lb === 0 ? 250 : i_lb === 1 ? 350 : 180
                                }
                              />
                              <div className="top-name">
                                <div
                                  className="text-st"
                                  style={{
                                    position: "absolute",
                                    top: "-65px",
                                    left: "83px",
                                    display: "flex",
                                    lineHeight: "1",
                                  }}
                                >
                                  <h6>
                                    {i_lb === 0 ? "2" : i_lb === 1 ? "1" : "3"}
                                  </h6>
                                  <p>
                                    {i_lb === 0
                                      ? "nd"
                                      : i_lb === 1
                                      ? "st"
                                      : "rd"}
                                  </p>
                                </div>
                                <img
                                  className="name-win rounded-circle"
                                  src={
                                    lb?.userAccount?.accountAvatar
                                      ? process.env.REACT_APP_SOCKET_SERVER +
                                        "/" +
                                        lb?.userAccount?.accountAvatar
                                      : images2.ava1
                                  }
                                  alt="..."
                                  width={70}
                                  height={70}
                                  style={{
                                    position: "absolute",
                                    top: "-20px",
                                    left: "60px",
                                  }}
                                />
                                <div
                                  className="desc"
                                  style={{
                                    position: "absolute",
                                    top: "70px",
                                    left: "9px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "180px",
                                  }}
                                >
                                  <h6 className="user text-white">
                                    {lb.userName || `Gad_Game_${i_lb}`}
                                  </h6>
                                  <div className="gold mt-2">
                                    <img
                                      src={images2.goldleaderboard}
                                      alt="..."
                                      width={25}
                                      height={25}
                                    />
                                    <p>{formatMoney(lb?.userGold)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </Box>
                </Box>
                <Box className="board-bot" sx={{ width: "100%" }}>
                  <TableContainer
                    component={Paper}
                    sx={{
                      borderRadius: "0px",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Table
                      sx={{ width: "100%" }}
                      size="medium"
                      aria-label="a dense table"
                    >
                      <TableHead sx={{ backgroundColor: "#331e55" }}>
                        <TableRow>
                          <TableCell
                            align="center"
                            sx={{
                              borderBottom: "none",
                              color: "#877aa8",
                              fontSize: width / 128,
                            }}
                          >
                            Position
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              borderBottom: "none",
                              color: "#877aa8",
                              fontSize: width / 128,
                            }}
                          >
                            Participant
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{
                              borderBottom: "none",
                              color: "#877aa8",
                              fontSize: width / 128,
                            }}
                          >
                            Doge Gold
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ backgroundColor: "#2a1c39" }}>
                        {leaderBoard?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                                color:
                                  index === 0
                                    ? "#ffcd00"
                                    : index === 1
                                    ? "#d5f0ff"
                                    : index === 2
                                    ? "#cd986b"
                                    : "#857cab",
                                fontSize: "18px",
                              }}
                            >
                              {index === 0 ? 1 : index + 1}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                borderBottom: "none",
                                color: "white",
                                fontSize: "18px",
                              }}
                            >
                              <img
                                src={
                                  row?.userAccount?.accountAvatar
                                    ? process.env.REACT_APP_SOCKET_SERVER +
                                      "/" +
                                      row?.userAccount?.accountAvatar
                                    : images2.ava1
                                }
                                alt="..."
                                width={40}
                                height={40}
                                className="me-2 rounded-circle"
                              />
                              {row.userName ||
                                `Gad_Game_${index === 0 ? 1 : index + 1}`}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                borderBottom: "none",
                                color: "yellow",
                                fontSize: "18px",
                              }}
                            >
                              <img
                                src={images2.goldleaderboard}
                                alt="..."
                                width={25}
                                height={25}
                                className="me-1"
                              />
                              {formatMoney(row.userGold)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box>
            <Package />
          </Container>
        </Box>
      ) : (
        <div>
          <Box className="banner-top">
            <div className="card-banner">
              <div className="img">
                <div className="bigbanner" style={{ position: "relative" }}>
                  <video
                    width={"100%"}
                    className="img-fluid"
                    autoPlay
                    playsInline
                    loop
                    muted
                  >
                    <source src={images280423_l.videoMobile} type="video/mp4" />
                  </video>
                  <button
                    onClick={() => {
                      if (!token) {
                        dispatch(toggleLoginDialog());
                      } else {
                        dispatch(toggleWalletDialog());
                      }
                    }}
                    style={{
                      border: "none",
                      outline: "none",
                      background: "linear-gradient(#6844de,#8c39ff)",
                      color: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      left: "20px",
                      bottom: "50px",
                      padding: "5px 15px",
                      fontSize: "13px",
                    }}
                  >
                    Deposit & Play
                  </button>
                </div>
              </div>
            </div>
            <div className="banner-item">
              <Carousel />
            </div>
          </Box>

          <Box className="top-rated-game">
            <div className="group mb-2">
              <div className="title d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center group-left">
                  <div className="img-title">
                    <img
                      className="icon-animate"
                      src={images2.iconbattlegame}
                      alt="..."
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="text-title">
                    <h1
                      style={{
                        fontSize: getFontSizeTitleDependOnWidth(width),
                      }}
                    >
                      PVP GAMES
                    </h1>
                  </div>
                </div>
              </div>
              <div>
                <SliderLayout
                  cards={listGame?.filter((item) => item?.gameType === "PVP")}
                />
              </div>
            </div>
            <div className="group mb-2">
              <div className="title d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center group-left">
                  <div className="img-title">
                    <img
                      className="icon-animate icon-recomment"
                      src={images2.iconrecoment}
                      alt="..."
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="text-title">
                    <h1
                      style={{
                        fontSize: getFontSizeTitleDependOnWidth(width),
                      }}
                    >
                      FREE TO PLAY
                    </h1>
                  </div>
                </div>
              </div>
              <div>
                <SliderFree
                  cards={listGame?.filter((item) => item?.gameFree === 1)}
                />
              </div>
            </div>
            <Box className="crypto-info d-flex justify-content-center">
              <Box
                className="crypto-left"
                sx={{
                  backgroundColor: "#352658",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box className="DOGE-COIN">
                  <button
                    style={{
                      borderBottomRightRadius: "50px",
                      borderTopRightRadius: "50px",
                      fontWeight: "700",
                      backgroundColor: "#a58a1a",
                      color: "white",
                      border: "none",
                      padding: "9px 7px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      DOGE COIN
                    </p>
                    <img
                      src={popup.Doge2}
                      alt="..."
                      width={25}
                      height={25}
                      style={{ marginLeft: "10px" }}
                    />
                  </button>
                </Box>
                <Box className="doge-number ms-1 me-1">
                  <Box className="number-top d-flex justify-content-between align-items-center">
                    <p style={{ color: "white" }}>$0.07142902</p>
                    <p style={{ color: "red" }}>-1.82%</p>
                  </Box>
                  <Box className="number-bot d-flex text-white">
                    <p style={{ fontSize: "10px" }}>$0.071126060</p>
                    <p
                      className="ms-1 me-1"
                      style={{
                        fontSize: "10px",
                      }}
                    >
                      24H
                    </p>
                    <p style={{ fontSize: "10px" }}>$0.071126060</p>
                  </Box>
                </Box>
              </Box>
              <Box
                className="crypto-right d-flex justify-content-center align-items-center"
                sx={{
                  backgroundColor: "#2b2046",
                }}
              >
                <button
                  style={{
                    border: "none",
                    borderRadius: "4px",
                    background:
                      "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                    color: "white",
                    fontWeight: "700",
                    marginLeft: "10px",
                    marginRight: "10px",
                    padding: "5px 10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                    }}
                  >
                    Deposit
                  </p>
                </button>
              </Box>
            </Box>
          </Box>
          <Box className="leaderboard">
            <div className="title d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center group-left">
                <div className="img-title">
                  <img
                    className="icon-animate"
                    src={images2.iconleaderboard}
                    alt="..."
                    width={40}
                    height={40}
                  />
                </div>
                <div className="text-title">
                  <h1
                    style={{
                      fontSize: getFontSizeTitleDependOnWidth(width),
                    }}
                  >
                    LEADERBOARD
                  </h1>
                </div>
              </div>
            </div>
            <Box className="board">
              <Box
                className="board-top"
                sx={{
                  width: "100%",
                  height: "200px",
                  backgroundImage: `url(${images2.brleaderboard})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Box className="content-board">
                  {leaderBoard &&
                    leaderBoard?.length > 3 &&
                    insertAndShift(leaderBoard?.slice(0, 3), 1, 0)?.map(
                      (lb, i_lb) => (
                        <div
                          className={
                            i_lb === 0
                              ? "two-st"
                              : i_lb === 1
                              ? "one-st"
                              : "three-st"
                          }
                          key={i_lb}
                        >
                          <div
                            className={
                              i_lb === 0
                                ? "br-two-st"
                                : i_lb === 1
                                ? "br-one-st"
                                : "br-three-st"
                            }
                            style={{}}
                          >
                            <img
                              src={
                                i_lb === 0
                                  ? images2.top2
                                  : i_lb === 1
                                  ? images2.top1
                                  : images2.top3
                              }
                              alt="..."
                              width={100}
                              height={i_lb === 0 ? 110 : i_lb === 1 ? 150 : 80}
                            />
                            <div className="top-name">
                              <div className="text-st">
                                <h6>
                                  {i_lb === 0 ? "" : i_lb === 1 ? "" : ""}
                                </h6>
                                <p>{i_lb === 0 ? "" : i_lb === 1 ? "" : ""}</p>
                              </div>
                              <img
                                className="name-win rounded-circle"
                                src={
                                  lb?.userAccount?.accountAvatar
                                    ? process.env.REACT_APP_SOCKET_SERVER +
                                      "/" +
                                      lb?.userAccount?.accountAvatar
                                    : images2.ava1
                                }
                                alt="..."
                                width={30}
                                height={30}
                              />
                              <div className="desc">
                                <h6 className="user text-white">
                                  {lb?.userName?.slice(0, 8) ||
                                    `Gad_Game_${i_lb}`}
                                </h6>
                                <div className="gold mt-2">
                                  <img
                                    src={images2.goldleaderboard}
                                    alt="..."
                                    width={10}
                                    height={10}
                                  />
                                  <p
                                    style={{
                                      fontSize: 12,
                                    }}
                                  >
                                    {formatMoney(lb?.userGold)?.slice(0, 7) +
                                      "..."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </Box>
              </Box>
              <Box className="board-bot" sx={{ width: "100%" }}>
                <TableContainer
                  component={Paper}
                  sx={{ borderRadius: "0px", backgroundColor: "transparent" }}
                >
                  <Table
                    sx={{ width: "100%" }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead sx={{ backgroundColor: "#331e55" }}>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{ borderBottom: "none", color: "#877aa8" }}
                        >
                          Position
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ borderBottom: "none", color: "#877aa8" }}
                        >
                          Participant
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ borderBottom: "none", color: "#877aa8" }}
                        >
                          Doge Gold
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: "#2a1c39" }}>
                      {leaderBoard.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            sx={{
                              borderBottom: "none",
                              color: "white",
                            }}
                          >
                            {index === 0 ? 1 : index + 1}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ borderBottom: "none", color: "white" }}
                          >
                            <img
                              src={
                                row?.userAccount?.accountAvatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    row?.userAccount?.accountAvatar
                                  : images2.ava1
                              }
                              alt="..."
                              width={18}
                              height={18}
                              className="me-2 rounded-circle"
                            />
                            {row?.userName?.slice(0, 10) ||
                              `GadGame${index === 0 ? 1 : index + 1}`}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ borderBottom: "none", color: "yellow" }}
                          >
                            <img
                              src={images2.goldleaderboard}
                              alt="..."
                              width={15}
                              height={15}
                              className="me-1"
                            />
                            {formatMoney(row.userGold)?.slice(0, 8)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <div className="container">
            <hr style={{ border: "1px solid #462556" }} />
          </div>
          <Package />
          {/* <Box className="footer mb-5">
            <Box className="footer-content" sx={{ marginBottom: "100px" }}>
              <img className="logo-footer" src={images2.logo_text} alt="..." />
              <div className="text-footer">
                <h1 className=" text-center">Accepted Networks</h1>
              </div>
              <Box className="coin-content d-flex">
                <div className="coin">
                  <img src={popup.Doge2} alt="..." />
                </div>
                <div className="coin">
                  <img src={popup.BNB} alt="..." />
                </div>
                <div className="coin">
                  <img src={popup.BTC} alt="..." />
                </div>
                <div className="coin">
                  <img src={popup.LCoin} alt="..." />
                </div>
                <div className="coin">
                  <img src={popup.TCoin} alt="..." />
                </div>
              </Box>
            </Box>
          </Box> */}
        </div>
      )}
    </div>
  );
}
