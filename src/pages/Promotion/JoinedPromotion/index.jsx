import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import MainLayout from "../../../components/MainLayout/MainLayout";
import history from "../../../components/Router/history";
import SlickSlider from "../../../components/SlickSlider";
import { updateJoinedPage } from "../../../redux-saga-middleware/reducers/promotionReducer";
import { getJoinedTour } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { imageDesktop } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NewFooter from "../../NewFooter";
import PaginatedItems from "../../PaginatedItems";

export default function JoinedPromotion() {
  const location = useLocation();
  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();

  const { width } = useWindowDimensions();
  const { t } = useTranslation("ongoing_promo");
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { device } = useSelector((state) => state.deviceReducer);
  const { joinedTournament, isFetchJoined, noDataJoined } = useSelector(
    (state) => state.tournamentReducer
  );
  const { tokenUser, user } = useSelector((state) => state.userReducer);
  const { joinedPag } = useSelector((state) => state.promotionReducer);
  const [data, setData] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(0);
  useEffect(() => {
    if (width > 576) {
      setItemQuantity(12);
    } else {
      setItemQuantity(4);
    }
  }, [width, dispatch]);

  useEffect(() => {
    if(user?.isGuest === false) {
      if (joinedTournament !== null && joinedTournament.length > 0) {
        var newArray = [];
        for (let i = 0; i < joinedTournament?.length; i++) {
          if (joinedTournament[i].tournamentStatus === 1) {
            newArray.unshift(joinedTournament[i]);
          } else if (joinedTournament[i].tournamentStatus === 2) {
            newArray.push(joinedTournament[i]);
          }
        }
        setData(newArray);
      } 
    } else {
      setData([])
    }
  }, [joinedTournament]);

  useEffect(() => {
    if (user?.isGuest === true) {
      navigate("/");
    }
  }, [user?.isGuest, navigate]);

  useEffect(() => {
    dispatch(getJoinedTour());
    dispatch({
      type: "GET_LIST_JOINED_PROMOTION",
    });

    dispatch({
      type: "GET_HOTTEST_WEEK_TOUR",
    });
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [joinedPag]);

  useEffect(() => {
    if (joinedTournament) {
      dispatch(
        updateJoinedPage(
          Number(query?.get("page")) && Number(query?.get("page")) !== 1
            ? (Number(query?.get("page")) - 1) * itemQuantity
            : 0
        )
      );
      setData(joinedTournament);
    }
  }, [joinedTournament, dispatch]);

  const imgHot = data?.map((e) => {
    return e.tournamentBackground;
  });

  const imgHotMobile = data?.map((e) => {
    return e.tournamentBackgroundMobile;
  });

  const meta = {
    title:
      process.env.REACT_APP_ENV === "production"
        ? "Play4promo ongoing promotions"
        : "Play4promo staging ongoing promotions",
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
            ? "Play4promo ongoing promotions"
            : "Play4promo staging ongoing promotions",
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
                  marginTop:
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
                  {/* {t(" Joined Prmotions")} */}
                 Played Promotions
                </Typography>
                <Box
                  sx={{
                    marginBottom: width < 576 ? "24px" : "32px",
                    marginTop: width < 576 ? "24px" : "32px",
                  }}
                >
                  {isFetchJoined || data === null ? (
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
                    {/* <FilterPromotion /> */}
                  </Box>
                  <ListPromotion
                    listData={data}
                    loadingState={isFetchJoined}
                    itemOffSet={joinedPag}
                    itemQuantity={itemQuantity}
                    typePromo={"joined"}
                    noData={noDataJoined}
                  />
                </Box>
                <Box sx={{ margin: "36px 0px" }}>
                  {!isFetchJoined &&
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
                            updateJoinedPage((value - 1) * itemQuantity)
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
                  {/* {t("Joined Prmotions")} */}
                  Played Promotions
                </Typography>
                <Box
                  sx={{
                    marginBottom: width < 576 ? "24px" : "32px",
                    marginTop: width < 576 ? "24px" : "32px",
                  }}
                >
                  {" "}
                  {isFetchJoined || data === null ? (
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
                    {/* <FilterPromotion /> */}
                  </Box>
                  <ListPromotion
                    listData={data}
                    loadingState={isFetchJoined}
                    itemOffSet={joinedPag}
                    itemQuantity={itemQuantity}
                    typePromo={"ongoing"}
                    noData={noDataJoined}
                  />
                </Box>
                {!isFetchJoined && (
                  <Box sx={{ margin: "36px 0px" }}>
                    {!isFetchJoined &&
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
                              updateJoinedPage((value - 1) * itemQuantity)
                            );
                          }}
                        />
                      )}
                  </Box>
                )}

                <NewFooter />
              </Container>
            )
          }
        />
      </>
    </DocumentMeta>
  );
}
