import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import ListPromotion from "../../../components/ListPromotion/ListPromotion";
import BannerLoading from "../../../components/LoadingComponent/BannerLoading";
import SlickSlider from "../../../components/SlickSlider";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import NewFooter from "../../NewFooter";
import PaginatedItems from "../../PaginatedItems";
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
export default function HotTournament() {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { device } = useSelector((state) => state.deviceReducer);
  const { endedTournament,isFetchEnded } = useSelector((state) => state.tournamentReducer);
  const [data, setData] = useState([]);
  const [itemOffSet, setItemOffSet] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "CALL_LIST_TOURNAMENT",
      payload: "ended",
    });
  }, [dispatch]);

  useEffect(() => {
    if (endedTournament) {
      setData(endedTournament);
    }
  }, [endedTournament]);

  const imgHot = data?.map((e) => {
    return e.tournamentBackground;
  });

  const imgHotMobile = data?.map((e) => {
    return e.tournamentBackgroundMobile;
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
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
                Ended Promotion
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchEnded ? (
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
                <ListPromotion listData={data} loadingState={isFetchEnded} typePromo={"ended"} itemOffSet={itemOffSet}/>
              </Box>
              {!isFetchEnded && data?.length > 0 && (
                <PaginatedItems
                  pageCount={Math.ceil(data.length / 10)}
                  changeOffSet={(value) => {
                    setItemOffSet((value - 1) * 10);
                  }}
                />
              )}
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
              }}
            >
              <Typography
                sx={{
                  ...typographyStyle,
                  fontSize: "24px",
                }}
              >
                Ended Promotion
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
                {isFetchEnded ? (
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
                  loadingState={isFetchEnded}
                  itemOffSet={itemOffSet}
                  typePromo={"ended"}
                />
              </Box>
              {!isFetchEnded && data?.length > 0 && (
                <PaginatedItems
                  pageCount={Math.ceil(data.length / 10)}
                  changeOffSet={(value) => {
                    setItemOffSet((value - 1) * 10);
                  }}
                />
              )}
              <NewFooter />
            </Container>
          )
        }
      />
    </ThemeProvider>
  );
}
