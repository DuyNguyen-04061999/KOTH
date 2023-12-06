import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout/MainLayout";
import SliderTime from "../../components/SliderTime";
import { images, video } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";
import CountDownTournament from "../NewHomePageComponent/CountDownTournament";
import ItemComponent from "../NewHomePageComponent/NewHomePage/ItemComponent";
const theme = createTheme({
  typography: {
    
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // "@font-face": {
        //   fontFamily: "Cyntho Next",
        //   src: `url(${InspirationTTF}) format("truetype")`,
        // },
      },
    },
  },
});
export default function HourlyTournament() {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [isFetchList, setIsFetchList] = useState(true);
  const { hourlyTournament } = useSelector((state) => state.tournamentReducer);
  const [isFetching, setIsFetching] = useState(true);
  if (!isFetchList) {
    setTimeout(() => setIsFetching(false), 2000);
  }
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
  
  return (
    <MainLayout
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
