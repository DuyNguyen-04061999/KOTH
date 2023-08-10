import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { images } from "../../../utils/images";
import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
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
export default function TournamentMobile() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Box
          sx={{ width: "100%" }}
          component={"img"}
          src={images.bannerTournament}
        ></Box>
        <Box
          sx={{ marginTop: "20px", display: "flex", flexDirection: "column" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                textAlign: "start",
                fontSize: "14px",
                fontWeight: "200 !important",
                marginLeft: "0px !important",
              }}
            >
              Hot Tournaments
            </Typography>
            <Typography
              sx={{
                textAlign: "start",
                fontSize: "12px",
                fontWeight: "200 !important",
                color: "#BE48ED",
              }}
            >
              View All
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
              return (
                index < 4 &&
                (index % 2 === 0 ? (
                  <Box
                    sx={{
                      width: "50%",
                      boxSizing: "border-box",
                      marginTop: "20px",
                      paddingRight: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#37285C",
                        borderRadius: "10px",
                        padding: "5px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{ borderRadius: "10px" }}
                        component={"img"}
                        src={images.GameTournament}
                      ></Box>
                      <Typography
                        sx={{
                          color: "#FFDC62",
                          fontSize: "14px",
                          fontWeight: "200 !important",
                          textAlign: "start",
                          marginTop: "5px",
                        }}
                      >
                        Get $100 gift
                      </Typography>
                      <Typography
                        sx={{
                          color: "#ffff",
                          fontSize: "12px",
                          fontWeight: "200 !important",
                          textAlign: "start",
                          marginTop: "-3px",
                        }}
                      >
                        By Mcdonald’s
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "50%",
                      boxSizing: "border-box",
                      marginTop: "20px",
                      paddingLeft: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#37285C",
                        borderRadius: "10px",
                        padding: "5px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{ borderRadius: "10px" }}
                        component={"img"}
                        src={images.GameTournament}
                      ></Box>
                      <Typography
                        sx={{
                          color: "#FFDC62",
                          fontSize: "14px",
                          fontWeight: "200 !important",
                          textAlign: "start",
                          marginTop: "5px",
                        }}
                      >
                        Get $100 gift
                      </Typography>
                      <Typography
                        sx={{
                          color: "#ffff",
                          fontSize: "12px",
                          fontWeight: "200 !important",
                          textAlign: "start",
                          marginTop: "-3px",
                        }}
                      >
                        By Mcdonald’s
                      </Typography>
                    </Box>
                  </Box>
                ))
              );
            })}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
