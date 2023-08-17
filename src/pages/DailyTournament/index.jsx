import React from "react";
import Layout from "../../components/Layout";
import InspirationTTF from "../../assets/font/CynthoNextMedium.otf";
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { imageDesktop, images, video } from "../../utils/images";
import SliderTime from "../../components/SliderTime";
import { useState } from "react";
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
export default function DailyTournament() {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };

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
  return (
    <Layout
      children={
        width > 576 ? (
          <Container
            maxWidth="lg"
            sx={{
              paddingLeft: width < 576 ? "24px !important" : "0px !important",
              paddingRight: width < 576 ? "24px !important" : "0px !important",
              paddingTop: width < 576 ? "24px !important" : "50px !important",
            }}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Typography
                sx={{
                  ...typographyStyle,
                  fontSize: "24px",
                }}
              >
                Hourly Tournament
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                <Box
                  component={"img"}
                  src={images.PurpleBanner}
                  sx={{ width: "100%" }}
                ></Box>
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
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                    return (
                      index < 10 && (
                        <Box
                          key={index}
                          sx={{
                            width: "20%",
                            padding: "0px 16px 0px 16px",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: width < 576 ? "24px" : "32px",
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
                      )
                    );
                  })}
                </Box>
              </Box>
              <Box
                sx={{
                  paddingTop: width < 576 ? "24px" : "32px",
                  paddingBottom: width < 576 ? "24px" : "32px",
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
              </Box>{" "}
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                    return (
                      index < 10 && (
                        <Box
                          key={index}
                          sx={{
                            width: "20%",
                            padding: "0px 16px 0px 16px",
                            display: "flex",
                            justifyContent: "center",
                            marginTop: width < 576 ? "24px" : "32px",
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
                      )
                    );
                  })}
                </Box>
              </Box>
              <Box sx={{ marginBottom: "32px", marginTop: "64px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: width < 576 ? "none" : "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ffff",
                      fontSize: width < 576 ? "16px" : "25px",
                    }}
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
                      <Typography sx={{ ...typographyStyle }}>
                        Fairness
                      </Typography>
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
                      marginTop: "60px",
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
                  "Experience the thrill of gaming at Play4Promo, where
                  tournaments, gameplay, and your dedication unlock exciting
                  voucher rewards. Our policies guarantee a seamless and
                  rewarding voucher redemption process for an enhanced gaming
                  journey."
                </Typography>
              </Box>
            </ThemeProvider>
          </Container>
        ) : (
          <></>
        )
      }
      type="Home"
    />
  );
}
