import { Box, Container, Typography } from "@mui/material";
// import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import {
  getIdPackage,
  // toggleDialogConfirm,
  toggleLoginDialog,
  toggleSubscriptionDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "../scss/index.scss";
import DialogConfirm from "./DialogConfirm";
// import InspirationTTF from "../../../assets/font/CynthoNextMedium.otf";
import { useLocation } from "react-router-dom";
import { toggleCheckWallet } from "../../../redux-saga-middleware/reducers/walletReducer";

export default function Package() {
  const { width } = useWindowDimensions();
  const { listPackage } = useSelector((state) => state.appReducer);
  const { token, userPackageId } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  // const [bgFree, setBgFree] = useState("#A361EE");
  // const [bgDiamond, setBgDiamond] = useState("#A361EE");
  // const [bgGold, setBgGold] = useState("transparent");
  // const [activePop, setAcivePop] = useState(1);
  const [item, setItem] = useState([]);
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

  // const handleClickFree = () => {
  //   setBgFree("#A361EE");
  //   setBgDiamond("transparent");
  //   setBgGold("transparent");
  //   setAcivePop(0);
  // };
  // const handleClickDiamond = () => {
  //   // setBgFree("transparent");
  //   setBgDiamond("#A361EE");
  //   setBgGold("transparent");
  //   setAcivePop(1);
  // };
  // const handleClickGold = () => {
  //   // setBgFree("transparent");
  //   setBgDiamond("transparent");
  //   setBgGold("#A361EE");
  //   setAcivePop(2);
  // };

  useEffect(() => {
    // if (listPackage && listPackage?.length > 0) {
    //   const list = listPackage?.filter(
    //     (item) => item?.packageName === "Diamond"
    //   );
    //   setItem(list);
    // }
    if (listPackage && listPackage?.length > 0) {
      const list = listPackage?.filter(
        (item) => item?.packageName === "Subscription"
      );
      setItem(list);
    }
  }, [listPackage]);

  useEffect(() => {
    // if (activePop === 0) {
    //   const itemPackage = listPackage?.filter(
    //     (item) => item?.packageName === "Free"
    //   );
    //   setItem(itemPackage);
    // } else
    // if (activePop === 1) {
    //   const itemPackage = listPackage?.filter(
    //     (item) => item?.packageName === "Diamond"
    //   );
    //   setItem(itemPackage);
    // } else if (activePop === 2) {
    //   const itemPackage = listPackage?.filter(
    //     (item) => item?.packageName === "Gold"
    //   );
    //   setItem(itemPackage);
    // }
    const itemPackage = listPackage?.filter(
      (item) => item?.packageName === "Subscription"
    );
    setItem(itemPackage);
  }, [listPackage]);

  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <DialogConfirm />
      {width > 576 ? (
        <div className="Package-home pb-5 ">
          <Box className="text-white">
            {location && location?.pathname?.includes("home") && (
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
                Subscription
              </Typography>
            )}
          </Box>
          <Container
            maxWidth={"lg"}
            sx={{
              color: "white",
            }}
          >
            <Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {/* {listPackage
                      ?.filter(
                        (item) =>
                          item?.packageName !== "Ticket Play" &&
                          item?.packageName !== "Merchant" &&
                          item?.packageName !== "Free"
                      )
                      ?.map((i, index) => { */}
                  {listPackage
                    ?.filter((item) => item?.packageName === "Subscription")
                    ?.map((i, index) => {
                      return (
                        <Box
                          key={index}
                          sx={{
                            background:
                              "linear-gradient(215deg, #EB6FFF 7.26%, #82F0FF 34.46%, #A470FF 53.35%, #3CC4E2 68.88%, #C271FF 86.45%, #3CC4E2 100%)",
                            // i?.packageName === "Free"
                            //   ? "linear-gradient(180deg, #B8CCDF 0%, #CBDBF0 100%), #0F041D "
                            //   : "" || i?.packageName === "Diamond"
                            //   ? "linear-gradient(215deg, #EB6FFF 7.26%, #82F0FF 34.46%, #A470FF 53.35%, #3CC4E2 68.88%, #C271FF 86.45%, #3CC4E2 100%)"
                            //   : "" || i?.packageName === "Gold"
                            //   ? "linear-gradient(0deg, #F3CA78 0%, #F3CA78 100%), linear-gradient(180deg, #FDCD6D 0%, #FF7765 100%), #0F041D"
                            //   : "",
                            padding: "14px 14px 14px 14px",
                            borderRadius: "24px",
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            position: "relative",
                            // border:"5px solid",
                            // borderImageSlice:"1",
                            // borderWidth:"5px",
                            // borderImageSource:"linear-gradient(to bottom, #743ad5, #d53a9d)"
                          }}
                          className={
                            // i?.packageName === "Free"
                            //   ? "gradient-border-rounded"
                            //   : "" || i?.packageName === "Diamond"
                            //   ? "gradient-border-rounded1"
                            //   : "" || i?.packageName === "Gold"
                            //   ? "gradient-border-rounded2"
                            //   : ""
                            "gradient-border-rounded1"
                          }
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize:
                                width < 1200 && width > 576 ? "20px" : "27px",
                              marginTop: "5px",
                              marginBottom: "15px",
                              color: "white",
                              // i?.packageName === "Free"
                              //   ? "#383B80"
                              //   : "" || i?.packageName === "Diamond"
                              //   ? "white"
                              //   : "" || i?.packageName === "Gold"
                              //   ? "black"
                              //   : "",
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
                              borderRadius: "15px",
                              width: "100%",
                              height: "auto",
                              border: "none",
                              padding:
                                width < 1200 && width > 576 ? "10px" : "25px",
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
                                <video
                                  width={
                                    width < 1200 && width > 576 ? 130 : 200
                                  }
                                  height={
                                    width < 1200 && width > 576 ? 130 : 200
                                  }
                                  alt=""
                                  style={{
                                    marginBottom:
                                      i?.packageName === "Free" ? "15px" : "",
                                    marginTop:
                                      // i?.packageName === "Gold"
                                      //   ? "15px"
                                      //   : "" || i?.packageName === "Diamond"
                                      //   ? "15px"
                                      //   : "",
                                      "15px",
                                    mixBlendMode: "difference",
                                  }}
                                  playsInline
                                  muted
                                  autoPlay
                                  loop={true}
                                >
                                  <source
                                    src={
                                      i?.packageAvatar
                                        ? process.env.REACT_APP_SOCKET_SERVER +
                                          "/" +
                                          i?.packageAvatar
                                        : images.free
                                    }
                                    type="video/mp4"
                                  />
                                </video>
                                {/* <video
                                    autoPlay
                                    // src={
                                    //   i?.packageName === "Free"
                                    //     ? images.free
                                    //     : "" || i?.packageName === "Diamond"
                                    //     ? images.diamon
                                    //     : "" || i?.packageName === "Gold"
                                    //     ? images.gold1
                                    //     : ""
                                    // }
                                    src={
                                      i?.packageAvatar
                                        ? process.env.REACT_APP_END_POINT +
                                          "/" +
                                          i?.packageAvatar
                                        : images.free
                                    }
                                    width={
                                      width < 1200 && width > 576 ? 130 : 200
                                    }
                                    height={
                                      width < 1200 && width > 576 ? 130 : 200
                                    }
                                    alt=""
                                    style={{
                                      marginBottom:
                                        i?.packageName === "Free" ? "15px" : "",
                                      marginTop:
                                        // i?.packageName === "Gold"
                                        //   ? "15px"
                                        //   : "" || i?.packageName === "Diamond"
                                        //   ? "15px"
                                        //   : "",
                                        "15px"
                                    }}
                                  /> */}
                                <Box
                                  sx={{
                                    marginBottom: "0px",
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
                                    {i?.packageFreeTicketTournament === 0 ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                      >
                                        <g>
                                          <path
                                            fill="#F05153"
                                            d="M7.643.343a7.643 7.643 0 107.643 7.643A7.652 7.652 0 007.643.343z"
                                          ></path>
                                          <g fill="#fff">
                                            <path d="M11.25 5.372l-6.563 6.563-.937-.938 6.563-6.562.937.937z"></path>
                                            <path d="M10.313 11.936L3.75 5.373l.938-.937 6.562 6.562-.938.938z"></path>
                                          </g>
                                        </g>
                                      </svg>
                                    ) : (
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
                                    )}
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        fontSize:
                                          width < 1200 && width > 576
                                            ? "12px"
                                            : "17px",
                                        color: "white",

                                        fontWeight: "500 !important",
                                        overflow: "hidden",
                                        marginLeft: "4px !important",
                                      }}
                                    >
                                      {i?.packageFreeTicketTournament} extras /
                                      Promotion
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

                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      {i?.packageReduceWatchAds === 0
                                        ? "No watching ads"
                                        : `Reducing ${i?.packageReduceWatchAds}s time of ads`}
                                    </Typography>
                                  </Box>
                                  {/* <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    {i?.packageCountLuckySpin === 0 ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                      >
                                        <g>
                                          <path
                                            fill="#F05153"
                                            d="M7.643.343a7.643 7.643 0 107.643 7.643A7.652 7.652 0 007.643.343z"
                                          ></path>
                                          <g fill="#fff">
                                            <path d="M11.25 5.372l-6.563 6.563-.937-.938 6.563-6.562.937.937z"></path>
                                            <path d="M10.313 11.936L3.75 5.373l.938-.937 6.562 6.562-.938.938z"></path>
                                          </g>
                                        </g>
                                      </svg>
                                    ) : (
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
                                    )}
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontSize: "17px",
                                        color: "white",
                                        
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      {i?.packageCountLuckySpin}Times for lucky
                                      spin
                                    </Typography>
                                  </Box> */}
                                </Box>
                                {i?.packagePrice === 0 ? (
                                  <Box
                                    className="mt-4 mb-4"
                                    sx={{
                                      display: "flex",
                                      color: "white",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="h4"
                                      sx={{
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      Free
                                    </Typography>
                                  </Box>
                                ) : (
                                  <Box
                                    className="mt-4 mb-4"
                                    sx={{
                                      display: "flex",
                                      color: "white",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="h4"
                                      sx={{
                                        fontWeight: "500 !important",
                                        fontSize:
                                          width < 1200 && width > 576
                                            ? "22px"
                                            : "30px",
                                      }}
                                    >
                                      ${i?.packagePrice}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        marginTop: "7px",
                                        fontSize:
                                          width < 1200 && width > 576
                                            ? "10px"
                                            : "12px",
                                      }}
                                    >
                                      / month
                                    </Typography>
                                  </Box>
                                )}
                                <button
                                  onClick={() => {
                                    if (token === null || token === "") {
                                      dispatch(toggleLoginDialog());
                                      return;
                                    }
                                    if (i?.packageName !== "Free") {
                                      if (token) {
                                        // dispatch(toggleDialogConfirm());
                                        dispatch(
                                          toggleCheckWallet({
                                            type: "subscription",
                                          })
                                        );
                                        dispatch(getIdPackage(i?.id));
                                        dispatch(toggleSubscriptionDialog());
                                      }
                                    } else {
                                    }
                                  }}
                                  disabled={
                                    i?.id === userPackageId ? true : false
                                  }
                                  style={{
                                    border: "none",
                                    padding: "7px 35px",
                                    borderRadius: "24px",
                                    color: "white",
                                    background:
                                      i?.id === userPackageId
                                        ? "Gray"
                                        : "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                                    backdropFilter: " blur(4px)",
                                    width: "100%",
                                    fontSize:
                                      width < 1200 && width > 576
                                        ? "14px"
                                        : "18px",
                                    marginTop: "5px",
                                  }}
                                >
                                  {i?.id === userPackageId ||
                                  (i?.packageName === "Free" && !userPackageId)
                                    ? "Current pack"
                                    : "Buy Now"}
                                </button>
                              </Box>
                            </Box>
                          </Box>
                          <Box
                            className={
                              // i?.packageName === "Diamond" ? "sale" : ""
                              "sale"
                            }
                          >
                            {i?.packageName === "Diamond" ||
                            i?.packageName === "Subscription" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={width < 1024 ? "100" : "110"}
                                height={width < 1024 ? "100" : "113"}
                                fill="none"
                                viewBox="0 0 123 113"
                              >
                                <g filter="url(#filter0_d_3152_19856)">
                                  <path
                                    fill="#F19D1F"
                                    d="M48.861 23.943l52.783 38.912v43.505L4.133 23.942l44.728.001z"
                                  ></path>
                                </g>
                                <path
                                  fill="#fff"
                                  d="M33.632 39.151l-5.089-4 7.127-9.067 4.919 3.867c.714.562 1.127 1.234 1.243 2.01.104.778-.107 1.502-.639 2.179-.7.891-1.7 1.292-2.726 1.1.354.513.508 1.084.457 1.709-.051.624-.295 1.22-.737 1.783-.577.733-1.284 1.139-2.122 1.216-.85.08-1.655-.185-2.433-.797zm2.386-4.426l-2.548-2.003-1.914 2.434 2.548 2.003c.386.303.796.432 1.22.387.418-.05.772-.253 1.055-.613.279-.355.382-.733.322-1.139-.066-.41-.298-.766-.683-1.069zm.364-5.708l-1.71 2.175 2.447 1.924c.677.532 1.466.426 1.958-.2.502-.639.428-1.443-.248-1.975l-2.447-1.924zm9.32 15.367l-4.73-3.718c-.24.425-.263.908-.066 1.452.185.544.546 1.022 1.084 1.445.65.512 1.258.754 1.833.725l.2 1.672c-1.163.139-2.289-.225-3.39-1.1-1.088-.856-1.72-1.874-1.894-3.044-.174-1.17.13-2.26.93-3.279.761-.967 1.692-1.514 2.788-1.645 1.095-.13 2.124.187 3.104.957.973.766 1.521 1.708 1.642 2.816.117 1.114-.22 2.168-1.006 3.167a6.128 6.128 0 01-.495.552zm-3.71-4.962l2.94 2.311c.3-.368.418-.766.347-1.21-.075-.438-.316-.821-.72-1.14a2.093 2.093 0 00-1.328-.47 1.747 1.747 0 00-1.239.509zm9.256 10.437c-.502.639-1.152.946-1.94.92-.793-.02-1.613-.368-2.467-1.04-1.005-.79-1.621-1.775-1.849-2.956l1.662-.33c.172.677.6 1.29 1.277 1.822.708.557 1.323.712 1.581.383.244-.31-.019-.73-.618-1.53-.08-.093-.14-.16-.17-.214a8.988 8.988 0 01-.578-.864 4.374 4.374 0 01-.374-.877c-.224-.678-.098-1.346.404-1.984.497-.633 1.123-.948 1.868-.946.745.003 1.516.323 2.332.964.942.74 1.49 1.643 1.658 2.705l-1.669.314c-.12-.575-.474-1.088-1.054-1.534-.683-.537-1.154-.641-1.412-.312-.134.17-.125.393.059.731.083.168.162.302.232.408.064.101.173.248.323.448.286.378.508.707.671.968.152.262.298.571.436.915.261.697.13 1.37-.372 2.01zm8.311-3.623l-1.371 1.745 1.903 1.495-1.05 1.334-1.902-1.496-2.39 3.041c-.354.45-.298.964.132 1.302.266.208.563.299.887.277l.202 1.5c-.813.291-1.776.086-2.567-.535-.6-.472-.962-1.053-1.073-1.744-.118-.696.053-1.33.515-1.918l2.574-3.274-1.17-.92 1.05-1.334 1.169.92.855-1.088 2.236.695zm5.785 17.845l-1.903-1.496 3.22-12.137 1.954 1.536-2.533 9.22 8.343-4.653 1.96 1.541-11.04 5.99zm5.354 1.335c.522-.664 1.253-.969 2.182-.914.928.055 1.864.453 2.812 1.198.373.293.683.588.942.884l.273-.348c.194-.246.232-.554.11-.906-.13-.357-.387-.693-.785-1.006a3.983 3.983 0 00-2.31-.874l-.02-1.653c.547-.071 1.156-.001 1.818.212.656.219 1.268.547 1.837.994.847.666 1.378 1.421 1.588 2.261.21.84.059 1.59-.458 2.248l-3.43 4.362-1.72-1.351.478-.607c-.925.07-1.783-.205-2.575-.837-.657-.517-1.055-1.117-1.194-1.799-.14-.682.01-1.301.452-1.864zm4.229 1.544c-.462-.363-.905-.567-1.323-.62-.419-.053-.738.054-.942.313-.164.209-.199.447-.107.734.092.287.271.54.555.764.411.323.862.453 1.346.383.48-.063.896-.319 1.249-.768a3.667 3.667 0 00-.778-.806zm5.595 6.558l-.027 1.635c-.743.112-1.424-.076-2.037-.558-.575-.452-.91-1.002-.994-1.65-.083-.649.096-1.255.544-1.824l5.964-7.586 1.72 1.352-5.865 7.46c-.274.348-.226.743.121 1.016.165.13.36.18.574.155zm1.9.03l3.166-4.027 1.72 1.352-2.903 3.692c-.343.436-.5.896-.46 1.367.027.471.246.869.651 1.187a1.69 1.69 0 001.41.352c.516-.096.957-.383 1.34-.87l2.768-3.522 1.726 1.357-5.09 6.474-1.725-1.357.517-.657c-.957.097-1.829-.16-2.608-.782-.759-.596-1.183-1.319-1.272-2.156-.095-.841.158-1.645.76-2.41zm14.034 10.736l-4.73-3.718c-.24.424-.263.908-.066 1.452.185.544.546 1.022 1.083 1.445.652.512 1.259.754 1.834.725l.2 1.671c-1.163.14-2.289-.224-3.39-1.1-1.088-.855-1.72-1.873-1.894-3.043-.174-1.17.13-2.26.93-3.279.761-.967 1.692-1.514 2.787-1.645 1.096-.131 2.125.187 3.105.957.973.766 1.521 1.708 1.642 2.816.117 1.114-.221 2.168-1.006 3.167a6.101 6.101 0 01-.495.552zm-3.71-4.962l2.94 2.311c.3-.368.418-.766.347-1.21-.075-.438-.316-.821-.72-1.14a2.092 2.092 0 00-1.328-.47 1.746 1.746 0 00-1.24.509z"
                                ></path>
                                <defs>
                                  <filter
                                    id="filter0_d_3152_19856"
                                    width="104.1"
                                    height="89.006"
                                    x="0.839"
                                    y="23.942"
                                    colorInterpolationFilters="sRGB"
                                    filterUnits="userSpaceOnUse"
                                  >
                                    <feFlood
                                      floodOpacity="0"
                                      result="BackgroundImageFix"
                                    ></feFlood>
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      result="hardAlpha"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    ></feColorMatrix>
                                    <feOffset dy="3.294"></feOffset>
                                    <feGaussianBlur stdDeviation="1.647"></feGaussianBlur>
                                    <feComposite
                                      in2="hardAlpha"
                                      operator="out"
                                    ></feComposite>
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
                                    <feBlend
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_3152_19856"
                                    ></feBlend>
                                    <feBlend
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_3152_19856"
                                      result="shape"
                                    ></feBlend>
                                  </filter>
                                </defs>
                              </svg>
                            ) : (
                              ""
                            )}
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
        <div className="Package-home" style={{ marginTop: "48px" }}>
          {location && location?.pathname?.includes("home") && (
            <Typography
              sx={{
                textAlign: "start",
                fontSize: width < 576 ? "14px" : "20px",
                fontWeight: "200 !important",
                marginLeft: "0px !important",
                color: "#fff",
              }}
            >
              Subscription
            </Typography>
          )}
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
                  pathname && pathname?.includes("home") ? "20px" : "40px",
                marginTop: "24px",
              }}
            >
              {item?.map((i, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      background:
                        "linear-gradient(215deg, #EB6FFF 7.26%, #82F0FF 34.46%, #A470FF 53.35%, #3CC4E2 68.88%, #C271FF 86.45%, #3CC4E2 100%)",
                      // i?.packageName === "Free"
                      //   ? "linear-gradient(180deg, #B8CCDF 0%, #CBDBF0 100%), #0F041D "
                      //   : "" || i?.packageName === "Diamond"
                      //   ? "linear-gradient(215deg, #EB6FFF 7.26%, #82F0FF 34.46%, #A470FF 53.35%, #3CC4E2 68.88%, #C271FF 86.45%, #3CC4E2 100%)"
                      //   : "" || i?.packageName === "Gold"
                      //   ? "linear-gradient(0deg, #F3CA78 0%, #F3CA78 100%), linear-gradient(180deg, #FDCD6D 0%, #FF7765 100%), #0F041D"
                      //   : "",
                      padding: "14px 14px 14px 14px",
                      borderRadius: "24px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      position: "relative",
                      marginTop: "20px",
                      width: "100%",
                    }}
                    className={
                      // i?.packageName === "Free"
                      //   ? "gradient-border-rounded"
                      //   : "" || i?.packageName === "Diamond"
                      //   ? "gradient-border-rounded1"
                      //   : "" || i?.packageName === "Gold"
                      //   ? "gradient-border-rounded2"
                      //   : ""
                      "gradient-border-rounded1"
                    }
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "20px",
                        marginTop: "5px",
                        marginBottom: "15px !important",
                        color:
                          // i?.packageName === "Free"
                          //   ? "#383B80"
                          //   : "" || i?.packageName === "Diamond"
                          //   ? "white"
                          //   : "" || i?.packageName === "Gold"
                          //   ? "black"
                          //   : "",
                          "white",
                        textOverflow: "ellipsis",
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
                        alignItems: "center",
                        borderRadius: "15px",
                        width: "100%",
                        height: "auto",
                        border: "none",
                        padding: "5px",
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
                          <video
                            width={width < 1200 && width > 576 ? 130 : 200}
                            height={width < 1200 && width > 576 ? 130 : 200}
                            alt=""
                            style={{
                              marginBottom:
                                i?.packageName === "Free" ? "15px" : "",
                              marginTop:
                                // i?.packageName === "Gold"
                                //   ? "15px"
                                //   : "" || i?.packageName === "Diamond"
                                //   ? "15px"
                                //   : "",
                                "15px",
                              mixBlendMode: "difference",
                            }}
                            playsInline
                            muted
                            autoPlay
                            loop={true}
                          >
                            <source
                              src={
                                i?.packageAvatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    i?.packageAvatar
                                  : images.free
                              }
                              type="video/mp4"
                            />
                          </video>
                          <Box
                            sx={{
                              marginBottom: "0px",
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
                              {i?.packageFreeTicketTournament === 0 ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  fill="none"
                                  viewBox="0 0 16 16"
                                >
                                  <g>
                                    <path
                                      fill="#F05153"
                                      d="M7.643.343a7.643 7.643 0 107.643 7.643A7.652 7.652 0 007.643.343z"
                                    ></path>
                                    <g fill="#fff">
                                      <path d="M11.25 5.372l-6.563 6.563-.937-.938 6.563-6.562.937.937z"></path>
                                      <path d="M10.313 11.936L3.75 5.373l.938-.937 6.562 6.562-.938.938z"></path>
                                    </g>
                                  </g>
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
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
                              )}
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "14px",
                                  color: "white",

                                  fontWeight: "500 !important",
                                  marginLeft: "4px !important",
                                }}
                              >
                                {i?.packageFreeTicketTournament} extras /
                                Promotion
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
                                width="15"
                                height="15"
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
                                  fontSize: "14px",
                                  color: "white",

                                  fontWeight: "500 !important",
                                }}
                              >
                                {i?.packageReduceWatchAds === 0
                                  ? "No watching ads"
                                  : `Reducing ${i?.packageReduceWatchAds}s time of ads`}
                              </Typography>
                            </Box>
                            {/* <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                              }}
                            >
                              {i?.packageCountLuckySpin === 0 ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  fill="none"
                                  viewBox="0 0 16 16"
                                >
                                  <g>
                                    <path
                                      fill="#F05153"
                                      d="M7.643.343a7.643 7.643 0 107.643 7.643A7.652 7.652 0 007.643.343z"
                                    ></path>
                                    <g fill="#fff">
                                      <path d="M11.25 5.372l-6.563 6.563-.937-.938 6.563-6.562.937.937z"></path>
                                      <path d="M10.313 11.936L3.75 5.373l.938-.937 6.562 6.562-.938.938z"></path>
                                    </g>
                                  </g>
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
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
                              )}

                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: "14px",
                                  color: "white",
                                  
                                  fontWeight: "500 !important",
                                }}
                              >
                                {i?.packageCountLuckySpin}Times for lucky spin
                              </Typography>
                            </Box> */}
                          </Box>
                          {i?.packagePrice === 0 ? (
                            <Box
                              className="mt-4 mb-4"
                              sx={{
                                display: "flex",
                                color: "white",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="h4"
                                sx={{
                                  fontWeight: "500 !important",
                                }}
                              >
                                Free
                              </Typography>
                            </Box>
                          ) : (
                            <Box
                              className="mt-4 mb-4"
                              sx={{
                                display: "flex",
                                color: "white",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="h4"
                                sx={{
                                  fontWeight: "500 !important",
                                }}
                              >
                                ${i?.packagePrice}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  marginTop: "7px",
                                  fontSize: "12px",
                                }}
                              >
                                /month
                              </Typography>
                            </Box>
                          )}
                          <button
                            onClick={() => {
                              if (i?.packageName !== "Free") {
                                if (token) {
                                  dispatch(
                                    toggleCheckWallet({
                                      type: "subscription",
                                    })
                                  );
                                  dispatch(getIdPackage(i?.id));
                                  dispatch(toggleSubscriptionDialog(false));
                                }
                              }
                              if (token === null || token === "") {
                                dispatch(toggleLoginDialog());
                                return;
                              }
                            }}
                            disabled={i?.id === userPackageId ? true : false}
                            style={{
                              border: "none",
                              padding: "7px 35px",
                              borderRadius: "24px",
                              color: "white",
                              background:
                                i?.id === userPackageId
                                  ? "Gray"
                                  : "linear-gradient(270deg, #4AA1EC 0%, #5840E9 100%)",
                              backdropFilter: " blur(4px)",
                              width: "100%",
                              fontSize: "18px",
                              marginTop: "5px",
                            }}
                            className="mb-3"
                          >
                            <Typography>
                              {i?.id === userPackageId ||
                              (i?.packageName === "Free" && !userPackageId)
                                ? "Current pack"
                                : "Buy Now"}
                            </Typography>
                          </button>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      className={
                        // i?.packageName === "Diamond" ? "saleMobile" : ""
                        "saleMobile"
                      }
                    >
                      {i?.packageName === "Diamond" ||
                      i?.packageName === "Subscription" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="110"
                          height="90"
                          fill="none"
                          viewBox="0 0 123 113"
                        >
                          <g filter="url(#filter0_d_3152_19856)">
                            <path
                              fill="#F19D1F"
                              d="M48.861 23.943l52.783 38.912v43.505L4.133 23.942l44.728.001z"
                            ></path>
                          </g>
                          <path
                            fill="#fff"
                            d="M33.632 39.151l-5.089-4 7.127-9.067 4.919 3.867c.714.562 1.127 1.234 1.243 2.01.104.778-.107 1.502-.639 2.179-.7.891-1.7 1.292-2.726 1.1.354.513.508 1.084.457 1.709-.051.624-.295 1.22-.737 1.783-.577.733-1.284 1.139-2.122 1.216-.85.08-1.655-.185-2.433-.797zm2.386-4.426l-2.548-2.003-1.914 2.434 2.548 2.003c.386.303.796.432 1.22.387.418-.05.772-.253 1.055-.613.279-.355.382-.733.322-1.139-.066-.41-.298-.766-.683-1.069zm.364-5.708l-1.71 2.175 2.447 1.924c.677.532 1.466.426 1.958-.2.502-.639.428-1.443-.248-1.975l-2.447-1.924zm9.32 15.367l-4.73-3.718c-.24.425-.263.908-.066 1.452.185.544.546 1.022 1.084 1.445.65.512 1.258.754 1.833.725l.2 1.672c-1.163.139-2.289-.225-3.39-1.1-1.088-.856-1.72-1.874-1.894-3.044-.174-1.17.13-2.26.93-3.279.761-.967 1.692-1.514 2.788-1.645 1.095-.13 2.124.187 3.104.957.973.766 1.521 1.708 1.642 2.816.117 1.114-.22 2.168-1.006 3.167a6.128 6.128 0 01-.495.552zm-3.71-4.962l2.94 2.311c.3-.368.418-.766.347-1.21-.075-.438-.316-.821-.72-1.14a2.093 2.093 0 00-1.328-.47 1.747 1.747 0 00-1.239.509zm9.256 10.437c-.502.639-1.152.946-1.94.92-.793-.02-1.613-.368-2.467-1.04-1.005-.79-1.621-1.775-1.849-2.956l1.662-.33c.172.677.6 1.29 1.277 1.822.708.557 1.323.712 1.581.383.244-.31-.019-.73-.618-1.53-.08-.093-.14-.16-.17-.214a8.988 8.988 0 01-.578-.864 4.374 4.374 0 01-.374-.877c-.224-.678-.098-1.346.404-1.984.497-.633 1.123-.948 1.868-.946.745.003 1.516.323 2.332.964.942.74 1.49 1.643 1.658 2.705l-1.669.314c-.12-.575-.474-1.088-1.054-1.534-.683-.537-1.154-.641-1.412-.312-.134.17-.125.393.059.731.083.168.162.302.232.408.064.101.173.248.323.448.286.378.508.707.671.968.152.262.298.571.436.915.261.697.13 1.37-.372 2.01zm8.311-3.623l-1.371 1.745 1.903 1.495-1.05 1.334-1.902-1.496-2.39 3.041c-.354.45-.298.964.132 1.302.266.208.563.299.887.277l.202 1.5c-.813.291-1.776.086-2.567-.535-.6-.472-.962-1.053-1.073-1.744-.118-.696.053-1.33.515-1.918l2.574-3.274-1.17-.92 1.05-1.334 1.169.92.855-1.088 2.236.695zm5.785 17.845l-1.903-1.496 3.22-12.137 1.954 1.536-2.533 9.22 8.343-4.653 1.96 1.541-11.04 5.99zm5.354 1.335c.522-.664 1.253-.969 2.182-.914.928.055 1.864.453 2.812 1.198.373.293.683.588.942.884l.273-.348c.194-.246.232-.554.11-.906-.13-.357-.387-.693-.785-1.006a3.983 3.983 0 00-2.31-.874l-.02-1.653c.547-.071 1.156-.001 1.818.212.656.219 1.268.547 1.837.994.847.666 1.378 1.421 1.588 2.261.21.84.059 1.59-.458 2.248l-3.43 4.362-1.72-1.351.478-.607c-.925.07-1.783-.205-2.575-.837-.657-.517-1.055-1.117-1.194-1.799-.14-.682.01-1.301.452-1.864zm4.229 1.544c-.462-.363-.905-.567-1.323-.62-.419-.053-.738.054-.942.313-.164.209-.199.447-.107.734.092.287.271.54.555.764.411.323.862.453 1.346.383.48-.063.896-.319 1.249-.768a3.667 3.667 0 00-.778-.806zm5.595 6.558l-.027 1.635c-.743.112-1.424-.076-2.037-.558-.575-.452-.91-1.002-.994-1.65-.083-.649.096-1.255.544-1.824l5.964-7.586 1.72 1.352-5.865 7.46c-.274.348-.226.743.121 1.016.165.13.36.18.574.155zm1.9.03l3.166-4.027 1.72 1.352-2.903 3.692c-.343.436-.5.896-.46 1.367.027.471.246.869.651 1.187a1.69 1.69 0 001.41.352c.516-.096.957-.383 1.34-.87l2.768-3.522 1.726 1.357-5.09 6.474-1.725-1.357.517-.657c-.957.097-1.829-.16-2.608-.782-.759-.596-1.183-1.319-1.272-2.156-.095-.841.158-1.645.76-2.41zm14.034 10.736l-4.73-3.718c-.24.424-.263.908-.066 1.452.185.544.546 1.022 1.083 1.445.652.512 1.259.754 1.834.725l.2 1.671c-1.163.14-2.289-.224-3.39-1.1-1.088-.855-1.72-1.873-1.894-3.043-.174-1.17.13-2.26.93-3.279.761-.967 1.692-1.514 2.787-1.645 1.096-.131 2.125.187 3.105.957.973.766 1.521 1.708 1.642 2.816.117 1.114-.221 2.168-1.006 3.167a6.101 6.101 0 01-.495.552zm-3.71-4.962l2.94 2.311c.3-.368.418-.766.347-1.21-.075-.438-.316-.821-.72-1.14a2.092 2.092 0 00-1.328-.47 1.746 1.746 0 00-1.24.509z"
                          ></path>
                          <defs>
                            <filter
                              id="filter0_d_3152_19856"
                              width="104.1"
                              height="89.006"
                              x="0.839"
                              y="23.942"
                              colorInterpolationFilters="sRGB"
                              filterUnits="userSpaceOnUse"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              ></feFlood>
                              <feColorMatrix
                                in="SourceAlpha"
                                result="hardAlpha"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              ></feColorMatrix>
                              <feOffset dy="3.294"></feOffset>
                              <feGaussianBlur stdDeviation="1.647"></feGaussianBlur>
                              <feComposite
                                in2="hardAlpha"
                                operator="out"
                              ></feComposite>
                              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
                              <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_3152_19856"
                              ></feBlend>
                              <feBlend
                                in="SourceGraphic"
                                in2="effect1_dropShadow_3152_19856"
                                result="shape"
                              ></feBlend>
                            </filter>
                          </defs>
                        </svg>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </div>
      )}
    </>
  );
}
