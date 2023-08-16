import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { imageDesktop, images, video } from "../../../utils/images";
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
  const typographyStyle = {
    textAlign: "start",
    fontSize: width < 576 ? "12px" : "14px",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };

  // HourList
  const [hourList, setHourList] = useState([
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
    "25:00",
    "00:00",
  ]);
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
                      images.bannerTournament,
                      images.bannerTournament1,
                      images.bannerTournament2,
                    ]
                  : [
                      images.BannerHomePageDesktop,
                      images.BannerHomePageDesktop,
                      images.BannerHomePageDesktop,
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
                  setOpen(true);
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 10px 0px 10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "8px",
                            padding: "8px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.GameTournament}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#FFDC62",
                              fontSize: "14px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Get $100 gift
                          </Typography>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "12px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "-3px",
                              width: "100%",
                            }}
                          >
                            By Mcdonald’s
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Slider>
              ) : (
                <Slider
                  dots={false}
                  slidesToShow={3.5}
                  arrows={false}
                  slidesToScroll={2}
                  infinite={false}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 16px 0px 16px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "5px",
                            padding: "10px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "3px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.gameHotTournament}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "18px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Name tournament
                          </Typography>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                color: "#FFDC62",
                                fontSize: "16px",
                                fontWeight: "lighter !important",
                                textAlign: "start",
                                marginTop: "-3px",
                                width: "100%",
                              }}
                            >
                              Get $100 gift
                            </Typography>
                            <Typography
                              sx={{
                                color: "#ffff",
                                fontSize: "14px",
                                fontWeight: "lighter !important",
                                textAlign: "end",
                                marginTop: "-3px",
                                width: "100%",
                              }}
                            >
                              By Samsung
                            </Typography>
                          </Box>
                          <button
                            style={{
                              width: "100%",
                              border: "none",
                              background:
                                "linear-gradient(270deg, #EB00FF 0%, #7224D7 76.56%)",
                              outline: "none",
                              color: "#fff",
                              borderRadius: "5px",
                              marginTop: "5px",
                              padding: "5px 0px",
                            }}
                          >
                            Play now
                          </button>
                        </Box>
                      </Box>
                    );
                  })}
                </Slider>
              )}
            </Box>
          </Box>{" "}
          {/* ------------------------------------------- */}
          {/* Hourly tournament */}
          {/* Banner winner ---> dynamically render */}
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
                background: `url(${images.winnerBG})`,
                height: "400px",
                width: "568px",
                marginLeft: "0px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box
                component={"img"}
                src={images.pool}
                sx={{
                  borderRadius: "50%",
                  width: "168px",
                  position: "absolute",
                  left: "215px",
                  top: "119px",
                }}
              ></Box>
              <Box
                component={"img"}
                src={images.hatWinner}
                sx={{
                  width: "81.119px",
                  height: "auto",
                  position: "absolute",
                  left: "223px",
                  top: "77px",
                }}
              ></Box>
            </Box>
          </Box>{" "}
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
                  setOpen(true);
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
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
                list={hourList}
              />
            </Box>
            <Box
              sx={{
                marginTop: width < 576 ? "12px" : "16px",
                marginBottom: width < 576 ? "12px" : "16px",
              }}
            >
              <CountDownTournament />
            </Box>
            <Box>
              {width < 576 ? (
                <Slider
                  dots={false}
                  slidesToShow={2}
                  arrows={false}
                  slidesToScroll={2}
                  infinite={false}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 10px 0px 10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "8px",
                            padding: "8px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.GameTournament}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#FFDC62",
                              fontSize: "14px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Get $100 gift
                          </Typography>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "12px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "-3px",
                              width: "100%",
                            }}
                          >
                            By Mcdonald’s
                          </Typography>
                        </Box>
                      </Box>
                    );
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 16px 0px 16px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "8px",
                            padding: "12px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.gameHotTournament_1}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#FFDC62",
                              fontSize: "16px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Get $100 gift
                          </Typography>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "14px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "-3px",
                              width: "100%",
                            }}
                          >
                            By Samsung
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Slider>
              )}
            </Box>
          </Box>{" "}
          {/* ---------------------------- */}
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
                  Daily Tournaments
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  setOpen(true);
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
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
                  infinite={false}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 10px 0px 10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "8px",
                            padding: "8px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.GameTournament}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#FFDC62",
                              fontSize: "14px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Get $100 gift
                          </Typography>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "12px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "-3px",
                              width: "100%",
                            }}
                          >
                            By Mcdonald’s
                          </Typography>
                        </Box>
                      </Box>
                    );
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 16px 0px 16px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "8px",
                            padding: "12px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.gameHotTournament_1}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#FFDC62",
                              fontSize: "16px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Get $100 gift
                          </Typography>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "14px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "-3px",
                              width: "100%",
                            }}
                          >
                            By Samsung
                          </Typography>
                        </Box>
                      </Box>
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
                images={[images.banner_5, images.banner_6, images.banner_7]}
              />
            ) : (
              <Slider
                dots={false}
                slidesToShow={3}
                arrows={false}
                slidesToScroll={2}
                infinite={false}
              >
                {[
                  images.banner_5_dk,
                  images.banner_6_dk,
                  images.banner_7_dk,
                ].map((item, index) => {
                  return (
                    <Box sx={{ padding: "0px 16px" }}>
                      <Box
                        key={index}
                        sx={{ width: "100%" }}
                        component={"img"}
                        src={item}
                      ></Box>
                    </Box>
                  );
                })}
              </Slider>
            )}
          </Box>
          {/* ------------------------ */}
          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              flexDirection: "column",
              marginBottom: "24px",
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
                  setOpen(true);
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 10px 0px 10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "8px",
                            padding: "8px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.GameTournament}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#FFDC62",
                              fontSize: "14px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Get $100 gift
                          </Typography>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "12px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "-3px",
                              width: "100%",
                            }}
                          >
                            By Mcdonald’s
                          </Typography>
                        </Box>
                      </Box>
                    );
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
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100% !important",
                          padding: "0px 16px 0px 16px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {" "}
                        <Box
                          sx={{
                            height: "auto",
                            width: "100% !important",
                            backgroundColor: "#37285C",
                            borderRadius: "8px",
                            padding: "12px ",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              borderRadius: "5px",
                              width: "100%",
                              height: "auto",
                            }}
                            component={"img"}
                            src={images.gameHotTournament_1}
                          ></Box>
                          <Typography
                            sx={{
                              color: "#FFDC62",
                              fontSize: "16px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "5px",
                              width: "100%",
                            }}
                          >
                            Get $100 gift
                          </Typography>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "14px",
                              fontWeight: "200 !important",
                              textAlign: "start",
                              marginTop: "-3px",
                              width: "100%",
                            }}
                          >
                            By Samsung
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Slider>
              )}
            </Box>
          </Box>{" "}
          {/* ---------------------------- */}
          {/* Sẽ được tách component */}
          <FullListTournament
            open={open}
            handleOnClose={() => {
              setOpen(false);
            }}
          />
          <Package />
          {/* Footer */}
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: width < 576 ? "none" : "center",
              }}
            >
              <Typography
                sx={{ color: "#ffff", fontSize: width < 576 ? "16px" : "25px" }}
              >
                Support
              </Typography>
              <Box sx={{ width: width > 576 ? "38%" : "none" }}>
                {" "}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "20px 10px 0px",
                  }}
                >
                  <Typography sx={{ ...typographyStyle }}>
                    Help center
                  </Typography>
                  <Typography sx={{ ...typographyStyle }}>Fairness</Typography>
                  <Typography sx={{ ...typographyStyle }}>FAG</Typography>
                  <Typography sx={{ ...typographyStyle }}>
                    Privacy Policy
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 40px",
                  }}
                >
                  <Typography sx={{ ...typographyStyle }}>
                    Term of service
                  </Typography>
                  <Typography sx={{ ...typographyStyle }}>
                    Design resources
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <Box
                component={"img"}
                sx={{
                  width: width < 576 ? "120px" : "200px",
                  height: width < 576 ? "44px" : "73.333px",
                  marginTop: "30px",
                }}
                src={imageDesktop.LogoCongTy}
              ></Box>
            </Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "200 !important",
                fontSize: width < 576 ? "12px" : "16px",
                lineHeight: "normal",
                marginTop: "30px",
              }}
            >
              "Experience the thrill of gaming at Play4Promo, where tournaments,
              gameplay, and your dedication unlock exciting voucher rewards. Our
              policies guarantee a seamless and rewarding voucher redemption
              process for an enhanced gaming journey."
            </Typography>
          </Box>
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
