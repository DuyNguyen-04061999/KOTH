import { Box, Container, Typography } from "@mui/material";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "../scss/index.scss";
import DialogConfirm from "./DialogConfirm";
import ListPackage from "./ListPackage";

export default function Package() {
  const { width } = useWindowDimensions();
  const { listPackage } = useSelector((state) => state.packageReducer);
  const { tokenUser: token } = useSelector(
    (state) => state.userReducer
  );
  const [socket, setSocket] = useState(null);
  const [item, setItem] = useState([]);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  useEffect(() => {
    // if (token === null || token === "") {
    //   socket?.emit("listPackage");
    // } else {
    //   socket?.emit("listPackage", {
    //     type: true,
    //   });
    // }
  }, [socket, token]);

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
        item?.packageName === "Subscription" ||
        item?.packageName === "Combo Extra 1" ||
        item?.packageName === "Combo Extra 2"
    );
    setItem(itemPackage?.reverse());
  }, [listPackage]);

  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <DialogConfirm />
      {width > 576 ? (
        <div className="Package-home pb-5 ">
          <Box className="text-white">
            {(location && location?.pathname?.includes("home")) || pathname === "/" ? (
              <Typography
                className="pt-5 pb-4"
                sx={{
                  textAlign: "start",
                  fontSize: width < 576 ? "14px" : "24px",
                  fontWeight: "200 !important",
                  marginLeft: "0px !important",
                  color: "#fff",
                }}
              >
                Packages
              </Typography>
            ) : ("")}
          </Box>
          <Container
            maxWidth={"lg"}
            sx={{
              color: "white",
            }}
          >
            <Box>
              <Box className="subscription_pack">
                <Box>
                <Typography
                    className="pt-2"
                    sx={{
                      textAlign:
                        (location && location?.pathname?.includes("home")) || pathname === "/"
                          ? "start"
                          : "center",
                      fontSize: width < 576 ? "14px" : "18px",
                      fontWeight: "200 !important",
                      marginLeft: "0px !important",
                      color: "#fff",
                      marginTop:
                        (location && location?.pathname?.includes("home")) || pathname === "/"
                          ? "0px"
                          : "30px",
                    }}
                  >
                    Subscription Pack
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop:
                      (location && location?.pathname?.includes("home")) || pathname === "/"
                        ? "20px"
                        : "30px",
                  }}
                >
                  {listPackage
                    ?.filter((item) => item?.packageName === "Subscription")
                    ?.map((i, index) => {
                      return (
                        <Box key={index}>
                          <ListPackage
                            packageName={i?.packageName}
                            packageAvatar={i?.packageAvatar}
                            packagePrice={i?.packagePrice}
                            packageFreeTicketTournament={
                              i?.packageFreeTicketTournament
                            }
                            packageReduceWatchAds={i?.packageReduceWatchAds}
                            id={i?.id}
                          />
                        </Box>
                      );
                    })}
                </Box>
              </Box>
              <Box className="extra_pack">
                <Box>
                  <Typography
                    className="pt-2"
                    sx={{
                      textAlign:
                        (location && location?.pathname?.includes("home")) || pathname === "/"
                          ? "start"
                          : "center",
                      fontSize: width < 576 ? "14px" : "18px",
                      fontWeight: "200 !important",
                      marginLeft: "0px !important",
                      color: "#fff",
                      marginTop:
                        (location && location?.pathname?.includes("home")) || pathname === "/"
                          ? "0px"
                          : "30px",
                    }}
                  >
                    Extra Pack
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop:
                      (location && location?.pathname?.includes("home")) || pathname === "/"
                        ? "20px"
                        : "30px",
                  }}
                >
                  {listPackage
                    ?.filter(
                      (item) =>
                        item?.packageName === "Combo Extra 1" ||
                        item?.packageName === "Combo Extra 2"
                    )
                    ?.map((i, index) => {
                      return (
                        <Box key={index}>
                          <ListPackage
                            packageName={i?.packageName}
                            packageAvatar={i?.packageAvatar}
                            packagePrice={i?.packagePrice}
                            packageFreeTicketTournament={
                              i?.packageFreeTicketTournament
                            }
                            packageReduceWatchAds={i?.packageReduceWatchAds}
                            id={i?.id}
                          />
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      ) : (
        <div className="Package-home" style={{ marginTop: "48px" }}>
          {(location && location?.pathname?.includes("home")) || pathname === "/" ? (
            <Typography
              sx={{
                textAlign: "start",
                fontSize: width < 576 ? "14px" : "20px",
                fontWeight: "200 !important",
                marginLeft: "0px !important",
                color: "#fff",
              }}
            >
              Packages
            </Typography>
          ) : ""}
          <Box style={{ padding: "10px" }}>
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
                  (pathname && pathname?.includes("home")) || pathname === "/" ? "0px" : "40px",
                marginTop:
                  (pathname && pathname?.includes("home")) || pathname === "/" ? "24px" : "0px",
              }}
            >
              {(location && location?.pathname?.includes("home")) || pathname === "/" ? (
                <ScrollingCarousel>
                  {item?.map((i, index) => {
                    return (
                      <Box key={index} className="mb-3">
                        <ListPackage
                          packageName={i?.packageName}
                          packageAvatar={i?.packageAvatar}
                          packagePrice={i?.packagePrice}
                          packageFreeTicketTournament={
                            i?.packageFreeTicketTournament
                          }
                          packageReduceWatchAds={i?.packageReduceWatchAds}
                          id={i?.id}
                        />
                      </Box>
                    );
                  })}
                </ScrollingCarousel>
              ) : (
                <Box>
                  {item?.map((i, index) => {
                    return (
                      <Box key={index} className="mb-5">
                        <ListPackage
                          packageName={i?.packageName}
                          packageAvatar={i?.packageAvatar}
                          packagePrice={i?.packagePrice}
                          packageFreeTicketTournament={
                            i?.packageFreeTicketTournament
                          }
                          packageReduceWatchAds={i?.packageReduceWatchAds}
                          id={i?.id}
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
  );
}
