import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { imageDesktop, images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "../scss/index.scss";
import DialogConfirm from "./DialogConfirm";
import ListPackage from "./ListPackage";

export default function Package(props) {
  const { type } = props;
  const { t } = useTranslation("package");
  const { width } = useWindowDimensions();
  const { listPackage } = useSelector((state) => state.packageReducer);
  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const [socket, setSocket] = useState(null);
  const [item, setItem] = useState([]);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  useEffect(() => {}, [socket, token]);

  useEffect(() => {
    if (listPackage && listPackage?.length > 0) {
      const list = listPackage?.filter(
        (item) => item?.packageName === "Subscription"
      );
      setItem(list);
    }
  }, [listPackage]);

  useEffect(() => {
    const itemPackage = listPackage?.filter(
      (item) =>
        item?.packageName === "Combo Extra 1" ||
        item?.packageName === "Subscription" ||
        item?.packageName === "Combo Extra 2"
    );
    setItem(itemPackage?.sort());
  }, [listPackage]);
  const location = useLocation();
  const { pathname } = location;

  const meta = {
    title:
      process.env.REACT_APP_ENV === "production"
        ? "Play4promo"
        : "Play4promo staging",
    description:
      "Unlock exciting voucher rewards with Play4Promo's promotions and gaming thrills.",
    meta: {
      charset: "utf-8",
      name:
        process.env.REACT_APP_URL_DOMAIN === "socket.play4promote.com"
          ? {
              robots: "noindex",
              keywords: `play4promo,play,promo`,
            }
          : {
              keywords: `play4promo,play,promo`,
            },
      property: {
        "og:title":
          process.env.REACT_APP_ENV === "production"
            ? "Play4promo"
            : "Play4promo staging",
        "og:url": window.location.href,
        "og:image:secure_url":
          process.env.REACT_APP_ENV === "development"
            ? imageDesktop.logoCT
            : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        "og:image":
          process.env.REACT_APP_ENV === "development"
            ? imageDesktop.logoCT
            : "https://storage.googleapis.com/web-system-files/logos/lggame.png",
        "og:image:type": "image/png",
        "og:image:width": `144`,
        "og:image:height": `144`,
        "og:image:alt": "Play4promo Photo",
      },
    },
  };

  const theme = useTheme();

  useEffect(() => {
    const itemPackage = listPackage?.filter(
      (item) =>
        item?.packageName === "Combo Extra 1" ||
        item?.packageName === "Subscription" ||
        item?.packageName === "Combo Extra 2"
    );
    if (
      width > 768 &&
      width < 1200 &&
      itemPackage &&
      itemPackage?.length >= 3
    ) {
      [itemPackage[1], itemPackage[2]] = [
        itemPackage[2],
        itemPackage[1],
      ].sort();
      setItem(itemPackage);
    } else setItem(itemPackage);
  }, [width, listPackage]);

  return (
    <DocumentMeta {...meta}>
      <>
        <DialogConfirm />
        {width > 576 ? (
          <div
            className="Package-home pb-5"
            style={{
              backgroundColor: type === "game_revive" ? "#211d28" : "unset",
            }}
          >
            <Box className="text-white">
              {(location && location?.pathname?.includes("home")) ||
              pathname === "/" ? (
                <Typography
                  className="pt-5 pb-4"
                  sx={{
                    textAlign: "start",
                    fontSize: width < 576 ? "16px" : "24px",
                    fontWeight: "700 !important",
                    marginLeft: "0px !important",
                    color: "#fff",
                  }}
                >
                  {t("Packages")}
                </Typography>
              ) : (
                ""
              )}
            </Box>
            {theme?.theme === "christmas" ? (
              <Box
                sx={{
                  marginTop: "20px",
                  marginBottom: "50px",
                }}
              >
                {location && location?.pathname?.includes("packages") ? (
                  <Container>
                    <Box
                      component={"img"}
                      src={images.bgchristmas}
                      alt="..."
                      sx={{ width: "100%", height: "auto" }}
                    ></Box>
                  </Container>
                ) : (
                  <Box
                    component={"img"}
                    src={images.bgchristmas}
                    alt="..."
                    sx={{ width: "100%", height: "auto" }}
                  ></Box>
                )}
              </Box>
            ) : (
              ""
            )}
            <Container
              maxWidth={"lg"}
              sx={{
                color: "white",
              }}
            >
              <Box>
                <Box className="subscription_pack">
                  {theme?.theme === "christmas" ? (
                    <Grid
                      container
                      columnSpacing={1}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        marginTop:
                          (location && location?.pathname?.includes("home")) ||
                          pathname === "/"
                            ? "20px"
                            : "30px",
                      }}
                    >
                      {item?.map((i, index) => {
                        return (
                          <Grid item sm={6} md={6} lg={4} xl={4} key={index}>
                            <ListPackage
                              packageName={i?.packageName}
                              packageAvatar={i?.packageAvatar}
                              packagePrice={i?.packagePrice}
                              packageFreeTicketTournament={
                                i?.packageFreeTicketTournament
                              }
                              packageReduceWatchAds={i?.packageReduceWatchAds}
                              id={i?.id}
                              avatarChristmas={i?.packageAvatarChristmas}
                              des={i?.packageDescription}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  ) : (
                    <Grid
                      container
                      columnSpacing={1}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent:
                          width > 576 && width < 1200
                            ? "center"
                            : "space-around",
                        marginTop:
                          (location && location?.pathname?.includes("home")) ||
                          pathname === "/"
                            ? "20px"
                            : "30px",
                      }}
                    >
                      {item?.map((i, index) => {
                        return (
                          <Grid
                            item
                            sm={6}
                            md={6}
                            lg={4}
                            xl={4}
                            key={index}
                            sx={{
                              display: "flex",
                              alignContent: "center",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <ListPackage
                              packageName={i?.packageName}
                              packageAvatar={i?.packageAvatar}
                              packagePrice={i?.packagePrice}
                              packageFreeTicketTournament={
                                i?.packageFreeTicketTournament
                              }
                              packageReduceWatchAds={i?.packageReduceWatchAds}
                              id={i?.id}
                              avatarChristmas={i?.packageAvatarChristmas}
                              des={i?.packageDescription}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              </Box>
            </Container>
          </div>
        ) : (
          <div
            className="Package-home"
            style={{
              backgroundColor: type === "game_revive" ? "#211d28" : "unset",
              marginTop: type === "game_revive" ? "0px" : "48px",
              padding:
                (location && location?.pathname?.includes("home")) ||
                pathname === "/"
                  ? ""
                  : "0px 30px 30px 30px",
            }}
          >
            {(location && location?.pathname?.includes("home")) ||
            pathname === "/" ? (
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: width < 576 ? "16px" : "24px",
                  fontWeight: "700 !important",
                  marginLeft: "0px !important",
                  color: "#fff",
                }}
              >
                {t("Packages")}
              </Typography>
            ) : (
              ""
            )}
            {theme?.theme === "christmas" ? (
              <Box
                sx={{
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                <Box
                  component={"img"}
                  src={images.bgchristmas}
                  alt="..."
                  sx={{ width: "100%", height: "auto" }}
                ></Box>
              </Box>
            ) : (
              ""
            )}
            <Box style={{ marginTop: "30px" }}>
              <Box
                sx={{
                  paddingBottom: "0px",
                  background: "#68399E",
                  borderRadius: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  ></Box>
                </Box>
              </Box>
              <Box 
                sx={{
                  padding:
                    (pathname && pathname?.includes("home")) || pathname === "/"
                      ? "0px"
                      : "0px",
                  marginTop:
                    (pathname && pathname?.includes("home")) || pathname === "/"
                      ? "24px"
                      : "0px",
                }}
              >
                {(location && location?.pathname?.includes("home")) ||
                pathname === "/" ||
                (location &&
                  location?.pathname?.includes("packages") &&
                  width < 768 &&
                  width > 380) ? (
                  <ScrollingCarousel>
                    {item?.map((i, index) => {
                      return (
                        <Box
                          key={index}
                          className="mb-3"
                          sx={{ margin: "0px 10px" }}
                        >
                          <ListPackage
                            packageName={i?.packageName}
                            packageAvatar={i?.packageAvatar}
                            packagePrice={i?.packagePrice}
                            packageFreeTicketTournament={
                              i?.packageFreeTicketTournament
                            }
                            packageReduceWatchAds={i?.packageReduceWatchAds}
                            id={i?.id}
                            avatarChristmas={i?.packageAvatarChristmas}
                            des={i?.packageDescription}
                          />
                        </Box>
                      );
                    })}
                  </ScrollingCarousel>
                ) : (
                  <Box>
                    {item?.map((i, index) => {
                      return (
                        <Box
                          key={index}
                          className="mb-5 d-flex justify-content-center"
                          sx={{
                            width: width === 768 ? "100%" : "unset",
                            padding: width === 768 ? "100px" : "unset",
                          }}
                        >
                          <ListPackage
                            packageName={i?.packageName}
                            packageAvatar={i?.packageAvatar}
                            packagePrice={i?.packagePrice}
                            packageFreeTicketTournament={
                              i?.packageFreeTicketTournament
                            }
                            packageReduceWatchAds={i?.packageReduceWatchAds}
                            id={i?.id}
                            avatarChristmas={i?.packageAvatarChristmas}
                            des={i?.packageDescription}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </Box>
          </div>
        )}
      </>
    </DocumentMeta>
  );
}
