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
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import MainLayout from "../../../components/MainLayout/MainLayout";
import history from "../../../components/Router/history";
import SlickSlider from "../../../components/SlickSlider";
import FilterPromotion from "../../../components/filterPromotion";
import { updateUpcomingPage } from "../../../redux-saga-middleware/reducers/promotionReducer";
import {
  getListPromotionNew,
  getUpcomingTour,
} from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { imageDesktop } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NewFooter from "../../NewFooter";
import PaginatedItems from "../../PaginatedItems";

const theme = createTheme({
  typography: {},
  components: {
    MuiCssBaseline: {
      styleOverrides: {},
    },
  },
});
export default function UpcomingPromotion() {
  const location = useLocation();
  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();

  const { t } = useTranslation("upcoming_promo");
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { device } = useSelector((state) => state.deviceReducer);
  const { upcomingTournament, isFetchUpcoming, noDataUpcoming } = useSelector(
    (state) => state.tournamentReducer
  );
  const { upcomingPag } = useSelector((state) => state.promotionReducer);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(0);

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
  }, [upcomingPag]);

  useEffect(() => {
    dispatch(getUpcomingTour());
    dispatch(getListPromotionNew({ type: "upcoming" }));
    dispatch({
      type: "GET_HOTTEST_WEEK_TOUR",
    });
  }, [dispatch]);

  useEffect(() => {
    if (upcomingTournament) {
      dispatch(
        updateUpcomingPage(
          Number(query?.get("page")) && Number(query?.get("page")) !== 1
            ? (Number(query?.get("page")) - 1) * itemQuantity
            : 0
        )
      );
      setData(upcomingTournament);
    }
  }, [upcomingTournament, dispatch]);

  const imgHot = data?.map((e) => {
    return e.tournamentBackground;
  });

  const imgHotMobile = data?.map((e) => {
    return e.tournamentBackgroundMobile;
  });

  const meta = {
    title:
      process.env.REACT_APP_ENV === "production"
        ? "Play4promo upcoming promotions"
        : "Play4promo staging upcoming promotions",
    description:
      "Unlock exciting voucher rewards with Play4Promo's promotions and gaming thrills.",
    meta: {
      charset: "utf-8",
      name:
        process.env.REACT_APP_URL_DOMAIN === "socket.play4promote.com"
          ? {
              robots: "noindex",
              keywords: `play4promo,play,promo`,
            }
          : {
              keywords: `play4promo,play,promo`,
            },
      property: {
        "og:title":
          process.env.REACT_APP_ENV === "production"
            ? "Play4promo upcoming promotions"
            : "Play4promo staging upcoming promotions",
        "og:url": window.location.href,
        "og:image:secure_url":
          process.env.REACT_APP_ENV === "development"
            ? imageDesktop.logoCT
            : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        "og:image":
          process.env.REACT_APP_ENV === "development"
            ? imageDesktop.logoCT
            : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        "og:image:type": "image/png",
        "og:image:width": `144`,
        "og:image:height": `144`,
        "og:image:alt": "Play4promo Photo",
      },
    },
  };

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
                  paddingTop:
                    width < 576 ? "24px !important" : "50px !important",
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
                  {t("Upcoming Promotions")}
                </Typography>
                <Box
                  sx={{
                    marginBottom: width < 576 ? "24px" : "32px",
                    marginTop: width < 576 ? "24px" : "32px",
                  }}
                >
                  {" "}
                  {isFetchUpcoming || data === null ? (
                    <BannerLoading
                      height={
                        width < 576
                          ? "182.4px"
                          : width <= 1200
                          ? "152.44px"
                          : "331px"
                      }
                    />
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
                  <Box
                    sx={{
                      marginTop: width < 576 ? "24px" : "34px",
                      marginBottom: width < 576 ? "24px" : "34px",
                    }}
                  >
                    <FilterPromotion />
                  </Box>
                  <ListPromotion
                    listData={data}
                    loadingState={isFetchUpcoming}
                    itemOffSet={upcomingPag}
                    typePromo={"upcoming"}
                    itemQuantity={itemQuantity}
                    noData={noDataUpcoming}
                  />
                </Box>
                <Box sx={{ margin: "36px 0px" }}>
                  {!isFetchUpcoming &&
                    data !== null &&
                    data?.length > 0 &&
                    itemQuantity && (
                      <PaginatedItems
                        defaultPage={Number(query?.get("page")) || 1}
                        pageCount={Math.ceil(data.length / itemQuantity)}
                        changeOffSet={(value) => {
                          const params = new URLSearchParams({ page: value });
                          history.replace({
                            pathname: location.pathname,
                            search: params.toString(),
                          });
                          dispatch(
                            updateUpcomingPage((value - 1) * itemQuantity)
                          );
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
                  paddingTop:
                    width < 576 ? "24px !important" : "50px !important",
                  paddingBottom: "50px",
                }}
              >
                <Typography
                  sx={{
                    ...typographyStyle,
                    fontSize: "24px",
                  }}
                >
                  {t("Upcoming Promotions")}
                </Typography>
                <Box
                  sx={{
                    marginBottom: width < 576 ? "24px" : "32px",
                    marginTop: width < 576 ? "24px" : "32px",
                  }}
                >
                  {" "}
                  {isFetchUpcoming || data === null ? (
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
                  <Box
                    sx={{
                      marginTop: width < 576 ? "24px" : "34px",
                      marginBottom: width < 576 ? "24px" : "34px",
                    }}
                  >
                    <FilterPromotion />
                  </Box>
                  <ListPromotion
                    listData={data}
                    loadingState={isFetchUpcoming}
                    itemOffSet={upcomingPag}
                    typePromo={"upcoming"}
                    itemQuantity={itemQuantity}
                    noData={noDataUpcoming}
                  />
                </Box>
                <Box sx={{ margin: "36px 0px" }}>
                  {!isFetchUpcoming &&
                    data !== null &&
                    data?.length > 0 &&
                    itemQuantity && (
                      <PaginatedItems
                        defaultPage={Number(query?.get("page")) || 1}
                        pageCount={Math.ceil(data.length / itemQuantity)}
                        changeOffSet={(value) => {
                          const params = new URLSearchParams({ page: value });
                          history.replace({
                            pathname: location.pathname,
                            search: params.toString(),
                          });
                          dispatch(
                            updateUpcomingPage((value - 1) * itemQuantity)
                          );
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
