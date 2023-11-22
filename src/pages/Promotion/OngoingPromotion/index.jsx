import { Box, Container, Typography } from "@mui/material";
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

export default function HotTournament() {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { device } = useSelector((state) => state.deviceReducer);
  const { ongoingTournament, isFetchOngoing, noDataOncoming } = useSelector(
    (state) => state.tournamentReducer
  );
  const [data, setData] = useState(null);
  const [itemOffSet, setItemOffSet] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const dispatch = useDispatch();
  const { hotWeekTour, isFetchHotWeek } = useSelector(
    (state) => state.tournamentReducer
  );

  useEffect(() => {
    if (width) {
      setItemOffSet(0);
    }

    if (width > 576) {
      setItemQuantity(12);
    } else {
      setItemQuantity(4);
    }
  }, [width]);

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
  return (
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
                Ongoing Promotion
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
                  itemOffSet={itemOffSet}
                  itemQuantity={itemQuantity}
                  typePromo={"ongoing"}
                  noData={noDataOncoming}
                />
              </Box>
              <Box sx={{ margin: "36px 0px" }}>
                {!isFetchOngoing && data !== null && data?.length > 0 && (
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
                Ongoing Promotion
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
                  itemOffSet={itemOffSet}
                  itemQuantity={itemQuantity}
                  typePromo={"ongoing"}
                  noData={noDataOncoming}
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
                {!isFetchOngoing && data !== null && data?.length > 0 && (
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
    </>
  );
}
