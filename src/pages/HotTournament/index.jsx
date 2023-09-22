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
import SlickSlider from "../../components/SlickSlider";
import { images, video } from "../../utils/images";
import { useSelector } from "react-redux";
import ItemComponent from "../NewHomePageComponent/NewHomePage/ItemComponent";
import NewFooter from "../NewFooter";
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
export default function HotTournament() {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { hotTournament } = useSelector((state) => state.tournamentReducer);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout
        children={
          width > 576 ? (
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
                Hot Tournament
              </Typography>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                  marginTop: width < 576 ? "24px" : "32px",
                }}
              >
                {" "}
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
                          images.bannerTournament,
                          images.bannerTournament,
                          images.bannerTournament,
                        ]
                  }
                />
              </Box>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: width < 576 && width < 1200 ? "space-between" : "none" }}>
                  {hotTournament?.map((item, index) => {
                    return (
                      index < 10 && (
                        <Box
                          sx={{
                            width: width < 576 && width < 1200 ? "auto" : "20%",
                            marginTop: "50px",
                            marginRight:
                              width > 576 && width < 1200 ? "100px" : "none",
                          }}
                          key={index}
                        >
                          <ItemComponent tourInfo={item} countdown={true} />
                        </Box>
                      )
                    );
                  })}
                </Box>
              </Box>
              <Box
                sx={{
                  paddingTop: width < 576 ? "24px" : "32px",
                  paddingBottom: width < 576 ? "24px" : "32px",
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
              </Box>{" "}
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {hotTournament?.map((item, index) => {
                    return (
                      index >= 10 && (
                        <Box
                          sx={{ width: "20%", marginTop: "50px" }}
                          key={index}
                        >
                          <ItemComponent tourInfo={item} countdown={true} />
                        </Box>
                      )
                    );
                  })}
                </Box>
              </Box>
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
              Hot Tournament
            </Typography>
            <Box
              sx={{
                marginBottom: width < 576 ? "24px" : "32px",
                marginTop: width < 576 ? "24px" : "32px",
              }}
            >
              {" "}
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
                        images.bannerTournament,
                        images.bannerTournament,
                        images.bannerTournament,
                      ]
                }
              />
            </Box>
            <Box
              sx={{
                marginBottom: width < 576 ? "24px" : "32px",
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: width < 576 && width < 1200 ? "space-between" : "none" }}>
                {hotTournament?.map((item, index) => {
                  return (
                    index < 10 && (
                      <Box
                        sx={{
                          width:  width < 576 && width < 1200 ? "auto" : "20%",
                          marginTop: "50px",
                          marginRight:
                            width > 576 && width < 1200 ? "100px" : "none",
                        }}
                        key={index}
                      >
                        <ItemComponent tourInfo={item} countdown={true} />
                      </Box>
                    )
                  );
                })}
              </Box>
            </Box>
            <Box
              sx={{
                paddingTop: width < 576 ? "24px" : "32px",
                paddingBottom: width < 576 ? "24px" : "32px",
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
            </Box>{" "}
            <Box
              sx={{
                marginBottom: width < 576 ? "24px" : "32px",
              }}
            >
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {hotTournament?.map((item, index) => {
                  return (
                    index >= 10 && (
                      <Box
                        sx={{ width: "20%", marginTop: "50px" }}
                        key={index}
                      >
                        <ItemComponent tourInfo={item} countdown={true} />
                      </Box>
                    )
                  );
                })}
              </Box>
            </Box>
            <NewFooter />
          </Container>
          )
        }
        type="Home"
      />
    </ThemeProvider>
  );
}
