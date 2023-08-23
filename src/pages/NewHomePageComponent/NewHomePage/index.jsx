import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { imageHome, images, video } from "../../../utils/images";
import InspirationTTF from "../../../assets/font/CynthoNextMedium.otf";
import SlickSlider from "../../../components/SlickSlider";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Package } from "../../PackagePage/component";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import SliderTime from "../../../components/SliderTime";
import Slider from "react-slick";
import FullListTournament from "./FullListTournament";
import CountDownTournament from "../CountDownTournament";
import { getAppType } from "../../../utils/helper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import CountDownBannerHot from "../CountDownBannerHot";
import NewFooter from "../../NewFooter";
import ItemComponent from "./ItemComponent";
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
export default function NewHomePage() {
  const [open, setOpen] = useState(false);
  const [promotion, setPromotion] = useState(true);
  const [startPoint, setstartPoint] = useState(null);
  const { width } = useWindowDimensions();
  const [isFetchList, setIsFetchList] = useState(true);
  const [type, setType] = useState("");
  const [hourList, setHourList] = useState([]);
  const [selectedHour, setSeHour] = useState(0);
  const [dayList, setDayList] = useState([
    "Mon",
    "Tus",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [selectedDay, setSeDay] = useState(0);
  const {
    dailyTournament,
    weeklyTournament,
    hourlyTournament,
    hotTournament,
    biggestEndTour,
    brandTour,
    hotWeekTour,
  } = useSelector((state) => state.tournamentReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isFetchList) {
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "weekly",
      });
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "hot",
      });
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "hourly",
      });
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "daily",
      });
      dispatch({
        type: "CALL_BIGGEST_END_TOUR",
      });
      dispatch({
        type: "CALL_BRAND_TOUR",
      });
      dispatch({
        type: "GET_HOTTEST_WEEK_TOUR",
      });
      setIsFetchList(false);
    }
  }, [dispatch, isFetchList]);
  useEffect(() => {
    setHourList(hourlyTournament.map((item) => moment(item?.timeStart)));
    setDayList(dailyTournament.map((item) => item?.timeStart));
  }, [hourlyTournament, dailyTournament]);
  const navigate = useNavigate();
  const calculateDistance = (x, y, x1, y1) => {
    let distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
    return distance;
  };
  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingLeft: width < 576 ? "24px !important" : "0px !important",
        paddingRight: width < 576 ? "24px !important" : "0px !important",
        paddingTop: width < 576 ? "24px !important" : "50px !important",
      }}
    >
      {" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            paddingBottom: "70px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ marginBottom: width < 576 ? "24px" : "32px" }}>
            {" "}
            <SlickSlider
              appendDot={true}
              images={
                width < 576
                  ? [
                      images.bannerTournamentMobile,
                      images.bannerTournamentMobile_1,
                      images.bannerTournamentMobile_2,
                    ]
                  : [
                      images.bannerTournament,
                      images.bannerTournament1,
                      images.bannerTournament2,
                    ]
              }
            />
          </Box>
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "32px",
              display: "flex",
              flexDirection: "column",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "14px" : "20px",
                    fontWeight: "700 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  HOT TOURNAMENTS{" "}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  if (width > 576) {
                    navigate("/hot-tournament");
                  } else {
                    setOpen(true);
                    setType("hot");
                  }
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    cursor: "pointer",
                  }}
                >
                  View All
                </Typography>
                <Box
                  sx={{
                    width: "12px",
                    height: "12px",
                    marginLeft: width < 576 ? "3px" : "8px",
                  }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: width < 576 ? "24px" : "32px" }}>
              {width < 576 ? (
                <Slider
                  dots={false}
                  slidesToShow={2}
                  arrows={false}
                  slidesToScroll={2}
                  infinite={false}
                >
                  {hotTournament?.map((item, index) => {
                    return <ItemComponent tourInfo={item} countdown={true} />;
                  })}
                </Slider>
              ) : (
                <Slider
                  dots={false}
                  slidesToShow={6}
                  arrows={false}
                  slidesToScroll={5}
                  infinite={false}
                >
                  {hotTournament?.map((item, index) => {
                    return (
                      <>
                        <ItemComponent countdown={true} tourInfo={item} />
                      </>
                    );
                  })}
                </Slider>
              )}
            </Box>
          </Box>{" "}
          {/* ------------------------------------------- */}
          {/* Banner winner ---> dynamically render */}
          {width < 576 ? (
            <Box
              sx={{
                width: "100%",
                marginTop: width < 576 ? "24px" : "32px",
                marginBottom: width < 576 ? "24px" : "32px",
                backgroundImage: `url(${imageHome.banner_win_Mobile})`,
                height: "208.612px",
                backgroundSize: "cover",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box sx={{ position: "absolute", top: "-35px" }}>
                  {" "}
                  <Box
                    sx={{
                      backgroundImage: `url(${imageHome.ringMobile})`,
                      width: "81px",
                      height: "81px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "75px",
                        height: "75px",
                        borderRadius: "50%",
                      }}
                      src={images.gameHotTournament}
                      component={"img"}
                    ></Box>
                    <Box
                      sx={{ position: "absolute", top: "-17px", left: "5px" }}
                      component={"img"}
                      src={imageHome.hatMobile}
                    ></Box>
                  </Box>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "12.035px",
                      fontWeight: "lighter !important",
                      paddingTop: "10px",
                    }}
                  >
                    {biggestEndTour?.bestUser?.userNickName}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  boxSizing: "border-box",
                  padding: "50px 0px 0px 0px",
                  position: "relative",
                  justifyContent: "flex-start",
                  height: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: "#FFDC62",
                    fontSize: "20px",
                    marginLeft: "0px !important",
                  }}
                >
                  MEGA HOLIC
                </Typography>
                <Box
                  sx={{
                    backgroundImage: `url(${imageHome.megaholicMobile})`,
                    width: `${width / 1.6}px`,
                    height: "113px",
                    marginTop: "10px",
                    position: "absolute",
                    top: "89px",
                    left: "-23px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "10px 40px",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: "40px" }}>
                    {biggestEndTour?.endTour?.tournamentPrize
                      ? biggestEndTour?.endTour?.tournamentPrize + " $"
                      : ""}
                  </Typography>
                  <Typography sx={{ color: "#fff", fontSize: "9px" }}>
                    GRAND TOURNAMENT WINNER
                  </Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                marginTop: width < 576 ? "24px" : "32px",
                marginBottom: width < 576 ? "24px" : "32px",
                backgroundImage: `url(${images.banner_win_BG})`,
                height: "348.909px",
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${images.winnerBG})`,
                  height: "400px",
                  width: "568px",
                  marginLeft: "0px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  boxSizing: "border-box",
                  paddingLeft: "10px",
                }}
              >
                <Box
                  component={"img"}
                  src={images.pool}
                  sx={{
                    borderRadius: "50%",
                    width: "168px",
                    position: "absolute",
                    left: "200px",
                    top: "116px",
                  }}
                ></Box>
                <Box
                  component={"img"}
                  src={images.hatWinner}
                  sx={{
                    width: "81.119px",
                    height: "auto",
                    position: "absolute",
                    left: "210px",
                    top: "71px",
                  }}
                ></Box>
                <Typography
                  sx={{
                    position: "absolute",
                    left: "271px",
                    bottom: "50px",
                    color: "#ffff",
                    fontSize: "33px",
                    marginLeft: "0px !important",
                  }}
                >
                  {biggestEndTour?.bestUser?.userNickName}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundImage: `url(${imageHome.megaHolicBanner})`,
                  backgroundSize: "cover",
                  width: "503px",
                  height: "278px",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    marginLeft: "0px !important",
                    color: "#FFDC62",
                    fontSize: "38px",
                    position: "absolute",
                    top: "38px",
                    left: "90px",
                  }}
                >
                  MEGA HOLIC
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "0px !important",
                    color: "#fff",
                    fontSize: "88px",
                    position: "absolute",
                    top: "85px",
                    left: "140px",
                  }}
                >
                  {biggestEndTour?.endTour?.tournamentPrize
                    ? biggestEndTour?.endTour?.tournamentPrize + "$"
                    : ""}
                </Typography>
                <Typography
                  sx={{
                    marginLeft: "0px !important",
                    fontSize: "15px",
                    color: "#ffff",
                    position: "absolute",
                    top: "214px",
                    left: "212px",
                    height: "20px",
                  }}
                >
                  GRAND TOURNAMENT WINNER
                </Typography>
              </Box>
            </Box>
          )}
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "32px",
              display: "flex",
              flexDirection: "column",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "14px" : "20px",
                    fontWeight: "200 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  Hourly tournament{" "}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  if (width > 576) {
                    navigate("/hourly-tournament");
                  } else {
                    setOpen(true);
                    setType("hourly");
                  }
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    cursor: "pointer",
                  }}
                >
                  View All
                </Typography>
                <Box
                  sx={{
                    width: "12px",
                    height: "12px",
                    marginLeft: width < 576 ? "3px" : "8px",
                  }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Box>
            </Box>
            <Box>
              <SliderTime
                updateSelectedIndex={(index) => {
                  setSeHour(index);
                }}
                selectedItem={selectedHour}
                list={hourList?.map((item) => moment(item)?.format("HH:mm"))}
              />
            </Box>
            <Box
              sx={{
                marginTop: width < 576 ? "12px" : "16px",
                marginBottom: width < 576 ? "12px" : "16px",
              }}
            >
              <CountDownTournament expiryTime={hourList[selectedHour]} />
            </Box>
            <Box>
              {width < 576 ? (
                <Slider
                  dots={false}
                  slidesToShow={2}
                  arrows={false}
                  slidesToScroll={2}
                  infinite={true}
                >
                  {hourlyTournament
                    ?.filter(
                      (n) =>
                        moment(n.timeStart).format("HH:mm") ===
                        hourList[selectedHour]?.format("HH:mm")
                    )[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        <ItemComponent countdown={false} tourInfo={item} />
                      );
                    })}
                </Slider>
              ) : (
                <Slider
                  dots={false}
                  slidesToShow={5}
                  arrows={false}
                  slidesToScroll={5}
                  infinite={true}
                >
                  {hourlyTournament
                    ?.filter(
                      (n) =>
                        moment(n.timeStart).format("HH:mm") ===
                        hourList[selectedHour]?.format("HH:mm")
                    )[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        <>
                          <ItemComponent countdown={true} tourInfo={item} />
                        </>
                      );
                    })}
                </Slider>
              )}
            </Box>
          </Box>{" "}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "32px",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            <video width={"100%"} playsInline muted autoPlay loop={true}>
              <source
                src={
                  width < 576
                    ? video.Promo_Sale_Video_Mobile
                    : video.Promo_Sale_Video_Desktop
                }
                type="video/mp4"
              />
            </video>
          </Box>
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "32px",
              display: "flex",
              flexDirection: "column",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "14px" : "20px",
                    fontWeight: "200 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  Daily Tournaments
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  if (width > 576) {
                    navigate("/daily-tournament");
                  } else {
                    setOpen(true);
                    setType("daily");
                  }
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    cursor: "pointer",
                  }}
                >
                  View All
                </Typography>
                <Box
                  sx={{ width: "12px", height: "12px", marginLeft: "3px" }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Box>
            </Box>
            <Box>
              <SliderTime
                updateSelectedIndex={(index) => {
                  setSeDay(index);
                }}
                selectedItem={selectedDay}
                list={dayList}
                type={"day"}
              />
            </Box>

            <Box sx={{ marginTop: width < 576 ? "12px" : "32px" }}>
              {width < 576 ? (
                <Slider
                  dots={false}
                  slidesToShow={2}
                  arrows={false}
                  slidesToScroll={2}
                  infinite={true}
                >
                  {dailyTournament
                    ?.filter((n) => n.timeStart === dayList[selectedDay])[0]
                    ?.listTournament?.map((item, index) => {
                      return <ItemComponent countdown={true} tourInfo={item} />;
                    })}
                </Slider>
              ) : (
                <Slider
                  dots={false}
                  slidesToShow={5}
                  arrows={false}
                  slidesToScroll={5}
                  infinite={true}
                >
                  {dailyTournament
                    ?.filter((n) => n.timeStart === dayList[selectedDay])[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        <>
                          <ItemComponent countdown={true} tourInfo={item} />
                        </>
                      );
                    })}
                </Slider>
              )}
            </Box>
          </Box>{" "}
          {/* Brief information */}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "32px",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            {" "}
            {width < 576 ? (
              <SlickSlider
                appendDot={false}
                isHtmlCode={true}
                htmlCode={brandTour?.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Box
                        sx={{
                          backgroundColor: "#0F041D",
                          backgroundImage:
                            "linear-gradient(to right bottom, #0F041D, #300755, #4e087b, #5a0681, #730c93, #6e2099, #692d9e, #6437a2, #4f48a6, #3e55a5, #355ea0, #386699)",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "121.44px",
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 10px 10px 25px",
                          boxSizing: "border-box",
                          justifyContent: "space-between",
                          borderRadius: "5px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{ width: "48px", height: "auto" }}
                            component={"img"}
                            src={imageHome.MCDonalIcon}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "14px",
                              fontWeight: "lighter !important",
                              marginTop: "5px",
                            }}
                          >
                            Mcdonald
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backgroundBlendMode: "overlay",
                            height: "100%",
                            width: "217.76px",
                            borderRadius: "3px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "15px 10px",
                            boxSizing: "border-box",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "12px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                }}
                              >
                                BIG EARN UP TO
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "10px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                  marginTop: "-4px",
                                }}
                              >
                                For top 10
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                color: "#FFC107",
                                fontSize: "25px",
                              }}
                            >
                              {item?.tournamentPrize}$
                            </Typography>
                          </Box>
                          <button
                            style={{
                              border: "none",
                              outline: "none",
                              width: "100%",
                              borderRadius: "5px",
                              background:
                                "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                              color: "#ffff",
                              fontSize: "14px",
                              padding: "4px 0px",
                            }}
                          >
                            Play now
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              />
            ) : (
              <Slider
                dots={false}
                slidesToShow={3}
                arrows={false}
                slidesToScroll={2}
                infinite={false}
              >
                {brandTour?.map((item, index) => {
                  return (
                    <Box sx={{ padding: "0px 16px" }} key={index}>
                      <Box
                        sx={{
                          backgroundImage: `url(${imageHome.voucherBanner})`,
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "121.44px",
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 23px 10px 23px",
                          boxSizing: "border-box",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{ width: "48px", height: "auto" }}
                            component={"img"}
                            src={imageHome.MCDonalIcon}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "14px",
                              fontWeight: "lighter !important",
                              marginTop: "5px",
                            }}
                          >
                            Mcdonald
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backgroundBlendMode: "overlay",
                            height: "100%",
                            width: "217.76px",
                            borderRadius: "3px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "15px 10px",
                            boxSizing: "border-box",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "12px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                }}
                              >
                                BIG EARN UP TO
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "10px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                  marginTop: "-4px",
                                }}
                              >
                                For top 10
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                color: "#FFC107",
                                fontSize: "25px",
                              }}
                            >
                              {item?.tournamentPrize}$
                            </Typography>
                          </Box>
                          <button
                            style={{
                              border: "none",
                              outline: "none",
                              width: "100%",
                              borderRadius: "5px",
                              background:
                                "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                              color: "#ffff",
                              fontSize: "14px",
                              padding: "4px 0px",
                            }}
                          >
                            Play now
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Slider>
            )}
          </Box>
          {/* ------------------------ */}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "32px",
              marginBottom: width < 576 ? "24px" : "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "14px" : "20px",
                    fontWeight: "200 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  Week-long tournament{" "}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  if (width > 576) {
                    navigate("/week-long-tournament");
                  } else {
                    setOpen(true);
                    setType("week-long");
                  }
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    cursor: "pointer",
                  }}
                >
                  View All
                </Typography>
                <Box
                  sx={{ width: "12px", height: "12px", marginLeft: "3px" }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: width < 576 ? "12px" : "32px" }}>
              {width < 576 ? (
                <Slider
                  dots={false}
                  slidesToShow={2}
                  arrows={false}
                  slidesToScroll={2}
                  infinite={false}
                >
                  {weeklyTournament?.map((item, index) => {
                    return <ItemComponent countdown={true} tourInfo={item} />;
                  })}
                </Slider>
              ) : (
                <Slider
                  dots={false}
                  slidesToShow={5}
                  arrows={false}
                  slidesToScroll={5}
                  infinite={false}
                >
                  {weeklyTournament?.map((item, index) => {
                    return (
                      <>
                        <ItemComponent countdown={true} tourInfo={item} />
                      </>
                    );
                  })}
                </Slider>
              )}
            </Box>
          </Box>{" "}
          {/* Banner Top1 */}
          {width < 576 ? (
            <Box
              sx={{
                marginTop: width < 576 ? "24px" : "32px",
                marginBottom: width < 576 ? "24px" : "32px",
                backgroundImage: `url(${imageHome.bannerTop1Mobile})`,
                width: "100%",
                height: "210px",
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#0687C9",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    position: "absolute",
                    top: "-3px",
                    left: "-2px",
                  }}
                  src={images.pool}
                  component={"img"}
                ></Box>{" "}
                <Box
                  sx={{
                    width: "60px",
                    height: "auto",
                    position: "absolute",
                    top: "-40px",
                    left: "-19px",
                  }}
                  component={"img"}
                  src={imageHome.top1Icon}
                ></Box>
              </Box>
              <Box sx={{ paddingLeft: "20px" }}>
                <Typography
                  sx={{
                    color: "#FFDC62",
                    textAlign: "start",
                    fontSize: "10px",
                    marginLeft: "0px !important",
                  }}
                >
                  TOURNAMENT OF THE WEEK
                </Typography>
                <Box
                  component={"img"}
                  src={imageHome.titleImage}
                  sx={{ width: "197.541px", margin: "10px 0px 10px 0px" }}
                ></Box>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{ width: "23px", height: "auto" }}
                    component={"img"}
                    src={imageHome.brandAvatar}
                  ></Box>
                  <Box
                    sx={{
                      width: "0.729px",
                      backgroundColor: "#371972",
                      margin: "0px 12px 0px 12px",
                    }}
                  ></Box>
                  <CountDownBannerHot
                    expiryTime={moment(hotWeekTour?.tournamentEndAt)}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(139, 31, 207, 0.30)",
                    borderRadius: "5px",
                    marginTop: "15px",
                    padding: "4px 5px",
                    width: `${width / 2.1}px`,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "8px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      Get
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FAA515",
                        textAlign: "start",
                        fontSize: "10.062px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      $100
                    </Typography>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "8px",
                        marginLeft: "0px !important",
                      }}
                    >
                      gift
                    </Typography>
                  </Box>
                  <button
                    onClick={() => {
                      navigate("/tournamentDetail/" + hotWeekTour?.id);
                    }}
                    style={{
                      background:
                        "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                      outline: "none",
                      border: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      padding: `2.683px ${width / 16}px`,
                      fontSize: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Play now
                  </button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                marginTop: width < 576 ? "24px" : "32px",
                marginBottom: width < 576 ? "24px" : "32px",
                backgroundImage: `url(${
                  width < 576
                    ? imageHome.bannerTop1Mobile
                    : imageHome.bannerTop1
                })`,
                width: "100%",
                height: "348.909px",
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  width: "210px",
                  height: "210px",
                  borderRadius: "50%",
                  backgroundColor: "#0687C9",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    width: "210px",
                    height: "210px",
                    position: "absolute",
                    top: "-6px",
                    left: "-4px",
                  }}
                  src={images.pool}
                  component={"img"}
                ></Box>
                <Box
                  sx={{
                    width: "140px",
                    height: "auto",
                    position: "absolute",
                    top: "-50px",
                    left: "-76px",
                  }}
                  component={"img"}
                  src={imageHome.top1Icon}
                ></Box>
              </Box>
              <Box sx={{ paddingLeft: "50px" }}>
                <Typography
                  sx={{
                    color: "#FFDC62",
                    textAlign: "start",
                    fontSize: "16.042px",
                    marginLeft: "0px !important",
                  }}
                >
                  TOURNAMENT OF THE WEEK
                </Typography>
                <Box
                  component={"img"}
                  src={imageHome.titleImage}
                  sx={{ width: "590.538px", margin: "10px 0px 20px 0px" }}
                ></Box>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{ width: "60px", height: "auto" }}
                    component={"img"}
                    src={imageHome.brandAvatar}
                  ></Box>
                  <Box
                    sx={{
                      width: "2.027px",
                      backgroundColor: "#371972",
                      margin: "0px 12px 0px 12px",
                    }}
                  ></Box>
                  <CountDownBannerHot
                    expiryTime={moment(hotWeekTour?.tournamentEndAt)}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(139, 31, 207, 0.30)",
                    borderRadius: "5px",
                    marginTop: "35px",
                    padding: "10.026px 14.037px",
                    width: "420px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "20px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      Get
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FAA515",
                        textAlign: "start",
                        fontSize: "30.078px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      ${hotWeekTour?.tournamentPrize}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "20px",
                        marginLeft: "0px !important",
                      }}
                    >
                      gift
                    </Typography>
                  </Box>
                  <button
                    onClick={() => {
                      navigate("/tournamentDetail/" + hotWeekTour?.id);
                    }}
                    style={{
                      background:
                        "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                      outline: "none",
                      border: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      padding: "0px 60px",
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Play now
                  </button>
                </Box>
              </Box>
            </Box>
          )}
          <FullListTournament
            type={type}
            open={open}
            handleOnClose={() => {
              setOpen(false);
            }}
          />
          {getAppType() === "promote" ? <Package /> : <></>}
          <NewFooter />
          {promotion && width < 576 && (
            <Draggable
              onStart={(e, data) => {
                setstartPoint({ startX: data.x, startY: data.y });
              }}
              onStop={(e, data) => {
                if (
                  calculateDistance(
                    startPoint?.startX,
                    startPoint?.startY,
                    data.x,
                    data.y
                  ) < 3
                ) {
                  navigate("/luckywheel");
                }
              }}
              cancel=".clickable"
              defaultPosition={{ x: 0, y: 0 }}
              bounds="parent"
            >
              <Box sx={{ position: "fixed", zIndex: "1302" }}>
                <Box sx={{ position: "relative" }}>
                  {" "}
                  <Box
                    onClick={() => {
                      navigate("/luckywheel");
                    }}
                    src={images.SpinIconHomePage}
                    component={"img"}
                  ></Box>
                  <Box
                    className="clickable"
                    onClick={() => {
                      setPromotion(false);
                    }}
                    sx={{ position: "absolute", top: "0px", right: "-10px" }}
                    component={"img"}
                    src={images.closePromo}
                  ></Box>
                </Box>
              </Box>
            </Draggable>
          )}
        </Box>
      </ThemeProvider>
    </Container>
  );
}
