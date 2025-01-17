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
import BannerLoading from "../../components/LoadingComponent/BannerLoading";
import ListItemLoading from "../../components/LoadingComponent/ItemLoading";
import ListEmpty from "../../components/LoadingComponent/ListEmpty";
import MainLayout from "../../components/MainLayout/MainLayout";
import SlickSlider from "../../components/SlickSlider";
import { getListPromotionNew } from "../../redux-saga-middleware/reducers/tournamentReducer";
import useWindowDimensions from "../../utils/useWindowDimensions";
import NewFooter from "../NewFooter";
import ItemComponent from "../NewHomePageComponent/NewHomePage/ItemComponent";
import PaginatedItems from "../PaginatedItems";
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
export default function WeekLongTour() {
  const { width } = useWindowDimensions();
  // const [itemOffset, setItemOffSet] = useState(1);
  const [isFetchList, setIsFetchList] = useState(true);
  const [itemOffSet, setItemOffSet] = useState(0);
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { weeklyTournament } = useSelector((state) => state.tournamentReducer);
  const { device } = useSelector((state) => state.deviceReducer);

  const imgHot = weeklyTournament.map((e) => {
    return e.tournamentBackground;
  });

  const imgHotMobile = weeklyTournament.map((e) => {
    return e.tournamentBackgroundMobile;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (isFetchList) {
      dispatch(getListPromotionNew({ type: "weekly" }))

      setIsFetchList(false);
    }
  }, [dispatch, isFetchList]);
  return (
    <MainLayout
      children={
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
            backgroundColor: "#211d28",
          }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography
              sx={{
                ...typographyStyle,
                fontSize: "24px",
              }}
            >
              Weeklong Tournament
            </Typography>
            <Box
              sx={{
                marginBottom: width < 576 ? "24px" : "32px",
                marginTop: width < 576 ? "24px" : "32px",
                minHeight: width < 576 ? "" : "375px",
              }}
            >
              {" "}
              {isFetchList ? (
                <BannerLoading
                  height={
                    width < 576 ? "208px" : width < 1024 ? "211px" : "375px"
                  }
                />
              ) : (
                <SlickSlider
                  appendDot={true}
                  type={"tour"}
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
                  marginTop: "50px",
                  display: "grid",
                  gridTemplateColumns:
                    width < 576
                      ? "1fr 1fr"
                      : width < 1024
                      ? "1fr 1fr 1fr"
                      : "1fr 1fr 1fr 1fr 1fr",
                  gridRowGap: "16px",
                  minHeight: "577.88px",
                }}
              >
                {isFetchList ? (
                  <ListItemLoading itemCount={5} />
                ) : weeklyTournament ? (
                  weeklyTournament
                    // ?.slice(itemOffset, itemOffset + 10)
                    ?.map((item, index) => {
                      return (
                        index >= itemOffSet &&
                        index <= itemOffSet + 9 && (
                          <Box key={index}>
                            <ItemComponent tourInfo={item} countdown={true} />
                          </Box>
                        )
                      );
                    })
                ) : (
                  <ListEmpty textData={"weeklong"} />
                )}
              </Box>
            </Box>

            {!isFetchList && weeklyTournament?.length > 0 && (
              <PaginatedItems
                pageCount={Math.ceil(weeklyTournament.length / 10)}
                changeOffSet={(value) => {
                  setItemOffSet((value - 1) * 10);
                }}
              />
            )}

            <NewFooter />
          </ThemeProvider>
        </Container>
      }
      type="Home"
    />
  );
}
