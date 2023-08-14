import {
  Box,
  Container,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { imageDesktop, images } from "../../../utils/images";
import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
import SlickSlider from "../../../components/SlickSlider";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Package } from "../../PackagePage/component";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import SliderTime from "../../../components/SliderTime";
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
      sx={{
        paddingLeft: width < 576 ? "24px !important" : "90px !important",
        paddingRight: width < 576 ? "24px !important" : "90px !important",
        paddingTop: width < 576 ? "24px !important" : "90px !important",
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
          <SlickSlider
            appendDot={true}
            images={[
              images.bannerTournament,
              images.bannerTournament1,
              images.bannerTournament2,
            ]}
          />
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: "20px",
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
                    fontSize: "14px",
                    fontWeight: "200 !important",
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
                    fontSize: "12px",
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
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                return (
                  index < 4 &&
                  (index % 2 === 0 ? (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingRight: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ))
                );
              })}
            </Box>
          </Box>{" "}
          {/* Banner winner ---> dynamically render */}
          <Box
            sx={{ width: "100%" }}
            component={"img"}
            src={images.bannerwin}
          ></Box>{" "}
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: "20px",
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
                    fontSize: "14px",
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
                    fontSize: "12px",
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
                  setSeHour(index);
                }}
                selectedItem={selectedHour}
                list={hourList}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  color: "rgba(255, 255, 255, 0.50)",
                }}
              >
                End time
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 4px",
                    backgroundColor: "#68399E",
                    borderRadius: "5px",
                  }}
                >
                  <Typography sx={{ ...typographyStyle }}>0</Typography>
                  <Typography sx={{ ...typographyStyle }}>9</Typography>
                </Box>
                <Typography
                  sx={{
                    ...typographyStyle,
                    marginLeft: "6px",
                    marginRight: "6px",
                  }}
                >
                  :
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 4px",
                    backgroundColor: "#68399E",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <Typography sx={{ ...typographyStyle }}>0</Typography>
                  <Typography sx={{ ...typographyStyle }}>9</Typography>
                </Box>
                <Typography
                  sx={{
                    ...typographyStyle,
                    margin: "2px",
                    marginLeft: "6px",
                    marginRight: "6px",
                  }}
                >
                  :
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 4px",
                    backgroundColor: "#68399E",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <Typography sx={{ ...typographyStyle }}>0</Typography>
                  <Typography sx={{ ...typographyStyle }}>9</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                return (
                  index < 4 &&
                  (index % 2 === 0 ? (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingRight: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ))
                );
              })}
            </Box>
          </Box>{" "}
          {/* ---------------------------- */}
          <Box
            sx={{ width: "100%" }}
            component={"img"}
            src={images.giveAway}
          ></Box>{" "}
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: "20px",
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
                    fontSize: "14px",
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
                    fontSize: "12px",
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
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  color: "rgba(255, 255, 255, 0.50)",
                }}
              >
                End time
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 4px",
                    backgroundColor: "#68399E",
                    borderRadius: "5px",
                  }}
                >
                  <Typography sx={{ ...typographyStyle }}>0</Typography>
                  <Typography sx={{ ...typographyStyle }}>9</Typography>
                </Box>
                <Typography
                  sx={{
                    ...typographyStyle,
                    marginLeft: "6px",
                    marginRight: "6px",
                  }}
                >
                  :
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 4px",
                    backgroundColor: "#68399E",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <Typography sx={{ ...typographyStyle }}>0</Typography>
                  <Typography sx={{ ...typographyStyle }}>9</Typography>
                </Box>
                <Typography
                  sx={{
                    ...typographyStyle,
                    margin: "2px",
                    marginLeft: "6px",
                    marginRight: "6px",
                  }}
                >
                  :
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2px 4px",
                    backgroundColor: "#68399E",
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <Typography sx={{ ...typographyStyle }}>0</Typography>
                  <Typography sx={{ ...typographyStyle }}>9</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                return (
                  index < 4 &&
                  (index % 2 === 0 ? (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingRight: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ))
                );
              })}
            </Box>
          </Box>{" "}
          {/* Brief information */}
          <SlickSlider
            appendDot={false}
            images={[images.banner_5, images.banner_6, images.banner_7]}
          />
          {/* ------------------------ */}
          <Box
            sx={{
              marginTop: "20px",
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
                    fontSize: "14px",
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
                    fontSize: "12px",
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
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
                return (
                  index < 4 &&
                  (index % 2 === 0 ? (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingRight: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "50%",
                        boxSizing: "border-box",
                        marginTop: "20px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#37285C",
                          borderRadius: "10px",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{ borderRadius: "10px" }}
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
                          }}
                        >
                          By Mcdonald’s
                        </Typography>
                      </Box>
                    </Box>
                  ))
                );
              })}
            </Box>
          </Box>{" "}
          {/* ---------------------------- */}
          <Dialog sx={{ zIndex: "1320" }} fullScreen={true} open={open}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#211D28",
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  minHeight: "44px",
                  backgroundColor: "#42285B",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 15px",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  component={"img"}
                  src={images.BackButtonLobby}
                  sx={{ width: "13px" }}
                  onClick={() => {
                    setOpen(false);
                  }}
                ></Box>
                <Typography
                  sx={{
                    textAlign: "start",
                    color: "#ffff",
                    fontWeight: "lighter !important",
                    fontSize: "14px",
                  }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Hot tournament
                </Typography>
              </Box>
              <Box sx={{ width: "100%", height: "auto", padding: "20px" }}>
                <SlickSlider
                  images={[
                    images.bannerTournament,
                    images.bannerTournament1,
                    images.bannerTournament2,
                  ]}
                />
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {[1, 2, 3, 2, 3, 4, 5].map((item, index) => {
                    return index % 2 === 0 ? (
                      <Box
                        sx={{
                          width: "50%",
                          boxSizing: "border-box",
                          marginTop: "20px",
                          paddingRight: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "#37285C",
                            borderRadius: "10px",
                            padding: "8px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{ borderRadius: "10px" }}
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
                            }}
                          >
                            By Mcdonald’s
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "50%",
                          boxSizing: "border-box",
                          marginTop: "20px",
                          paddingLeft: "10px",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "#37285C",
                            borderRadius: "10px",
                            padding: "8px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Box
                            sx={{ borderRadius: "10px" }}
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
                            }}
                          >
                            By Mcdonald’s
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Dialog>
          <Package />
          {/* Footer */}
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#ffff" }}>Support</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px 10px 0px",
                }}
              >
                <Typography sx={{ ...typographyStyle }}>Help center</Typography>
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
                  width: "120px",
                  height: "44px",
                  marginTop: "30px",
                }}
                src={imageDesktop.LogoCongTy}
              ></Box>
            </Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "200 !important",
                fontSize: "12px",
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
