import {
    Box,
    Container,
    Typography,
    Button,
    Skeleton,
  } from "@mui/material";
  import { useDispatch, useSelector } from "react-redux";
  import { lazy, Suspense, useEffect, useState } from "react";
  import SliderNews from "../SliderNews";
  import { images } from "../../../utils/images";
  import Stack from "@mui/material/Stack";
  import Pagination from "@mui/material/Pagination";
  import {
    clickTabNews,
    getListBannerNews,
    getListNews,
  } from "../../../redux-saga-middleware/reducers/news";
  import dayjs from "dayjs";
  import { useNavigate } from "react-router-dom";
  import useWindowDimensions from "../../../utils/useWindowDimensions";
  import "../index.scss";
  const NewFooter = lazy(() => import("../../NewFooter"));
  
  export default function News() {
    const { width } = useWindowDimensions();
    const { threeBrandTour } = useSelector((state) => state.tournamentReducer);
    const [count, setCount] = useState(4);
    const [start, setStart] = useState(0);
    const { device } = useSelector((state) => state.deviceReducer);
    const [dataNews, setDataNews] = useState([]);
    const {
      listNews,
      total,
      idDetail,
      isFetchListNews,
      currentTab,
      listBanner,
      nodataNews,
    } = useSelector((state) => state.newsReducer);
    const [banner, setBanner] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const PostTag = {
      NEWS: "news",
      UPDATE: "update",
      EVENT: "event",
    };
  
    const totalPage = Math.ceil(total / count);
  
    useEffect(() => {
      dispatch(getListBannerNews());
    }, [dispatch]);
  
    useEffect(() => {
      if (listBanner) {
        setBanner(listBanner);
      }
    }, [listBanner]);
  
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
  
    return (
      <>
        <Container maxWidth={"lg"}>
          {device === "Mobile" ? (
            <></>
          ) : (
            <Box
              className="News-title"
              sx={{ paddingTop: "60px", paddingBottom: "16px" }}
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
          )}
          <Box
            className="Slider-banner"
            sx={{
              marginTop: "20px",
            }}
          >
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
                  padding: device === "Mobile" ? "10px 12px" : "12px 24px",
                }}
              >
                <Button
                  onClick={() => {
                    dispatch(
                      clickTabNews({
                        type: PostTag.NEWS,
                      })
                    );
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
                {device === "Mobile" ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      width: "1px",
                      height: "50px",
                      backgroundColor: "rgba(151, 151, 151, 0.40)",
                      margin: "0 5px",
                    }}
                  ></Box>
                )}
                <Button
                  onClick={() => {
                    dispatch(
                      clickTabNews({
                        type: PostTag.UPDATE,
                      })
                    );
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
                {device === "Mobile" ? (
                  <></>
                ) : (
                  <Box
                    sx={{
                      width: "1px",
                      height: "50px",
                      backgroundColor: "rgba(151, 151, 151, 0.40)",
                      margin: "0 5px",
                    }}
                  ></Box>
                )}
                <Button
                  onClick={() => {
                    dispatch(
                      clickTabNews({
                        type: PostTag.EVENT,
                      })
                    );
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
            <Box
              className="content"
              sx={{
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <>
                <Box>
                  {dataNews &&
                    dataNews?.length > 0 &&
                    dataNews?.map((item) => (
                      <Box
                        key={item?.id}
                        className="card-item cursor-pointer"
                        display={"flex"}
                        justifyContent={"flex-start"}
                        pt={2}
                        pb={2}
                        onClick={() => {
                          navigate(`/news/${item.id}`);
                        }}
                        sx={{
                          borderBottom: "2px solid #302642",
                          ":last-child": {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <Box
                          className="item-img"
                          sx={{
                            width: device === "Mobile" ? "45%" : "35%",
                            padding: "10px",
                          }}
                        >
                          {isFetchListNews ? (
                            <>
                              <Skeleton
                                variant="rectangular"
                                sx={{
                                  width: "100%",
                                  height: device === "Mobile" ? "150px" : "200px",
                                  backgroundColor: "rgba(255,255,255,0.5)",
                                  borderRadius: "8px",
                                }}
                              />
                            </>
                          ) : (
                            <Box>
                              <Box
                                component={"img"}
                                src={
                                  item?.thumbnail
                                    ? process.env.REACT_APP_SOCKET_SERVER + "/" +
                                      item?.thumbnail
                                    : images.christbg
                                }
                                alt=""
                                sx={{
                                  width: "350px",
                                  maxWidth: "100%",
                                  height: device === "Mobile" ? "150px" : "200px",
                                  borderRadius: "8px",
                                  objectFit: "cover",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                  textAlign: "center",
                                }}
                              ></Box>
                            </Box>
                          )}
                        </Box>
                        <Box
                          className="item-title"
                          sx={{
                            width: device === "Mobile" ? "55%" : "65%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            textAlign: "left",
                            padding: "10px",
                            justifyContent: "space-between",
                            overflow: "hidden",
                          }}
                        >
                          {isFetchListNews ? (
                            <>
                              <Skeleton
                                variant="text"
                                sx={{
                                  fontSize: "1rem",
                                  width: "100%",
                                  backgroundColor: "rgba(255,255,255,0.5)",
                                }}
                              />
                              <Skeleton
                                variant="text"
                                sx={{
                                  fontSize: "1rem",
                                  width: "70%",
                                  backgroundColor: "rgba(255,255,255,0.5)",
                                }}
                              />
                            </>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: device === "Mobile" ? "14px" : "20px",
                                fontWeight: 700,
                                letterSpacing: "0.2px",
                                lineHeight: device === "Mobile" ? "none" : "30px",
                                color: "#fff",
                                textAlign: "left",
                                overflow: "hidden",
                                wordBreak: "break-word",
                              }}
                            >
                              {item?.title}
                            </Typography>
                          )}
                          <>
                            {device === "Mobile" || device === "Tablet" ? (
                              <></>
                            ) : (
                              <>
                                {isFetchListNews ? (
                                  <>
                                    <Skeleton
                                      variant="text"
                                      sx={{
                                        fontSize: "1rem",
                                        width: "100%",
                                        backgroundColor: "rgba(255,255,255,0.5)",
                                      }}
                                    />
                                    <Skeleton
                                      variant="text"
                                      sx={{
                                        fontSize: "1rem",
                                        width: "70%",
                                        backgroundColor: "rgba(255,255,255,0.5)",
                                      }}
                                    />
                                  </>
                                ) : (
                                  <Typography
                                    sx={{
                                      fontSize: "12px",
                                      fontWeight: 500,
                                      letterSpacing: "0.12px",
                                      lineHeight: "18px",
                                      color: "#fff",
                                      textAlign: "left",
                                      overflow: "hidden",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {item?.shortDesc === "string" ? (
                                      <>
                                        In an unprecedented celebration of music
                                        and storytelling, Taylor Swift is taking
                                        the world by storm with her latest concert
                                        series, "The Eras Tour". This tour is a
                                        journey through the musical epochs of
                                        Swift's illustrious career, offering fans
                                        a chance to live through the evolutions of
                                        her sound, from country roots to pop
                                        anthems and indie folk narratives.....
                                      </>
                                    ) : (
                                      <>{item?.shortDesc}</>
                                    )}
                                  </Typography>
                                )}
                              </>
                            )}
                          </>
                          {isFetchListNews ? (
                            <>
                              <Skeleton
                                variant="text"
                                sx={{
                                  fontSize: "1rem",
                                  width: "100%",
                                  backgroundColor: "rgba(255,255,255,0.5)",
                                }}
                              />
                              <Skeleton
                                variant="text"
                                sx={{
                                  fontSize: "1rem",
                                  width: "70%",
                                  backgroundColor: "rgba(255,255,255,0.5)",
                                }}
                              />
                            </>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "10px",
                                fontWeight: 400,
                                letterSpacing: "0.269px",
                                lineHeight: "15px",
                                color: "#9384B7",
                                textAlign: "left",
                                overflow: "hidden",
                                wordBreak: "break-word",
                              }}
                            >
                              {dayjs(item?.updatedAt).format("DD/MM/YYYY h:mm A")}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  {nodataNews && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        component={"img"}
                        src={images.emptyNews}
                        alt="empty"
                        sx={{
                          width: width > 576 ? "auto" : "100%",
                        }}
                      ></Box>
                    </Box>
                  )}
                </Box>
              </>
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
  