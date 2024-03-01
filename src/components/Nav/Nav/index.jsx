import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { updateFromRouter } from "../../../redux-saga-middleware/reducers/appReducer";
import {
  clickTab,
  openLoginDialog,
  showDropdown,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import { getAppType } from "../../../utils/helper";
import { images, navbar } from "../../../utils/images";
import "../Nav/Nav.scss";
import NavPromotionTablet from "./NavPromotionTablet";

export default function Navbar() {
  const { t } = useTranslation("navigation");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tablet, setTablet] = useState("");
  const { isNav, isDropdownNav, isNavTablet } = useSelector(
    (state) => state.authReducer
  );
  const { device } = useSelector((state) => state.deviceReducer);
  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const location = useLocation();
  const { pathname } = location;

  const toggleDropdown = () => {
    dispatch(showDropdown(false));
  };

  useEffect(() => {
    if (isNavTablet === false) {
      if (isNav === true) {
        setTablet("width-tablet");
      } else {
        setTablet("w");
      }
    }
  }, [isNavTablet, isNav]);

  const theme = useTheme();
  return (
    <Box style={{ height: `100%` }} className={`nav-section1 ${tablet}`}>
      <Box
        sx={{
          backgroundColor: "#2e233d",
          color: "#9485b8",
          height: `100%`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "9px",
          transitionDuration: "all 1s",
          paddingLeft: isNav === true ? "25px" : "7px",
          paddingRight: isNav === true ? "25px" : "7px",
          transition: " all ease 1s",
          overflow: "auto",
          paddingTop: "60px",
        }}
        className="nav-animate"
      >
        <Box className="mt-3">
          {getAppType() === "promote" ? (
            <Box>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  padding: "10px",
                  transition: "0.3s ease",
                  backgroundColor:
                    (pathname && pathname?.includes("home")) || pathname === "/"
                      ? "#7848ED"
                      : "",
                  borderRadius: "5px",
                  color:
                    (pathname && pathname?.includes("home")) || pathname === "/"
                      ? "white"
                      : "#A89CD7",
                  ":hover": {
                    backgroundColor: "#7848ED",
                  },
                }}
                onClick={() => {
                  navigate("/home");
                }}
                className="nav-home"
              >
                {(pathname && pathname?.includes("home")) ||
                pathname === "/" ? (
                  <>
                    {theme?.theme === "christmas" ? (
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="none"
                          viewBox="0 0 30 30"
                        >
                          <g filter="url(#filter0_d_7474_481425)">
                            <g>
                              <g>
                                <path
                                  fill="#E74B4A"
                                  d="M21.674 15.005l-6.677-6.677-6.677 6.677v9h13.354v-9z"
                                ></path>
                                <path
                                  fill="#C71818"
                                  d="M14.609 12.674a.58.58 0 00.678-.572v-.58a.583.583 0 00.767.55.605.605 0 00.395-.587.348.348 0 01.48-.32c.042.017.08.043.112.076l4.633 4.635v-.871l-6.677-6.677-6.677 6.677v9h13.354v-.872H17.9a8.709 8.709 0 01-8.631-7.558 1.168 1.168 0 01.332-.98l3.933-3.933a.346.346 0 01.592.242v1.162a.606.606 0 00.483.606v.002z"
                                ></path>
                                <path
                                  fill="#E74B4A"
                                  d="M18.773 7.164h2.903v5.516l-2.903-2.903V7.164z"
                                ></path>
                                <path
                                  fill="#C71818"
                                  d="M18.773 7.164h2.903v.58h-2.903v-.58z"
                                ></path>
                                <path
                                  fill="#C71818"
                                  d="M21.676 11.801v.871L18.773 9.77V8.9l2.903 2.902z"
                                ></path>
                                <path
                                  fill="#D37F6A"
                                  d="M20.516 21.672h1.16v2.322h-1.16v-2.322z"
                                ></path>
                                <path
                                  fill="#C67869"
                                  d="M20.516 21.672h1.16v.58h-1.16v-.58z"
                                ></path>
                                <path
                                  fill="#649C59"
                                  d="M23.418 21.673l-1.161-2.322h.87l-2.031-3.484-2.032 3.484h.87l-1.16 2.322h4.644z"
                                ></path>
                                <path
                                  fill="#458F33"
                                  d="M20.775 19.122l.133-.267a.26.26 0 00-.232-.375.26.26 0 01-.24-.16.259.259 0 01.017-.23l.97-1.663-.327-.56-2.032 3.484h.87l-1.16 2.322h4.644l-.435-.87h-1.17a1.16 1.16 0 01-1.038-1.681z"
                                ></path>
                                <path
                                  fill="#E3E3E3"
                                  d="M22.27 17.873a2.32 2.32 0 01-2.34 0l1.17-2.006 1.17 2.006z"
                                ></path>
                                <path
                                  fill="#CBCBCB"
                                  d="M21.425 16.427l-.97 1.664c0 .003-.003.003-.003.006a2.19 2.19 0 01-.522-.224l1.168-2.006.327.56z"
                                ></path>
                                <path
                                  fill="#D37F6A"
                                  d="M7.742 20.227h1.161v3.193a.58.58 0 11-1.16 0v-3.193z"
                                ></path>
                                <path
                                  fill="#E3E3E3"
                                  d="M8.256 18.803l.07.261.19-.19c.436-.436.68-1.026.68-1.642v-.32a2.312 2.312 0 00-2.298.324l.276.16c.533.307.922.813 1.082 1.407z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M8.062 18.994l.26.07-.069-.262a2.322 2.322 0 00-1.082-1.41l-.275-.158a2.286 2.286 0 00-.871 2.15l.275-.159a2.323 2.323 0 011.761-.231z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M8.511 18.875l-.19.19.26.07a2.32 2.32 0 001.763-.232l.275-.159a2.322 2.322 0 00-1.428-1.83v.32c0 .615-.244 1.206-.68 1.641z"
                                ></path>
                                <path
                                  fill="#E3E3E3"
                                  d="M8.131 19.254l.19-.191-.26-.07a2.32 2.32 0 00-1.763.232l-.275.16a2.322 2.322 0 001.428 1.83v-.32c0-.615.245-1.206.68-1.641z"
                                ></path>
                                <path
                                  fill="#E3E3E3"
                                  d="M10.643 19.063c-.001-.107-.01-.214-.025-.32l-.275.158a2.322 2.322 0 01-1.762.232l-.26-.07.069.262c.16.595.549 1.102 1.082 1.41l.275.159a2.318 2.318 0 00.896-1.83z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M8.394 19.324l-.07-.262-.19.191a2.322 2.322 0 00-.68 1.642v.32a2.311 2.311 0 002.297-.324l-.275-.16a2.322 2.322 0 01-1.082-1.407z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M14.997 17.61a2.905 2.905 0 012.903 2.902v3.484h-5.806v-3.484a2.903 2.903 0 012.903-2.903z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M17.9 23.13V24h-5.806v-3.094A8.645 8.645 0 0017.9 23.13z"
                                ></path>
                                <path
                                  fill="#E3E3E3"
                                  d="M17.87 20.119a.58.58 0 01-1.132-.182v.58a.58.58 0 01-1.16 0v-1.741a.58.58 0 01-1.162 0v1.161a.581.581 0 01-1.161 0v.58a.58.58 0 11-1.161 0 2.903 2.903 0 015.777-.398z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M15.002 15.883a.57.57 0 01-.386.533.593.593 0 01-.755-.34l-.11-.287-.226-.598-.254-.665-.017-.05a.576.576 0 00-.403-.354.518.518 0 00-.178-.017.58.58 0 00-.56.54.556.556 0 00.035.22.562.562 0 01.035.192.57.57 0 01-.386.534.594.594 0 01-.75-.337 1.611 1.611 0 01-.073-.254 1.56 1.56 0 01-.016-.58c.064-.406.275-.774.592-1.034.145-.127.313-.226.494-.293h.002a1.818 1.818 0 011.66.177c.299.199.528.485.657.819l.073.194.226.598.303.809a.574.574 0 01.037.194v-.001z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M19.067 14.673c0 .11-.013.22-.036.326a1.6 1.6 0 01-.073.255.593.593 0 01-.755.336.57.57 0 01-.384-.533.195.195 0 01.006-.058.434.434 0 01.029-.133.55.55 0 00-.025-.448.383.383 0 00-.03-.044v-.003a.575.575 0 00-.295-.235.608.608 0 00-.2-.036h-.018a.662.662 0 00-.134.02.575.575 0 00-.403.354l-.019.054-.254.665-.226.598-.11.287a.593.593 0 01-.754.34.562.562 0 01-.358-.71l.011-.02.305-.806.226-.598.073-.195c.13-.334.358-.62.656-.818a1.818 1.818 0 011.66-.179h.002c.18.067.348.167.494.293a1.673 1.673 0 01.612 1.288z"
                                ></path>
                                <path
                                  fill="#E3E3E3"
                                  d="M15 6l-9 9 .34.34a1.161 1.161 0 001.642 0l5.555-5.556a.346.346 0 01.591.244v1.161a.606.606 0 00.481.608.58.58 0 00.68-.572v-.58a.582.582 0 00.768.551.605.605 0 00.394-.588.347.347 0 01.59-.244l4.975 4.975a1.161 1.161 0 001.642 0l.34-.34L15 6z"
                                ></path>
                                <path
                                  fill="#fff"
                                  d="M14.998 6l-.435.435L23.126 15l-.34.34a1.16 1.16 0 01-.386.255 1.16 1.16 0 001.257-.255l.34-.34-9-8.999z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M12.97 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M15.29 12.971a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M17.032 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M9.486 15.58a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M11.517 17.323a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M19.064 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M12.97 16.745a.29.29 0 100-.581.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M17.322 17.034a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M10.353 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M19.93 16.159a.29.29 0 100-.581.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M10.93 21.963a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#EDB13E"
                                  d="M18.486 18.19a.29.29 0 100-.58.29.29 0 000 .58z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M14.657 14.88l-.907.906-.227-.598.908-.907.226.598z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M14.129 13.673l-.856.857-.018-.049a.574.574 0 00-.403-.354l.853-.854c.164.107.308.242.424.4z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M12.673 14.107a.58.58 0 00-.461.253.217.217 0 01-.067-.07l-.58-.871-.018-.032a1.59 1.59 0 01.493-.293h.003l.003.006.58.87a.304.304 0 01.047.137z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M12.18 14.983a.246.246 0 01-.081.012h-1.125a1.559 1.559 0 01-.016-.58h1.14c.025-.002.05.002.073.01a.556.556 0 00-.02.436c.015.04.025.08.029.122z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M16.472 15.191l-.226.598-.003-.003-.907-.907.226-.598.91.91z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M17.145 14.126a.575.575 0 00-.404.354l-.017.05-.857-.857c.116-.158.26-.293.424-.4l.854.853z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M18.453 13.388l-.018.032-.64.955a.606.606 0 00-.496-.271h-.018l.67-1.004a.009.009 0 00.004-.006h.003c.18.067.348.166.493.293l.002.001z"
                                ></path>
                                <path
                                  fill="#DB9014"
                                  d="M19.063 14.67c0 .11-.013.219-.037.326H17.82a.437.437 0 01.03-.133.55.55 0 00-.025-.449h1.219c.014.085.02.17.019.255z"
                                ></path>
                                <path
                                  fill="#E3E3E3"
                                  d="M18.776 6h2.903a.58.58 0 010 1.161h-2.903a.58.58 0 110-1.161z"
                                ></path>
                                <path
                                  fill="#fff"
                                  d="M21.674 6h-.58a.58.58 0 010 1.161h.58a.58.58 0 100-1.161z"
                                ></path>
                                <path
                                  fill="#CBCBCB"
                                  d="M19.066 6.58a.58.58 0 01.58-.58h-.87a.58.58 0 100 1.161h.87a.58.58 0 01-.58-.58z"
                                ></path>
                              </g>
                            </g>
                          </g>
                          <defs>
                            <filter
                              id="filter0_d_7474_481425"
                              width="30"
                              height="30.008"
                              x="0"
                              y="0"
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
                              <feOffset></feOffset>
                              <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                              <feComposite
                                in2="hardAlpha"
                                operator="out"
                              ></feComposite>
                              <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                              <feBlend
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_7474_481425"
                              ></feBlend>
                              <feBlend
                                in="SourceGraphic"
                                in2="effect1_dropShadow_7474_481425"
                                result="shape"
                              ></feBlend>
                            </filter>
                          </defs>
                        </svg>
                      </Box>
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navHomeActive}
                        sx={{
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {theme?.theme === "christmas" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 30 30"
                      >
                        <g filter="url(#filter0_d_7474_481425)">
                          <g>
                            <g>
                              <path
                                fill="#E74B4A"
                                d="M21.674 15.005l-6.677-6.677-6.677 6.677v9h13.354v-9z"
                              ></path>
                              <path
                                fill="#C71818"
                                d="M14.609 12.674a.58.58 0 00.678-.572v-.58a.583.583 0 00.767.55.605.605 0 00.395-.587.348.348 0 01.48-.32c.042.017.08.043.112.076l4.633 4.635v-.871l-6.677-6.677-6.677 6.677v9h13.354v-.872H17.9a8.709 8.709 0 01-8.631-7.558 1.168 1.168 0 01.332-.98l3.933-3.933a.346.346 0 01.592.242v1.162a.606.606 0 00.483.606v.002z"
                              ></path>
                              <path
                                fill="#E74B4A"
                                d="M18.773 7.164h2.903v5.516l-2.903-2.903V7.164z"
                              ></path>
                              <path
                                fill="#C71818"
                                d="M18.773 7.164h2.903v.58h-2.903v-.58z"
                              ></path>
                              <path
                                fill="#C71818"
                                d="M21.676 11.801v.871L18.773 9.77V8.9l2.903 2.902z"
                              ></path>
                              <path
                                fill="#D37F6A"
                                d="M20.516 21.672h1.16v2.322h-1.16v-2.322z"
                              ></path>
                              <path
                                fill="#C67869"
                                d="M20.516 21.672h1.16v.58h-1.16v-.58z"
                              ></path>
                              <path
                                fill="#649C59"
                                d="M23.418 21.673l-1.161-2.322h.87l-2.031-3.484-2.032 3.484h.87l-1.16 2.322h4.644z"
                              ></path>
                              <path
                                fill="#458F33"
                                d="M20.775 19.122l.133-.267a.26.26 0 00-.232-.375.26.26 0 01-.24-.16.259.259 0 01.017-.23l.97-1.663-.327-.56-2.032 3.484h.87l-1.16 2.322h4.644l-.435-.87h-1.17a1.16 1.16 0 01-1.038-1.681z"
                              ></path>
                              <path
                                fill="#E3E3E3"
                                d="M22.27 17.873a2.32 2.32 0 01-2.34 0l1.17-2.006 1.17 2.006z"
                              ></path>
                              <path
                                fill="#CBCBCB"
                                d="M21.425 16.427l-.97 1.664c0 .003-.003.003-.003.006a2.19 2.19 0 01-.522-.224l1.168-2.006.327.56z"
                              ></path>
                              <path
                                fill="#D37F6A"
                                d="M7.742 20.227h1.161v3.193a.58.58 0 11-1.16 0v-3.193z"
                              ></path>
                              <path
                                fill="#E3E3E3"
                                d="M8.256 18.803l.07.261.19-.19c.436-.436.68-1.026.68-1.642v-.32a2.312 2.312 0 00-2.298.324l.276.16c.533.307.922.813 1.082 1.407z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M8.062 18.994l.26.07-.069-.262a2.322 2.322 0 00-1.082-1.41l-.275-.158a2.286 2.286 0 00-.871 2.15l.275-.159a2.323 2.323 0 011.761-.231z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M8.511 18.875l-.19.19.26.07a2.32 2.32 0 001.763-.232l.275-.159a2.322 2.322 0 00-1.428-1.83v.32c0 .615-.244 1.206-.68 1.641z"
                              ></path>
                              <path
                                fill="#E3E3E3"
                                d="M8.131 19.254l.19-.191-.26-.07a2.32 2.32 0 00-1.763.232l-.275.16a2.322 2.322 0 001.428 1.83v-.32c0-.615.245-1.206.68-1.641z"
                              ></path>
                              <path
                                fill="#E3E3E3"
                                d="M10.643 19.063c-.001-.107-.01-.214-.025-.32l-.275.158a2.322 2.322 0 01-1.762.232l-.26-.07.069.262c.16.595.549 1.102 1.082 1.41l.275.159a2.318 2.318 0 00.896-1.83z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M8.394 19.324l-.07-.262-.19.191a2.322 2.322 0 00-.68 1.642v.32a2.311 2.311 0 002.297-.324l-.275-.16a2.322 2.322 0 01-1.082-1.407z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M14.997 17.61a2.905 2.905 0 012.903 2.902v3.484h-5.806v-3.484a2.903 2.903 0 012.903-2.903z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M17.9 23.13V24h-5.806v-3.094A8.645 8.645 0 0017.9 23.13z"
                              ></path>
                              <path
                                fill="#E3E3E3"
                                d="M17.87 20.119a.58.58 0 01-1.132-.182v.58a.58.58 0 01-1.16 0v-1.741a.58.58 0 01-1.162 0v1.161a.581.581 0 01-1.161 0v.58a.58.58 0 11-1.161 0 2.903 2.903 0 015.777-.398z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M15.002 15.883a.57.57 0 01-.386.533.593.593 0 01-.755-.34l-.11-.287-.226-.598-.254-.665-.017-.05a.576.576 0 00-.403-.354.518.518 0 00-.178-.017.58.58 0 00-.56.54.556.556 0 00.035.22.562.562 0 01.035.192.57.57 0 01-.386.534.594.594 0 01-.75-.337 1.611 1.611 0 01-.073-.254 1.56 1.56 0 01-.016-.58c.064-.406.275-.774.592-1.034.145-.127.313-.226.494-.293h.002a1.818 1.818 0 011.66.177c.299.199.528.485.657.819l.073.194.226.598.303.809a.574.574 0 01.037.194v-.001z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M19.067 14.673c0 .11-.013.22-.036.326a1.6 1.6 0 01-.073.255.593.593 0 01-.755.336.57.57 0 01-.384-.533.195.195 0 01.006-.058.434.434 0 01.029-.133.55.55 0 00-.025-.448.383.383 0 00-.03-.044v-.003a.575.575 0 00-.295-.235.608.608 0 00-.2-.036h-.018a.662.662 0 00-.134.02.575.575 0 00-.403.354l-.019.054-.254.665-.226.598-.11.287a.593.593 0 01-.754.34.562.562 0 01-.358-.71l.011-.02.305-.806.226-.598.073-.195c.13-.334.358-.62.656-.818a1.818 1.818 0 011.66-.179h.002c.18.067.348.167.494.293a1.673 1.673 0 01.612 1.288z"
                              ></path>
                              <path
                                fill="#E3E3E3"
                                d="M15 6l-9 9 .34.34a1.161 1.161 0 001.642 0l5.555-5.556a.346.346 0 01.591.244v1.161a.606.606 0 00.481.608.58.58 0 00.68-.572v-.58a.582.582 0 00.768.551.605.605 0 00.394-.588.347.347 0 01.59-.244l4.975 4.975a1.161 1.161 0 001.642 0l.34-.34L15 6z"
                              ></path>
                              <path
                                fill="#fff"
                                d="M14.998 6l-.435.435L23.126 15l-.34.34a1.16 1.16 0 01-.386.255 1.16 1.16 0 001.257-.255l.34-.34-9-8.999z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M12.97 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M15.29 12.971a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M17.032 12.096a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M9.486 15.58a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M11.517 17.323a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M19.064 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M12.97 16.745a.29.29 0 100-.581.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M17.322 17.034a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M10.353 23.128a.29.29 0 100-.581.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M19.93 16.159a.29.29 0 100-.581.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M10.93 21.963a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#EDB13E"
                                d="M18.486 18.19a.29.29 0 100-.58.29.29 0 000 .58z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M14.657 14.88l-.907.906-.227-.598.908-.907.226.598z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M14.129 13.673l-.856.857-.018-.049a.574.574 0 00-.403-.354l.853-.854c.164.107.308.242.424.4z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M12.673 14.107a.58.58 0 00-.461.253.217.217 0 01-.067-.07l-.58-.871-.018-.032a1.59 1.59 0 01.493-.293h.003l.003.006.58.87a.304.304 0 01.047.137z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M12.18 14.983a.246.246 0 01-.081.012h-1.125a1.559 1.559 0 01-.016-.58h1.14c.025-.002.05.002.073.01a.556.556 0 00-.02.436c.015.04.025.08.029.122z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M16.472 15.191l-.226.598-.003-.003-.907-.907.226-.598.91.91z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M17.145 14.126a.575.575 0 00-.404.354l-.017.05-.857-.857c.116-.158.26-.293.424-.4l.854.853z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M18.453 13.388l-.018.032-.64.955a.606.606 0 00-.496-.271h-.018l.67-1.004a.009.009 0 00.004-.006h.003c.18.067.348.166.493.293l.002.001z"
                              ></path>
                              <path
                                fill="#DB9014"
                                d="M19.063 14.67c0 .11-.013.219-.037.326H17.82a.437.437 0 01.03-.133.55.55 0 00-.025-.449h1.219c.014.085.02.17.019.255z"
                              ></path>
                              <path
                                fill="#E3E3E3"
                                d="M18.776 6h2.903a.58.58 0 010 1.161h-2.903a.58.58 0 110-1.161z"
                              ></path>
                              <path
                                fill="#fff"
                                d="M21.674 6h-.58a.58.58 0 010 1.161h.58a.58.58 0 100-1.161z"
                              ></path>
                              <path
                                fill="#CBCBCB"
                                d="M19.066 6.58a.58.58 0 01.58-.58h-.87a.58.58 0 100 1.161h.87a.58.58 0 01-.58-.58z"
                              ></path>
                            </g>
                          </g>
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_7474_481425"
                            width="30"
                            height="30.008"
                            x="0"
                            y="0"
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
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                            <feComposite
                              in2="hardAlpha"
                              operator="out"
                            ></feComposite>
                            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                            <feBlend
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_7474_481425"
                            ></feBlend>
                            <feBlend
                              in="SourceGraphic"
                              in2="effect1_dropShadow_7474_481425"
                              result="shape"
                            ></feBlend>
                          </filter>
                        </defs>
                      </svg>
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navHome}
                        sx={{
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    )}
                  </>
                )}

                <Typography
                  className="hover-nav"
                  style={{
                    display: isNav === true ? "block" : "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {t("Home")}
                </Typography>
              </Box>
              {device === "Tablet" && !isNav ? (
                <NavPromotionTablet
                  isNav={isNav}
                  isDropdownNav={isDropdownNav}
                  toggleDropdown={toggleDropdown}
                />
              ) : (
                <>
                  {" "}
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        isNav === true ? "space-between" : "center",
                      transition: "0.2s",
                      backgroundColor: isDropdownNav ? "#462A71" : "",
                      borderRadius: "5px",
                      padding: "10px",
                      marginTop: "16px",
                    }}
                    onClick={toggleDropdown}
                    className="nav-home"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        component={"img"}
                        src={
                          isDropdownNav
                            ? navbar.activeNavPromotion
                            : navbar.navPromotion
                        }
                        sx={{
                          width: "18px",
                          height: "18px",
                          marginRight: "8px",
                        }}
                      />
                      <Typography
                        className="hover-nav"
                        style={{
                          display: isNav === true ? "block" : "none",
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: "15px",
                          marginLeft: "5px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          color: isDropdownNav ? "#fff" : "",
                        }}
                      >
                        {t("Promotion")}
                      </Typography>
                      <Box sx={{ marginLeft: isNav && "18px" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="none"
                          viewBox="0 0 14 14"
                          style={{
                            transform:
                              isDropdownNav === true
                                ? "rotate(0deg)"
                                : "rotate(-88deg)",
                            transition: "all 0.3s",
                          }}
                        >
                          <g clipPath="url(#clip0_2059_14801)">
                            <g>
                              <g>
                                <path
                                  fill="#A89CD7"
                                  d="M6.997 8.348l5.238-5.237a.76.76 0 01.541-.223.76.76 0 01.542.223l.458.46a.76.76 0 01.224.54.76.76 0 01-.224.542L7.54 10.89a.76.76 0 01-.543.223.76.76 0 01-.543-.223l-6.23-6.23A.76.76 0 010 4.117a.76.76 0 01.224-.541l.458-.46a.767.767 0 011.083 0l5.232 5.232z"
                                ></path>
                              </g>
                            </g>
                          </g>
                          <defs>
                            <clipPath id="clip0_2059_14801">
                              <path
                                fill="#fff"
                                d="M0 0H14V14H0z"
                                transform="matrix(0 -1 -1 0 14 14)"
                              ></path>
                            </clipPath>
                          </defs>
                        </svg>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: isDropdownNav === true ? "block" : "none",
                      transition: "all 0.5s",
                    }}
                    className={`dropdown-content ${
                      isDropdownNav === true ? "show" : ""
                    }`}
                  >
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        marginLeft: "0px !important",
                        transition: "0.3s ease",
                        backgroundColor:
                          pathname &&
                          pathname?.includes("hot-promotion") &&
                          "#7848ED",
                        borderRadius: "5px",
                        color:
                          pathname && pathname?.includes("hot-promotion")
                            ? "white"
                            : "#A89CD7",
                        padding: "10px 10px 10px 15px",
                        ":hover": {
                          backgroundColor: "#7848ED",
                        },
                      }}
                      onClick={() => {
                        navigate("/hot-promotion");
                      }}
                      className="nav-home mt-3"
                    >
                      <Typography
                        className="hover-nav"
                        style={{
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: isNav ? "15px" : "13px",
                          marginLeft: "5px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {t("Hot")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                        transition: "0.3s ease",
                        backgroundColor:
                          pathname &&
                          pathname?.includes("ongoing-promotion") &&
                          "#7848ED",
                        borderRadius: "5px",

                        color:
                          pathname && pathname?.includes("ongoing-promotion")
                            ? "white"
                            : "#A89CD7",
                        padding: "10px 10px 10px 15px",
                        ":hover": {
                          backgroundColor: "#7848ED",
                        },
                      }}
                      onClick={() => {
                        navigate("/ongoing-promotion");
                      }}
                      className="nav-home mt-3"
                    >
                      <Typography
                        className="hover-nav"
                        style={{
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: isNav ? "15px" : "13px",
                          marginLeft: "5px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {t("Ongoing")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                        transition: "0.3s ease",
                        backgroundColor:
                          pathname &&
                          pathname?.includes("upcoming-promotion") &&
                          "#7848ED",
                        borderRadius: "5px",
                        color:
                          pathname && pathname?.includes("upcoming-promotion")
                            ? "white"
                            : "#A89CD7",
                        padding: "10px 10px 10px 15px",
                        ":hover": {
                          backgroundColor: "#7848ED",
                        },
                      }}
                      onClick={() => {
                        navigate("/upcoming-promotion");
                      }}
                      className="nav-home mt-3"
                    >
                      <Typography
                        className="hover-nav"
                        style={{
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: isNav ? "15px" : "13px",
                          marginLeft: "5px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {t("Upcoming")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                        transition: "0.3s ease",
                        backgroundColor:
                          pathname &&
                          pathname?.includes("ended-promotion") &&
                          "#7848ED",
                        borderRadius: "5px",
                        color:
                          pathname && pathname?.includes("ended-promotion")
                            ? "white"
                            : "#A89CD7",
                        padding: "10px 10px 10px 15px",

                        ":hover": {
                          backgroundColor: "#7848ED",
                        },
                      }}
                      onClick={() => {
                        navigate("/ended-promotion");
                      }}
                      className="nav-home mt-2"
                    >
                      <Typography
                        className="hover-nav"
                        style={{
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: isNav ? "15px" : "13px",
                          marginLeft: "5px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {t("Ended")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                        transition: "0.3s ease",
                        backgroundColor:
                          pathname &&
                          pathname?.includes("joined-promotion") &&
                          "#7848ED",
                        borderRadius: "5px",
                        color:
                          pathname && pathname?.includes("joined-promotion")
                            ? "white"
                            : "#A89CD7",
                        padding: "10px 10px 10px 15px",

                        ":hover": {
                          backgroundColor: "#7848ED",
                        },
                      }}
                      onClick={() => {
                        if (token) {
                          navigate("/joined-promotion");
                        } else {
                          dispatch(openLoginDialog());
                        }
                      }}
                      className="nav-home mt-2"
                    >
                      <Typography
                        className="hover-nav"
                        style={{
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: isNav ? "15px" : "13px",
                          marginLeft: "5px",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {t("Joined")}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}

              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "0.4s ease",
                  ":hover": {
                    backgroundColor: "#7848ED",
                  },
                  backgroundColor:
                    pathname && pathname?.includes("package") ? "#7848ED" : "",
                  borderRadius: "5px",
                  padding: "10px 5px",
                  marginTop: "16px",
                }}
                onClick={() => {
                  navigate("/packages");
                  dispatch(updateFromRouter(location.pathname));
                }}
                className="nav-home"
              >
                {pathname && pathname?.includes("packages") ? (
                  <>
                    {theme?.theme === "christmas" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 30 30"
                      >
                        <g filter="url(#filter0_d_7474_481490)">
                          <g>
                            <g>
                              <g>
                                <path
                                  fill="#C22026"
                                  d="M23.436 20.05L15 23.995v-9.503l8.436-3.384v8.94z"
                                ></path>
                                <path
                                  fill="#EB2335"
                                  d="M6.563 20.05l8.436 3.946v-9.503l-8.437-3.384v8.94z"
                                ></path>
                                <path
                                  fill="#007145"
                                  d="M24 12.321l-9 3.947v-3.462l9-3.665v3.18z"
                                ></path>
                                <path
                                  fill="#008A55"
                                  d="M6 12.321l9 3.947v-3.462L6 9.14v3.18z"
                                ></path>
                                <path
                                  fill="#00C477"
                                  d="M6 9.14L15 6l9 3.14-9 3.665-9-3.666z"
                                ></path>
                                <path
                                  fill="#FFAA39"
                                  d="M20.208 13.984v7.581l-1.411.66v-7.622l1.41-.619z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M20.208 10.688v3.299l-1.411.618v-3.343l1.41-.575z"
                                ></path>
                                <path
                                  fill="#FAF180"
                                  d="M20.204 10.683l-1.411.574-8.621-3.575 1.216-.424 8.816 3.425z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M9.797 13.984v7.581l1.41.66v-7.622l-1.41-.619z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M9.797 10.688v3.299l1.41.618v-3.343l-1.41-.575z"
                                ></path>
                                <path
                                  fill="#FAF180"
                                  d="M9.797 10.683l1.41.574 8.622-3.575-1.216-.424-8.816 3.425z"
                                ></path>
                                <path
                                  fill="#000"
                                  d="M23.434 12.57v.768l-8.436 3.89-8.435-3.89v-.768l8.435 3.7 8.436-3.7z"
                                  opacity="0.3"
                                ></path>
                              </g>
                              <g>
                                <path
                                  fill="#000"
                                  d="M18.116 8.336c-1.23 0-2.112.57-2.597.992a.925.925 0 00-1.044 0c-.485-.422-1.368-.992-2.597-.992-2.186 0-2.096.811-2.096 1.175 0 .271.341 1.02 1.81 1.02.916 0 1.943-.155 2.787-.503.133.15.36.248.618.248s.485-.099.618-.248c.844.348 1.872.503 2.787.503 1.469 0 1.81-.75 1.81-1.02 0-.364.09-1.175-2.096-1.175z"
                                  opacity="0.3"
                                ></path>
                                <path
                                  fill="#EB2335"
                                  d="M15.086 9.229s1.08-2.143 3.029-2.143c2.186 0 2.096 1.212 2.096 1.755 0 .405-.341 1.523-1.81 1.523-1.117 0-2.4-.341-3.315-1.135z"
                                ></path>
                                <path
                                  fill="#C22026"
                                  d="M19.328 8.957c.507.195.568.895.095 1.165-.257.147-.59.244-1.023.244-.807 0-1.7-.178-2.478-.576.512-.517 1.25-1.017 2.191-1.017.525 0 .92.07 1.215.184z"
                                ></path>
                                <path
                                  fill="#7D121C"
                                  d="M18.4 10.142a5.4 5.4 0 01-2.08-.414C16.88 9.245 17.48 9 18.113 9c.424 0 .775.047 1.055.14.379.128.42.655.06.83a1.85 1.85 0 01-.827.172z"
                                ></path>
                                <path
                                  fill="#EB2335"
                                  d="M14.907 9.229s-1.08-2.143-3.029-2.143c-2.186 0-2.096 1.212-2.096 1.755 0 .405.341 1.523 1.81 1.523 1.117 0 2.4-.341 3.315-1.135z"
                                ></path>
                                <path
                                  fill="#C22026"
                                  d="M10.668 8.958c-.508.195-.568.895-.096 1.165.257.147.591.244 1.023.244.809 0 1.7-.178 2.478-.576-.511-.517-1.25-1.018-2.191-1.018-.525 0-.919.07-1.214.185z"
                                ></path>
                                <path
                                  fill="#7D121C"
                                  d="M11.592 10.142a5.4 5.4 0 002.08-.414C13.113 9.245 12.512 9 11.88 9c-.423 0-.775.047-1.054.14-.379.128-.422.655-.061.83.21.104.481.172.828.172z"
                                ></path>
                                <path
                                  fill="#FAF180"
                                  d="M14.995 10.242c.536 0 .97-.486.97-1.086 0-.6-.434-1.086-.97-1.086-.537 0-.972.486-.972 1.086 0 .6.435 1.086.972 1.086z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M15.966 9.159c0 .597-.435 1.086-.971 1.086-.537 0-.972-.487-.972-1.086 0-.043.003-.085.007-.128.056.54.467.959.965.959.497 0 .908-.419.964-.959.005.043.007.085.007.128z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_7474_481490"
                            width="30"
                            height="30"
                            x="0"
                            y="0"
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
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                            <feComposite
                              in2="hardAlpha"
                              operator="out"
                            ></feComposite>
                            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                            <feBlend
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_7474_481490"
                            ></feBlend>
                            <feBlend
                              in="SourceGraphic"
                              in2="effect1_dropShadow_7474_481490"
                              result="shape"
                            ></feBlend>
                          </filter>
                        </defs>
                      </svg>
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navPackageActive}
                        sx={{
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {theme?.theme === "christmas" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 30 30"
                      >
                        <g filter="url(#filter0_d_7474_481490)">
                          <g>
                            <g>
                              <g>
                                <path
                                  fill="#C22026"
                                  d="M23.436 20.05L15 23.995v-9.503l8.436-3.384v8.94z"
                                ></path>
                                <path
                                  fill="#EB2335"
                                  d="M6.563 20.05l8.436 3.946v-9.503l-8.437-3.384v8.94z"
                                ></path>
                                <path
                                  fill="#007145"
                                  d="M24 12.321l-9 3.947v-3.462l9-3.665v3.18z"
                                ></path>
                                <path
                                  fill="#008A55"
                                  d="M6 12.321l9 3.947v-3.462L6 9.14v3.18z"
                                ></path>
                                <path
                                  fill="#00C477"
                                  d="M6 9.14L15 6l9 3.14-9 3.665-9-3.666z"
                                ></path>
                                <path
                                  fill="#FFAA39"
                                  d="M20.208 13.984v7.581l-1.411.66v-7.622l1.41-.619z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M20.208 10.688v3.299l-1.411.618v-3.343l1.41-.575z"
                                ></path>
                                <path
                                  fill="#FAF180"
                                  d="M20.204 10.683l-1.411.574-8.621-3.575 1.216-.424 8.816 3.425z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M9.797 13.984v7.581l1.41.66v-7.622l-1.41-.619z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M9.797 10.688v3.299l1.41.618v-3.343l-1.41-.575z"
                                ></path>
                                <path
                                  fill="#FAF180"
                                  d="M9.797 10.683l1.41.574 8.622-3.575-1.216-.424-8.816 3.425z"
                                ></path>
                                <path
                                  fill="#000"
                                  d="M23.434 12.57v.768l-8.436 3.89-8.435-3.89v-.768l8.435 3.7 8.436-3.7z"
                                  opacity="0.3"
                                ></path>
                              </g>
                              <g>
                                <path
                                  fill="#000"
                                  d="M18.116 8.336c-1.23 0-2.112.57-2.597.992a.925.925 0 00-1.044 0c-.485-.422-1.368-.992-2.597-.992-2.186 0-2.096.811-2.096 1.175 0 .271.341 1.02 1.81 1.02.916 0 1.943-.155 2.787-.503.133.15.36.248.618.248s.485-.099.618-.248c.844.348 1.872.503 2.787.503 1.469 0 1.81-.75 1.81-1.02 0-.364.09-1.175-2.096-1.175z"
                                  opacity="0.3"
                                ></path>
                                <path
                                  fill="#EB2335"
                                  d="M15.086 9.229s1.08-2.143 3.029-2.143c2.186 0 2.096 1.212 2.096 1.755 0 .405-.341 1.523-1.81 1.523-1.117 0-2.4-.341-3.315-1.135z"
                                ></path>
                                <path
                                  fill="#C22026"
                                  d="M19.328 8.957c.507.195.568.895.095 1.165-.257.147-.59.244-1.023.244-.807 0-1.7-.178-2.478-.576.512-.517 1.25-1.017 2.191-1.017.525 0 .92.07 1.215.184z"
                                ></path>
                                <path
                                  fill="#7D121C"
                                  d="M18.4 10.142a5.4 5.4 0 01-2.08-.414C16.88 9.245 17.48 9 18.113 9c.424 0 .775.047 1.055.14.379.128.42.655.06.83a1.85 1.85 0 01-.827.172z"
                                ></path>
                                <path
                                  fill="#EB2335"
                                  d="M14.907 9.229s-1.08-2.143-3.029-2.143c-2.186 0-2.096 1.212-2.096 1.755 0 .405.341 1.523 1.81 1.523 1.117 0 2.4-.341 3.315-1.135z"
                                ></path>
                                <path
                                  fill="#C22026"
                                  d="M10.668 8.958c-.508.195-.568.895-.096 1.165.257.147.591.244 1.023.244.809 0 1.7-.178 2.478-.576-.511-.517-1.25-1.018-2.191-1.018-.525 0-.919.07-1.214.185z"
                                ></path>
                                <path
                                  fill="#7D121C"
                                  d="M11.592 10.142a5.4 5.4 0 002.08-.414C13.113 9.245 12.512 9 11.88 9c-.423 0-.775.047-1.054.14-.379.128-.422.655-.061.83.21.104.481.172.828.172z"
                                ></path>
                                <path
                                  fill="#FAF180"
                                  d="M14.995 10.242c.536 0 .97-.486.97-1.086 0-.6-.434-1.086-.97-1.086-.537 0-.972.486-.972 1.086 0 .6.435 1.086.972 1.086z"
                                ></path>
                                <path
                                  fill="#FFC943"
                                  d="M15.966 9.159c0 .597-.435 1.086-.971 1.086-.537 0-.972-.487-.972-1.086 0-.043.003-.085.007-.128.056.54.467.959.965.959.497 0 .908-.419.964-.959.005.043.007.085.007.128z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_7474_481490"
                            width="30"
                            height="30"
                            x="0"
                            y="0"
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
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                            <feComposite
                              in2="hardAlpha"
                              operator="out"
                            ></feComposite>
                            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.733333 0 0 0 0 0.2 0 0 0 0.6 0"></feColorMatrix>
                            <feBlend
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_7474_481490"
                            ></feBlend>
                            <feBlend
                              in="SourceGraphic"
                              in2="effect1_dropShadow_7474_481490"
                              result="shape"
                            ></feBlend>
                          </filter>
                        </defs>
                      </svg>
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navPackage}
                        sx={{
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    )}
                  </>
                )}
                <Typography
                  className="hover-nav"
                  style={{
                    display: isNav === true ? "block" : "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    marginLeft: "5px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    color:
                      pathname && pathname?.includes("packages") && "white",
                    paddingLeft: "6px",
                  }}
                >
                  {t("Packages")}
                </Typography>
              </Box>
            </Box>
          ) : (
            ""
          )}
          {getAppType() && getAppType() === "promote" ? (
            ""
          ) : (
            <Box className="nav-pages">
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
                className=" pt-2 pb-2"
                onClick={() => {
                  if (!token) {
                    dispatch(clickTab("login"));

                    dispatch(toggleLoginDialog());
                  } else {
                    navigate("/game-type/favorite");
                  }
                }}
              >
                <img
                  src={images.favoriteIcon}
                  alt="..."
                  className="p-1 me-1"
                  width={28}
                  height="auto"
                />
                <Typography
                  className="hover-nav"
                  style={{
                    display: isNav === true ? "block" : "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    marginLeft: "5px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  Favorite Games
                </Typography>
              </Box>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
                className=" pt-2 pb-2"
                onClick={() => {
                  navigate("/game-type/pvp");
                }}
              >
                <img
                  src={images.pvpicon}
                  alt="..."
                  className="p-1 me-1"
                  width={28}
                  height="auto"
                />
                <Typography
                  className="hover-nav"
                  style={{
                    display: isNav === true ? "block" : "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    marginLeft: "5px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  PVP Games
                </Typography>
              </Box>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                }}
                className=" pt-2 pb-2"
                onClick={() => {
                  navigate("/game-type/free");
                }}
              >
                <img
                  src={images.playicon}
                  alt="..."
                  className="p-1 me-1"
                  width={28}
                  height={"auto"}
                />
                <Typography
                  className="hover-nav"
                  style={{
                    display: isNav === true ? "block" : "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    marginLeft: "5px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  Free Games
                </Typography>
              </Box>
            </Box>
          )}

          {getAppType() && getAppType() === "promote" ? (
            ""
          ) : (
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              }}
              className="nav-game-log pt-2 pb-2"
              onClick={() => {
                if (!token) {
                  dispatch(clickTab("login"));

                  dispatch(toggleLoginDialog());
                } else {
                  socket?.emit("getGameLog");
                  dispatch(toggleGameLogDialog());
                }
              }}
            >
              <img
                src={images.gamelogicon}
                alt="..."
                className="p-1 me-1"
                width={26}
                height="auto"
              />
              <Typography
                className="hover-nav"
                style={{
                  display: isNav === true ? "block" : "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  marginLeft: "5px",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Game Logs
              </Typography>
            </Box>
          )}
          {getAppType() === "promote" ? (
            <Box
              className="cursor-pointer"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                transition: "0.4s ease",
                ":hover": {
                  backgroundColor: "#7848ED",
                },
                backgroundColor:
                  pathname && pathname?.includes("help-center")
                    ? "#7848ED"
                    : "",

                borderRadius: "5px",
                padding: "10px 5px",
                marginTop: "16px",
              }}
              onClick={() => {
                dispatch({
                  type: "SET_TAB_HELPCENTER",
                  payload: 3,
                });
                navigate(`/help-center`);
              }}
            >
              {pathname && pathname?.includes("help-center") ? (
                <Box
                  component={"img"}
                  src={navbar.navHelpCenterActive}
                  sx={{ width: "18px", height: "18px" }}
                />
              ) : (
                <Box
                  component={"img"}
                  src={navbar.navHelpCenter}
                  sx={{ width: "18px", height: "18px" }}
                />
              )}

              <Typography
                className="hover-nav"
                style={{
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  marginLeft: "5px",
                  display: isNav === true ? "block" : "none",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  color:
                    pathname && pathname?.includes("help-center") && "white",
                  paddingLeft: "5px",
                }}
              >
                How it Works
              </Typography>
            </Box>
          ) : (
            <Box
              className="cursor-pointer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              }}
              onClick={() => {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="28"
                fill="none"
                viewBox="0 0 18 18"
                className="p-1 me-1"
              >
                <g
                  stroke="#A89CD7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                >
                  <path
                    strokeMiterlimit="10"
                    d="M12.75 13.822h-3l-3.338 2.22a.75.75 0 01-1.162-.622v-1.598c-2.25 0-3.75-1.5-3.75-3.75v-4.5c0-2.25 1.5-3.75 3.75-3.75h7.5c2.25 0 3.75 1.5 3.75 3.75v4.5c0 2.25-1.5 3.75-3.75 3.75z"
                  ></path>
                  <path d="M9 8.52v-.158c0-.51.315-.78.63-.997.307-.21.615-.48.615-.975 0-.69-.555-1.245-1.245-1.245-.69 0-1.245.555-1.245 1.245m1.241 3.922h.008"></path>
                </g>
              </svg>
              <Typography
                className="hover-nav"
                style={{
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  marginLeft: "5px",
                  display: isNav === true ? "block" : "none",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                FAQs
              </Typography>
            </Box>
          )}
          {getAppType() === "promote" ? (
            <Box
              component={"a"}
              className="cursor-pointer"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                transition: "0.4s ease",
                ":hover": {
                  backgroundColor: "#7848ED",
                  color: "#A89CD7",
                },
                backgroundColor:
                  pathname && pathname?.includes("support") ? "#7848ED" : "",
                borderRadius: "5px",
                padding: "10px 5px",
                marginTop: "16px",
                textDecoration: "none",
                color: "#A89CD7",
              }}
              // onClick={() => {
              //   if (window?.FB && window?.FB?.CustomerChat) {
              //     window.FB.CustomerChat.show(true);
              //   }
              // }}
              href="mailto:support@play4promo.com"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 18 18"
                style={{}}
              >
                <g>
                  <g>
                    <g>
                      <mask id="path-1-inside-1_6207_38031" fill="#fff">
                        <path d="M14.272 16.948v.403c-.007.583-.353.792-.884.531-.514-.252-1.019-.524-1.54-.759a1.83 1.83 0 00-.698-.167c-1.007-.018-2.015-.007-3.022-.008-1.126 0-1.76-.627-1.764-1.759-.005-1.725 0-3.444 0-5.166v-.427c-.5-.064-.93-.066-1.328.294-.432.39-.931.707-1.395 1.064-.21.16-.43.253-.68.128-.25-.125-.3-.363-.29-.627.011-.279 0-.56 0-.892h-1.02C.674 9.556 0 8.883 0 7.901v-6.22C0 .66.669 0 1.703 0h8.223c1.053 0 1.701.636 1.715 1.704.014 1.253.011 2.507.015 3.76v1.934c.162.007.297.019.43.019H16.2c1.182 0 1.801.62 1.801 1.79v6.046c0 1.026-.664 1.688-1.692 1.69-.665.005-1.33.005-2.036.005zM3.746 9.544c.357-.267.685-.494.99-.743.241-.205.55-.31.866-.297 1.453.018 2.905.012 4.358.01.45 0 .644-.184.644-.638a1224.05 1224.05 0 00-.019-6.151c0-.495-.191-.67-.688-.67H1.711c-.427 0-.654.18-.654.558a1120.99 1120.99 0 000 6.326c0 .36.21.559.572.568.352.01.703 0 1.055 0 .985.002.985.002 1.062 1.037zm3.707.025a1.011 1.011 0 00-.03.148c0 1.862-.007 3.724 0 5.59 0 .402.211.585.623.587.797.004 1.597.046 2.389-.01.908-.064 1.736.104 2.5.595.082.046.167.085.255.119.087-.595.209-.698.798-.698.773 0 1.546.003 2.32 0 .445 0 .637-.197.638-.646l.002-6.122c0-.455-.181-.654-.628-.654a405.21 405.21 0 00-4.497.004c-.101 0-.251.076-.298.162-.352.658-.888.951-1.633.931-.805-.023-1.611-.006-2.438-.006h-.001z"></path>
                      </mask>
                      <path
                        fill="#A89CD7"
                        d="M14.272 16.948v-1h-1v1h1zm0 .403l1 .011v-.01h-1zm-.884.531l.44-.897-.44.897zm-1.54-.759l-.42.908.01.005.41-.913zm-.698-.167l.039-1H11.168l-.018 1zm-3.022-.008v-1 1zm-1.764-1.759l-1 .003 1-.003zm0-5.593h1v-.881l-.874-.111-.126.992zm-1.328.294l.67.742h.002l-.672-.742zm-1.395 1.064l.61.793-.61-.793zm-.97-.498l1 .04v-.002l-1-.038zm0-.893h1v-1h-1v1zm-1.02 0l-.008 1h.008v-1zm9.99-7.86l1-.011-1 .012zm.015 3.761h1v-.002l-1 .002zm0 1.934h-1v.953l.952.046.048-1zm4.652 9.545l-.002-1H16.3l.008 1zM3.746 9.544l-.997.075.137 1.82 1.46-1.095-.6-.8zm.99-.743l.632.775.007-.006.008-.006-.647-.763zm.866-.297l-.042.999h.03l.012-1zm4.358.01v-1 1zm.644-.638h1-1zm-.019-6.151h-1v.005l1-.005zm-.688-.67l.001-1v1zm-8.84.558l1 .003v-.003h-1zm0 6.326h1v-.003l-1 .003zm.572.568l-.026 1h.001l.025-1zm1.055 0l.002-1h-.002v1zM7.453 9.57v-1h-.755l-.207.726.962.274zm-.03.148L6.43 9.59l-.008.063v.064h1zm0 5.59h1v-.004l-1 .004zm.623.587l.006-1H8.05l-.005 1zm2.389-.01l.07.998-.07-.998zm2.5.595l-.539.842.024.015.025.014.49-.871zm.255.119l-.355.935 1.163.442.181-1.232-.99-.145zm.798-.698v-1 1zm2.32 0v-1h-.004l.004 1zm.638-.646l1 .001-1-.001zm-.626-6.776l-.004 1h.004v-1zm-4.497.004v1h.006l-.006-1zm-.298.162l-.878-.48-.004.008.882.471zm-1.633.931l-.03 1h.003l.027-1zm3.38 7.373V17.351h2v-.001-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.002-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.002-.002-.001-.002-.001-.001-.001-.002-.001-.002-.001-.002-.002-.001-.002-.001-.002-.001-.002-.001-.002-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.001-.002-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.002-.001-.001-.002-.001-.001-.001-.001-.002-.001-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001V17 17v-.001-.002-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.001-.002-.002-.002-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001h-2zm0 .392c-.002.14-.04-.096.24-.264.272-.164.453-.024.317-.091l-.882 1.795c.395.194 1.015.36 1.595.01.587-.353.725-.984.73-1.428l-2-.022zm.556-.355c-.463-.228-1.033-.532-1.57-.774l-.82 1.825c.505.226.945.467 1.51.744l.88-1.796zm-1.56-.77a2.832 2.832 0 00-1.08-.258l-.077 1.998c.11.004.217.03.317.076l.84-1.815zm-1.1-.26c-1.018-.017-2.047-.006-3.04-.007v2c1.022 0 2.009-.01 3.004.008l.036-2zm-3.04-.007c-.382 0-.537-.103-.598-.164-.06-.06-.165-.214-.166-.598l-2 .006c.003.749.217 1.474.756 2.01.538.536 1.263.746 2.008.746v-2zm-.764-.762c-.005-1.723 0-3.436 0-5.163h-2c0 1.718-.005 3.443 0 5.17l2-.007zm0-5.163v-.427h-2v.427h2zm-.874-1.42c-.556-.07-1.382-.127-2.125.546l1.343 1.482a.196.196 0 01.118-.06c.069-.012.181-.013.412.017l.252-1.984zm-2.124.545c-.402.363-.765.575-1.335 1.013l1.22 1.585c.358-.275.993-.696 1.456-1.114L4.366 9.148zm-1.334 1.013c-.055.042-.034.013.046-.007a.506.506 0 01.33.033l-.894 1.79c.342.17.702.202 1.04.12.306-.075.541-.231.696-.35l-1.218-1.586zm.375.026a.522.522 0 01.242.268c.03.08.018.114.021.041l-1.998-.081c-.008.191 0 .477.115.772.13.329.372.613.727.79l.893-1.79zm.264.307c.011-.302 0-.65 0-.93h-2c0 .385.01.596.001.853l1.999.077zm-1-1.93H2.67h-.002-.002-.002-.002-.002-.002-.002H2.642 2.64h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.603h-.002H2.6h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.015-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.019-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.404h-.002H2.4h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.3h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.2h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.134 2.13h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.017-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2h-.002-.002-.002-.002-.002-.002-.002-.002H1.97h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.908h-.002-.002-.002H1.9h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.851h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.8h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.752h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.702 1.7h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.655h-.002-.002v2H2.67v-2zm-1.013 0c-.255-.002-.406-.087-.49-.172C1.084 8.308 1 8.158 1 7.902h-2c0 .726.254 1.403.75 1.902.497.498 1.172.754 1.893.76l.015-2zM1 7.9V7.89v-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012V7.5v-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V7.1v-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012V6.6 6.59v-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V6.2v-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V5.8v-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V5.3 5.29v-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V4.9v-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V4.5v-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V3.6v-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V3.2v-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V2.3v-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012V1.9v-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012h-2V7.901h2zm0-6.22c0-.287.09-.436.166-.512.078-.077.235-.169.537-.169v-2C.97-1 .276-.762-.24-.254-.755.256-1 .947-1 1.68h2zM1.703 1h8.223v-2H1.703v2zm8.223 0c.324 0 .475.094.544.162.069.068.167.22.17.554l2-.025c-.008-.734-.241-1.434-.763-1.95C11.355-.776 10.655-1 9.927-1v2zm.715.716c.014 1.247.011 2.49.015 3.751l2-.005c-.004-1.247 0-2.51-.015-3.77l-2 .024zm.015 3.748V7.398h2v-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003V7.3v-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004V7v-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004V6.9v-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004V6.5v-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003V6.4v-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004V6.3v-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004V6.2v-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004V5.9v-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003V5.8v-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003V5.7v-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004V5.6v-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004h-2zm.952 2.933c.114.005.314.02.479.02v-2c-.103 0-.173-.008-.383-.018l-.096 1.998zm.479.02H16.199v-2H12.087v2zm4.112 0c.425 0 .583.11.638.165.055.054.163.208.163.626h2c0-.754-.201-1.495-.751-2.043s-1.293-.748-2.05-.748v2zm.801.79V15.254h2v-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012V14v-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012h-2zm0 6.046c0 .293-.09.445-.167.521-.077.077-.23.168-.527.169l.004 2c.732-.002 1.424-.242 1.936-.753.512-.512.754-1.204.754-1.937h-2zm-.7.69c-.66.005-1.321.005-2.028.005v2c.705 0 1.374 0 2.044-.005l-.016-2zM4.346 10.344c.316-.236.698-.504 1.022-.768l-1.264-1.55c-.286.233-.56.42-.958.718l1.2 1.6zm1.037-.78a.257.257 0 01.177-.061l.085-1.998a2.257 2.257 0 00-1.556.534l1.294 1.525zm.207-.06c1.46.018 2.923.012 4.37.01v-2c-1.458.002-2.902.008-4.345-.01l-.025 2zm4.37.01c.331 0 .812-.063 1.192-.435.383-.377.452-.862.452-1.203h-2c0 .113-.028-.053.146-.224.17-.167.33-.138.21-.138v2zm1.644-1.638c-.001-2.053-.007-4.106-.019-6.157l-2 .011c.012 2.048.018 4.097.02 6.147l2-.001zm-.019-6.151c0-.337-.057-.85-.465-1.242-.397-.381-.902-.428-1.222-.429l-.002 2c.072 0 .08.008.052 0a.522.522 0 01-.214-.129.543.543 0 01-.145-.227c-.011-.038-.004-.04-.004.027h2zM9.897.055H6.171v2H9.897v-2zm-3.726 0H1.711v2H6.171v-2zm-4.46 0C1.38.054.944.12.581.425.185.76.057 1.216.057 1.613h2a.36.36 0 01-.029.124.567.567 0 01-.16.221c-.144.12-.252.096-.157.096v-2zM.057 1.61C.051 3.72.051 5.83.057 7.942l2-.006c-.006-2.107-.006-4.214 0-6.32l-2-.006zm0 6.329c0 .375.114.8.45 1.13.329.322.744.429 1.096.438l.053-2c-.01 0 .118.003.252.134.14.138.15.283.15.298h-2zm1.547 1.568c.366.01.764 0 1.08 0v-2c-.388 0-.693.01-1.03 0l-.05 2zm1.078 0c.126 0 .222 0 .304.003.082.002.127.005.151.008h.003a.613.613 0 01-.16-.068.692.692 0 01-.267-.303.332.332 0 01-.014-.04l.003.017c.006.032.013.085.021.173.009.087.016.19.026.322l1.995-.15c-.018-.236-.036-.492-.074-.701-.037-.204-.122-.558-.416-.845-.304-.297-.668-.366-.883-.392-.21-.024-.464-.023-.685-.024l-.004 2zm3.81-.212a2.01 2.01 0 00-.061.295l1.984.254v-.002L6.49 9.295zm-.07.422c0 1.857-.006 3.726 0 5.594l2-.008c-.006-1.863 0-3.718 0-5.586h-2zm0 5.59c0 .37.101.829.48 1.178.362.335.808.408 1.14.41l.009-2c-.08-.001.054-.02.207.12.17.158.165.324.165.292h-2zm1.62 1.587c.733.004 1.62.047 2.462-.012l-.139-1.995c-.743.051-1.455.012-2.313.007l-.01 2zm2.463-.012c.73-.051 1.335.082 1.891.439l1.08-1.684c-.975-.625-2.024-.827-3.111-.75l.14 1.995zm1.94.468c.125.07.255.132.39.183l.71-1.87a.88.88 0 01-.118-.056l-.982 1.743zm1.734-.607c.01-.061.017-.105.024-.136.006-.031.01-.041.009-.037a.542.542 0 01-.155.21.548.548 0 01-.235.126l.033-.003c.03-.002.074-.003.134-.003l-.002-2c-.255 0-.81-.005-1.243.372-.43.374-.506.922-.544 1.18l1.98.291zm-.19.157c.767 0 1.547.003 2.322 0l-.007-2c-.771.003-1.537 0-2.316 0v2zm2.319 0c.345 0 .824-.073 1.198-.453.37-.375.44-.852.44-1.192l-2-.003c0 .11-.028-.044.135-.209.167-.168.327-.143.227-.143v2zm1.638-1.645l.002-6.123h-2c0 2.039 0 4.08-.002 6.121l2 .002zm.002-6.123c0-.328-.06-.805-.42-1.186-.374-.393-.86-.468-1.208-.468v2c.1 0-.073.024-.244-.156-.16-.168-.128-.318-.128-.19h2zm-1.623-1.654a406.236 406.236 0 00-4.509.004l.013 2c1.496-.01 2.991-.011 4.487-.004l.009-2zm-4.502.004c-.265 0-.49.087-.638.166-.136.072-.38.228-.538.517l1.756.957a.778.778 0 01-.173.218.586.586 0 01-.21.115.704.704 0 01-.197.027v-2zm-1.18.69c-.103.193-.201.277-.279.32-.08.046-.212.09-.446.084l-.053 1.999c.511.014 1.02-.08 1.482-.34.466-.263.811-.655 1.06-1.12l-1.764-.943zm-.722.404c-.824-.024-1.668-.007-2.467-.007v2c.855 0 1.623-.017 2.409.006l.058-2zm-2.467-.007h-.001v2h.001v-2z"
                        mask="url(#path-1-inside-1_6207_38031)"
                      ></path>
                    </g>
                    <path
                      fill="#A89CD7"
                      stroke="#A89CD7"
                      d="M5.346 5.411l.023.026c.122.14.276.317.43.329.164.013.44-.134.493-.276.085-.225.226-.324.405-.438l-.895.177a.32.32 0 00-.022-.06h-.146l-.288.242zm0 0l.276-.242-.276.242zM6.809 3.42h0v-.003c-.184-.606-.822-.825-1.354-.643a1.001 1.001 0 00-.201.093l-.006.003-.032.017a.294.294 0 01-.055.009.21.21 0 01-.01-.018.333.333 0 01.045-.038h0c.455-.334 1.194-.214 1.536.274a1.092 1.092 0 01-.307 1.52c-.178.113-.417.27-.567.6a1.54 1.54 0 01-.048-.051.666.666 0 000-.027c0-.268.036-.322.04-.326 0-.001.001-.003.006-.007a.215.215 0 01.033-.023 1.18 1.18 0 01.217-.092c.25-.085.485-.24.627-.49.145-.254.153-.539.076-.798zM5.722 5.081l-.055.048.088-.01a4.093 4.093 0 01-.007-.008l-.026-.03z"
                    ></path>
                    <path
                      fill="#A89CD7"
                      d="M6.328 6.875a.526.526 0 11-1.05.047.526.526 0 011.05-.047z"
                    ></path>
                    <path
                      fill="#A89CD7"
                      d="M12.148 11.637H9.234a1.615 1.615 0 01-.383-.033c-.248-.063-.366-.245-.367-.493 0-.247.12-.431.366-.493.136-.027.276-.038.416-.033 1.93-.002 3.86-.002 5.791 0a1.97 1.97 0 01.384.026c.268.052.4.237.4.5.001.26-.13.447-.398.5-.127.022-.256.03-.384.027-.97.001-1.94 0-2.91-.001z"
                    ></path>
                    <path
                      fill="#A89CD7"
                      d="M12.17 13.747c-1.007 0-2.014.014-3.02-.012-.203-.006-.468-.12-.594-.27-.221-.274-.013-.678.342-.75.104-.018.209-.025.314-.022h5.897a1.41 1.41 0 01.382.037c.246.07.394.266.34.5-.041.178-.193.351-.342.468-.091.073-.27.046-.409.047-.969.003-1.937.002-2.91.002z"
                    ></path>
                  </g>
                </g>
              </svg>
              <Typography
                className="hover-nav"
                style={{
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  display: isNav === true ? "block" : "none",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  color: pathname && pathname?.includes("support") && "white",
                  paddingLeft: "5px",
                }}
              >
                {t("Support")}
              </Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Box>
  );
}
