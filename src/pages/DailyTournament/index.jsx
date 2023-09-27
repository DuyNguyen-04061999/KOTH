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
import {
  //  imageDesktop,
  images,
  video,
} from "../../utils/images";
import SliderTime from "../../components/SliderTime";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import ItemComponent from "../NewHomePageComponent/NewHomePage/ItemComponent";
import NewFooter from "../NewFooter";
import BannerLoading from "../../components/LoadingComponent/BannerLoading";
import ListItemLoading from "../../components/LoadingComponent/ItemLoading";
import ListEmpty from "../../components/LoadingComponent/ListEmpty";
import PaginatedItems from "../PaginatedItems";
const theme = createTheme({
  typography: {},
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
export default function DailyTournament() {
  const { width } = useWindowDimensions();
  const [isFetchList, setIsFetchList] = useState(true);
  const [selectedDay, setSeDay] = useState(0);
  const [dayList, setDayList] = useState([]);
  const { dailyTournament } = useSelector((state) => state.tournamentReducer);
  const [itemOffSet, setItemOffSet] = useState(0);
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
  console.log("itemOffSet:", itemOffSet);
  useEffect(() => {
    setDayList(dailyTournament.map((item) => item?.timeStart));
  }, [dailyTournament]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        children={
          width > 576 ? (
            <Container
              maxWidth="lg"
              sx={{
                paddingLeft:
                  width < 576
                    ? "24px !important"
                    : width < 1024
                    ? "42px !important"
                    : "0px !important",
                paddingRight:
                  width < 576
                    ? "24px !important"
                    : width < 1024
                    ? "32px !important"
                    : "0px !important",
                paddingTop: width < 576 ? "24px !important" : "50px !important",
              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  fontSize: "24px",
                }}
              >
                Daily tournaments
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchList ? (
                  <BannerLoading height={375} />
                ) : (
                  <Box
                    component={"img"}
                    src={images.PurpleBanner}
                    sx={{ width: "100%" }}
                  ></Box>
                )}
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
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      width < 576
                        ? "1fr 1fr"
                        : width < 1024
                        ? "1fr 1fr 1fr"
                        : "1fr 1fr 1fr 1fr 1fr",
                    gridRowGap: "16px",
                  }}
                >
                  {isFetchList ? (
                    <ListItemLoading />
                  ) : dailyTournament &&
                    dailyTournament?.length > 0 &&
                    dailyTournament?.filter(
                      (n) => n.timeStart === dayList[selectedDay]
                    )[0]?.listTournament?.length !== 0 ? (
                    dailyTournament
                      ?.filter((n) => n.timeStart === dayList[selectedDay])[0]
                      ?.listTournament?.map((item, index) => {
                        return (
                          index >= itemOffSet &&
                          index <= itemOffSet + 9 && (
                            <div style={{ marginTop: "50px" }} key={index}>
                              <ItemComponent
                                key={index}
                                countdown={true}
                                tourInfo={item}
                              />
                            </div>
                          )
                        );
                      })
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
              {!isFetchList && (
                <PaginatedItems
                  pageCount={Math.ceil(
                    dailyTournament?.filter(
                      (n) => n.timeStart === dayList[selectedDay]
                    )[0]?.listTournament?.length / 10
                  )}
                  changeOffSet={(value) => {
                    setItemOffSet((value - 1) * 10);
                  }}
                />
              )}
              <NewFooter />
            </Container>
          ) : (
            <Container
              maxWidth="lg"
              sx={{
                paddingLeft:
                  width < 576
                    ? "24px !important"
                    : width < 1024
                    ? "42px !important"
                    : "0px !important",
                paddingRight:
                  width < 576
                    ? "24px !important"
                    : width < 1024
                    ? "32px !important"
                    : "0px !important",
                paddingTop: width < 576 ? "24px !important" : "50px !important",
              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  fontSize: "24px",
                }}
              >
                Daily tournaments
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchList ? (
                  <BannerLoading height={107} />
                ) : (
                  <Box
                    component={"img"}
                    src={images.PurpleBanner}
                    sx={{ width: "100%" }}
                  ></Box>
                )}
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
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns:
                      width < 576
                        ? "1fr 1fr"
                        : width < 1024
                        ? "1fr 1fr 1fr"
                        : "1fr 1fr 1fr 1fr 1fr",
                    gridRowGap: "16px",
                  }}
                >
                  {dailyTournament
                    ?.filter((n) => n.timeStart === dayList[selectedDay])[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        index >= itemOffSet &&
                        index <= itemOffSet + 9 && (
                          <Box
                            sx={{
                              width: "20%",
                              marginTop: "50px",
                            }}
                            key={index}
                          >
                            <ItemComponent tourInfo={item} countdown={true} />
                          </Box>
                        )
                      );
                    })}
                </Box>
              </Box>
              {!isFetchList && (
                <PaginatedItems
                  pageCount={Math.ceil(
                    dailyTournament?.filter(
                      (n) => n.timeStart === dayList[selectedDay]
                    )[0]?.listTournament?.length / 10
                  )}
                  changeOffSet={(value) => {
                    setItemOffSet((value - 1) * 10);
                  }}
                />
              )}
              <NewFooter />
            </Container>
          )
        }
        type="Home"
      />
    </ThemeProvider>
  );
}
