import { Box, Container, Grid, Typography, Button } from "@mui/material";
import SlickSlider from "../../../components/SlickSlider";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect, useState } from "react";
import { getListBanner } from "../../../redux-saga-middleware/reducers/appReducer";
import SliderNews from "../SliderNews";
import { images } from "../../../utils/images";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getListNews, saveIdNews } from "../../../redux-saga-middleware/reducers/news";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const NewFooter = lazy(() => import("../../NewFooter"));

export default function News() {
  const { threeBrandTour } = useSelector((state) => state.tournamentReducer);
  const [currentTab, setCurrentTab] = useState("news");
  const [count, setCount] = useState(7);
  const [start, setStart] = useState(0);
  const { device } = useSelector((state) => state.deviceReducer);
  // const [tagNew,setTagNew] = useState("news")
  const [dataNews, setDataNews] = useState([]);
  const { listNews, total, idDetail } = useSelector((state) => state.newsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const PostTag = {
    NEWS: "news",
    UPDATE: "update",
    EVENT: "event",
  };

  const totalPage = Math.ceil(total / count);

  useEffect(() => {
    dispatch(
      getListNews({
        start: start * count,
        count: count,
        tag: currentTab,
      })
    );
  }, [dispatch, currentTab, start, count]);

  useEffect(() => {
    if (listNews) {
      setDataNews(listNews);
    }
  }, [listNews]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [start]);


  // Get the items for the current page
  const handleChangePage = (event, page) => {
    if (start >= 0) {
      setStart(page - 1);
    }
  };

  const banner = [
    {
      bannerLinkDesktop: images.bannerWin_Desktop,
      bannerLinkMobile: images.bannerendmobile,
    },
    {
      bannerLinkDesktop: images.bannerWin_Desktop,
      bannerLinkMobile: images.bannerendmobile,
    },
    {
      bannerLinkDesktop: images.bannerWin_Desktop,
      bannerLinkMobile: images.bannerendmobile,
    },
    {
      bannerLinkDesktop: images.bannerWin_Desktop,
      bannerLinkMobile: images.bannerendmobile,
    },
  ];

  useEffect(() => {
    dispatch(getListBanner());
    dispatch({
      type: "GET_THREE_BRAND_TOUR",
    });
  }, [dispatch]);

  return (
    <>
      <Container maxWidth={"lg"}>
        <Box
          className="News-title"
          sx={{ paddingTop: "60px", paddingBottom: "46px" }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: "36px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textAlign: "left",
            }}
          >
            News
          </Typography>
        </Box>
        <Box className="Slider-banner">
          <SliderNews appendDot={true} images={banner} tours={threeBrandTour} />
        </Box>
        <Box
          className="News-Content"
          sx={{
            background: "#1D1329",
          }}
        >
          <Box
            sx={{
              marginTop: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                background: "#302642",
                width: "100%",
                padding: "12px 24px",
              }}
            >
              <Button
                onClick={() => {
                  setCurrentTab(PostTag.NEWS);
                  setStart(0);
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor:
                    currentTab === PostTag.NEWS ? "#7848ED" : "transparent",
                  color: currentTab === PostTag.NEWS ? "white" : "#7848ED",
                  padding: device === "Mobile" ? "8px 30px" : "12px 40px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor:
                      currentTab === PostTag.NEWS ? "#7848ED" : "transparent",
                  },
                }}
              >
                {currentTab === PostTag.NEWS ? (
                  <Box
                    component={"img"}
                    src={images.news1}
                    alt="ram"
                    sx={{ width: "100%", height: "100%" }}
                    className="me-2"
                  ></Box>
                ) : (
                  <Box
                    component={"img"}
                    src={images.news2}
                    alt="ram"
                    sx={{ width: "100%", height: "100%" }}
                    className="me-2"
                  ></Box>
                )}
                News
              </Button>
              <Button
                onClick={() => {
                  setCurrentTab(PostTag.UPDATE);
                  setStart(0);
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor:
                    currentTab === PostTag.UPDATE ? "#7848ED" : "transparent",
                  color: currentTab === PostTag.UPDATE ? "white" : "#7848ED",
                  padding: device === "Mobile" ? "8px 30px" : "12px 40px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor:
                      currentTab === PostTag.UPDATE ? "#7848ED" : "transparent",
                  },
                }}
              >
                {currentTab === PostTag.UPDATE ? (
                  <Box
                    component={"img"}
                    src={images.check1}
                    alt="ram"
                    sx={{ width: "100%", height: "100%" }}
                    className="me-2"
                  ></Box>
                ) : (
                  <Box
                    component={"img"}
                    src={images.check2}
                    alt="ram"
                    sx={{ width: "100%", height: "100%" }}
                    className="me-2"
                  ></Box>
                )}
                Update
              </Button>
              <Button
                onClick={() => {
                  setCurrentTab(PostTag.EVENT);
                  setStart(0);
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor:
                    currentTab === PostTag.EVENT ? "#7848ED" : "transparent",
                  color: currentTab === PostTag.EVENT ? "white" : "#7848ED",
                  padding: device === "Mobile" ? "8px 30px" : "12px 40px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor:
                      currentTab === PostTag.EVENT ? "#7848ED" : "transparent",
                  },
                }}
              >
                {currentTab === PostTag.EVENT ? (
                  <Box
                    component={"img"}
                    src={images.event1}
                    alt="ram"
                    sx={{ width: "100%", height: "100%" }}
                    className="me-2"
                  ></Box>
                ) : (
                  <Box
                    component={"img"}
                    src={images.event2}
                    alt="ram"
                    sx={{ width: "100%", height: "100%" }}
                    className="me-2"
                  ></Box>
                )}
                Event
              </Button>
            </Box>
          </Box>
          <Box className="content" sx={{ minHeight: "940px" }}>
            <Box>
              {dataNews?.map((item) => (
                <Box
                  key={item?.id}
                  className="card-item"
                  display={"flex"}
                  justifyContent={"flex-start"}
                  mt={2}
                  onClick={() => {
                    navigate(`/news/${item.id}`)
                  }}
                >
                  <Box
                    className="item-img"
                    sx={{ width: device === "Mobile" ? "50%" : "30%", padding: "10px" }}
                  >
                    <Box
                      component={"img"}
                      src={images.bannerbuyticket}
                      alt=""
                      sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                      }}
                    ></Box>
                  </Box>
                  <Box
                    className="item-title"
                    sx={{
                      width: device === "Mobile" ? "50%" : "70%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      padding: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        letterSpacing: "0.2px",
                        lineHeight: "30px",
                        color: "#fff",
                        textAlign: "left",
                      }}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        letterSpacing: "0.12px",
                        lineHeight: "18px",
                        color: "#fff",
                        textAlign: "left",
                      }}
                    >
                      {item?.shortDesc === "string" ? (
                        <>
                          In an unprecedented celebration of music and
                          storytelling, Taylor Swift is taking the world by
                          storm with her latest concert series, "The Eras Tour".
                          This tour is a journey through the musical epochs of
                          Swift's illustrious career, offering fans a chance to
                          live through the evolutions of her sound, from country
                          roots to pop anthems and indie folk narratives.....
                        </>
                      ) : (
                        <>{item?.shortDesc}</>
                      )}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontWeight: 400,
                        letterSpacing: "0.269px",
                        lineHeight: "15px",
                        color: "#9384B7",
                        textAlign: "left",
                      }}
                    >
                      {dayjs(item?.updatedAt).format("DD/MM/YYYY h:mm A")}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "40px",
          }}
        >
          <Stack spacing={2} mt={2} mb={5} alignItems={"center"}>
            <Pagination
              count={totalPage} // Calculate total number of pages
              page={start + 1}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiButtonBase-root": {
                  // background:"#7848ED",
                  // border:"1px solid #7848ED",
                  color: "white",
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  backgroundColor: "#7848ED !important",
                },
                "& .MuiPaginationItem-previousNext": {
                  backgroundColor: "#7848ED !important",
                },
              }}
            />
          </Stack>
        </Box>
        <Suspense fallback="loading..." children={<NewFooter />} />
      </Container>
    </>
  );
}
