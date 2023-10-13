import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);
  // const [promotion, setPromotion] = useState(true);
  // const [startPoint, setstartPoint] = useState(null);
  const { width } = useWindowDimensions();
  const [isFetchList, setIsFetchList] = useState(true);
  const [type, setType] = useState("");
  // const [hourList, setHourList] = useState([]);
  // const [selectedHour, setSeHour] = useState(0);
  const [dayList, setDayList] = useState([
    "Mon",
    "Tus",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);
  const [selectedDay, setSeDay] = useState(0);

  const {
    dailyTournament,
    weeklyTournament,
    hourlyTournament,
    hotTournament,
    biggestEndTour,
    // brandTour,
    hotWeekTour,
    threeBrandTour,
    vipTournament,
    standardTournament,
    ongoingTournament,
    upcomingTournament,
    endedTournament,
  } = useSelector((state) => state.tournamentReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFetchList) {
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
        type: "CALL_BRAND_TOUR",
      });
      dispatch({
        type: "GET_HOTTEST_WEEK_TOUR",
      });
      dispatch({
        type: "GET_THREE_BRAND_TOUR",
      });
      setIsFetchList(false);
    }
  }, [dispatch, isFetchList]);

  useEffect(() => {
    setDayList(dailyTournament?.map((item) => item?.timeStart));
  }, [hourlyTournament, dailyTournament]);
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
            {isFetchList ? (
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
                    fontSize: width < 576 ? "14px" : "24px",
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
                loadingState={isFetchList}
                typePromo={"hot"}
              />
            </Box>
          </Box>{" "}
          {width < 576 ? (
            isFetchList ? (
              <BannerLoading
                height={width < 576 ? "214px" : "363px"}
                width={"100%"}
              />
            ) : (
              // <Box
              //   sx={{
              //     width: "100%",
              //     marginTop: width < 576 ? "24px" : "64px",
              //     marginBottom: width < 576 ? "24px" : "32px",
              //     backgroundImage: `url(${imageHome.banner_win_Mobile})`,
              //     height: "208.612px",
              //     backgroundSize:
              //       width < 576 ? "cover" : width < 1024 ? "contain" : " cover",
              //     display: "flex",
              //     justifyContent: "center",
              //     alignItems: "center",
              //     overflow: "hidden",
              //     padding: width > 576 && width < 1024 && "36px 160px",
              //   }}
              // >
              //   <Box
              //     sx={{
              //       display: "flex",
              //       justifyContent: "center",
              //       alignItems: "center",
              //       position: "relative",
              //       marginRight: "32px",
              //     }}
              //   >
              //     <Box sx={{}}>
              //       {" "}
              //       <Box
              //         sx={{
              //           backgroundImage: `url(${imageHome.ringMobile})`,
              //           width: "81px",
              //           height: "81px",
              //           display: "flex",
              //           justifyContent: "center",
              //           alignItems: "center",
              //         }}
              //       >
              //         <Box
              //           sx={{
              //             width: "75px",
              //             height: "75px",
              //             borderRadius: "50%",
              //           }}
              //           src={
              //             biggestEndTour?.bestUser?.tUser?.userAccount
              //               ?.accountAvatar
              //               ? process.env.REACT_APP_SOCKET_SERVER +
              //                 "/" +
              //                 biggestEndTour?.bestUser?.tUser?.userAccount
              //                   ?.accountAvatar
              //               : images.gameHotTournament
              //           }
              //           component={"img"}
              //         ></Box>
              //         <Box
              //           sx={{ position: "absolute", top: "-17px", left: "5px" }}
              //           component={"img"}
              //           src={imageHome.hatMobile}
              //         ></Box>
              //       </Box>
              //       <Typography
              //         sx={{
              //           color: "#fff",
              //           fontSize: "12.035px",
              //           fontWeight: "lighter !important",
              //           paddingTop: "10px",
              //         }}
              //       >
              //         {biggestEndTour?.bestUser?.userNickName || "super_"}
              //       </Typography>
              //     </Box>
              //   </Box>
              //   <Box
              //     sx={{
              //       width: "50%",
              //       display: "flex",
              //       flexDirection: "column",
              //       boxSizing: "border-box",
              //       position: "relative",
              //       justifyContent: "center",
              //       height: "100%",
              //     }}
              //   >
              //     <Typography
              //       sx={{
              //         color: "#FFDC62",
              //         fontSize: "18px",
              //         marginLeft: "0px !important",
              //         display: "-webkit-box",
              //         WebkitBoxOrient: "vertical",
              //         WebkitLineClamp: 2,
              //         overflow: "hidden",
              //       }}
              //     >
              //       {String(
              //         biggestEndTour?.endTour?.tournamentName || "MEGA HOLIC"
              //       )?.length > 10
              //         ? String(
              //             biggestEndTour?.endTour?.tournamentName ||
              //               "MEGA HOLIC"
              //           )
              //             ?.toUpperCase()
              //             ?.slice(0, 10) + "..." || "MEGA HOLIC"
              //         : String(
              //             biggestEndTour?.endTour?.tournamentName ||
              //               "MEGA HOLIC"
              //           )?.toUpperCase()}
              //     </Typography>
              //     <Box
              //       sx={{
              //         backgroundImage: `url(${imageHome.megaholicMobile})`,
              //         width: `${width / 1.6}px`,
              //         height: "113px",
              //         marginTop: "10px",
              //         display: "flex",
              //         flexDirection: "column",
              //         alignItems: width < 576 ? "flex-start" : "center",
              //         padding: "10px 47px",
              //       }}
              //     >
              //       <Typography sx={{ color: "#fff", fontSize: "40px" }}>
              //         {biggestEndTour?.endTour?.tournamentAutoAmount
              //           ? biggestEndTour?.endTour?.tournamentAutoAmount + " $"
              //           : "5000$"}
              //       </Typography>
              //       <Typography sx={{ color: "#fff", fontSize: "9px" }}>
              //         GRAND TOURNAMENT WINNER
              //       </Typography>
              //     </Box>
              //   </Box>
              // </Box>
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
          ) : isFetchList ? (
            <BannerLoading
              height={width < 576 ? "214px" : "363px"}
              width={"100%"}
            />
          ) : (
            // <Box
            //   sx={{
            //     width: "100%",
            //     marginTop: width < 576 ? "24px" : "64px",
            //     marginBottom: width < 576 ? "24px" : "32px",
            //     backgroundImage: `url(${images.banner_win_BG})`,
            //     height: width < 1024 ? "266.56px" : "348.909px",
            //     backgroundSize: "cover",
            //     backgroundRepeat: "no-repeat",
            //     backgroundPosition: "center",
            //     display: "flex",
            //     justifyContent: "space-evenly",
            //     alignItems: "center",
            //   }}
            // >
            //   <Box
            //     sx={{
            //       height: "400px",
            //       width: width > 576 && width < 1024 ? "fit-content" : "200px",
            //       marginLeft: "0px",
            //       backgroundRepeat: "no-repeat",
            //       backgroundPosition: "center",
            //       display: "flex",
            //       flexDirection: "column",
            //       justifyContent: "center",
            //       position: "relative",
            //       boxSizing: "border-box",
            //       paddingLeft: "10px",
            //     }}
            //   >
            //     <Box
            //       sx={{
            //         width: width < 1024 ? "135px" : "168px",
            //         height: width < 1024 ? "135px" : "168px",
            //         position: "relative",
            //       }}
            //     >
            //       <Box
            //         style={{ border: "4px solid rgba(224, 127, 20,100)" }}
            //         component={"img"}
            //         src={
            //           biggestEndTour?.bestUser?.tUser?.userAccount
            //             ?.accountAvatar
            //             ? process.env.REACT_APP_SOCKET_SERVER +
            //               "/" +
            //               biggestEndTour?.bestUser?.tUser?.userAccount
            //                 ?.accountAvatar
            //             : images.pool
            //         }
            //         sx={{
            //           borderRadius: "50%",
            //           width: "100%",
            //           height: "100%",
            //         }}
            //       ></Box>
            //       <Box
            //         component={"img"}
            //         src={images.hatWinner}
            //         sx={{
            //           width: width < 1024 ? "60px" : "81.119px",
            //           height: "auto",
            //           position: "absolute",
            //           left: "2px",
            //           top: "-30px",
            //         }}
            //       ></Box>
            //     </Box>
            //     <Typography
            //       sx={{
            //         position: "absolute",
            //         // left: "271px",
            //         bottom: width < 1024 ? "80px" : "50px",
            //         color: "#ffff",
            //         fontSize: "33px",
            //         marginLeft: "0px !important",
            //       }}
            //     >
            //       {biggestEndTour?.bestUser?.userNickName || "super_"}
            //     </Typography>
            //   </Box>
            //   <Box
            //     sx={{
            //       backgroundImage: `url(${imageHome.megaHolicBanner})`,
            //       backgroundSize: "cover",
            //       width: width < 1024 ? "385px" : "504px",
            //       height: width < 1024 ? "212px" : "278px",
            //       position: "relative",
            //       marginRight: "20px",
            //     }}
            //   >
            //     <Typography
            //       sx={{
            //         marginLeft: "0px !important",
            //         color: "#FFDC62",
            //         // fontSize: "30px",
            //         position: "absolute",
            //         top: width < 1024 && width > 576 ? "35px" : "38px",
            //         left: width < 1024 && width > 576 ? "60px" : "90px",
            //         fontSize: width < 1024 && width > 576 ? "20px" : "32px",
            //       }}
            //     >
            //       {String(
            //         biggestEndTour?.endTour?.tournamentName || "MEGA HOLIC"
            //       )?.length > 10
            //         ? String(
            //             biggestEndTour?.endTour?.tournamentName || "MEGA HOLIC"
            //           )
            //             ?.toUpperCase()
            //             ?.slice(0, 10) + "..." || "MEGA HOLIC"
            //         : String(
            //             biggestEndTour?.endTour?.tournamentName || "MEGA HOLIC"
            //           )?.toUpperCase()}
            //     </Typography>
            //     <Typography
            //       sx={{
            //         marginLeft: "0px !important",
            //         color: "#fff",
            //         // fontSize: "88px",
            //         position: "absolute",
            //         top: width < 576 ? "" : width < 1024 ? "85px" : "90px",
            //         left: "2rem",
            //         width: "100%",
            //         fontSize:
            //           width < 576 ? "40px" : width < 1024 ? "50px" : "80px",
            //       }}
            //       className="text-center"
            //     >
            //       {biggestEndTour?.endTour?.tournamentAutoAmount
            //         ? biggestEndTour?.endTour?.tournamentAutoAmount + "$"
            //         : "5000$"}
            //     </Typography>
            //     <Typography
            //       sx={{
            //         marginLeft:
            //           width < 1024 && width > 576
            //             ? "-5px !important"
            //             : "0px !important",
            //         fontSize: width < 1024 && width > 576 ? "12px" : "15px",
            //         color: "#ffff",
            //         position: "absolute",
            //         top: width > 576 && width < 1024 ? "165px" : "214px",
            //         left: width > 576 && width < 1024 ? "164px" : "212px",
            //         height: "20px",
            //         maxWidth: "191pxpx",
            //         overflow: "hidden",
            //         textOverflow: "ellipsis",
            //         whiteSpace: "nowrap",
            //       }}
            //     >
            //       GRAND TOURNAMENT WINNER
            //     </Typography>
            //   </Box>
            // </Box>
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
          {/* Brief List Tournament */}
          {/* <Box
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
                    fontSize: width < 576 ? "14px" : "20px",
                    fontWeight: "200 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  Hourly tournament{" "}
                </Typography>
              </Box>
              <Box
                onClick={() => {
                  if (width > 576) {
                    navigate("/hourly-tournament");
                  } else {
                    setOpen(true);
                    setType("hourly");
                  }
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "12px" : "16px",
                    fontWeight: "200 !important",
                    color: "#BE48ED",
                    fontFamily:"Cyntho Next",
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
            <Box>
              <SliderTime
                updateSelectedIndex={(index) => {
                  setSeHour(index);
                }}
                selectedItem={selectedHour}
                list={hourList?.map((item) => moment(item)?.format("HH:mm"))}
              />
            </Box>
            <Box
              sx={{
                marginTop: width < 576 ? "12px" : "16px",
                marginBottom: width < 576 ? "12px" : "16px",
              }}
            >
              <CountDownTournament expiryTime={hourList[selectedHour]} />
            </Box>
            <Box>
              {width < 576 ? (
                <Slider
                  dots={false}
                  slidesToShow={2}
                  arrows={false}
                  slidesToScroll={2}
                  infinite={true}
                >
                  {hourlyTournament
                    ?.filter(
                      (n) =>
                        moment(n.timeStart).format("HH:mm") ===
                        hourList[selectedHour]?.format("HH:mm")
                    )[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        <ItemComponent
                          key={index}
                          countdown={false}
                          tourInfo={item}
                        />
                      );
                    })}
                </Slider>
              ) : (
                <Slider
                  dots={false}
                  slidesToShow={5}
                  arrows={false}
                  slidesToScroll={5}
                  infinite={false}
                >
                  {hourlyTournament
                    ?.filter(
                      (n) =>
                        moment(n.timeStart).format("HH:mm") ===
                        hourList[selectedHour]?.format("HH:mm")
                    )[0]
                    ?.listTournament?.map((item, index) => {
                      return (
                        <ItemComponent
                          key={index}
                          countdown={true}
                          tourInfo={item}
                        />
                      );
                    })}
                </Slider>
              )}
            </Box>
          </Box>{" "} */}
          {/* <Box
            component={"div"}
            className="cursor-pointer"
            onClick={() => navigate("/week-long-tournament")}
            sx={{
              marginTop: width < 576 ? "24px" : "64px",
              marginBottom: width < 576 ? "24px" : "32px",
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
          </Box> */}
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
                    fontSize: width < 576 ? "14px" : "24px",
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
                loadingState={isFetchList}
              />
            </Box>

            {/* <Box sx={{ marginTop: width < 576 ? "24px" : "32px" }}>
              {width < 576 ? (
                // <Slider
                //   dots={false}
                //   slidesToShow={2}
                //   arrows={false}
                //   slidesToScroll={2}
                //   infinite={false}
                // >

                // </Slider>
                <div className="scrolling-carousel-example1-container">
                  <ScrollingCarousel>
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
                            <div key={index}>
                              <ItemComponent
                                key={index}
                                countdown={true}
                                tourInfo={item}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <ListEmpty textData={"daily"} />
                    )}
                  </ScrollingCarousel>
                </div>
              ) : (
                // <Slider
                //   dots={false}
                //   slidesToShow={5}
                //   arrows={false}
                //   slidesToScroll={5}
                //   infinite={false}
                //   responsive={[
                //     {
                //       breakpoint: 1024,
                //       settings: {
                //         slidesToShow: 3,
                //         slidesToScroll: 3,
                //       }
                //     },
                //     {
                //       breakpoint: 600,
                //       settings: {
                //         slidesToShow: 2,
                //         slidesToScroll: 2,
                //         initialSlide: 2
                //       }
                //     },
                //     {
                //       breakpoint: 480,
                //       settings: {
                //         slidesToShow: 1,
                //         slidesToScroll: 1
                //       }
                //     }
                //   ]}
                // >

                // </Slider>
                <div className="scrolling-carousel-example1-container">
                  <ScrollingCarousel>
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
                            <div key={index}>
                              <ItemComponent
                                key={index}
                                countdown={true}
                                tourInfo={item}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <ListEmpty textData={"daily"} />
                    )}
                  </ScrollingCarousel>
                </div>
              )}
            </Box> */}
          </Box>{" "}
          {/* Brief information */}
          {/* <Box
            sx={{
              marginTop: width < 576 ? "24px" : "64px",
              marginBottom: width < 576 ? "24px" : "32px",
            }}
          >
            {" "}
            {width < 576 ? (
              <SlickSlider
                appendDot={false}
                isHtmlCode={true}
                htmlCode={brandTour?.map((item, index) => {
                  return (
                    <Box key={index}>
                      <Box
                        sx={{
                          backgroundColor: "#0F041D",
                          backgroundImage:
                            "linear-gradient(to right bottom, #0F041D, #300755, #4e087b, #5a0681, #730c93, #6e2099, #692d9e, #6437a2, #4f48a6, #3e55a5, #355ea0, #386699)",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "121.44px",
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 10px 10px 25px",
                          boxSizing: "border-box",
                          justifyContent: "space-between",
                          borderRadius: "5px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{ width: "48px", height: "auto" }}
                            component={"img"}
                            src={
                              item &&
                              item?.tournamentBrand &&
                              item?.tournamentBrand?.brandAvatar
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  item?.tournamentBrand?.brandAvatar
                                : imageHome.MCDonalIcon
                            }
                          ></Box>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "14px",
                              fontWeight: "lighter !important",
                              marginTop: "5px",
                            }}
                          >
                            {item &&
                              item?.tournamentBrand &&
                              item?.tournamentBrand?.brandName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backgroundBlendMode: "overlay",
                            height: "100%",
                            width: "217.76px",
                            borderRadius: "3px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "15px 10px",
                            boxSizing: "border-box",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "12px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                }}
                              >
                                BIG EARN UP TO
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "10px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                  marginTop: "-4px",
                                }}
                              >
                                For top 10
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                color: "#FFC107",
                                fontSize: "25px",
                              }}
                            >
                              {item?.tournamentAutoAmount}$
                            </Typography>
                          </Box>
                          <button
                            onClick={() => {
                              navigate(`/tournamentDetail/${item?.id}`);
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                              width: "100%",
                              borderRadius: "5px",
                              background:
                                "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                              color: "#ffff",
                              fontSize: "14px",
                              padding: "4px 0px",
                            }}
                          >
                            Play now
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              />
            ) : (
              <Slider
                dots={false}
                slidesToShow={3}
                arrows={false}
                slidesToScroll={2}
                infinite={false}
              >
                {brandTour?.map((item, index) => {
                  return (
                    <Box sx={{ padding: "0px 16px" }} key={index}>
                      <Box
                        sx={{
                          backgroundImage: `url(${imageHome.voucherBanner})`,
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "121.44px",
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 23px 10px 23px",
                          boxSizing: "border-box",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{ width: "48px", height: "auto" }}
                            component={"img"}
                            src={
                              item &&
                              item?.tournamentBrand &&
                              item?.tournamentBrand?.brandAvatar
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  item?.tournamentBrand?.brandAvatar
                                : imageHome.MCDonalIcon
                            }
                          ></Box>
                          <Typography
                            sx={{
                              color: "#ffff",
                              fontSize: "14px",
                              fontWeight: "lighter !important",
                              marginTop: "5px",
                            }}
                          >
                            {item &&
                              item?.tournamentBrand &&
                              item?.tournamentBrand?.brandName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            backgroundBlendMode: "overlay",
                            height: "100%",
                            width: "217.76px",
                            borderRadius: "3px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "15px 10px",
                            boxSizing: "border-box",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "12px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                }}
                              >
                                BIG EARN UP TO
                              </Typography>
                              <Typography
                                sx={{
                                  color: "#fff",
                                  fontSize: "10px",
                                  fontWeight: "lighter !important",
                                  textAlign: "end",
                                  marginTop: "-4px",
                                }}
                              >
                                For top 10
                              </Typography>
                            </Box>
                            <Typography
                              sx={{
                                color: "#FFC107",
                                fontSize: "25px",
                              }}
                            >
                              {item?.tournamentAutoAmount || 0}$
                            </Typography>
                          </Box>
                          <button
                            onClick={() => {
                              navigate(`/tournamentDetail/${item?.id}`);
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                              width: "100%",
                              borderRadius: "5px",
                              background:
                                "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                              color: "#ffff",
                              fontSize: "14px",
                              padding: "4px 0px",
                            }}
                          >
                            Play now
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Slider>
            )}
          </Box> */}
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
                    fontSize: width < 576 ? "14px" : "24px",
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
                loadingState={isFetchList}
              />
            </Box>
          </Box>{" "}
          {/* Banner Top1 */}
          {width < 576 ? (
            isFetchList ? (
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
          ) : isFetchList ? (
            <BannerLoading
              height={width < 576 ? "214px" : "363px"}
              width={"100%"}
            />
          ) : (
            // <Box
            //   sx={{
            //     marginTop: width < 576 ? "24px" : "64px",
            //     marginBottom: width < 576 ? "24px" : "32px",
            //     backgroundImage: `url(${
            //       width < 576
            //         ? imageHome.bannerTop1Mobile
            //         : imageHome.bannerTop1
            //     })`,
            //     width: "100%",
            //     height: "348.909px",
            //     backgroundSize: "cover",
            //     display: "flex",
            //     alignItems: "center",
            //     justifyContent: "space-evenly",
            //     boxSizing: "border-box",
            //   }}
            // >
            //   <Box
            //     sx={{
            //       width: "210px",
            //       height: "max-content",
            //       borderRadius: "50%",
            //       position: "relative",
            //       marginLeft: width < 1024 && "32px",
            //     }}
            //   >
            //     <Box
            //       sx={{
            //         borderRadius: "50%",
            //         width: 576 < width && 1024 > width ? "150px" : "210px",
            //         height: 576 < width && 1024 > width ? "150px" : "210px",
            //         boxShadow: "4px 4px 0px 3px rgba(6,135,201,1)",
            //       }}
            //       src={
            //         hotWeekTour &&
            //         hotWeekTour?.bestUser &&
            //         hotWeekTour?.bestUser?.tUser &&
            //         hotWeekTour?.bestUser?.tUser?.userAccount &&
            //         hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
            //           ? process.env.REACT_APP_SOCKET_SERVER +
            //             "/" +
            //             hotWeekTour?.bestUser?.tUser?.userAccount?.accountAvatar
            //           : images.pool
            //       }
            //       component={"img"}
            //     ></Box>
            //     <Box
            //       sx={{
            //         width: "140px",
            //         height: "auto",
            //         position: "absolute",
            //         top: 576 < width && 1024 > width ? "-80px" : "-50px",
            //         left: 576 < width && 1024 > width ? "-40px" : "-76px",
            //       }}
            //       component={"img"}
            //       src={imageHome.top1Icon}
            //     ></Box>
            //   </Box>
            //   <Box sx={{ paddingLeft: "50px" }}>
            //     <Typography
            //       sx={{
            //         color: "#FFDC62",
            //         textAlign: "start",
            //         fontSize: "16.042px",
            //         marginLeft: "0px !important",
            //       }}
            //     >
            //       TOURNAMENT OF THE WEEK
            //     </Typography>
            //     <Box className="name-tour">
            //       <Typography
            //         sx={{
            //           fontSize: "50px",
            //           textAlign: "start",
            //         }}
            //       >
            //         {String(hotWeekTour?.tournamentName)?.length > 10
            //           ? String(hotWeekTour?.tournamentName)?.slice(0, 10) +
            //             "..."
            //           : String(hotWeekTour?.tournamentName)}
            //       </Typography>
            //     </Box>
            //     <Box sx={{ display: "flex" }}>
            //       <Box
            //         sx={{ width: "60px", height: "auto" }}
            //         component={"img"}
            //         src={
            //           hotWeekTour &&
            //           hotWeekTour?.tournamentBrand &&
            //           hotWeekTour?.tournamentBrand?.brandAvatar
            //             ? process.env.REACT_APP_SOCKET_SERVER +
            //               "/" +
            //               hotWeekTour?.tournamentBrand?.brandAvatar
            //             : imageHome.brandAvatar
            //         }
            //       ></Box>
            //       <Box
            //         sx={{
            //           width: "2.027px",
            //           backgroundColor: "#371972",
            //           margin: "0px 12px 0px 12px",
            //         }}
            //       ></Box>
            //       <CountDownBannerHot
            //         expiryTime={moment(hotWeekTour?.tournamentEndAt)}
            //       />
            //     </Box>
            //     <Box
            //       sx={{
            //         backgroundColor: "rgba(139, 31, 207, 0.30)",
            //         borderRadius: "5px",
            //         marginTop: "35px",
            //         padding: "10.026px 14.037px",
            //         width: width < 1024 ? "310px" : "420px",
            //         display: "flex",
            //         justifyContent: "space-between",
            //       }}
            //     >
            //       <Box sx={{ display: "flex", alignItems: "center" }}>
            //         <Typography
            //           sx={{
            //             color: "#00CBEF",
            //             textAlign: "start",
            //             fontSize: "20px",
            //             marginLeft: "0px !important",
            //             marginRight: "5px",
            //           }}
            //         >
            //           Get
            //         </Typography>
            //         <Typography
            //           sx={{
            //             color: "#FAA515",
            //             textAlign: "start",
            //             fontSize: "30.078px",
            //             marginLeft: "0px !important",
            //             marginRight: "5px",
            //           }}
            //         >
            //           ${hotWeekTour?.tournamentAutoAmount}
            //         </Typography>
            //         <Typography
            //           sx={{
            //             color: "#00CBEF",
            //             textAlign: "start",
            //             fontSize: "20px",
            //             marginLeft: "0px !important",
            //           }}
            //         >
            //           gift
            //         </Typography>
            //       </Box>
            //       <button
            //         onClick={() => {
            //           if (hotWeekTour?.id) {
            //             navigate("/tournamentDetail/" + hotWeekTour?.id);
            //           }
            //         }}
            //         style={{
            //           background:
            //             "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
            //           outline: "none",
            //           border: "none",
            //           borderRadius: "5px",
            //           color: "#fff",
            //           padding: "0px 60px",
            //           fontSize: width < 1024 ? "12px" : "16px",
            //           cursor: "pointer",
            //         }}
            //       >
            //         Play now
            //       </button>
            //     </Box>
            //   </Box>
            // </Box>
            // <BannerTop1 />
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
                    fontSize: width < 576 ? "14px" : "24px",
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
                loadingState={isFetchList}
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
