import { Box, Container, Grid, Typography } from "@mui/material";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React, { Suspense, lazy, useEffect } from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BannerTour, BannerTourMobile } from "../../../components/Banner";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import ListWinner from "../../../components/ListWinner";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import SlickSlider from "../../../components/SlickSlider";
import {
  getListBanner,
  openDialogExclusive,
} from "../../../redux-saga-middleware/reducers/appReducer";
import {
  clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { getListPromotionNew } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { CheckToken } from "../../../utils/checkToken";
import { getAppType } from "../../../utils/helper";
import { imageDesktop, images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Package } from "../../PackagePage/component";
const NewFooter = lazy(() => import("../../NewFooter"));

export default function NewHomePage() {
  const { width } = useWindowDimensions();
  const { t } = useTranslation("home");
  const decodeToken = CheckToken()
  const {
    hotTournament,
    hotWeekTour,
    threeBrandTour,
    ongoingTournament,
    upcomingTournament,
    // endedTournament,
    isFetchThreeTour,
    isFetchHotWeek,
    isFetchHot,
    isFetchOngoing,
    isFetchUpcoming,
    // isFetchEnded,
    noDataUpcoming,
    noDataHot,
    noDataOncoming,
    // noDataEnd,
  } = useSelector((state) => state.tournamentReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const { listBanner } = useSelector((state) => state.appReducer);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListBanner());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(getListPromotionNew({ type: "weekly" }))
    dispatch(getListPromotionNew({ type: "hot" }));
    // dispatch(getListPromotionNew({ type: "hourly" }))
    // dispatch(getListPromotionNew({ type: "vip" }))
    // dispatch(getListPromotionNew({ type: "standard" }))
    dispatch(getListPromotionNew({ type: "ongoing" }));
    dispatch(getListPromotionNew({ type: "upcoming" }));
    // dispatch(getListPromotionNew({ type: "ended" }));
    // dispatch(getListPromotionNew({ type: "daily" }))
    dispatch({
      type: "CALL_BIGGEST_END_TOUR",
    });
    dispatch({
      type: "GET_BIGGEST_TOUR",
    });
    dispatch({
      type: "GET_HOTTEST_WEEK_TOUR",
    });
    dispatch({
      type: "GET_THREE_BRAND_TOUR",
    });
  }, [dispatch]);

  const navigate = useNavigate();

  const meta = {
    title:
      process.env.REACT_APP_ENV === "production"
        ? "Play4promo"
        : "Play4promo staging",
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
            ? "Play4promo"
            : "Play4promo staging",
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
      <Container
        maxWidth="lg"
        sx={{
          paddingLeft:
            width < 576
              ? "24px !important"
              : 767 <= width <= 1280
              ? "50px !important"
              : "0px !important",
          paddingRight:
            width < 576
              ? "24px !important"
              : 767 <= width <= 1280
              ? "50px !important"
              : "0px !important",
          paddingTop: width < 576 ? "24px !important" : "50px !important",
          backgroundColor: "#211d28",
        }}
      >
        <Box
          sx={{
            paddingBottom: "70px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            {isFetchThreeTour ? (
              <BannerLoading
                height={
                  width < 576 ? "182.4px" : width <= 1200 ? "152.44px" : "331px"
                }
                width={"100%"}
              />
            ) : (
              <SlickSlider
                appendDot={true}
                images={[]}
                tours={threeBrandTour}
              />
            )}
          </Box>
          {device === "Desktop" || device === "Tablet" ? (
            <Box>
              <ScrollingCarousel>
                {listBanner?.map((i, index) => {
                  return (
                    <Grid item md={4} xs={6} key={index} className="me-2">
                      {i?.bannerType !== "contact" ? (
                        <Box
                          className="cursor-pointer"
                          onClick={() => {
                            if (i?.bannerType === "package") {
                              navigate("/packages");
                            } else if (i?.bannerType === "new") {
                              if (decodeToken?.role === "guest") {
                                dispatch(clickTab("signup"));
                                dispatch(toggleLoginDialog());
                              } else {
                                dispatch(openDialogExclusive());
                              }
                            }
                          }}
                          component={"img"}
                          src={
                            i?.bannerLink
                              ? process.env.REACT_APP_SOCKET_SERVER +
                                "/" +
                                i?.bannerLink
                              : images.BannerTour
                          }
                          sx={{ width: "100%", height: "auto" }}
                        ></Box>
                      ) : (
                        <Box
                          className="cursor-pointer"
                          component={"a"}
                          href="mailto:support@play4promo.com"
                        >
                          <Box
                            component={"img"}
                            src={
                              i?.bannerLink
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  i?.bannerLink
                                : images.BannerTour
                            }
                            sx={{ width: "100%", height: "auto" }}
                          ></Box>
                        </Box>
                      )}
                    </Grid>
                  );
                })}
              </ScrollingCarousel>
              {/*<Grid container columnSpacing={2} rowSpacing={2}>*/}
              {/*  {listBanner?.map((i, index) => {*/}
              {/*    return (*/}
              {/*      <Grid item md={4} xs={6} key={index}>*/}
              {/*        {i?.bannerType !== "contact" ? (*/}
              {/*          <Box*/}
              {/*            className="cursor-pointer"*/}
              {/*            onClick={() => {*/}
              {/*              if (i?.bannerType === "package") {*/}
              {/*                navigate("/packages");*/}
              {/*              } else if (i?.bannerType === "new") {*/}
              {/*                if (!token) {*/}
              {/*                  dispatch(clickTab("signup"));*/}
              {/*                  dispatch(toggleLoginDialog());*/}
              {/*                } else {*/}
              {/*                  dispatch(openDialogExclusive());*/}
              {/*                }*/}
              {/*              }*/}
              {/*            }}*/}
              {/*            component={"img"}*/}
              {/*            src={*/}
              {/*              i?.bannerLink*/}
              {/*                ? process.env.REACT_APP_SOCKET_SERVER +*/}
              {/*                  "/" +*/}
              {/*                  i?.bannerLink*/}
              {/*                : images.BannerTour*/}
              {/*            }*/}
              {/*            sx={{ width: "100%", height: "auto" }}*/}
              {/*          ></Box>*/}
              {/*        ) : (*/}
              {/*          <Box*/}
              {/*            className="cursor-pointer"*/}
              {/*            component={"a"}*/}
              {/*            href="mailto:support@play4promo.com"*/}
              {/*          >*/}
              {/*            <Box*/}
              {/*              component={"img"}*/}
              {/*              src={*/}
              {/*                i?.bannerLink*/}
              {/*                  ? process.env.REACT_APP_SOCKET_SERVER +*/}
              {/*                    "/" +*/}
              {/*                    i?.bannerLink*/}
              {/*                  : images.BannerTour*/}
              {/*              }*/}
              {/*              sx={{ width: "100%", height: "auto" }}*/}
              {/*            ></Box>*/}
              {/*          </Box>*/}
              {/*        )}*/}
              {/*      </Grid>*/}
              {/*    );*/}
              {/*  })}*/}
              {/*</Grid>*/}
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "34px",
              display: "flex",
              flexDirection: "column",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "16px" : "24px",
                    fontWeight: "700 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                    lineHeight: "130%",
                    fontFamily: "Cyntho Next",
                  }}
                >
                  {/* HOT TOURNAMENTS{" "} */}
                  {t("Hot Promotions")}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  navigate("/hot-promotion");
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    fontFamily: "Cyntho Next",
                    cursor: "pointer",
                  }}
                >
                  {t("View All")}
                </Typography>
                <Box
                  sx={{
                    width: "12px",
                    height: "12px",
                    marginLeft: width < 576 ? "3px" : "8px",
                  }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: width < 576 ? "24px" : "32px" }}>
              <ListPromotion
                listData={hotTournament}
                loadingState={isFetchHot}
                typePromo={"hot"}
                noData={noDataHot}
              />
            </Box>
          </Box>{" "}
          {device === "Mobile" ? (
            <Box
              sx={{
                marginBottom: width < 576 ? "24px" : "32px",
              }}
            >
              {isFetchThreeTour ? (
                <BannerLoading
                  height={width < 576 ? "214px" : "363px"}
                  width={"100%"}
                />
              ) : (
                <SlickSlider
                  appendDot={true}
                  images={listBanner}
                  type={"tour"}
                  typeR={"banner"}
                />
              )}
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "64px",
              display: "flex",
              flexDirection: "column",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "16px" : "24px",
                    fontWeight: "700 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                    lineHeight: "130%",
                    fontFamily: "Cyntho Next",
                  }}
                >
                  {t("Ongoing Promotions")}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  navigate("/ongoing-promotion");
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    fontFamily: "Cyntho Next",
                    cursor: "pointer",
                  }}
                >
                  {t("View All")}
                </Typography>
                <Box
                  sx={{ width: "12px", height: "12px", marginLeft: "3px" }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: width < 576 ? "24px" : "32px" }}>
              <ListPromotion
                listData={ongoingTournament}
                loadingState={isFetchOngoing}
                typePromo={"ongoing"}
                noData={noDataOncoming}
              />
            </Box>
          </Box>{" "}
          {/* Banner Top1 */}
          {device === "Mobile" ? (
            isFetchHotWeek ? (
              <Box
                sx={{
                  marginTop: width < 576 ? "48px" : "32px",
                  marginBottom: width < 576 ? "0px" : "32px",
                }}
              >
                <BannerLoading height={width < 576 ? "214px" : "363px"} />
              </Box>
            ) : (
              <BannerTourMobile
                tournamentName={
                  hotWeekTour && hotWeekTour?.tournamentName
                    ? hotWeekTour?.tournamentName
                    : "Galaxy Z-flip 5"
                }
                rewardName={
                  hotWeekTour &&
                  hotWeekTour?.rewardTournament &&
                  hotWeekTour?.rewardTournament?.rewardTitle
                    ? hotWeekTour?.rewardTournament?.rewardTitle
                    : ""
                }
                sponsorName={hotWeekTour?.tournamentBrand?.brandName}
                userName={
                  hotWeekTour &&
                  hotWeekTour?.bestUser &&
                  hotWeekTour?.bestUser?.tUser &&
                  hotWeekTour?.bestUser?.tUser?.userNickName
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
                      hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
                    : images.pool
                }
                tourId={hotWeekTour && hotWeekTour?.id}
              />
            )
          ) : isFetchHotWeek ? (
            <BannerLoading
              height={width < 576 ? "214px" : "363px"}
              width={"100%"}
            />
          ) : (
            <BannerTour
              tournamentName={
                hotWeekTour && hotWeekTour?.tournamentName
                  ? hotWeekTour?.tournamentName
                  : "Galaxy Z-flip 5"
              }
              rewardName={
                hotWeekTour &&
                hotWeekTour?.rewardTournament &&
                hotWeekTour?.rewardTournament?.rewardTitle
                  ? hotWeekTour?.rewardTournament?.rewardTitle
                  : ""
              }
              sponsorName={hotWeekTour?.tournamentBrand?.brandName}
              userName={
                hotWeekTour &&
                hotWeekTour?.bestUser &&
                hotWeekTour?.bestUser?.tUser &&
                hotWeekTour?.bestUser?.tUser?.userNickName
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
                    hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
                  : images.pool
              }
              tourId={hotWeekTour && hotWeekTour?.id}
            />
          )}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "64px",
              // marginBottom: width < 576 ? "24px" : "32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "16px" : "24px",
                    fontWeight: "700 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                    lineHeight: "130%",
                    fontFamily: "Cyntho Next",
                  }}
                >
                  {t("Upcoming Promotions")}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  navigate("/upcoming-promotion");
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    fontFamily: "Cyntho Next",
                    cursor: "pointer",
                  }}
                >
                  {t("View All")}
                </Typography>
                <Box
                  sx={{ width: "12px", height: "12px", marginLeft: "3px" }}
                  component={"img"}
                  src={images.viewAllButton}
                ></Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: width < 576 ? "12px" : "32px" }}>
              <ListPromotion
                listData={upcomingTournament}
                loadingState={isFetchUpcoming}
                noData={noDataUpcoming}
                typePromo={"upcoming"}
              />
            </Box>
          </Box>{" "}
        </Box>
        <Box
          sx={{
            marginTop: width < 576 ? "24px" : "64px",
            marginBottom: width < 576 ? "24px" : "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: width < 576 ? "16px" : "24px",
                  fontWeight: "700 !important",
                  marginLeft: "0px !important",
                  color: "#fff",
                  lineHeight: "130%",
                  fontFamily: "Cyntho Next",
                }}
              >
                {t("Ended Promotions")}
              </Typography>
            </Box>
            <Box
              onClick={() => {
                navigate("/ended-promotion");
              }}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: width < 576 ? "12px" : "16px",
                  fontWeight: "200 !important",
                  color: "#BE48ED",
                  fontFamily: "Cyntho Next",
                  cursor: "pointer",
                }}
              >
                {t("View All")}
              </Typography>
              <Box
                sx={{ width: "12px", height: "12px", marginLeft: "3px" }}
                component={"img"}
                src={images.viewAllButton}
              ></Box>
            </Box>
          </Box>{" "}
          <Box sx={{ marginTop: width < 576 ? "12px" : "32px" }}>
            <ListPromotion
              listData={endedTournament}
              loadingState={isFetchEnded}
              typePromo={"ended"}
              noData={noDataEnd}
            />
          </Box> */}
          <ListWinner />
          {getAppType() === "promote" ? <Package /> : <></>}
          <Suspense fallback="loading..." children={<NewFooter />} />
        </Box>
      </Container>
    </DocumentMeta>
  );
}
