import React from "react";
import Layout from "../../components/Layout";
import InspirationTTF from "../../assets/font/CynthoNextMedium.otf";
import {
  Box,
  Container,
  CssBaseline,
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
const theme = createTheme({
  typography: {
    fontFamily: "Cyntho Next",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Cyntho Next",
          src: `url(${InspirationTTF}) format("truetype")`,
        },
      },
    },
  },
});
export default function WeekLongTour() {
  const { width } = useWindowDimensions();
  const [itemOffset, setItemOffSet] = useState(1);
  const [isFetchList, setIsFetchList] = useState(true);
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
            paddingLeft: width < 576 ? "24px !important" : "0px !important",
            paddingRight: width < 576 ? "24px !important" : "0px !important",
            paddingTop: width < 576 ? "24px !important" : "50px !important",
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
              }}
            >
              {" "}
              <Box
                component={"img"}
                src={images.PurpleBanner}
                sx={{ width: "100%" }}
              ></Box>
            </Box>
            <Box
              sx={{
                marginBottom: width < 576 ? "24px" : "32px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  minHeight: "577.88px",
                }}
              >
                {weeklyTournament
                  // ?.slice(itemOffset, itemOffset + 10)
                  ?.map((item, index) => {
                    return (
                      <Box sx={{ width: "20%", marginTop: "50px", marginRight: width > 576 && width < 1200 ? "100px" : "none" }} key={index}>
                        <ItemComponent tourInfo={item} countdown={true} />
                      </Box>
                    );
                  })}
              </Box>
            </Box>

            {weeklyTournament?.length > 0 && (
              <PaginatedItems
                pageCount={Math.ceil(weeklyTournament.length / 10)}
                changeOffSet={(value) => {
                  setItemOffSet(((value - 1) * 10) % weeklyTournament.length);
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
