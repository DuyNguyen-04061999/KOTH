import React, { useEffect } from "react";
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
import CountDownTournament from "../NewHomePageComponent/CountDownTournament";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ItemComponent from "../NewHomePageComponent/NewHomePage/ItemComponent";
import NewFooter from "../NewFooter";
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
export default function HourlyTournament() {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [isFetchList, setIsFetchList] = useState(true);
  const { hourlyTournament } = useSelector((state) => state.tournamentReducer);
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  useEffect(() => {
    if (isFetchList) {
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "hour",
      });
      setIsFetchList(false);
    }
  }, [dispatch, isFetchList]);

  useEffect(() => {
    setHourList(hourlyTournament.map((item) => moment(item?.timeStart)));
  }, [hourlyTournament]);
  const [hourList, setHourList] = useState([]);
  const [selectedHour, setSeHour] = useState(0);
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
                    setSeHour(index);
                  }}
                  selectedItem={selectedHour}
                  list={hourList?.map((item) => moment(item)?.format("HH:mm"))}
                />
              </Box>{" "}
              <Box
                sx={{
                  marginTop: width < 576 ? "12px" : "16px",
                  marginBottom: width < 576 ? "12px" : "16px",
                }}
              >
                <CountDownTournament expiryTime={hourList[selectedHour]} />
              </Box>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {hourlyTournament
                    ?.filter(
                      (n) =>
                        moment(n.timeStart).format("HH:mm") ===
                        hourList[selectedHour]?.format("HH:mm")
                    )[0]
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
                  {hourlyTournament
                    ?.filter(
                      (n) =>
                        moment(n.timeStart).format("HH:mm") ===
                        hourList[selectedHour]
                    )[0]
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
              <NewFooter />
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
