import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import MainLayout from "../../../components/MainLayout/MainLayout";
import SlickSlider from "../../../components/SlickSlider";
import { updateOngoingPage } from "../../../redux-saga-middleware/reducers/promotionReducer";
import { imageDesktop } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NewFooter from "../../NewFooter";
import PaginatedItems from "../../PaginatedItems";

export default function HotTournament() {
  const { width } = useWindowDimensions();
  const {t} = useTranslation('ongoing_promo');
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const dispatch = useDispatch();
  const { device } = useSelector((state) => state.deviceReducer);
  const { ongoingTournament, isFetchOngoing, noDataOncoming } = useSelector(
    (state) => state.tournamentReducer
  );
  const { ongoingPag } = useSelector((state) => state.promotionReducer);
  const [data, setData] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(0);
  // const { hotWeekTour, isFetchHotWeek } = useSelector(
  //   (state) => state.tournamentReducer
  // );
  useEffect(() => {
    if (width > 576) {
      setItemQuantity(12);
    } else {
      setItemQuantity(4);
    }
  }, [width, dispatch]);

  useEffect(() => {
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "ongoing",
    });
    dispatch({
      type: "GET_HOTTEST_WEEK_TOUR",
    });
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [ongoingPag]);

  useEffect(() => {
    if (ongoingTournament) {
      setData(ongoingTournament);
    }
  }, [ongoingTournament]);

  const imgHot = data?.map((e) => {
    return e.tournamentBackground;
  });

  const imgHotMobile = data?.map((e) => {
    return e.tournamentBackgroundMobile;
  });

  const meta = {
    title: process.env.REACT_APP_ENV === "production" ? 'Play4promo ongoing promotions' : "Play4promo staging ongoing promotions",
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
        'og:title': process.env.REACT_APP_ENV === "production" ? 'Play4promo ongoing promotions' : "Play4promo staging ongoing promotions",
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
    <>
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
                marginTop: width < 576 ? "24px !important" : "50px !important",
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
                {t('Ongoing Promotion')}
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchOngoing || data === null ? (
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
                  loadingState={isFetchOngoing}
                  itemOffSet={ongoingPag}
                  itemQuantity={itemQuantity}
                  typePromo={"ongoing"}
                  noData={noDataOncoming}
                />
              </Box>
              <Box sx={{ margin: "36px 0px" }}>
                {!isFetchOngoing &&
                  data !== null &&
                  data?.length > 0 &&
                  itemQuantity && (
                    <PaginatedItems
                      defaultPage={Math.ceil(ongoingPag / itemQuantity) + 1}
                      pageCount={Math.ceil(data.length / itemQuantity)}
                      changeOffSet={(value) => {
                        dispatch(updateOngoingPage((value - 1) * itemQuantity));
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
                {t('Ongoing Promotion')}
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchOngoing || data === null ? (
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
                  loadingState={isFetchOngoing}
                  itemOffSet={ongoingPag}
                  itemQuantity={itemQuantity}
                  typePromo={"ongoing"}
                  noData={noDataOncoming}
                />
              </Box>
              <Box sx={{ margin: "36px 0px" }}>
                {!isFetchOngoing &&
                  data !== null &&
                  data?.length > 0 &&
                  itemQuantity && (
                    <PaginatedItems
                      defaultPage={Math.ceil(ongoingPag / itemQuantity) + 1}
                      pageCount={Math.ceil(data.length / itemQuantity)}
                      changeOffSet={(value) => {
                        dispatch(updateOngoingPage((value - 1) * itemQuantity));
                      }}
                    />
                  )}
              </Box>
              <NewFooter />
            </Container>
          )
        }
      />
    </>
    </DocumentMeta>
  );
}
