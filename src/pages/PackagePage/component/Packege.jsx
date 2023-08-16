import { Box, Container, Typography } from "@mui/material";
// import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useEffect, useState } from "react";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { popup } from "../../../utils/images";
import "../scss/index.scss";
import DialogConfirm from "./DialogConfirm";
import { toggleDialogConfirm } from "../../../redux-saga-middleware/reducers/authReducer";

export default function Package() {
  const { width } = useWindowDimensions();
  const { listPackage } = useSelector((state) => state.appReducer);
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [socket]);

  useEffect(() => {
   if(token === null || token === "") {
    socket?.emit("listPackage");
   } else {
    socket?.emit("listPackage", {
      type: true
    });
   }
  }, [socket,token]);

  return (
    <>
      <DialogConfirm />
      {width > 576 ? (
        <div className="Package-home pb-5 mb-5">
          <Box className="pt-5 pb-4 text-white">
            <Typography variant="h5">Package</Typography>
          </Box>
          <Container
            maxWidth={"lg"}
            sx={{
              color: "white",
            }}
          >
            <Box>
              {/* <ListPackage
                data={listPackage?.filter(
                  (item) => item?.packageName !== "Ticket Play"
                )}
              /> */}
              <Box sx={{ paddingBottom: "50px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
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
                          className="card"
                          sx={{
                            marginBottom: "30px",
                            backgroundColor: "#0F041D",
                            backgroundImage:
                              index === 1
                                ? "linear-gradient(to right bottom, #0F041D, #300755, #4e087b, #5a0681, #730c93, #6e2099, #692d9e, #6437a2, #4f48a6, #3e55a5, #355ea0, #386699)"
                                : "linear-gradient(0deg, rgba(218,163,61,1) 0%, rgba(199,42,89,1) 100%)" &&
                                  index === 2
                                ? "linear-gradient(67deg, #AF30EB 0%, #6438D7 48.02%, #48A8ED 98.14%)"
                                : "linear-gradient(to right top, #ff6711, #fa751c, #f58127, #f08c33, #ec9640, #eb943f, #e9923d, #e8903c, #e9812d, #e9711e, #ea5f11, #eb4a05)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            // padding: "50px",
                            borderRadius: "25px",
                            width: "100%",
                            height: "350px",
                            border: "none",
                            margin: "0px 30px 0px 30px",
                          }}
                        >
                          <div className="card__content">
                            <Box
                              className="title"
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {index === 0 ? (
                                  <img
                                    src={popup.heart}
                                    alt="..."
                                    width={30}
                                    height={30}
                                    className=" me-2 mt-1"
                                  />
                                ) : (
                                  <img
                                    src={popup.crown}
                                    alt="..."
                                    width={30}
                                    height={30}
                                    className=" me-2 mt-1"
                                  />
                                )}
                                <Box>
                                  <button
                                    style={{
                                      border: "none",
                                      borderRadius: "20px",
                                      background: "rgba(182, 153, 255, 0.32)",
                                      backdropFilter: " blur(4px)",
                                      color: "white",
                                      padding: "4px 15px",
                                      fontSize: "14px",
                                      fontFamily: "Cyntho",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    BEST SELLER
                                  </button>
                                </Box>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "start",
                                }}
                              >
                                <Box
                                  className="mt-4 mb-1"
                                  sx={{
                                    display: "flex",
                                    color: "white",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      fontFamily: "Cyntho !important",
                                      fontWeight: "500 !important",
                                    }}
                                  >
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
                                  className="mb-3 mt-3"
                                  variant="h5"
                                  sx={{
                                    color: "white",
                                    fontSize: "30px",
                                    fontFamily: "Cyntho !important",
                                    fontWeight: "500 !important",
                                  }}
                                >
                                  {i.packageName} Pack
                                </Typography>
                                <Box
                                  sx={{
                                    marginBottom: "20px",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    <img
                                      src={popup.checkCircle}
                                      alt="..."
                                      width={25}
                                      height={25}
                                    />
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "17px",
                                        color: "white",
                                        fontFamily: "Cyntho !important",
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      2 Free voucher/tournament
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src={popup.checkCircle}
                                      alt="..."
                                      width={25}
                                      height={25}
                                    />
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "17px",
                                        color: "white",
                                        fontFamily: "Cyntho !important",
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      Reduce the time watching ads
                                    </Typography>
                                  </Box>
                                </Box>
                                <button
                                  onClick={() => {
                                    dispatch(
                                      toggleDialogConfirm({ packageId: i?.id })
                                    );
                                    // socket.emit("buyPackage", {
                                    //   packageId: i?.id,
                                    // });
                                  }}
                                  style={{
                                    border: "none",
                                    padding: "7px 35px",
                                    borderRadius: "24px",
                                    color: "white",
                                    background: "rgba(182, 153, 255, 0.32)",
                                    backdropFilter: " blur(4px)",
                                    width: "100%",
                                    fontSize: "18px",
                                    marginTop: "5px",
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
                          </div>
                          <div
                            className={
                              i.packageName === "Gold" ? "blob" : "bold"
                            }
                            style={{ width: "250px", height: "250px" }}
                          ></div>
                          <div
                            className={
                              i.packageName === "Gold" ? "blob" : "bold"
                            }
                            style={{ width: "250px", height: "250px" }}
                          ></div>
                          <div
                            className={
                              i.packageName === "Gold" ? "blob" : "bold"
                            }
                            style={{ width: "250px", height: "250px" }}
                          ></div>
                          <div
                            className={
                              i.packageName === "Gold" ? "blob" : "bold"
                            }
                            style={{ width: "250px", height: "250px" }}
                          ></div>
                        </Box>
                      );
                    })}
                  {/* </ScrollingCarousel> */}
                </Box>
              </Box>
            </Box>
          </Container>
        </div>
      ) : (
        <div className="Package-home" style={{ padding: "10px" }}>
          {/* <Box className="pt-1 pb-4">
            <TitleHomeDesktopComponent
              title="Package"
              noicon={true}
              noSeeAll={width && width < 576}
            />
          </Box> */}
          <Box className="pt-5 pb-4">
            <Typography variant="h6" className="text-white">
              Package
            </Typography>
          </Box>
          <Box sx={{ paddingBottom: "50px" }}>
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
                      className="card"
                      sx={{
                        marginBottom: "30px",
                        backgroundColor: "#0F041D",
                        backgroundImage:
                          index === 1
                            ? "linear-gradient(to right bottom, #0F041D, #300755, #4e087b, #5a0681, #730c93, #6e2099, #692d9e, #6437a2, #4f48a6, #3e55a5, #355ea0, #386699)"
                            : "linear-gradient(0deg, rgba(218,163,61,1) 0%, rgba(199,42,89,1) 100%)" &&
                              index === 2
                            ? "linear-gradient(67deg, #AF30EB 0%, #6438D7 48.02%, #48A8ED 98.14%)"
                            : "linear-gradient(to right top, #ff6711, #fa751c, #f58127, #f08c33, #ec9640, #eb943f, #e9923d, #e8903c, #e9812d, #e9711e, #ea5f11, #eb4a05)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        borderRadius: "25px",
                        width: "270px",
                        height: "332px",
                        border: "none",
                      }}
                    >
                      <div className="card__content">
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
                          <Box>
                            <button
                              className="mt-1 mb-1"
                              style={{
                                border: "none",
                                borderRadius: "10px",
                                background: "rgba(234, 226, 255, 32%)",
                                backdropFilter: " blur(4px)",
                                color: "white",
                                padding: "5px 15px",
                                fontSize: "14px",
                              }}
                            >
                              BEST SELLER
                            </button>
                          </Box>
                          <Box
                            className="mt-1 mb-1"
                            sx={{
                              display: "flex",
                              color: "white",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="h4">
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
                            className="mb-3"
                            variant="h5"
                            sx={{
                              color: "white",
                            }}
                          >
                            {i.packageName} Pack
                          </Typography>
                          <Box
                            sx={{
                              marginBottom: "20px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                marginBottom: "15px",
                              }}
                            >
                              <img
                                src={popup.checkCircle}
                                alt="..."
                                width={20}
                                height={20}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "13px",
                                  color: "white",
                                  fontFamily: "Cyntho ",
                                  fontWeight: "500 !important",
                                }}
                              >
                                2 Free voucher/tournament
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={popup.checkCircle}
                                alt="..."
                                width={20}
                                height={20}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "13px",
                                  color: "white",
                                  fontFamily: "Cyntho",
                                  fontWeight: "500 !important",
                                }}
                              >
                                Reduce the time watching ads
                              </Typography>
                            </Box>
                          </Box>
                          <button
                            onClick={() => {
                              dispatch(
                                toggleDialogConfirm({ packageId: i?.id })
                              );
                              // socket.emit("buyPackage", {
                              //   packageId: i?.id,
                              // });
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
                            Choose plan
                          </button>
                        </Box>
                      </div>
                      <div
                        className={i.packageName === "Gold" ? "blob" : "bold"}
                      ></div>
                      <div
                        className={i.packageName === "Gold" ? "blob" : "bold"}
                      ></div>
                      <div
                        className={i.packageName === "Gold" ? "blob" : "bold"}
                      ></div>
                      <div
                        className={i.packageName === "Gold" ? "blob" : "bold"}
                      ></div>
                    </Box>
                  );
                })}
              {/* </ScrollingCarousel> */}
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}
