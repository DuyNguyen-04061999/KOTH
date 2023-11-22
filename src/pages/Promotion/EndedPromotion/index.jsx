import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerTourMobile } from "../../../components/Banner";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import MainLayout from "../../../components/MainLayout/MainLayout";
import SlickSlider from "../../../components/SlickSlider";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NewFooter from "../../NewFooter";
import PaginatedItems from "../../PaginatedItems";
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
export default function HotTournament() {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { device } = useSelector((state) => state.deviceReducer);
  const { endedTournament, isFetchEnded,noDataEnd } = useSelector(
    (state) => state.tournamentReducer
  );
  const [data, setData] = useState(null);
  const [itemOffSet, setItemOffSet] = useState(0);
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(0);
  const { hotWeekTour, isFetchHotWeek } = useSelector(
    (state) => state.tournamentReducer
  );

  useEffect(() => {
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "ended",
    });
    dispatch({
      type: "GET_HOTTEST_WEEK_TOUR",
    });
  }, [dispatch]);

  useEffect(() => {
    if (width > 576) {
      setItemQuantity(12);
    }
    if (width < 576) {
      setItemQuantity(4);
    }
  }, [width]);

    useEffect(() => {
        if (width) {
            setItemOffSet(0);
        }

    }, [width]);

  useEffect(() => {
    if (endedTournament) {
      setData(endedTournament);
    }
  }, [endedTournament]);

  const imgHot = data?.map((e) => {
    return e.tournamentBackground;
  });

  const imgHotMobile = data?.map((e) => {
    return e.tournamentBackgroundMobile;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout
        type="Home"
        children={
          width > 576 ? (
            <Container
              maxWidth="lg"
              sx={{
                paddingLeft:
                  device === "Mobile"
                    ? "24px !important"
                    : device === "Tablet"
                    ? "42px !important"
                    : "0px !important",
                paddingRight:
                  device === "Mobile"
                    ? "24px !important"
                    : device === "Tablet"
                    ? "32px !important"
                    : "0px !important",
                paddingTop: width < 576 ? "24px !important" : "50px !important",
              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  fontSize: "36px",
                  fontFamily: "Cyntho Next",
                  fontWeight: 700,
                }}
              >
                Ended Promotion
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchEnded || data === null ? (
                  <BannerLoading height={363} />
                ) : (
                  <SlickSlider
                    type="tour"
                    appendDot={true}
                    images={width < 576 ? imgHotMobile : imgHot}
                  />
                )}
              </Box>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <ListPromotion
                  listData={data}
                  loadingState={isFetchEnded}
                  itemOffSet={itemOffSet}
                  itemQuantity={itemQuantity}
                  typePromo={"Ended"}
                  noData={noDataEnd}
                />
              </Box>
              {!isFetchEnded && data !== null && data?.length > 0 && (
                <PaginatedItems
                  pageCount={Math.ceil(data.length / itemQuantity)}
                  changeOffSet={(value) => {
                    setItemOffSet((value - 1) * itemQuantity);
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
                paddingBottom:"50px"

              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  fontSize: "24px",
                }}
              >
                Ended Promotion
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchEnded || data === null ? (
                  <BannerLoading height={208} />
                ) : (
                  <SlickSlider
                    type="tour"
                    appendDot={true}
                    images={width < 576 ? imgHotMobile : imgHot}
                  />
                )}
              </Box>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <ListPromotion
                  listData={data}
                  loadingState={isFetchEnded}
                  itemOffSet={itemOffSet}
                  itemQuantity={itemQuantity}
                  typePromo={"Ended"}
                  noData={noDataEnd}

                />
              </Box>
              {/* <Box
                sx={{
                  marginTop: "48px",
                  marginBottom: "0px",
                }}
              >
                {isFetchHotWeek ? (
                  <Box>
                    <BannerLoading height={"214px"} />
                  </Box>
                ) : (
                  <BannerTourMobile
                    tournamentName={
                      hotWeekTour && hotWeekTour?.tournamentName
                        ? hotWeekTour?.tournamentName
                        : "Galaxy Z-flip 5"
                    }
                    sponsorName={hotWeekTour?.tournamentBrand?.brandName}
                    userName={
                      hotWeekTour &&
                      hotWeekTour?.bestUser &&
                      hotWeekTour?.bestUser?.tUser &&
                      hotWeekTour?.bestUser?.tUser?.userName
                    }
                    endTime={hotWeekTour?.tournamentEndAt}
                    userScore={hotWeekTour?.bestUser?.score}
                    userAvatar={
                      hotWeekTour &&
                      hotWeekTour?.bestUser &&
                      hotWeekTour?.bestUser?.tUser &&
                      hotWeekTour?.bestUser?.tUser?.userAccount &&
                      hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          hotWeekTour?.bestUser?.tUser?.userAccount
                            ?.accountAvatar
                        : images.pool
                    }
                    tourId={hotWeekTour && hotWeekTour?.id}
                  />
                )}
              </Box> */}
              <Box sx={{ margin: "36px 0px"}}>
                {!isFetchEnded && data !== null && data?.length > 0 && (
                  <PaginatedItems
                    pageCount={Math.ceil(data.length / itemQuantity)}
                    changeOffSet={(value) => {
                      setItemOffSet((value - 1) * itemQuantity);
                    }}
                  />
                )}
              </Box>
              <NewFooter />
            </Container>
          )
        }
      />
    </ThemeProvider>
  );
}
