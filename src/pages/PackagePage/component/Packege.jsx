import { Box, Container, Typography } from "@mui/material";
// import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useEffect, useState } from "react";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { images, popup } from "../../../utils/images";
import "../scss/index.scss";
import DialogConfirm from "./DialogConfirm";
import {
  getIdPackage,
  toggleDialogConfirm,
} from "../../../redux-saga-middleware/reducers/authReducer";

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
    if (token === null || token === "") {
      socket?.emit("listPackage");
    } else {
      socket?.emit("listPackage", {
        type: true,
      });
    }
  }, [socket, token]);

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
                          sx={{
                            background:
                              i?.packageName === "Free"
                                ? "linear-gradient(180deg, #B8CCDF 0%, #CBDBF0 100%), #0F041D "
                                : "" || i?.packageName === "Diamond"
                                ? "linear-gradient(215deg, #EB6FFF 7.26%, #82F0FF 34.46%, #A470FF 53.35%, #3CC4E2 68.88%, #C271FF 86.45%, #3CC4E2 100%)"
                                : "" || i?.packageName === "Gold"
                                ? "linear-gradient(0deg, #F3CA78 0%, #F3CA78 100%), linear-gradient(180deg, #FDCD6D 0%, #FF7765 100%), #0F041D"
                                : "",
                            padding: "14px 14px 14px 14px",
                            borderRadius: "24px",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: "30px",
                              marginTop: "15px",
                              marginBottom: "15px",
                            }}
                          >
                            {i?.packageName} Pack
                          </Typography>
                          <Box
                            className="card"
                            sx={{
                              backgroundColor: "#0F041D",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                              borderRadius: "25px",
                              width: "100%",
                              height: "100%",
                              border: "none",
                              padding: "25px",
                            }}
                          >
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
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                <img src={i?.packageName === "Free" ? images.free : ("") || i?.packageName === "Diamond" ? images.diamon : ("") || i?.packageName === "Gold" ? images.gold1 : ("") } alt="" 
                                  style={{
                                    marginBottom: i?.packageName === "Free" ? "55px" : ""
                                  }}
                                />
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
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <g>
                                        <path
                                          fill="#14C58A"
                                          d="M8.717.599a8.297 8.297 0 108.296 8.296A8.306 8.306 0 008.718.6z"
                                        ></path>
                                        <path
                                          fill="#fff"
                                          d="M13.941 6.096L8.99 11.543a.78.78 0 01-.49.23.86.86 0 01-.545-.12L4.418 9.362c-.313-.203-.363-.572-.113-.825s.705-.294 1.017-.091l2.949 1.912 4.505-4.955c.148-.18.406-.28.67-.259.266.02.496.158.6.357a.5.5 0 01-.105.595z"
                                        ></path>
                                      </g>
                                    </svg>
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
                                      marginBottom: "15px",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <g>
                                        <path
                                          fill="#14C58A"
                                          d="M8.717.599a8.297 8.297 0 108.296 8.296A8.306 8.306 0 008.718.6z"
                                        ></path>
                                        <path
                                          fill="#fff"
                                          d="M13.941 6.096L8.99 11.543a.78.78 0 01-.49.23.86.86 0 01-.545-.12L4.418 9.362c-.313-.203-.363-.572-.113-.825s.705-.294 1.017-.091l2.949 1.912 4.505-4.955c.148-.18.406-.28.67-.259.266.02.496.158.6.357a.5.5 0 01-.105.595z"
                                        ></path>
                                      </g>
                                    </svg>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "17px",
                                        color: "white",
                                        fontFamily: "Cyntho !important",
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      No watching ads
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <g>
                                        <path
                                          fill="#14C58A"
                                          d="M8.717.599a8.297 8.297 0 108.296 8.296A8.306 8.306 0 008.718.6z"
                                        ></path>
                                        <path
                                          fill="#fff"
                                          d="M13.941 6.096L8.99 11.543a.78.78 0 01-.49.23.86.86 0 01-.545-.12L4.418 9.362c-.313-.203-.363-.572-.113-.825s.705-.294 1.017-.091l2.949 1.912 4.505-4.955c.148-.18.406-.28.67-.259.266.02.496.158.6.357a.5.5 0 01-.105.595z"
                                        ></path>
                                      </g>
                                    </svg>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "17px",
                                        color: "white",
                                        fontFamily: "Cyntho !important",
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      4 Times for lucky spin
                                    </Typography>
                                  </Box>
                                </Box>
                                {i?.packagePrice === 0 ? (
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
                                      Free
                                    </Typography>
                                  </Box>
                                ) : (
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
                                )}
                                <button
                                  onClick={() => {
                                    dispatch(toggleDialogConfirm());
                                    dispatch(getIdPackage(i?.id));
                                  }}
                                  style={{
                                    border: "none",
                                    padding: "7px 35px",
                                    borderRadius: "24px",
                                    color: "white",
                                    background:
                                      "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                                    backdropFilter: " blur(4px)",
                                    width: "100%",
                                    fontSize: "18px",
                                    marginTop: "5px",
                                  }}
                                >
                                  Buy Now
                                </button>
                              </Box>
                            </Box>
                          </Box>
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
