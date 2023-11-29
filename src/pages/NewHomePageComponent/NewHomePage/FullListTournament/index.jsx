import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BannerLoading from "../../../../components/LoadingComponent/BannerLoading";
import ListItemLoading from "../../../../components/LoadingComponent/ItemLoading";
import ListEmpty from "../../../../components/LoadingComponent/ListEmpty";
import SlickSlider from "../../../../components/SlickSlider";
import SliderTime from "../../../../components/SliderTime";
import { imageHome, images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import PaginatedItems from "../../../PaginatedItems";
import CountDownBannerHot from "../../CountDownBannerHot";
import CountDownTournament from "../../CountDownTournament";
import ItemComponent from "../ItemComponent";

export default function FullListTournament({ handleOnClose, open, type }) {
  const {
    dailyTournament,
    weeklyTournament,
    hourlyTournament,
    hotTournament,
    hotWeekTour,
  } = useSelector((state) => state.tournamentReducer);
  const [isFetchList, setIsFetchList] = useState(true);
  const [hourList, setHourList] = useState([]);
  const [selectedHour, setSeHour] = useState(0);
  const [dayList, setDayList] = useState([]);
  const [selectedDay, setSeDay] = useState(0);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [itemOffSet, setItemOffSet] = useState(0);
  const [tourList, setTourList] = useState([]);
  useEffect(() => {
    if (isFetchList) {
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "week",
      });
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "hot",
      });
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "hour",
      });
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "day",
      });
      setIsFetchList(false);
    }
  }, [dispatch, isFetchList]);

  useEffect(() => {
    if (type === "hot") {
      setTourList(hotTournament);
    } else if (type === "daily") {
      setTourList(
        dailyTournament?.filter((n) => n.timeStart === dayList[selectedDay])[0]
          ?.listTournament
      );
    } else if (type === "hourly") {
      setTourList(
        hourlyTournament?.filter(
          (n) =>
            moment(n.timeStart).format("HH:mm") ===
            hourList[selectedHour]?.format("HH:mm")
        )[0]?.listTournament
      );
    } else if (type === "week-long") {
      setTourList(weeklyTournament);
    }
  }, [
    type,
    hotTournament,
    dailyTournament,
    hourlyTournament,
    weeklyTournament,
    dayList,
    selectedDay,
    hourList,
    selectedHour,
  ]);

  useEffect(() => {
    setHourList(hourlyTournament.map((item) => moment(item?.timeStart)));
    setDayList(dailyTournament.map((item) => item?.timeStart));
  }, [hourlyTournament, dailyTournament]);
  const navigate = useNavigate();

  const [moment, setMoment] = useState(null);

  useEffect(() => {
    import('moment').then(momentModule => {
      setMoment(momentModule);
    });
  }, []);
  return (
    <Dialog sx={{ zIndex: "1320" }} fullScreen={true} open={open}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#211D28",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          paddingBottom: "78px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "44px",
            backgroundColor: "#42285B",
            display: "flex",
            alignItems: "center",
            padding: "0px 15px",
            boxSizing: "border-box",
          }}
        >
          <Box
            component={"img"}
            src={images.BackButtonLobby}
            sx={{ width: "13px" }}
            onClick={() => {
              handleOnClose();
            }}
          ></Box>
          <Typography
            sx={{
              textAlign: "start",
              color: "#ffff",
              fontWeight: "lighter !important",
              fontSize: "14px",
            }}
            onClick={() => {
              handleOnClose();
            }}
          >
            {type === "hot"
              ? "Hot tournaments"
              : type === "hourly"
              ? "Hourly tournaments"
              : type === "daily"
              ? "Daily tournament"
              : "Weeklong tournaments"}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", height: "auto", padding: "20px" }}>
          {type === "hot" && (
            <Box sx={{ marginBottom: width < 576 ? "24px" : "32px" }}>
              {" "}
              {isFetchList ? (
                <BannerLoading height={208} />
              ) : (
                <SlickSlider
                  appendDot={true}
                  images={
                    width < 576
                      ? [
                          images.bannerTournament,
                          images.bannerTournament1,
                          images.bannerTournament2,
                        ]
                      : [
                          images.BannerHomePageDesktop,
                          images.BannerHomePageDesktop,
                          images.BannerHomePageDesktop,
                        ]
                  }
                />
              )}
            </Box>
          )}
          {type === "week-long" && (
            <Box
              sx={{
                marginTop: width < 576 ? "24px" : "32px",
                marginBottom: width < 576 ? "24px" : "32px",
                backgroundImage: `url(${imageHome.bannerTop1Mobile})`,
                width: "100%",
                height: "210px",
                backgroundSize: "cover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#0687C9",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    width: "80px",
                    height: "80px",
                    position: "absolute",
                    top: "-3px",
                    left: "-2px",
                  }}
                  src={
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
                  component={"img"}
                ></Box>{" "}
                <Box
                  sx={{
                    width: "60px",
                    height: "auto",
                    position: "absolute",
                    top: "-40px",
                    left: "-19px",
                  }}
                  component={"img"}
                  src={imageHome.top1Icon}
                ></Box>
              </Box>
              <Box sx={{ paddingLeft: "20px" }}>
                <Typography
                  sx={{
                    color: "#FFDC62",
                    textAlign: "start",
                    fontSize: "10px",
                    marginLeft: "0px !important",
                  }}
                >
                  TOURNAMENT OF THE WEEK
                </Typography>
                <Box
                  component={"img"}
                  src={imageHome.titleImage}
                  sx={{ width: "197.541px", margin: "10px 0px 10px 0px" }}
                ></Box>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{ width: "23px", height: "auto" }}
                    component={"img"}
                    src={
                      hotWeekTour &&
                      hotWeekTour?.tournamentBrand &&
                      hotWeekTour?.tournamentBrand?.brandAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          hotWeekTour?.tournamentBrand?.brandAvatar
                        : imageHome.brandAvatar
                    }
                  ></Box>
                  <Box
                    sx={{
                      width: "0.729px",
                      backgroundColor: "#371972",
                      margin: "0px 12px 0px 12px",
                    }}
                  ></Box>
                  <CountDownBannerHot
                    expiryTime={moment(hotWeekTour?.tournamentEndAt)}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: "rgba(139, 31, 207, 0.30)",
                    borderRadius: "5px",
                    marginTop: "15px",
                    padding: "4px 5px",
                    width: `${width / 2.1}px`,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "8px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      Get
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FAA515",
                        textAlign: "start",
                        fontSize: "10.062px",
                        marginLeft: "0px !important",
                        marginRight: "5px",
                      }}
                    >
                      ${hotWeekTour?.tournamentPrize}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#00CBEF",
                        textAlign: "start",
                        fontSize: "8px",
                        marginLeft: "0px !important",
                      }}
                    >
                      gift
                    </Typography>
                  </Box>
                  <button
                    onClick={() => {
                      navigate("/promotion-detail/" + hotWeekTour?.id);
                    }}
                    style={{
                      background:
                        "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                      outline: "none",
                      border: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      padding: `2.683px ${width / 16}px`,
                      fontSize: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Play now
                  </button>
                </Box>
              </Box>
            </Box>
          )}
          {type === "hourly" && (
            <>
              {" "}
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
            </>
          )}
          {type === "daily" && (
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
          )}
          {isFetchList ? (
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <ListItemLoading />
            </Box>
          ) : tourList?.length ? (
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {tourList?.map((item, index) => {
                return (
                  index >= itemOffSet &&
                  index <= itemOffSet + 9 &&
                  (index % 2 === 0 ? (
                    <Box
                      onClick={() => navigate("/promotion-detail/" + item?.id)}
                      key={index}
                      sx={{
                        boxSizing: "border-box",
                        marginTop: "24px",
                      }}
                    >
                      <ItemComponent countdown={true} tourInfo={item} />
                    </Box>
                  ) : (
                    <Box
                      onClick={() => navigate("/promotion-detail/" + item?.id)}
                      key={index}
                      sx={{
                        boxSizing: "border-box",
                        marginTop: "24px",
                      }}
                    >
                      <ItemComponent countdown={true} tourInfo={item} />
                    </Box>
                  ))
                );
              })}
            </Box>
          ) : (
            <ListEmpty />
          )}
          {!isFetchList && (
            <PaginatedItems
              pageCount={Math.ceil(tourList.length / 10)}
              changeOffSet={(value) => {
                setItemOffSet((value - 1) * 10);
              }}
            />
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
