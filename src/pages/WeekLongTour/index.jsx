import React from "react";
import Layout from "../../components/Layout";
import InspirationTTF from "../../assets/font/CynthoNextMedium.otf";
import {
  Box,
  Container,
  CssBaseline,
  Skeleton,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { images } from "../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import PaginatedItems from "../PaginatedItems";
import NewFooter from "../NewFooter";
import ItemComponent from "../NewHomePageComponent/NewHomePage/ItemComponent";
import ListItemLoading from "../NewHomePageComponent/NewHomePage/ItemLoading";
import ListEmpty from "../NewHomePageComponent/NewHomePage/ListEmpty";
const theme = createTheme({
  typography: {
    
  },
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
  const [isFetching, setIsFetching] = useState(true);
  if (!isFetchList) {
    setTimeout(() => setIsFetching(false), 2000);
  }
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { weeklyTournament } = useSelector((state) => state.tournamentReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isFetchList) {
      dispatch({
        type: "CALL_LIST_TOURNAMENT",
        payload: "weekly",
      });
      setIsFetchList(false);
    }
  }, [dispatch, isFetchList]);
  return (
    <Layout
      children={
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
            backgroundColor: "#1a151e",
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
              Week Long Tournament
            </Typography>
            <Box
              sx={{
                marginBottom: width < 576 ? "24px" : "32px",
                marginTop: width < 576 ? "24px" : "32px",
                minHeight: width < 576 ? "" : "375px",
              }}
            >
              {" "}
              {isFetching ? (
              <Skeleton
              sx={{
                height: width < 576 ? "" : "375px",
                bgcolor: "rgba(255,255,255,0.1)",
              }}
              variant="rectangular"
              animation="pulse"
            ></Skeleton>
              ) : (
                <Box
                  component={"img"}
                  src={images.PurpleBanner}
                  sx={{ width: "100%" }}
                ></Box>
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
                    width < 576 ? "1fr 1fr" : width < 1024 ? "1fr 1fr 1fr" :"1fr 1fr 1fr 1fr 1fr",
                  gridRowGap: "16px",
                  minHeight: "577.88px",
                }}
              >
                {isFetching ? (
                  <ListItemLoading />
                ) : weeklyTournament ? (
                  weeklyTournament
                    // ?.slice(itemOffset, itemOffset + 10)
                    ?.map((item, index) => {
                      return (
                        <Box
                          key={index}
                        >
                          <ItemComponent tourInfo={item} countdown={true} />
                        </Box>
                      );
                    })
                ) : (
                  <ListEmpty />
                )}
              </Box>
            </Box>

            {!isFetching && weeklyTournament?.length > 0 && (
              <PaginatedItems
                pageCount={Math.ceil(weeklyTournament.length / 10)}
                changeOffSet={(value) => {
                  // setItemOffSet(((value - 1) * 10) % weeklyTournament.length);
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
