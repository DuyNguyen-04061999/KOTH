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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemComponent from "../NewHomePageComponent/NewHomePage/ItemComponent";
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
  const [isFetchList, setIsFetchList] = useState(true);
  const [selectedDay, setSeDay] = useState(0);
  const [dayList, setDayList] = useState([]);
  const { dailyTournament } = useSelector((state) => state.tournamentReducer);
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isFetchList) {
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "day",
      });
      setIsFetchList(false);
    }
  }, [dispatch, isFetchList]);

  useEffect(() => {
    setDayList(dailyTournament.map((item) => item?.timeStart));
  }, [dailyTournament]);
  const navigate = useNavigate();
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
                Daily Tournament
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
                  {dailyTournament
                    ?.filter((n) => n.timeStart === dayList[selectedDay])[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        index < 10 && (
                          <Box sx={{ width: "20%", marginTop: "50px" }}>
                            <ItemComponent tourInfo={item} countdown={true} />
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
                  {dailyTournament
                    ?.filter((n) => n.timeStart === dayList[selectedDay])[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        index >= 10 && (
                          <Box sx={{ width: "20%", marginTop: "50px" }}>
                            <ItemComponent tourInfo={item} countdown={true} />
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
                      <Typography sx={{ ...typographyStyle }}>FAQ</Typography>
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
