import {
  Box,
  Container,
  CssBaseline,
  Dialog,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React, { useState } from "react";
import { imageDesktop, images } from "../../../utils/images";
import InspirationTTF from "../../../assets/font/CynthoNextRegular.otf";
import SlickSlider from "../../../components/SlickSlider";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Package } from "../../PackagePage/component";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
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
const typographyStyle = {
  textAlign: "start",
  fontSize: "14px",
  fontWeight: "200 !important",
  marginLeft: "0px !important",
  color: "#fff",
};

export default function NewHomePage() {
  const [open, setOpen] = useState(false);
  const [promotion, setPromotion] = useState(true);
  const { width } = useWindowDimensions();
  const [startPoint, setstartPoint] = useState(null);
  const navigate = useNavigate();
  const calculateDistance = (x, y, x1, y1) => {
    let distance = Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2));
    return distance;
  };
  return (
    <Container
      sx={{
        paddingLeft: width < 576 ? "24px !important" : "90px !important",
        paddingRight: width < 576 ? "24px !important" : "90px !important",
        paddingTop: width < 576 ? "24px !important" : "90px !important",
      }}
    >
      {" "}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            paddingBottom: "70px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SlickSlider
            images={[
              images.bannerTournament,
              images.bannerTournament1,
              images.bannerTournament2,
            ]}
          />
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              marginBottom: "24px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: "200 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  Flash Tournaments
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 4px",
                      backgroundColor: "#68399E",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography sx={{ ...typographyStyle }}>0</Typography>
                    <Typography sx={{ ...typographyStyle }}>9</Typography>
                  </Box>
                  <Typography
                    sx={{
                      ...typographyStyle,
                      marginLeft: "6px",
                      marginRight: "6px",
                    }}
                  >
                    :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 4px",
                      backgroundColor: "#68399E",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <Typography sx={{ ...typographyStyle }}>0</Typography>
                    <Typography sx={{ ...typographyStyle }}>9</Typography>
                  </Box>
                  <Typography
                    sx={{
                      ...typographyStyle,
                      margin: "2px",
                      marginLeft: "6px",
                      marginRight: "6px",
                    }}
                  >
                    :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 4px",
                      backgroundColor: "#68399E",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <Typography sx={{ ...typographyStyle }}>0</Typography>
                    <Typography sx={{ ...typographyStyle }}>9</Typography>
                  </Box>
                </Box>
              </Box>
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
          {/* ---------------------------- */}
          <SlickSlider
            images={[images.Discount25, images.Discount12, images.Discount10]}
          />{" "}
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              marginBottom: "24px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: "200 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  Hot Tournaments
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 4px",
                      backgroundColor: "#68399E",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography sx={{ ...typographyStyle }}>0</Typography>
                    <Typography sx={{ ...typographyStyle }}>9</Typography>
                  </Box>
                  <Typography
                    sx={{
                      ...typographyStyle,
                      marginLeft: "6px",
                      marginRight: "6px",
                    }}
                  >
                    :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 4px",
                      backgroundColor: "#68399E",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <Typography sx={{ ...typographyStyle }}>0</Typography>
                    <Typography sx={{ ...typographyStyle }}>9</Typography>
                  </Box>
                  <Typography
                    sx={{
                      ...typographyStyle,
                      margin: "2px",
                      marginLeft: "6px",
                      marginRight: "6px",
                    }}
                  >
                    :
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      padding: "2px 4px",
                      backgroundColor: "#68399E",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <Typography sx={{ ...typographyStyle }}>0</Typography>
                    <Typography sx={{ ...typographyStyle }}>9</Typography>
                  </Box>
                </Box>
              </Box>
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
          {/* ---------------------------- */}
          <Box
            sx={{ width: "100%" }}
            component={"img"}
            src={images.giveAway}
          ></Box>{" "}
          {/* Brief List Tournament */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              marginBottom: "24px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: "200 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  Tournament of the week
                </Typography>
              </Box>
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
          {/* ---------------------------- */}
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
          <Package />
          {/* Footer */}
          <Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "#ffff" }}>Support</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "20px 10px 0px",
                }}
              >
                <Typography sx={{ ...typographyStyle }}>Help center</Typography>
                <Typography sx={{ ...typographyStyle }}>Fairness</Typography>
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
                  width: "120px",
                }}
                src={imageDesktop.LogoCongTy}
              ></Box>
            </Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "200 !important",
                fontSize: "12px",
                lineHeight: "normal",
              }}
            >
              "Experience the thrill of gaming at Play4Promo, where tournaments,
              gameplay, and your dedication unlock exciting voucher rewards. Our
              policies guarantee a seamless and rewarding voucher redemption
              process for an enhanced gaming journey."
            </Typography>
          </Box>
          {promotion && (
            <Draggable
              onStart={(e, data) => {
                setstartPoint({ startX: data.x, startY: data.y });
              }}
              onStop={(e, data) => {
                if (
                  calculateDistance(
                    startPoint?.startX,
                    startPoint?.startY,
                    data.x,
                    data.y
                  ) < 3
                ) {
                  navigate("/luckywheel");
                }
              }}
              cancel=".clickable"
              defaultPosition={{ x: 0, y: 0 }}
              bounds="parent"
            >
              <Box sx={{ position: "fixed", zIndex: "1302" }}>
                <Box sx={{ position: "relative" }}>
                  {" "}
                  <Box
                    onClick={() => {
                      navigate("/luckywheel");
                    }}
                    src={images.SpinIconHomePage}
                    component={"img"}
                  ></Box>
                  <Box
                    className="clickable"
                    onClick={() => {
                      setPromotion(false);
                    }}
                    sx={{ position: "absolute", top: "0px", right: "-10px" }}
                    component={"img"}
                    src={images.closePromo}
                  ></Box>
                </Box>
              </Box>
            </Draggable>
          )}
        </Box>
      </ThemeProvider>
    </Container>
  );
}
