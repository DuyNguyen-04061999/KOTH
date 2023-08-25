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
import { imageDesktop, images, video } from "../../utils/images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
export default function HotTournament() {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  const { hotTournament } = useSelector((state) => state.tournamentReducer);
  const navigate = useNavigate();
  return (
    <Layout
      children={
        width > 576 ? (
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
                          images.BannerHomePageDesktop,
                          images.BannerHomePageDesktop,
                          images.BannerHomePageDesktop,
                        ]
                  }
                />
              </Box>
              <Box
                sx={{
                  marginBottom: width < 576 ? "24px" : "32px",
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {hotTournament?.map((item, index) => {
                    return (
                      index < 10 && (
                        <Box sx={{ width: "20%", marginTop: "50px" }} key={index}>
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
                        <Box sx={{ width: "20%", marginTop: "50px" }} key={index}>
                          <ItemComponent tourInfo={item} countdown={true} />
                        </Box>
                      )
                    );
                  })}
                </Box>
              </Box>
              <Box sx={{ marginBottom: "32px", marginTop: "64px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: width < 576 ? "none" : "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ffff",
                      fontSize: width < 576 ? "16px" : "25px",
                    }}
                  >
                    Support
                  </Typography>
                  <Box sx={{ width: width > 576 ? "38%" : "none" }}>
                    {" "}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "20px 10px 0px",
                      }}
                    >
                      <Typography sx={{ ...typographyStyle }}>
                        Help center
                      </Typography>
                      <Typography sx={{ ...typographyStyle }}>
                        Fairness
                      </Typography>
                      <Typography sx={{ ...typographyStyle }}>FAG</Typography>
                      <Typography sx={{ ...typographyStyle }}>
                        Privacy Policy
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 40px",
                      }}
                    >
                      <Typography sx={{ ...typographyStyle }}>
                        Term of service
                      </Typography>
                      <Typography sx={{ ...typographyStyle }}>
                        Design resources
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <Box
                    component={"img"}
                    sx={{
                      width: width < 576 ? "120px" : "200px",
                      height: width < 576 ? "44px" : "73.333px",
                      marginTop: "60px",
                    }}
                    src={imageDesktop.LogoCongTy}
                  ></Box>
                </Box>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: "200 !important",
                    fontSize: width < 576 ? "12px" : "16px",
                    lineHeight: "normal",
                    marginTop: "30px",
                  }}
                >
                  "Experience the thrill of gaming at Play4Promo, where
                  tournaments, gameplay, and your dedication unlock exciting
                  voucher rewards. Our policies guarantee a seamless and
                  rewarding voucher redemption process for an enhanced gaming
                  journey."
                </Typography>
                <Typography className="text-center text-white">
                  v0.8
                </Typography>
              </Box>
            </ThemeProvider>
          </Container>
        ) : (
          <></>
        )
      }
      type="Home"
    />
  );
}
