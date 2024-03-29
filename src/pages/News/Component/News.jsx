import { Box, Container, Grid, Typography, Button } from "@mui/material";
import SlickSlider from "../../../components/SlickSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getListBanner } from "../../../redux-saga-middleware/reducers/appReducer";
import SliderNews from "../SliderNews";
import { images } from "../../../utils/images";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function News() {
  const { threeBrandTour } = useSelector((state) => state.tournamentReducer);
  const [currentTab, setCurrentTab] = useState("New");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalItems = 100; // Total number of items in your list
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const dispatch = useDispatch();

  const itemList = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );

  // Get the items for the current page
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
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
        <Box className="News-Content">
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
                  setCurrentTab("New");
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor:
                    currentTab === "New" ? "#7848ED" : "transparent",
                  color: currentTab === "New" ? "white" : "#7848ED",
                  padding: "12px 40px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor:
                      currentTab === "New" ? "#7848ED" : "transparent",
                  },
                }}
              >
                {currentTab === "New" ? (
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
                  setCurrentTab("Update");
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor:
                    currentTab === "Update" ? "#7848ED" : "transparent",
                  color: currentTab === "Update" ? "white" : "#7848ED",
                  padding: "12px 40px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor:
                      currentTab === "Update" ? "#7848ED" : "transparent",
                  },
                }}
              >
                {currentTab === "Update" ? (
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
                  setCurrentTab("Event");
                }}
                sx={{
                  borderRadius: "8px",
                  backgroundColor:
                    currentTab === "Event" ? "#7848ED" : "transparent",
                  color: currentTab === "Event" ? "white" : "#7848ED",
                  padding: "12px 40px",
                  textTransform: "capitalize",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor:
                      currentTab === "Event" ? "#7848ED" : "transparent",
                  },
                }}
              >
                {currentTab === "Event" ? (
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
          <Box className="content">
            <Box>
              {currentItems.map((item, index) => (
                <Box key={index}
                  className="card-item"
                  display={"flex"}
                  justifyContent={"flex-start"}
                  mt={2}
                >
                  <Box className="item-img" sx={{ width: "30%" }}>
                    <Box
                      component={"img"}
                      src={images.bannerWin_Desktop}
                      alt=""
                      sx={{ width: "100%", height: "100%" }}
                    ></Box>
                  </Box>
                  <Box
                    className="item-title"
                    sx={{
                      width: "70%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
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
                      Experience the Magic of Taylor Swift's "The Eras Tour" and
                      Win Tickets to the Show! ${item}
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
                      In an unprecedented celebration of music and storytelling,
                      Taylor Swift is taking the world by storm with her latest
                      concert series, "The Eras Tour". This tour is a journey
                      through the musical epochs of Swift's illustrious career,
                      offering fans a chance to live through the evolutions of
                      her sound, from country roots to pop anthems and indie
                      folk narratives.....
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
                      By Xanh Le, Bao Tran   February 21, 2024 | 06:10 am GMT+7
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "120px",
          }}
        >
          <Stack spacing={2} mt={2} mb={5}>
            <Pagination
              count={Math.ceil(totalItems / itemsPerPage)} // Calculate total number of pages
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
