import { Box, Container, Grid, Typography } from "@mui/material";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useEffect, useState } from "react";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { imageDesktop } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "../scss/index.scss";
import DialogConfirm from "./DialogConfirm";
import ListPackage from "./ListPackage";
import SlickReact from "../../../components/SlickReact";

export default function Package(props) {
  const { type } = props;
  const { t } = useTranslation("package");
  const { width } = useWindowDimensions();
  const { listPackage } = useSelector((state) => state.packageReducer);
  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const [socket, setSocket] = useState(null);
  const [item, setItem] = useState([]);
  const [itemSub, setItemSub] = useState([]);
  const [itemNormal, setItemNormal] = useState([]);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);
  useEffect(() => {}, [socket, token]);
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

  useEffect(() => {
    const subarr = listPackage?.filter(
      (item) => item.packageCategory === "sub"
    );
    setItemSub(subarr);
  }, [listPackage]);

  useEffect(() => {
    const normalarr = listPackage?.filter(
      (item) => item.packageCategory !== "sub"
    );
    setItemNormal(normalarr);
  }, [listPackage]);

  return (
    <DocumentMeta {...meta}>
      <>
        <DialogConfirm />
        {width > 1200 ? (
          <div
            className="Package-home pb-5"
            style={{
              backgroundColor: type === "game_revive" ? "#211d28" : "unset",
            }}
          >
            <Box className="sub">
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
                    {t("Subscription Package")}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Container
                maxWidth={"lg"}
                sx={{
                  color: "white",
                }}
              >
                <Box>
                  <Box className="subscription_pack">
                    {(location && location?.pathname?.includes("home")) ||
                    pathname === "/" ? (
                      <SlickReact itemSub={itemSub} appendDot={true} />
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
                            (location &&
                              location?.pathname?.includes("home")) ||
                            pathname === "/"
                              ? "20px"
                              : "30px",
                        }}
                      >
                        {itemSub?.map((i, index) => {
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
                                packageCategory={i?.packageCategory}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    )}
                  </Box>
                </Box>
              </Container>
            </Box>
            <Box className="normal">
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
                    {t("Extra Package")}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Container
                maxWidth={"lg"}
                sx={{
                  color: "white",
                }}
              >
                <Box>
                  <Box className="subscription_pack">
                    {/* <SlickReact itemSub={itemSub} /> */}
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
                      {itemNormal?.map((i, index) => {
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
                              packageCategory={i?.packageCategory}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Box>
              </Container>
            </Box>
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
            <Box>
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
                  {t("Subscription Package")}
                </Typography>
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
                      (pathname && pathname?.includes("home")) ||
                      pathname === "/"
                        ? "0px"
                        : "0px",
                    marginTop:
                      (pathname && pathname?.includes("home")) ||
                      pathname === "/"
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
                      {itemSub?.map((i, index) => {
                        return (
                          <Box
                            key={index}
                            className="mb-3"
                            sx={{
                              margin: "0px 10px",
                              marginTop:
                                i?.packageCategory !== "sub" ? "20px" : "0px",
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
                              packageCategory={i?.packageCategory}
                            />
                          </Box>
                        );
                      })}
                    </ScrollingCarousel>
                  ) : (
                    // <Box>
                    //   {item?.map((i, index) => {
                    //     return (
                    //       <Box
                    //         key={index}
                    //         className="mb-5 d-flex justify-content-center"
                    //         sx={{
                    //           width: width === 768 ? "100%" : "unset",
                    //           padding: width === 768 ? "100px" : "unset",
                    //         }}
                    //       >
                    //         <ListPackage
                    //            packageName={i?.packageName}
                    //            packageAvatar={i?.packageAvatar}
                    //            packagePrice={i?.packagePrice}
                    //            packageFreeTicketTournament={
                    //              i?.packageFreeTicketTournament
                    //            }
                    //            packageReduceWatchAds={i?.packageReduceWatchAds}
                    //            id={i?.id}
                    //            avatarChristmas={i?.packageAvatarChristmas}
                    //            des={i?.packageDescription}
                    //            packageCategory={i?.packageCategory}
                    //         />
                    //       </Box>
                    //     );
                    //   })}
                    // </Box>
                    <ScrollingCarousel>
                      {itemSub?.map((i, index) => {
                        return (
                          <Box
                            key={index}
                            className="mb-3"
                            sx={{
                              margin: "0px 10px",
                              marginTop:
                                i?.packageCategory !== "sub" ? "20px" : "0px",
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
                              packageCategory={i?.packageCategory}
                            />
                          </Box>
                        );
                      })}
                    </ScrollingCarousel>
                  )}
                </Box>
              </Box>
            </Box>
            <Box>
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
                  {t("Extra Package")}
                </Typography>
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
                      (pathname && pathname?.includes("home")) ||
                      pathname === "/"
                        ? "0px"
                        : "0px",
                    marginTop:
                      (pathname && pathname?.includes("home")) ||
                      pathname === "/"
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
                      {itemNormal?.map((i, index) => {
                        return (
                          <Box
                            key={index}
                            className="mb-3"
                            sx={{
                              margin: "0px 10px",
                              marginTop:
                                i?.packageCategory !== "sub" ? "20px" : "0px",
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
                              packageCategory={i?.packageCategory}
                            />
                          </Box>
                        );
                      })}
                    </ScrollingCarousel>
                  ) : (
                    // <Box>
                    //   {item?.map((i, index) => {
                    //     return (
                    //       <Box
                    //         key={index}
                    //         className="mb-5 d-flex justify-content-center"
                    //         sx={{
                    //           width: width === 768 ? "100%" : "unset",
                    //           padding: width === 768 ? "100px" : "unset",
                    //         }}
                    //       >
                    //         <ListPackage
                    //            packageName={i?.packageName}
                    //            packageAvatar={i?.packageAvatar}
                    //            packagePrice={i?.packagePrice}
                    //            packageFreeTicketTournament={
                    //              i?.packageFreeTicketTournament
                    //            }
                    //            packageReduceWatchAds={i?.packageReduceWatchAds}
                    //            id={i?.id}
                    //            avatarChristmas={i?.packageAvatarChristmas}
                    //            des={i?.packageDescription}
                    //            packageCategory={i?.packageCategory}
                    //         />
                    //       </Box>
                    //     );
                    //   })}
                    // </Box>
                    <ScrollingCarousel>
                      {itemNormal?.map((i, index) => {
                        return (
                          <Box
                            key={index}
                            className="mb-3"
                            sx={{
                              margin: "0px 10px",
                              marginTop:
                                i?.packageCategory !== "sub" ? "20px" : "0px",
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
                              packageCategory={i?.packageCategory}
                            />
                          </Box>
                        );
                      })}
                    </ScrollingCarousel>
                  )}
                </Box>
              </Box>
            </Box>
          </div>
        )}
      </>
    </DocumentMeta>
  );
}
