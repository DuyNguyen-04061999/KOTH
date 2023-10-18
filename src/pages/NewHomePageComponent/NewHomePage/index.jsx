import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import SlickSlider from "../../../components/SlickSlider";
import { imageHome, images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Package } from "../../PackagePage/component";
// import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
// import CountDownTournament from "../CountDownTournament";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BannerTour,
  BannerTourMobile,
  BannerWin,
  BannerWinMobile,
} from "../../../components/Banner";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import { getAppType } from "../../../utils/helper";
import NewFooter from "../../NewFooter";
import "./index.scss";

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
export default function NewHomePage() {
  // const [open, setOpen] = useState(false);
  // const [promotion, setPromotion] = useState(true);
  // const [startPoint, setstartPoint] = useState(null);
  const { width } = useWindowDimensions();
  // const [type, setType] = useState("");
  // const [hourList, setHourList] = useState([]);
  // const [selectedHour, setSeHour] = useState(0);
  // const [dayList, setDayList] = useState([
  //   "Mon",
  //   "Tus",
  //   "Wed",
  //   "Thu",
  //   "Fri",
  //   "Sat",
  //   "Sun",
  // ]);
  // const [selectedDay, setSeDay] = useState(0);

  const {
    // dailyTournament,
    // hourlyTournament,
    hotTournament,
    biggestEndTour,
    hotWeekTour,
    threeBrandTour,
    ongoingTournament,
    upcomingTournament,
    endedTournament,
    isFetchThreeTour,
    isFetchHotWeek,
    isFetchBiggestTour,
    isFetchHot,
    isFetchOngoing,
    isFetchUpcoming,
    isFetchEnded,
  } = useSelector((state) => state.tournamentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "weekly",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "hot",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "hourly",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "vip",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "standard",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "ongoing",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "upcoming",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "ended",
    });
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "daily",
    });
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

  // useEffect(() => {
  //   // setDayList(dailyTournament?.map((item) => item?.timeStart));
  // }, [hourlyTournament, dailyTournament]);

  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingLeft:
          width < 576
            ? "24px !important"
            : 767 <= width <= 1280
            ? "32px !important"
            : "0px !important",
        paddingRight:
          width < 576
            ? "24px !important"
            : 767 <= width <= 1280
            ? "32px !important"
            : "0px !important",
        paddingTop: width < 576 ? "24px !important" : "50px !important",
        backgroundColor: "#1a151e",
      }}
    >
      {process.env.REACT_APP_TEST === "test" && (
        <div
          className="text-white p-2 ps-3"
          onClick={() => {
            navigate("/list-game-manager");
          }}
        >
          Game Manager
        </div>
      )}{" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            paddingBottom: "70px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
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
                images={
                  []
                  // width < 576
                  //   ? [
                  //       images.pepperBanner,
                  //       images.pepperBanner,
                  //       images.pepperBanner,
                  //     ]
                  //   : [
                  //       images.pepperBanner,
                  //       images.pepperBanner,
                  //       images.pepperBanner,
                  //     ]
                }
                tours={threeBrandTour}
              />
            )}
          </Box>
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
                  {/* HOT TOURNAMENTS{" "} */}
                  Hot promotion
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
                  View All
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
            <Box sx={{ paddingTop: width < 576 ? "24px" : "32px" }}>
              <ListPromotion
                listData={hotTournament}
                loadingState={isFetchHot}
                typePromo={"hot"}
              />
            </Box>
          </Box>{" "}
          {width < 576 ? (
            isFetchBiggestTour ? (
              <BannerLoading
                height={width < 576 ? "214px" : "363px"}
                width={"100%"}
              />
            ) : (
              <BannerWinMobile
                userName={biggestEndTour?.bestUser?.userNickName || "super_"}
                userAvatar={
                  biggestEndTour?.bestUser?.tUser?.userAccount?.accountAvatar
                    ? process.env.REACT_APP_SOCKET_SERVER +
                      "/" +
                      biggestEndTour?.bestUser?.tUser?.userAccount
                        ?.accountAvatar
                    : imageHome.BannerWinAva
                }
                sponsorName={
                  biggestEndTour && biggestEndTour?.endTour
                    ? biggestEndTour?.endTour?.tournamentBrand?.brandName
                    : "Samsung"
                }
                tournamentName={
                  biggestEndTour && biggestEndTour?.endTour
                    ? biggestEndTour?.endTour?.tournamentName
                    : "Galaxy Z-flip 5"
                }
              />
            )
          ) : isFetchBiggestTour ? (
            <BannerLoading
              height={width < 576 ? "214px" : "363px"}
              width={"100%"}
            />
          ) : (
            <BannerWin
              userName={biggestEndTour?.bestUser?.userNickName || "super_"}
              userAvatar={
                biggestEndTour?.bestUser?.tUser?.userAccount?.accountAvatar
                  ? process.env.REACT_APP_SOCKET_SERVER +
                    "/" +
                    biggestEndTour?.bestUser?.tUser?.userAccount?.accountAvatar
                  : imageHome.BannerWinAva
              }
              sponsorName={
                biggestEndTour && biggestEndTour?.endTour
                  ? biggestEndTour?.endTour?.tournamentBrand?.brandName
                  : "Samsung"
              }
              tournamentName={
                biggestEndTour && biggestEndTour?.endTour
                  ? biggestEndTour?.endTour?.tournamentName
                  : "Galaxy Z-flip 5"
              }
            />
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
                  Ongoing promotion
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
                  View All
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
              />
            </Box>
          </Box>{" "}
          {/* ------------------------ */}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "64px",
              marginBottom: width < 576 ? "24px" : "32px",
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
                  Upcoming promotion{" "}
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
                  View All
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
                typePromo={"upcoming"}
              />
            </Box>
          </Box>{" "}
          {/* Banner Top1 */}
          {width < 576 ? (
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
                    hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
                  : images.pool
              }
              tourId={hotWeekTour && hotWeekTour?.id}
            />
          )}
          <Box
            sx={{
              marginTop: width < 576 ? "24px" : "64px",
              marginBottom: width < 576 ? "24px" : "32px",
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
                  Ended promotion{" "}
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
                  View All
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
                listData={endedTournament}
                loadingState={isFetchEnded}
                typePromo={"ended"}
              />
            </Box>
          </Box>{" "}
          {getAppType() === "promote" ? <Package /> : <></>}
          <NewFooter />
          {/* {promotion && width < 576 && (
            <Draggable
              onStart={(e, data) => {
                setstartPoint({ startX: data.x, startY: data.y });
              }}
              onStop={(e, data) => {
                if (
                  calculateDistance(
                    startPoint?.startX,
                    startPoint?.startY,
                    data.x,
                    data.y
                  ) < 3
                ) {
                  navigate("/luckywheel");
                }
              }}
              cancel=".clickable"
              defaultPosition={{ x: 0, y: 0 }}
              bounds="parent"
            >
              <Box sx={{ position: "fixed", zIndex: "1302" }}>
                <Box sx={{ position: "relative" }}>
                  {" "}
                  <Box
                    onClick={() => {
                      navigate("/luckywheel");
                    }}
                    src={images.SpinIconHomePage}
                    component={"img"}
                  ></Box>
                  <Box
                    className="clickable"
                    onClick={() => {
                      setPromotion(false);
                    }}
                    sx={{ position: "absolute", top: "0px", right: "-10px" }}
                    component={"img"}
                    src={images.closePromo}
                  ></Box>
                </Box>
              </Box>
            </Draggable>
          )} */}
        </Box>
      </ThemeProvider>
    </Container>
  );
}
