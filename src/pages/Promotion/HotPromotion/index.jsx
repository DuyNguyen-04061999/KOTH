import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useDispatch, useSelector } from "react-redux";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import MainLayout from "../../../components/MainLayout/MainLayout";
import SlickSlider from "../../../components/SlickSlider";
import { updateHotPage } from "../../../redux-saga-middleware/reducers/promotionReducer";
import { imageDesktop } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NewFooter from "../../NewFooter";
import PaginatedItems from "../../PaginatedItems";
import {useTranslation} from "react-i18next";
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
  const {t} = useTranslation("hot_promo")
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { device } = useSelector((state) => state.deviceReducer);
  const { hotTournament, isFetchHot, noDataHot } = useSelector(
    (state) => state.tournamentReducer
  );
  const [data, setData] = useState(null);
  // const [itemOffSet, setItemOffSet] = useState(0);
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(0);
  // const { hotWeekTour, isFetchHotWeek } = useSelector(
  //   (state) => state.tournamentReducer
  // );
  const { hotPag } = useSelector((state) => state.promotionReducer);
  useEffect(() => {
    if (width > 576) {
      setItemQuantity(12);
    }
    if (width < 576) {
      setItemQuantity(4);
    }
  }, [width]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [hotPag]);

  useEffect(() => {
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "hot",
    });
    dispatch({
      type: "GET_HOTTEST_WEEK_TOUR",
    });
  }, [dispatch]);

  useEffect(() => {
    if (hotTournament) {
      setData(hotTournament);
    }
  }, [hotTournament]);

  const imgHot = data?.map((e) => {
    return e.tournamentBackground;
  });

  const imgHotMobile = data?.map((e) => {
    return e.tournamentBackgroundMobile;
  });

  const meta = {
    title: process.env.REACT_APP_ENV === "production" ? 'Play4promo hot promotions' : "Play4promo staging hot promotions",
    description: "Unlock exciting voucher rewards with Play4Promo's promotions and gaming thrills.",
    meta: {
      charset: 'utf-8',
      name: process.env.REACT_APP_URL_DOMAIN === "socket.play4promote.com" ? {
        robots: "noindex",
        keywords: `play4promo,play,promo`
      } : {
        keywords: `play4promo,play,promo`
      },
      property: {
        'og:title': process.env.REACT_APP_ENV === "production" ? 'Play4promo hot promotions' : "Play4promo staging hot promotions",
        'og:url': window.location.href,
        'og:image:secure_url': process.env.REACT_APP_ENV === "development" ? imageDesktop.logoCT : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        'og:image': process.env.REACT_APP_ENV === "development" ? imageDesktop.logoCT : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        'og:image:type': 'image/png',
        'og:image:width': `144`,
        'og:image:height': `144`,
        'og:image:alt': 'Play4promo Photo'
      },
    },
  }

  return (
    <DocumentMeta {...meta}>
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
                {t('Hot Promotion')}
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchHot || data === null ? (
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
                  loadingState={isFetchHot}
                  itemOffSet={hotPag}
                  typePromo={"hot"}
                  itemQuantity={itemQuantity}
                  noData={noDataHot}
                />
              </Box>
              <Box sx={{ margin: "36px 0px" }}>
                {!isFetchHot &&
                  data !== null &&
                  data?.length > 0 &&
                  itemQuantity && (
                    <PaginatedItems
                      defaultPage={Math.ceil(hotPag / itemQuantity) + 1}
                      pageCount={Math.ceil(data.length / itemQuantity)}
                      changeOffSet={(value) => {
                        dispatch(updateHotPage((value - 1) * itemQuantity));
                      }}
                    />
                  )}
              </Box>
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
                paddingBottom: "50px",
              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  fontSize: "24px",
                }}
              >
                {t('Hot Promotion')}
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchHot || data === null ? (
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
                  loadingState={isFetchHot}
                  itemOffSet={hotPag}
                  typePromo={"hot"}
                  itemQuantity={itemQuantity}
                  noData={noDataHot}
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
              <Box sx={{ margin: "36px 0px" }}>
                {!isFetchHot &&
                  data !== null &&
                  data?.length > 0 &&
                  itemQuantity && (
                    <PaginatedItems
                      defaultPage={Math.ceil(hotPag / itemQuantity) + 1}
                      pageCount={Math.ceil(data.length / itemQuantity)}
                      changeOffSet={(value) => {
                        dispatch(updateHotPage((value - 1) * itemQuantity));
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
    </DocumentMeta>
  );
}
