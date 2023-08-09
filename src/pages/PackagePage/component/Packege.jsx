import { Container, Box, Typography } from "@mui/material";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import ListPackage from "./ListPackage";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useEffect, useState } from "react";
import _socket from "../../../redux-saga-middleware/config/socket";
import { images280423_l } from "../../../utils/images280423_l";
import { useSelector } from "react-redux";
import { popup } from "../../../utils/images";

export default function Package() {
  const { width } = useWindowDimensions();
  const { listPackage } = useSelector((state) => state.appReducer);
  const { token } = useSelector((state) => state.authReducer);

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  useEffect(() => {
    if (token) {
      socket?.emit("listPackage");
    }
  }, [token, socket]);

  return (
    <>
      <div className="Package-home pb-5 mb-5">
        <Container
          maxWidth={"lg"}
          sx={{
            paddingLeft: width > 576 ? "90px !important" : "30px",
            paddingRight: width > 576 ? "90px !important" : "30px",
            color: "white",
          }}
        >
          <Box className="pt-5 pb-4">
            <TitleHomeDesktopComponent
              title="PACKAGE"
              noicon={true}
              noSeeAll={width && width < 576}
            />
          </Box>
          <Box>
            {width > 576 ? (
              <ListPackage
                data={listPackage?.filter(
                  (item) => item?.packageName !== "Ticket Play"
                )}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",

                }}
              >
                {/* <ScrollingCarousel> */}
                {listPackage
                  ?.filter(
                    (item) =>
                      item?.packageName !== "Ticket Play" &&
                      item?.packageName !== "Merchant"
                  )
                  ?.map((i, index) => {
                    return (
                      <Box
                        key={index}
                        className="ms-2 me-2 p-3"
                        sx={{
                          marginBottom: "30px",
                          backgroundColor:"#0F041D",
                          backgroundImage:
                            index === 1
                              ? "linear-gradient(67deg, #AF30EB 0%, #6438D7 48.02%, #48A8ED 98.14%)"
                              : "linear-gradient(0deg, rgba(218,163,61,1) 0%, rgba(199,42,89,1) 100%)" &&
                                index === 2
                              ? "linear-gradient(67deg, #AF30EB 0%, #6438D7 48.02%, #48A8ED 98.14%)"
                              : "linear-gradient(67deg, #AF30EB 0%, #6438D7 48.02%, #48A8ED 98.14%)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          // padding: "50px",
                          borderRadius: "25px",
                          width: "300px",
                        }}
                      >
                        <Box
                          className="title"
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          {index === 0 ? (
                            <img
                              src={popup.heart}
                              alt="..."
                              width={25}
                              height={25}
                              className="mt-1 mb-1"
                            />
                          ) : (
                            <img
                              src={popup.crown}
                              alt="..."
                              width={25}
                              height={25}
                              className="mt-1 mb-1"
                            />
                          )}
                          <button
                            className="mt-1 mb-1"
                            style={{
                              border: "none",
                              borderRadius: "10px",
                              background: "rgba(182, 153, 255, 0.32)",
                              backdropFilter: " blur(4px)",
                              color: "white",
                              padding: "5px 15px",
                              fontSize: "14px",
                            }}
                          >
                            BEST SELLER
                          </button>
                          <Box
                            className="mt-1 mb-1"
                            sx={{
                              display: "flex",
                            }}
                          >
                            <Typography variant="h5">
                              ${i?.packagePrice}
                            </Typography>
                            <Typography
                              variant="body1"
                              sx={{
                                marginTop: "7px",
                                fontFamily: "Cyntho",
                                fontSize: "12px",
                              }}
                            >
                              /month
                            </Typography>
                          </Box>
                          <Typography
                            className="mt-1 mb-1"
                            variant="h4"
                            sx={{
                              color: "white",
                            }}
                          >
                            {i.packageName} Pack
                          </Typography>
                          <hr
                            style={{
                              color: "white",
                              width: "70%",
                              margin: "2px",
                            }}
                          />
                          <span
                            className="text-white"
                            style={{ marginBottom: "40px" }}
                          >
                            {i.packageDescription}
                          </span>
                        </Box>
                        <Box
                          className="bot-desc"
                          sx={{
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "0px 0px 5px 5px",
                          }}
                        >
                          <Box
                            sx={{
                              marginBottom: "35px",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#838383",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                            >
                              {i?.packageDescription}
                            </Typography>
                          </Box>
                          <Box>
                            <button
                              onClick={() => {
                                socket.emit("buyPackage", {
                                  packageId: i?.id,
                                });
                              }}
                              style={{
                                border: "none",
                                padding: "7px 35px",
                                borderRadius: "24px",
                                color: "white",
                                background: "rgba(182, 153, 255, 0.32)",
                                backdropFilter: " blur(4px)",
                              }}
                            >
                              {/* {i?.packagePrice}
                              <img
                                src={images280423_l.gold}
                                alt="..."
                                width={10}
                                height={10}
                              /> */}
                              Choose plan
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                {/* </ScrollingCarousel> */}
              </Box>
            )}
          </Box>
        </Container>
      </div>
    </>
  );
}
