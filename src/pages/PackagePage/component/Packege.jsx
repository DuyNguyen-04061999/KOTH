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

import { useLocation } from "react-router-dom";

export default function Package() {
  const { width } = useWindowDimensions();
  const { listPackage } = useSelector((state) => state.appReducer);
  const { token, userPackageId } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  // const [bgFree, setBgFree] = useState("#A361EE");
  const [bgDiamond, setBgDiamond] = useState("#A361EE");
  const [bgGold, setBgGold] = useState("transparent");
  const [activePop, setAcivePop] = useState(1);
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
  const handleClickDiamond = () => {
    // setBgFree("transparent");
    setBgDiamond("#A361EE");
    setBgGold("transparent");
    setAcivePop(1);
  };
  const handleClickGold = () => {
    // setBgFree("transparent");
    setBgDiamond("transparent");
    setBgGold("#A361EE");
    setAcivePop(2);
  };

  useEffect(() => {
    if (listPackage && listPackage?.length > 0) {
      const list = listPackage?.filter(
        (item) => item?.packageName == "Diamond"
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
    if (activePop === 1) {
      const itemPackage = listPackage?.filter(
        (item) => item?.packageName === "Diamond"
      );
      setItem(itemPackage);
    } else if (activePop === 2) {
      const itemPackage = listPackage?.filter(
        (item) => item?.packageName === "Gold"
      );
      setItem(itemPackage);
    }
  }, [activePop]);

  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <DialogConfirm />
      {width > 576 ? (
        <div className="Package-home pb-5 mb-5">
          <Box className="pt-5 pb-4 text-white">
            {location && location?.pathname?.includes("home") && (
              <Typography variant="h5">Package</Typography>
            )}
          </Box>
          <Container
            maxWidth={"lg"}
            sx={{
              color: "white",
            }}
          >
            <Box>
              <Box sx={{ paddingBottom: "50px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {listPackage
                    ?.filter(
                      (item) =>
                        item?.packageName !== "Ticket Play" &&
                        item?.packageName !== "Merchant" &&
                        item?.packageName !== "Free"
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
                            position: "relative",
                            // border:"5px solid",
                            // borderImageSlice:"1",
                            // borderWidth:"5px",
                            // borderImageSource:"linear-gradient(to bottom, #743ad5, #d53a9d)"
                          }}
                          className={
                            i?.packageName === "Free"
                              ? "gradient-border-rounded"
                              : "" || i?.packageName === "Diamond"
                              ? "gradient-border-rounded1"
                              : "" || i?.packageName === "Gold"
                              ? "gradient-border-rounded2"
                              : ""
                          }
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              fontSize: "27px",
                              marginTop: "5px",
                              marginBottom: "15px",
                              color:
                                i?.packageName === "Free"
                                  ? "#383B80"
                                  : "" || i?.packageName === "Diamond"
                                  ? "white"
                                  : "" || i?.packageName === "Gold"
                                  ? "black"
                                  : "",
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
                                <img
                                  // src={
                                  //   i?.packageName === "Free"
                                  //     ? images.free
                                  //     : "" || i?.packageName === "Diamond"
                                  //     ? images.diamon
                                  //     : "" || i?.packageName === "Gold"
                                  //     ? images.gold1
                                  //     : ""
                                  // }
                                  src={i?.packageAvatar ? process.env.REACT_APP_END_POINT + "/" + i?.packageAvatar : images.free}
                                  width={200}
                                  height={200}
                                  alt=""
                                  style={{
                                    marginBottom:
                                      i?.packageName === "Free" ? "15px" : "",
                                    marginTop:
                                      i?.packageName === "Gold"
                                        ? "15px"
                                        : "" || i?.packageName === "Diamond"
                                        ? "15px"
                                        : "",
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
                                      variant="body1"
                                      sx={{
                                        fontSize: "17px",
                                        color: "white",
                                        fontFamily: "Cyntho Next !important",
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      {i?.packageFreeTicketTournament} Free
                                      voucher/tournament
                                    </Typography>
                                  </Box>
                                  {/* <Box
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
                                        fontFamily: "Cyntho Next !important",
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      {i?.packageReduceWatchAds === 0
                                        ? "No watching ads"
                                        : "Reducing 50% time of ads"}
                                    </Typography>
                                  </Box>
                                  <Box
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
                                        fontFamily: "Cyntho Next !important",
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
                                        fontFamily: "Cyntho Next !important",
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
                                        fontFamily: "Cyntho Next !important",
                                        fontWeight: "500 !important",
                                      }}
                                    >
                                      ${i?.packagePrice}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        marginTop: "7px",
                                        fontFamily: "Cyntho Next",
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
                                      dispatch(toggleDialogConfirm());
                                      dispatch(getIdPackage(i?.id));
                                    } else {
                                      console.log("Cannot buy free pack!");
                                    }
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
                              i?.packageName === "Diamond" ? "sale" : ""
                            }
                          >
                            {i?.packageName === "Diamond" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="148"
                                height="138"
                                fill="none"
                                viewBox="0 0 148 138"
                              >
                                <g filter="url(#filter0_d_2157_3790)">
                                  <path
                                    fill="#F19D1F"
                                    d="M56.655 27.597l64.097 47.253v54.331l-116.657-100 52.56-1.584z"
                                  ></path>
                                </g>
                                <path
                                  fill="#fff"
                                  d="M39.647 46.758l-6.13-4.922 8.767-10.92 5.924 4.757c.86.69 1.353 1.512 1.485 2.456.117.946-.149 1.823-.803 2.638-.862 1.073-2.081 1.547-3.324 1.3.423.628.603 1.324.533 2.082-.07.758-.373 1.479-.917 2.157-.71.883-1.573 1.366-2.592 1.45-1.033.085-2.007-.246-2.943-.998zm2.95-5.345l-3.068-2.464-2.354 2.932 3.07 2.464c.464.373.96.534 1.476.484.508-.055.94-.297 1.289-.731.342-.426.472-.885.405-1.378-.076-.499-.353-.934-.817-1.307zm.515-6.926l-2.103 2.62 2.947 2.365c.814.654 1.774.536 2.38-.218.617-.77.538-1.747-.277-2.401l-2.947-2.366zm11.125 18.775l-5.696-4.573c-.298.512-.331 1.1-.1 1.761.22.664.651 1.25 1.299 1.769.784.63 1.519.931 2.217.904l.222 2.031c-1.414.155-2.776-.3-4.103-1.378-1.31-1.052-2.064-2.296-2.261-3.72-.198-1.422.186-2.742 1.17-3.968.936-1.166 2.073-1.818 3.405-1.964 1.331-.145 2.577.254 3.757 1.201 1.173.942 1.827 2.093 1.96 3.44.127 1.354-.296 2.63-1.262 3.833-.177.221-.376.437-.608.664zm-4.443-6.072l3.541 2.843c.368-.443.517-.924.437-1.465-.086-.532-.373-1-.86-1.392a2.54 2.54 0 00-1.607-.588 2.12 2.12 0 00-1.51.602zm11.11 12.79c-.618.769-1.411 1.134-2.368 1.092-.962-.033-1.954-.467-2.982-1.292-1.21-.972-1.947-2.177-2.208-3.614l2.021-.38c.202.825.714 1.574 1.53 2.229.852.684 1.596.88 1.914.485.3-.373-.014-.888-.732-1.865-.096-.115-.167-.197-.202-.263-.294-.398-.52-.756-.693-1.056a5.328 5.328 0 01-.443-1.07c-.264-.826-.102-1.635.515-2.405.611-.761 1.376-1.136 2.28-1.124.905.012 1.838.41 2.82 1.199 1.135.91 1.79 2.013 1.98 3.305l-2.03.361c-.14-.7-.563-1.328-1.262-1.876-.822-.66-1.392-.793-1.71-.397-.165.206-.157.476.062.89.1.204.193.367.277.497.076.124.207.304.386.548.343.463.61.865.804 1.184.18.32.354.697.518 1.117.308.849.14 1.666-.477 2.435zm10.137-4.297l-1.687 2.102 2.292 1.84-1.29 1.607-2.292-1.84-2.94 3.662c-.435.54-.373 1.166.144 1.582.32.257.68.37 1.073.348l.228 1.823c-.99.344-2.159.083-3.11-.681-.724-.58-1.156-1.29-1.283-2.131-.134-.847.081-1.614.65-2.322l3.167-3.945-1.41-1.13 1.29-1.607 1.41 1.13 1.051-1.31 2.707.872zm8.291 19.092c-.617.77-1.411 1.134-2.367 1.093-.963-.034-1.955-.467-2.983-1.293-1.21-.972-1.947-2.176-2.208-3.614l2.022-.38c.201.825.714 1.575 1.528 2.229.853.685 1.597.881 1.915.485.3-.373-.013-.887-.732-1.865-.096-.114-.167-.197-.202-.262-.294-.399-.52-.756-.692-1.057a5.322 5.322 0 01-.444-1.07c-.263-.825-.102-1.635.516-2.404.61-.762 1.376-1.137 2.28-1.125.904.013 1.837.41 2.82 1.2 1.134.91 1.79 2.013 1.98 3.305l-2.031.36c-.14-.7-.562-1.327-1.261-1.876-.823-.66-1.393-.792-1.71-.396-.166.205-.157.475.062.889.099.204.193.368.276.498.076.123.207.303.387.548.342.462.609.864.803 1.183.181.32.354.698.518 1.117.308.849.14 1.666-.477 2.435zm9.477 6.244l-5.696-4.573c-.298.512-.331 1.099-.099 1.761.219.664.65 1.249 1.298 1.769.784.63 1.519.93 2.217.903l.223 2.032c-1.414.155-2.777-.3-4.104-1.378-1.31-1.052-2.064-2.296-2.261-3.72-.197-1.423.186-2.743 1.17-3.969.936-1.165 2.073-1.817 3.405-1.963 1.332-.145 2.577.253 3.757 1.2 1.173.942 1.827 2.093 1.96 3.44.127 1.355-.296 2.63-1.262 3.834a7.43 7.43 0 01-.608.664zm-4.443-6.072l3.541 2.843c.369-.443.517-.925.438-1.465-.086-.532-.374-1-.861-1.392a2.54 2.54 0 00-1.607-.589c-.59.002-1.089.203-1.51.603zM92.38 86.04l-.054 1.985c-.903.127-1.728-.11-2.466-.702-.693-.557-1.093-1.228-1.186-2.017-.094-.789.132-1.522.682-2.207l7.337-9.139 2.071 1.664-7.214 8.985c-.337.42-.284.9.135 1.236a.916.916 0 00.695.195zm4.706 3.778l-.054 1.986c-.903.126-1.727-.11-2.466-.703-.693-.556-1.093-1.228-1.186-2.017-.093-.788.132-1.522.682-2.207l7.337-9.138 2.071 1.663-7.214 8.986c-.336.418-.284.899.135 1.235a.917.917 0 00.695.195zm9.999 5.874l-5.696-4.573c-.298.512-.331 1.099-.099 1.761.219.664.651 1.249 1.298 1.769.784.63 1.519.931 2.217.903l.223 2.032c-1.414.155-2.777-.3-4.104-1.378-1.31-1.052-2.064-2.296-2.261-3.72-.197-1.422.186-2.743 1.17-3.969.936-1.165 2.073-1.817 3.405-1.963 1.332-.145 2.577.253 3.757 1.201 1.173.942 1.827 2.093 1.96 3.44.128 1.354-.296 2.63-1.262 3.833-.177.221-.375.437-.608.664zm-4.443-6.072l3.541 2.843c.369-.443.518-.925.438-1.465-.086-.532-.374-1-.861-1.392a2.54 2.54 0 00-1.607-.588 2.122 2.122 0 00-1.511.602zm5.319 11.985l-2.071-1.663 6.26-7.798 2.072 1.663-1.18 1.47c1.392-.548 2.855-.375 4.013.554l-1.602 1.995c-.8-.641-1.607-.977-2.409-1.007-.809-.023-1.457.27-1.94.872l-3.143 3.914z"
                                ></path>
                                <defs>
                                  <filter
                                    id="filter0_d_2157_3790"
                                    width="124.657"
                                    height="109.584"
                                    x="0.095"
                                    y="27.598"
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
                                    <feOffset dy="4"></feOffset>
                                    <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                    <feComposite
                                      in2="hardAlpha"
                                      operator="out"
                                    ></feComposite>
                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
                                    <feBlend
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_2157_3790"
                                    ></feBlend>
                                    <feBlend
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_2157_3790"
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
        <div className="Package-home" style={{ padding: "10px" }}>
          <Box>
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
                >
                  {/* <Box
                    onClick={handleClickFree}
                    sx={{
                      padding: "0px 35px",
                      margin: "4px",
                      background: bgFree,
                      borderRadius: "20px",
                      color: "white",
                    }}
                  >
                    Free
                  </Box> */}
                  <Box
                    onClick={handleClickDiamond}
                    sx={{
                      padding: "0px 20px",
                      margin: "4px",
                      background: bgDiamond,
                      borderRadius: "20px",
                      color: "white",
                      width: "50%",
                      textAlign: "center",
                    }}
                  >
                    Diamond
                  </Box>
                  <Box
                    onClick={handleClickGold}
                    sx={{
                      padding: "0px 35px",
                      margin: "4px",
                      background: bgGold,
                      borderRadius: "20px",
                      color: "white",
                      width: "50%",
                      textAlign: "center",
                    }}
                  >
                    Gold
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ padding: pathname && pathname?.includes("home") ? "20px" : "40px" }}>
              {item?.map((i, index) => {
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
                      position: "relative",
                      marginTop: "20px",
                    }}
                    className={
                      i?.packageName === "Free"
                        ? "gradient-border-rounded"
                        : "" || i?.packageName === "Diamond"
                        ? "gradient-border-rounded1"
                        : "" || i?.packageName === "Gold"
                        ? "gradient-border-rounded2"
                        : ""
                    }
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: "27px",
                        marginTop: "5px",
                        marginBottom: "15px !important",
                        color:
                          i?.packageName === "Free"
                            ? "#383B80"
                            : "" || i?.packageName === "Diamond"
                            ? "white"
                            : "" || i?.packageName === "Gold"
                            ? "black"
                            : "",
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
                          <img
                            // src={
                            //   i?.packageName === "Free"
                            //     ? images.free
                            //     : "" || i?.packageName === "Diamond"
                            //     ? images.diamon
                            //     : "" || i?.packageName === "Gold"
                            //     ? images.gold1
                            //     : ""
                            // }
                            src={i?.packageAvatar ? process.env.REACT_APP_END_POINT + "/" + i?.packageAvatar : images.free}
                            width={167}
                            height={167}
                            alt=""
                            style={{
                              marginTop:
                                i?.packageName === "Gold"
                                  ? "25px"
                                  : "" || i?.packageName === "Diamond"
                                  ? "25px"
                                  : "" || i?.packageName === "Free"
                                  ? "25px"
                                  : "",
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
                                  fontFamily: "Cyntho Next !important",
                                  fontWeight: "500 !important",
                                }}
                              >
                                {i?.packageFreeTicketTournament} Free
                                voucher/tournament
                              </Typography>
                            </Box>
                            {/* <Box
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
                                  fontFamily: "Cyntho Next !important",
                                  fontWeight: "500 !important",
                                }}
                              >
                                {i?.packageReduceWatchAds === 0
                                  ? "No watching ads"
                                  : "Reducing 50% time of ads"}
                              </Typography>
                            </Box>
                            <Box
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
                                  fontFamily: "Cyntho Next !important",
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
                                  fontFamily: "Cyntho Next !important",
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
                                  fontFamily: "Cyntho Next !important",
                                  fontWeight: "500 !important",
                                }}
                              >
                                ${i?.packagePrice}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  marginTop: "7px",
                                  fontFamily: "Cyntho Next",
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
                                dispatch(toggleDialogConfirm());
                                dispatch(getIdPackage(i?.id));
                              } else {
                                console.log("Cannot buy free pack!");
                              }
                            }}
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
                        i?.packageName === "Diamond" ? "saleMobile" : ""
                      }
                    >
                      {i?.packageName === "Diamond" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="148"
                          height="138"
                          fill="none"
                          viewBox="0 0 148 138"
                        >
                          <g filter="url(#filter0_d_2157_3790)">
                            <path
                              fill="#F19D1F"
                              d="M56.655 27.597l64.097 47.253v54.331l-116.657-100 52.56-1.584z"
                            ></path>
                          </g>
                          <path
                            fill="#fff"
                            d="M39.647 46.758l-6.13-4.922 8.767-10.92 5.924 4.757c.86.69 1.353 1.512 1.485 2.456.117.946-.149 1.823-.803 2.638-.862 1.073-2.081 1.547-3.324 1.3.423.628.603 1.324.533 2.082-.07.758-.373 1.479-.917 2.157-.71.883-1.573 1.366-2.592 1.45-1.033.085-2.007-.246-2.943-.998zm2.95-5.345l-3.068-2.464-2.354 2.932 3.07 2.464c.464.373.96.534 1.476.484.508-.055.94-.297 1.289-.731.342-.426.472-.885.405-1.378-.076-.499-.353-.934-.817-1.307zm.515-6.926l-2.103 2.62 2.947 2.365c.814.654 1.774.536 2.38-.218.617-.77.538-1.747-.277-2.401l-2.947-2.366zm11.125 18.775l-5.696-4.573c-.298.512-.331 1.1-.1 1.761.22.664.651 1.25 1.299 1.769.784.63 1.519.931 2.217.904l.222 2.031c-1.414.155-2.776-.3-4.103-1.378-1.31-1.052-2.064-2.296-2.261-3.72-.198-1.422.186-2.742 1.17-3.968.936-1.166 2.073-1.818 3.405-1.964 1.331-.145 2.577.254 3.757 1.201 1.173.942 1.827 2.093 1.96 3.44.127 1.354-.296 2.63-1.262 3.833-.177.221-.376.437-.608.664zm-4.443-6.072l3.541 2.843c.368-.443.517-.924.437-1.465-.086-.532-.373-1-.86-1.392a2.54 2.54 0 00-1.607-.588 2.12 2.12 0 00-1.51.602zm11.11 12.79c-.618.769-1.411 1.134-2.368 1.092-.962-.033-1.954-.467-2.982-1.292-1.21-.972-1.947-2.177-2.208-3.614l2.021-.38c.202.825.714 1.574 1.53 2.229.852.684 1.596.88 1.914.485.3-.373-.014-.888-.732-1.865-.096-.115-.167-.197-.202-.263-.294-.398-.52-.756-.693-1.056a5.328 5.328 0 01-.443-1.07c-.264-.826-.102-1.635.515-2.405.611-.761 1.376-1.136 2.28-1.124.905.012 1.838.41 2.82 1.199 1.135.91 1.79 2.013 1.98 3.305l-2.03.361c-.14-.7-.563-1.328-1.262-1.876-.822-.66-1.392-.793-1.71-.397-.165.206-.157.476.062.89.1.204.193.367.277.497.076.124.207.304.386.548.343.463.61.865.804 1.184.18.32.354.697.518 1.117.308.849.14 1.666-.477 2.435zm10.137-4.297l-1.687 2.102 2.292 1.84-1.29 1.607-2.292-1.84-2.94 3.662c-.435.54-.373 1.166.144 1.582.32.257.68.37 1.073.348l.228 1.823c-.99.344-2.159.083-3.11-.681-.724-.58-1.156-1.29-1.283-2.131-.134-.847.081-1.614.65-2.322l3.167-3.945-1.41-1.13 1.29-1.607 1.41 1.13 1.051-1.31 2.707.872zm8.291 19.092c-.617.77-1.411 1.134-2.367 1.093-.963-.034-1.955-.467-2.983-1.293-1.21-.972-1.947-2.176-2.208-3.614l2.022-.38c.201.825.714 1.575 1.528 2.229.853.685 1.597.881 1.915.485.3-.373-.013-.887-.732-1.865-.096-.114-.167-.197-.202-.262-.294-.399-.52-.756-.692-1.057a5.322 5.322 0 01-.444-1.07c-.263-.825-.102-1.635.516-2.404.61-.762 1.376-1.137 2.28-1.125.904.013 1.837.41 2.82 1.2 1.134.91 1.79 2.013 1.98 3.305l-2.031.36c-.14-.7-.562-1.327-1.261-1.876-.823-.66-1.393-.792-1.71-.396-.166.205-.157.475.062.889.099.204.193.368.276.498.076.123.207.303.387.548.342.462.609.864.803 1.183.181.32.354.698.518 1.117.308.849.14 1.666-.477 2.435zm9.477 6.244l-5.696-4.573c-.298.512-.331 1.099-.099 1.761.219.664.65 1.249 1.298 1.769.784.63 1.519.93 2.217.903l.223 2.032c-1.414.155-2.777-.3-4.104-1.378-1.31-1.052-2.064-2.296-2.261-3.72-.197-1.423.186-2.743 1.17-3.969.936-1.165 2.073-1.817 3.405-1.963 1.332-.145 2.577.253 3.757 1.2 1.173.942 1.827 2.093 1.96 3.44.127 1.355-.296 2.63-1.262 3.834a7.43 7.43 0 01-.608.664zm-4.443-6.072l3.541 2.843c.369-.443.517-.925.438-1.465-.086-.532-.374-1-.861-1.392a2.54 2.54 0 00-1.607-.589c-.59.002-1.089.203-1.51.603zM92.38 86.04l-.054 1.985c-.903.127-1.728-.11-2.466-.702-.693-.557-1.093-1.228-1.186-2.017-.094-.789.132-1.522.682-2.207l7.337-9.139 2.071 1.664-7.214 8.985c-.337.42-.284.9.135 1.236a.916.916 0 00.695.195zm4.706 3.778l-.054 1.986c-.903.126-1.727-.11-2.466-.703-.693-.556-1.093-1.228-1.186-2.017-.093-.788.132-1.522.682-2.207l7.337-9.138 2.071 1.663-7.214 8.986c-.336.418-.284.899.135 1.235a.917.917 0 00.695.195zm9.999 5.874l-5.696-4.573c-.298.512-.331 1.099-.099 1.761.219.664.651 1.249 1.298 1.769.784.63 1.519.931 2.217.903l.223 2.032c-1.414.155-2.777-.3-4.104-1.378-1.31-1.052-2.064-2.296-2.261-3.72-.197-1.422.186-2.743 1.17-3.969.936-1.165 2.073-1.817 3.405-1.963 1.332-.145 2.577.253 3.757 1.201 1.173.942 1.827 2.093 1.96 3.44.128 1.354-.296 2.63-1.262 3.833-.177.221-.375.437-.608.664zm-4.443-6.072l3.541 2.843c.369-.443.518-.925.438-1.465-.086-.532-.374-1-.861-1.392a2.54 2.54 0 00-1.607-.588 2.122 2.122 0 00-1.511.602zm5.319 11.985l-2.071-1.663 6.26-7.798 2.072 1.663-1.18 1.47c1.392-.548 2.855-.375 4.013.554l-1.602 1.995c-.8-.641-1.607-.977-2.409-1.007-.809-.023-1.457.27-1.94.872l-3.143 3.914z"
                          ></path>
                          <defs>
                            <filter
                              id="filter0_d_2157_3790"
                              width="124.657"
                              height="109.584"
                              x="0.095"
                              y="27.598"
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
                              <feOffset dy="4"></feOffset>
                              <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                              <feComposite
                                in2="hardAlpha"
                                operator="out"
                              ></feComposite>
                              <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
                              <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_2157_3790"
                              ></feBlend>
                              <feBlend
                                in="SourceGraphic"
                                in2="effect1_dropShadow_2157_3790"
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
