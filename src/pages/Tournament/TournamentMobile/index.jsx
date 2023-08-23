import {
  Box,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { images } from "../../../utils/images";
import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
import InspirationTTF1 from "../../../assets/font/CynthoNextBold.otf";
import SlickSlider from "../../../components/SlickSlider";
const theme = createTheme({
  typography: {
    fontFamily: "Cyntho Next, Cyntho Next Bold",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: "Cyntho Next",
          src: `url(${InspirationTTF}) format("truetype")`,
        },
        "@font-face1": {
          fontFamily: "Cyntho Next Bold",
          src: `url(${InspirationTTF1}) format("truetype")`,
        },
      },
    },
  },
});

export default function TournamentMobile() {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ paddingBottom: "70px" }}>
        <SlickSlider
          images={[
            images.bannerTournament,
            images.bannerTournament1,
            images.bannerTournament2,
          ]}
        />
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
            <Box
              onClick={() => {
                setOpen(true);
              }}
              sx={{ display: "flex", alignItems: "center" }}
            >
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
              <Box
                sx={{ width: "12px", height: "12px", marginLeft: "3px" }}
                component={"img"}
                src={images.viewAllButton}
              ></Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((item, index) => {
              return (
                index < 4 &&
                (index % 2 === 0 ? (
                  <Box
                    key={index}
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
                        padding: "8px",
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
                    key={index}
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
                        padding: "8px",
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
        </Box>{" "}
        <Dialog sx={{ zIndex: "1320" }} fullScreen={true} open={open}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: "#211D28",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: "44px",
                backgroundColor: "#42285B",
                display: "flex",
                alignItems: "center",
                padding: "0px 15px",
                boxSizing: "border-box",
              }}
            >
              <Box
                component={"img"}
                src={images.BackButtonLobby}
                sx={{ width: "13px" }}
                onClick={() => {
                  setOpen(false);
                }}
              ></Box>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#ffff",
                  fontWeight: "lighter !important",
                  fontSize: "14px",
                }}
                onClick={() => {
                  setOpen(false);
                }}
              >
                Hot tournament
              </Typography>
            </Box>
            <Box sx={{ width: "100%", height: "auto", padding: "20px" }}>
              <SlickSlider
                images={[
                  images.bannerTournament,
                  images.bannerTournament1,
                  images.bannerTournament2,
                ]}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {[1, 2, 3, 2, 3, 4, 5].map((item, index) => {
                  return index % 2 === 0 ? (
                    <Box
                      key={index}
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
                          padding: "8px",
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
                      key={index}
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
                          padding: "8px",
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
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
